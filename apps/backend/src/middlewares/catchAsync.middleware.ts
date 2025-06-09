import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";

export const catchAsyncMiddleware = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
  error: {
    message: string;
    status?: number;
  } = {
    message: "Unexpected Error!",
    status: 500,
  }
) => {
  return function (req: Request, res: Response, next: NextFunction) {
    return fn(req, res, next).catch((err: Error) => {
      if (err instanceof AppError) {
        next(err);
      } else {
        const status = "status" in error ? Number(error.status) : 500;
        const message =
          "message" in error ? error.message : "Unexpected Error!";
        next(new AppError(message, status));
      }
    });
  };
};
