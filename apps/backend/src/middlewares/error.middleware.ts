/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { SendResponse } from "../utils/JsonResponse";
import AppError from "../utils/AppError";
import { MongooseError } from "mongoose";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (!res || typeof res.status !== "function") return;

  console.log("Error Handler Middleware", err);

  let message = "Internal Server Error!";
  let status_code = 500;

  if (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as any).code === 11000
  ) {
    status_code = 400;
    const keyValue = (err as any).keyValue || {};
    message = `Duplicate key error: ${JSON.stringify(keyValue)}`;
  }

  if (err instanceof MongooseError) {
    message = err.message;
    status_code = 400;
  }

  if (err instanceof AppError) {
    message = err.message;
    status_code = err.statusCode;
  }

  // console.log(
  //   err && typeof err === "object" && "message" in err ? err.message : message
  // );

  SendResponse(res, { message, status_code, status: "error" });
}
