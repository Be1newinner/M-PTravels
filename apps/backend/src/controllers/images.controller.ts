import {
  deleteFromCloudinary,
  uploadBufferToCloudinary,
} from "../utils/cloudinaryService";
import { IMAGE_SIZES, IMAGE_TYPES_ENUM } from "../constants";

import { NextFunction, Request, Response } from "express";
import sharp from "sharp";
import AppError from "../utils/AppError";

export async function compressImage(
  file: Express.Multer.File,
  type: IMAGE_TYPES_ENUM
) {
  const config = IMAGE_SIZES[type];

  const buffer = await sharp(file.buffer)
    .resize(config.width, config.height, {
      fit: "cover",
    })
    .toFormat("webp", {
      quality: 80,
    })
    .toBuffer();

  const updatedFile: Express.Multer.File = {
    ...file,
    originalname: file.originalname.replace(/\.\w+$/, ".webp"),
    mimetype: "image/webp",
    buffer,
  };

  return updatedFile;
}

// Upload route
export const uploadImageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as Express.Multer.File[];
    const typeParam = req.query?.type;
    console.log({ files });

    if (
      !typeParam ||
      !Object.values(IMAGE_TYPES_ENUM).includes(typeParam as IMAGE_TYPES_ENUM)
    ) {
      return next(new AppError("Invalid image type provided", 400));
    }

    const type = typeParam as IMAGE_TYPES_ENUM;

    if (!files || files.length === 0) {
      return next(new AppError("No images provided", 400));
    }

    const uploadedImages = [];

    for (const file of files) {
      const compressedImage = await compressImage(file, type);
      const result = await uploadBufferToCloudinary(
        compressedImage.buffer,
        `uploads/${typeParam}`
      );                                                              
      uploadedImages.push({
        url: result.data?.url,
        public_id: result.data?.public_id,
      });
    }

    res.status(200).json({
      message: "Upload successful",
      images: uploadedImages,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return next(new AppError(message, 500));
  }
};

// Delete route
export const deleteImageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { publicId } = req.query;
    if (!publicId) {
      next(new AppError("Image publicId is required", 400));
      return;
    }
    const result = await deleteFromCloudinary(publicId as string);

    if (!result.success) throw new AppError(result.message, 400);

    res
      .status(200)
      .json({ message: "Image deleted successfully", result: result.message });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Deletion failed";
    return next(new AppError(message, 500));
  }
};
