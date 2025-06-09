import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendMail } from "../utils/sendMail";
import { CustomRequest } from "../middlewares/auth.middleware";
import AppError from "../utils/AppError";
import { SendResponse } from "../utils/JsonResponse";
import { ENV_CONFIGS } from "../config/envs.config";

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

const generateAccessAndRefreshToken = async (
  userId: Types.ObjectId
): Promise<TokenResponse> => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("DB: User not found");
    }

    const accessToken: string = user.generateAccessToken();
    const refreshToken: string = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating tokens", error);
    throw new Error("Failed to generate tokens");
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password)
      return next(new AppError("Email and password are required", 400));

    const user = await User.create({ email, name, password });

    console.log(await user);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      data: user,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return next(new AppError(message, 500));
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  // console.log("HOST => ",req.get("host"));
  try {
    if (!email || !password)
      return next(new AppError("Email and password are required", 400));

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new AppError("User not found", 404));

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) return next(new AppError("Invalid password", 401));

    const tokenResponse = await generateAccessAndRefreshToken(user._id);

    if (!tokenResponse)
      return next(new AppError("Error generating tokens", 500));

    const { accessToken, refreshToken } = tokenResponse;

    const loggedInUser = await User.findById(user._id)
      .select(
        "-password -refreshToken -createdAt -updatedAt -__v -resetPasswordToken -resetPasswordTokenExpiry"
      )
      .lean();

    const cookieOptions: {
      httpOnly: boolean;
      secure: boolean;
      sameSite: "none" | "lax" | "strict";
    } = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 20 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        statusCode: 200,
        message: "User logged in successfully",
        data: {
          ...loggedInUser,
          accessToken,
        },
      });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return next(new AppError(message, 500));
  }
};

export const logoutUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.user?.id;

  try {
    await User.findByIdAndUpdate(
      userId,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      { new: true }
    );

    const cookieOptions: {
      httpOnly: boolean;
      secure: boolean;
      sameSite: "none" | "lax" | "strict";
    } = {
      httpOnly: true,
      secure: ENV_CONFIGS.NODE_ENV === "production",
      sameSite: "none",
    };

    res.status(200).clearCookie("refreshToken", cookieOptions).json({
      success: true,
      statusCode: 200,
      message: "User logged out successfully",
      data: null,
    });
  } catch (error: unknown) {
    console.error("Error logging out user", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};

export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;

  try {
    if (!incomingRefreshToken)
      return next(new AppError("Unauthorized access", 401));

    console.log({ tokne: incomingRefreshToken });

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      ENV_CONFIGS.REFRESH_TOKEN_SECRET as string
    );

    const user = await User.findById((decodedToken as jwt.JwtPayload).id);

    if (!user) return next(new AppError("Invalid refresh token", 401));

    // console.log(
    //   user.refreshToken === incomingRefreshToken,
    //   incomingRefreshToken,
    //   user.refreshToken
    // );

    if (incomingRefreshToken !== user.refreshToken) {
      console.log("TOJEN");
      return next(new AppError("Refresh token is expired or invalid", 401));
    } else console.log("HERE");

    const options = {
      httpOnly: true,
      secure: ENV_CONFIGS.NODE_ENV === "production",
    };

    const tokenResponse = await generateAccessAndRefreshToken(user._id);

    if (!tokenResponse)
      return next(new AppError("Error generating tokens", 500));

    const { accessToken, refreshToken } = tokenResponse;

    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        ...options,
        maxAge: 20 * 24 * 60 * 60 * 1000,
      }) // 20 days
      .json({
        success: true,
        statusCode: 200,
        message: "Access token refreshed successfully",
        data: {
          accessToken,
        },
      });
  } catch (error: unknown) {
    console.error("Error refreshing access token", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};

export const changeCurrentPassword = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.user?.id;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId).select("+password");

    if (!user) return next(new AppError("User not found", 404));

    const isPasswordValid = user?.isPasswordCorrect(oldPassword);

    if (!isPasswordValid) return next(new AppError("Invalid password", 401));

    user.password = newPassword;
    await user.save();

    SendResponse(res, {
      message: "Password changed successfully",
      status_code: 200,
    });
  } catch (error: unknown) {
    console.error("Error while changing password", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};

export const getUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.user?.id;

  try {
    const user = await User.findById(userId).select(
      "-password -refreshToken -createdAt -updatedAt -__v"
    );

    if (!user) return next(new AppError("User not found", 404));

    SendResponse(res, {
      message: "User fetched successfully",
      status_code: 200,
    });
  } catch (error: unknown) {
    console.error("Error while getting user", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) return next(new AppError("User not found", 404));

    const token = await bcrypt.hash(email, 10);

    existingUser.resetPasswordToken = token;
    existingUser.resetPasswordTokenExpiry = new Date(
      Date.now() + 15 * 60 * 1000
    ); // 15 minutes

    await existingUser.save();

    await sendMail(
      email,
      "Reset Password",
      `<p>Click <a href="${ENV_CONFIGS.FRONTEND_URL}/reset-password?token=${token}">here</a> to reset your password</p>`
    );

    SendResponse(res, {
      message: "Password reset email sent successfully",
      status_code: 200,
    });
  } catch (error: unknown) {
    console.error("Error while forgot password", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { token } = req.query;
  const { password } = req.body;

  try {
    const existingUser = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!existingUser)
      return next(new AppError("Invalid or expired token", 404));

    existingUser.password = password;
    existingUser.resetPasswordToken = "";
    existingUser.resetPasswordTokenExpiry = new Date();

    await existingUser.save();

    SendResponse(res, {
      message: "Password reset successfully",
      status_code: 200,
    });
  } catch (error: unknown) {
    console.error("Error while resetting password", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};
