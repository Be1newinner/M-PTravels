import {
  deleteFromCloudinary,
  uploadBufferToCloudinary,
} from "@/utils/cloudinaryService";
import { IMAGE_SIZES, IMAGE_TYPES_ENUM } from "../constants";

import { NextFunction, Request, Response } from "express";
import sharp from "sharp";
import AppError from "@/utils/AppError";

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
    const file = req.file as Express.Multer.File;
    const typeParam = req.query?.type;

    if (
      !typeParam ||
      !Object.values(IMAGE_TYPES_ENUM).includes(typeParam as IMAGE_TYPES_ENUM)
    ) {
      return next(new AppError("Invalid image type provided", 400));
    }

    const type = typeParam as IMAGE_TYPES_ENUM;

    if (!file) {
      return next(new AppError("No images provided", 400));
    }

    const compressedImage = await compressImage(file, type);

    const result = await uploadBufferToCloudinary(compressedImage.buffer);
    console.log(result);
    res.status(200).json({
      message: "Upload successful",
      url: result.url,
      public_id: result.public_id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed", error: err });
  }
};

// Delete route
export const deleteImageController = async (req: Request, res: Response) => {
  try {
    const { publicId } = req.query;
    const result = await deleteFromCloudinary(publicId as string);

    if (result.result !== "ok") {
      res.status(400).json({ message: "Failed to delete image", result });
    }

    res.status(200).json({ message: "Image deleted successfully", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Deletion failed", error: err });
  }
};

// export async function uploadImagesController(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const files = req.files as Express.Multer.File[];
//     const typeParam = req.query?.type;

//     if (
//       !typeParam ||
//       !Object.values(IMAGE_TYPES_ENUM).includes(typeParam as IMAGE_TYPES_ENUM)
//     ) {
//       return next(new AppError("Invalid image type provided", 400));
//     }

//     const type = typeParam as IMAGE_TYPES_ENUM;

//     if (!files || files.length === 0) {
//       return next(new AppError("No images provided", 400));
//     }

//     const uploadPromises = files.map((file) =>
//       compressImage(file, type).then((compressedFile) =>
//         uploadFileToFirebaseStorage(compressedFile)
//       )
//     );

//     const uploadedUrls = await Promise.all(uploadPromises);

//     SendResponse(res, {
//       data: uploadedUrls,
//       message: "Images uploaded successfully!",
//       status_code: 200,
//     });
//   } catch (error) {
//     next(
//       new AppError((error as Error).message || "Image uploading failed!", 500)
//     );
//   }
// }

// export async function deleteImagesController(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const imageUrls = req.body as string[];

//     if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
//       return next(
//         new AppError("Please pass an array of image URLs to delete", 400)
//       );
//     }

//     if (imageUrls.length > 4) {
//       return next(new AppError("You can delete up to 4 images at a time", 400));
//     }

//     const deleteResults = await Promise.all(
//       imageUrls.map((url) => deleteFileFromFirebaseStorage(url))
//     );

//     SendResponse(res, {
//       message: "Images deleted successfully!",
//       status_code: 200,
//       data: deleteResults,
//     });
//   } catch (error) {
//     next(
//       new AppError((error as Error).message || "Images deletion failed!", 500)
//     );
//   }
// }
