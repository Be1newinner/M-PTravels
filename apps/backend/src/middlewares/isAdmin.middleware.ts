import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";

export default function IsAdminMiddleware(
  req: Request,
  _: Response,
  next: NextFunction
) {
  if (req.user!.role !== "ADMIN") {
    throw new AppError(
      "Admin permission is required to perform this operation.",
      401
    );
  }

  next();
}
