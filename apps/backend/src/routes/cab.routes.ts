import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import {
  createCab,
  deleteCab,
  getCab,
  getCabs,
  updateCab,
} from "../controllers/cab.controller";
import { upload } from "../middlewares/multer.middleware";

const router: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Cabs
 *   description: Cab management API
 */

/**
 * @swagger
 * /cabs:
 *   post:
 *     summary: Create a new cab
 *     tags: [Cabs]
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
 *                 example: "Luxury Sedan"
 *               description:
 *                 type: string
 *                 example: "A comfortable luxury sedan"
 *               model:
 *                 type: string
 *                 example: "Toyota Camry 2023"
 *               capacity:
 *                 type: number
 *                 example: 4
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Cab created successfully
 *       500:
 *         description: Internal Server Error
 */
router.post("/", verifyJWT, upload.array("images", 5), createCab);

/**
 * @swagger
 * /cabs:
 *   get:
 *     summary: Get all cabs
 *     tags: [Cabs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cabs fetched successfully
 *       404:
 *         description: No cabs found
 */
router.get("/", getCabs);

/**
 * @swagger
 * /cabs/{id}:
 *   get:
 *     summary: Get a single cab
 *     tags: [Cabs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Cab ID
 *     responses:
 *       200:
 *         description: Cab fetched successfully
 *       404:
 *         description: Cab not found
 */
router.get("/:id", getCab);

/**
 * @swagger
 * /cabs/{id}:
 *   patch:
 *     summary: Update a cab
 *     tags: [Cabs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Cab ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Luxury SUV"
 *               description:
 *                 type: string
 *                 example: "Spacious and comfortable SUV"
 *               model:
 *                 type: string
 *                 example: "BMW X5 2023"
 *               capacity:
 *                 type: number
 *                 example: 5
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Cab updated successfully
 *       404:
 *         description: Cab not found
 */
router.patch("/:id", verifyJWT, updateCab);

/**
 * @swagger
 * /cabs/{id}:
 *   delete:
 *     summary: Delete a cab
 *     tags: [Cabs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Cab ID
 *     responses:
 *       200:
 *         description: Cab deleted successfully
 *       404:
 *         description: Cab not found
 */
router.delete("/:id", verifyJWT, deleteCab);

export default router;
