import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.ts";
import AppError from "../utils/AppError.ts";

export interface CustomRequest extends Request {
  user?: InstanceType<typeof User>;
}

export const verifyJWT = async (
  req: CustomRequest,
  _: Response,
  next: NextFunction
) => {
  const token =
    req.header("Authorization")?.replace("Bearer ", "") ||
    req.cookies?.accessToken;

  try {
    if (!token) throw new AppError("Token not found", 401);

    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    );

    const user = await User.findById((decodedToken as jwt.JwtPayload).id);

    if (!user) throw new AppError("User not found", 401);

    req.user = user;

    next();
  } catch (error: unknown) {
    console.error("Error verifying JWT", error);

    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError("Token expired", 401);
    } else {
      throw new AppError("Unauthorized access", 401);
    }
  }
};
