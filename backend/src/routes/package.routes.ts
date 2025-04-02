import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.ts";
import {
  createPackage,
  deletePackage,
  getPackage,
  getPackages,
  updatePackage,
} from "../controllers/package.controller.ts";
import { upload } from "../middlewares/multer.middleware.ts";

const router: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Package
 *   description: API endpoints for managing packages
 */

/**
 * @swagger
 * /packages:
 *   post:
 *     summary: Create a new package
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Luxury Tour Package"
 *               description:
 *                 type: string
 *                 example: "A premium travel experience"
 *               price:
 *                 type: number
 *                 example: 2500
 *               price_unit:
 *                 type: string
 *                 example: "per day"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Package created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal Server Error
 */
router.post("/", verifyJWT, upload.single("image"), createPackage);

/**
 * @swagger
 * /packages:
 *   get:
 *     summary: Get all packages
 *     tags: [Packages]
 *     responses:
 *       200:
 *         description: Packages fetched successfully
 *       404:
 *         description: No packages found
 */
router.get("/", getPackages);

/**
 * @swagger
 * /packages/{id}:
 *   get:
 *     summary: Get a package by ID
 *     tags: [Packages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Package ID
 *     responses:
 *       200:
 *         description: Package fetched successfully
 *       404:
 *         description: Package not found
 */
router.get("/:id", getPackage);

/**
 * @swagger
 * /packages/{id}:
 *   patch:
 *     summary: Update a package by ID
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Package ID
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Tour Package"
 *               description:
 *                 type: string
 *                 example: "Updated package description"
 *               price:
 *                 type: number
 *                 example: 3000
 *               price_unit:
 *                 type: string
 *                 example: "per week"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Package updated successfully
 *       404:
 *         description: Package not found
 */
router.patch("/:id", verifyJWT, upload.single("image"), updatePackage);

/**
 * @swagger
 * /packages/{id}:
 *   delete:
 *     summary: Delete a package by ID
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Package ID
 *     responses:
 *       200:
 *         description: Package deleted successfully
 *       404:
 *         description: Package not found
 */
router.delete("/:id", verifyJWT, deletePackage);

export default router;
