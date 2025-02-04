import { Request, Response } from "express";
import User from "../models/user.model.ts";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendMail } from "../utils/sendMail.ts";
import { CustomRequest } from "../middlewares/auth.middleware.ts";

interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

const generateAccessAndRefreshToken = async (userId: Types.ObjectId): Promise<TokenResponse> => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
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
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Email and password are required"
            });
            return;
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: "User not found"
            });
            return;
        }

        const isPasswordValid = await user.isPasswordCorrect(password);

        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Invalid password"
            });
            return;
        }

        const tokenResponse = await generateAccessAndRefreshToken(user._id);

        if (!tokenResponse) {
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Error generating tokens"
            });
            return;
        }

        const { accessToken, refreshToken } = tokenResponse;

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken -createdAt -updatedAt -__v -resetPasswordToken -resetPasswordTokenExpiry");

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        }

        res.status(200)
            .cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 24 * 60 * 60 * 1000 }) // 1 day
            .cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: 20 * 24 * 60 * 60 * 1000 }) // 20 days
            .json({
                success: true,
                statusCode: 200,
                message: "User logged in successfully",
                data: {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                }
            });
    } catch (error: unknown) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error instanceof Error ? error.message : "Internal Server Error",
            error
        });
    }
}

export const logoutUser = async (req: CustomRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;

    try {
        await User.findByIdAndUpdate(
            userId,
            {
                $unset: {
                    refreshToken: 1
                }
            },
            { new: true }
        )

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        }

        res.status(200)
            .clearCookie("accessToken", cookieOptions)
            .clearCookie("refreshToken", cookieOptions)
            .json({
                success: true,
                statusCode: 200,
                message: "User logged out successfully"
            })
    } catch (error: unknown) {
        console.error("Error logging out user", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message || "Internal Server Error",
            error
        })
    }
}

export const refreshAccessToken = async (req: Request, res: Response): Promise<void> => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;

    try {
        if (!incomingRefreshToken) {
            res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Unauthorized access"
            });
            return;
        }

        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET as string);

        const user = await User.findById((decodedToken as jwt.JwtPayload).id);

        if (!user) {
            res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Invalid refresh token"
            });
            return;
        }

        if (incomingRefreshToken !== user.refreshToken) {
            res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Refresh token is expired or invalid"
            });
            return;
        }

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        }

        const tokenResponse = await generateAccessAndRefreshToken(user._id);

        if (!tokenResponse) {
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Error generating tokens"
            });
            return;
        }

        const { accessToken, refreshToken } = tokenResponse;

        res.status(200)
            .cookie("accessToken", accessToken, { ...options, maxAge: 24 * 60 * 60 * 1000 }) // 1 day
            .cookie("refreshToken", refreshToken, { ...options, maxAge: 20 * 24 * 60 * 60 * 1000 }) // 20 days
            .json({
                success: true,
                statusCode: 200,
                message: "Access token refreshed successfully",
                data: {
                    accessToken,
                    refreshToken
                }
            })
    } catch (error: unknown) {
        console.error("Error refreshing access token", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error?.message || "Internal Server Error",
            error
        })
    }
}

export const changeCurrentPassword = async (req: CustomRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await User.findById(userId).select("+password");

        if (!user) {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: "User not found"
            });
            return;
        }

        const isPasswordValid = user?.isPasswordCorrect(oldPassword);

        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Invalid password"
            });
            return;
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Password changed successfully"
        });
    } catch (error: unknown) {
        console.error("Error while changing password", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error?.message || "Internal Server Error",
            error
        })
    }
}

export const getUser = async (req: CustomRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;

    try {
        const user = await User.findById(userId).select("-password -refreshToken -createdAt -updatedAt -__v");

        if (!user) {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: "User not found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User fetched successfully",
            data: user
        })
    } catch (error: unknown) {
        console.error("Error while getting user", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error?.message || "Internal Server Error",
            error
        })
    }
}

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: "User not found"
            });
            return;
        }

        const token = await bcrypt.hash(email, 10);

        existingUser.resetPasswordToken = token;
        existingUser.resetPasswordTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        await existingUser.save();

        await sendMail(email, "Reset Password", `<p>Click <a href="${process.env.FRONTEND_URL}/reset-password?token=${token}">here</a> to reset your password</p>`);

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Password reset email sent successfully"
        });
    } catch (error: unknown) {
        console.error("Error while forgot password", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error?.message || "Internal Server Error",
            error
        })
    }
}

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    const { token } = req.query;
    const { password } = req.body;

    try {
        const existingUser = await User.findOne({ resetPasswordToken: token, resetPasswordTokenExpiry: { $gt: Date.now() } });

        if (!existingUser) {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Invalid or expired token"
            });
            return;
        }

        existingUser.password = password;
        existingUser.resetPasswordToken = '';
        existingUser.resetPasswordTokenExpiry = new Date();

        await existingUser.save();

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Password reset successfully"
        });
    } catch (error: unknown) {
        console.error("Error while resetting password", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error?.message || "Internal Server Error",
            error
        })
    }
}