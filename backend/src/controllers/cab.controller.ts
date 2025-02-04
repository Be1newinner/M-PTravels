import { Request, Response } from "express";
import Cab from "../models/cab.model.ts";
import fs from "fs/promises";
import { bucket } from "../config/firebaseInit.ts";

export const createCab = async (req: Request, res: Response): Promise<void> => {
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
      res.status(500).json({
        success: false,
        statusCode: 500,
        message: error?.message || "Internal Server Error",
        error,
      });
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

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Cab created successfully",
      data: cab,
    });
  } catch (error: unknown) {
    console.error("Error while creating cab", error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error?.message || "Internal Server Error",
      error,
    });
  }
};

export const getCabs = async (req: Request, res: Response): Promise<void> => {
  try {
    const cabs = await Cab.find({});

    if (cabs.length === 0) {
      res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Cabs not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Cabs fetched successfully",
      data: cabs,
    });
  } catch (error: unknown) {
    console.error("Error while getting cabs", error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error?.message || "Internal Server Error",
      error,
    });
  }
};

export const getCab = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const cab = await Cab.findById(id);

    if (!cab) {
      res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Cab not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Cab fetched successfully",
      data: cab,
    });
  } catch (error: unknown) {
    console.error("Error while getting cab", error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error?.message || "Internal Server Error",
      error,
    });
  }
};

export const updateCab = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, model, capacity } = req.body;

  try {
    const cab = await Cab.findById(id);

    if (!cab) {
      res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Cab not found",
      });
      return;
    }

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
        res.status(500).json({
          success: false,
          statusCode: 500,
          message: error?.message || "Internal Server Error",
          error,
        });
      }
    }

    if (title) cab.title = title;
    if (description) cab.description = description;
    if (model) cab.model = model;
    if (capacity) cab.capacity = capacity;

    await cab.save();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Cab updated successfully",
      data: cab,
    });
  } catch (error: unknown) {
    console.error("Error while updating cab", error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error?.message || "Internal Server Error",
      error,
    });
  }
};

export const deleteCab = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const cab = await Cab.findById(id);

    if (!cab) {
      res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Cab not found",
      });
      return;
    }

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

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Cab deleted successfully",
    });
  } catch (error: unknown) {
    console.error("Error while deleting cab", error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error?.message || "Internal Server Error",
      error,
    });
  }
};
