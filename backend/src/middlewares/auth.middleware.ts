import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.ts";
import AppError from "../utils/AppError.ts";
import { ENV_CONFIGS } from "../config/envs.config.ts";

export interface CustomRequest extends Request {
  user?: InstanceType<typeof User>;
}

export const verifyJWT = async (
  req: CustomRequest,
  _: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  try {
    if (!token) return next(new AppError("Token not found", 401));

    const decodedToken = jwt.verify(
      token,
      ENV_CONFIGS.ACCESS_TOKEN_SECRET as string
    );

    const user = await User.findById((decodedToken as jwt.JwtPayload).id);

    if (!user) return next(new AppError("User not found", 401));

    req.user = user;

    next();
  } catch (error: unknown) {
    console.error("Error verifying JWT", error);

    if (error instanceof jwt.TokenExpiredError) {
      return next(new AppError("Token expired", 401));
    } else {
      return next(new AppError("Unauthorized access", 401));
    }
  }
};
