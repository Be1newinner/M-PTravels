import { Request, Response } from "express";
import { SendResponse } from "../utils/JsonResponse.ts";
import AppError from "../utils/AppError.ts";

export function errorHandler(err: unknown, _: Request, res: Response) {
  console.error("Error:", err);

  let message = "Internal Server Error!";
  let status_code = 500;

  if (err instanceof AppError) {
    message = err.message;
    status_code = err.statusCode;
  }

  SendResponse(res, {
    message,
    status_code,
  });
}
