import {
  deleteImageController,
  uploadImageController,
} from "../controllers/images.controller";
import { Router } from "express";
import multer from "multer";

export const imagesRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: Image upload and deletion
 */

// Upload images route
/**
 * @swagger
 * /images:
 *   post:
 *     summary: Upload multiple images
 *     tags: [Images]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [BUS_IMAGE, PROFILE_PICTURE, DOCUMENT_IMAGE]
 *         required: true
 *         description: The type of image being uploaded.
 *         example: "BUS_IMAGE"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Images uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Upload successful
 *                 images:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                         example: https://res.cloudinary.com/demo/image/upload/v1/abc123.jpg
 *                       public_id:
 *                         type: string
 *                         example: demo/abc123
 *       400:
 *         description: Invalid image type or no images provided
 *       500:
 *         description: Upload failed
 */
imagesRouter.post("/", upload.array("images", 4), uploadImageController);

// Delete image route
/**
 * @swagger
 * /images:
 *   delete:
 *     summary: Delete an image
 *     tags: [Images]
 *     parameters:
 *       - in: query
 *         name: publicId
 *         schema:
 *           type: string
 *         required: true
 *         description: The public_id of the image to delete.
 *     responses:
 *       200:
 *         description: Image deleted successfully
 *       400:
 *         description: Failed to delete image or publicId is missing
 *       500:
 *         description: Deletion failed
 */
imagesRouter.delete("/", deleteImageController);
