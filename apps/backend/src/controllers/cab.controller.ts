import { NextFunction, Request, Response } from "express";
import Cab from "../models/cab.model";
import fs from "fs/promises";
import { bucket } from "../config/firebaseInit";
import AppError from "../utils/AppError";
import { SendResponse } from "../utils/JsonResponse";

export const createCab = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { title, description, model, capacity } = req.body;

  let imageUrls: string[] = [];

  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    try {
      for (const file of req.files as Express.Multer.File[]) {
        await bucket.upload(file.path, {
          destination: `cab-booking/cabs/${file.filename}`,
        });

        imageUrls.push(
          `https://firebasestorage.googleapis.com/v0/b/wingfi-9b5b7.appspot.com/o/${encodeURIComponent(`cab-booking/cabs/${file.filename}`)}?alt=media`
        );

        await fs.rm(file.path);
      }
    } catch (error: unknown) {
      console.error("Error while uploading image", error);
      const message =
        error instanceof Error ? error.message : "Internal Server Error!";

      return next(new AppError(message, 500));
    }
  }

  try {
    const cab = await Cab.create({
      imageUrls,
      defaultImageIndex: 0,
      title,
      description,
      model,
      capacity,
    });

    SendResponse(res, {
      status_code: 201,
      message: "Cab created successfully",
      data: cab,
    });
  } catch (error: unknown) {
    console.error("Error while creating cab", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};

export const getCabs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cabs = await Cab.find({});

    if (cabs.length === 0) return next(new AppError("Cabs not found", 404));

    SendResponse(res, {
      status_code: 200,
      message: "Cabs fetched successfully",
      data: cabs,
    });
  } catch (error: unknown) {
    console.error("Error while getting cabs", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};

export const getCab = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const cab = await Cab.findById(id);

    if (!cab) return next(new AppError("Cab not found", 404));

    SendResponse(res, {
      status_code: 200,
      message: "Cab fetched successfully",
      data: cab,
    });
  } catch (error: unknown) {
    console.error("Error while getting cab", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};

export const updateCab = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const { title, description, model, capacity } = req.body;

  try {
    const cab = await Cab.findById(id);

    if (!cab) return next(new AppError("Cab not found", 404));

    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      try {
        for (const file of req.files as Express.Multer.File[]) {
          await bucket.upload(file.path, {
            destination: `cab-booking/cabs/${file.originalname}`,
          });

          cab.imageUrls.push(
            `https://firebasestorage.googleapis.com/v0/b/wingfi-9b5b7.appspot.com/o/${encodeURIComponent(`cab-booking/cabs/${file.originalname}`)}?alt=media`
          );

          await fs.rm(file.path);
        }
      } catch (error: unknown) {
        console.error("Error while uploading image", error);
        const message =
          error instanceof Error ? error.message : "Internal Server Error!";

        return next(new AppError(message, 500));
      }
    }

    if (title) cab.title = title;
    if (description) cab.description = description;
    if (model) cab.model = model;
    if (capacity) cab.capacity = capacity;

    await cab.save();

    SendResponse(res, {
      status_code: 200,
      message: "Cab fetched successfully",
      data: cab,
    });
  } catch (error: unknown) {
    console.error("Error while updating cab", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};

export const deleteCab = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const cab = await Cab.findById(id);

    if (!cab) return next(new AppError("Cab not found", 404));

    if (cab.imageUrls.length > 0) {
      for (const imageUrl of cab.imageUrls) {
        const fileName =
          imageUrl
            .split("/")
            .pop()
            ?.split("?")[0]
            .replace(/%2F/g, "/")
            .replace(/%20/g, " ") ?? "";

        await bucket.file(fileName).delete();
      }
    }

    await cab.deleteOne();

    SendResponse(res, {
      status_code: 200,
      message: "Cab deleted successfully",
    });
  } catch (error: unknown) {
    console.error("Error while deleting cab", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};
