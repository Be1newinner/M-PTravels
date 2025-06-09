import {
  deleteImageController,
  uploadImageController,
} from "@/controllers/images.controller";
import { Router } from "express";
import multer from "multer";

export const imagesRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload route
imagesRouter
  .route("/")
  .post(upload.single("image"), uploadImageController)
  .delete(deleteImageController);
