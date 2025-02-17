import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.ts";
import {
  createLead,
  deleteLead,
  getAllLeads,
  getLead,
  searchLead,
  updateLead,
} from "../controllers/lead.controller.ts";

const router: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Leads
 *   description: API endpoints for managing leads
 */

/**
 * @swagger
 * /leads:
 *   post:
 *     summary: Create a new lead
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               pickupAddress:
 *                 type: string
 *                 example: "123 Main Street"
 *               dropAddress:
 *                 type: string
 *                 example: "456 Elm Street"
 *               pickupDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-01T10:00:00Z"
 *               dropDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-02T15:00:00Z"
 *     responses:
 *       201:
 *         description: Lead created successfully
 *       500:
 *         description: Internal Server Error
 */
router.post("/", verifyJWT, createLead);

/**
 * @swagger
 * /leads/all:
 *   post:
 *     summary: Get all leads with pagination and filtering
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: integer
 *                 example: 1
 *               limit:
 *                 type: integer
 *                 example: 10
 *               filters:
 *                 type: object
 *                 example: { "name": "John" }
 *     responses:
 *       200:
 *         description: Leads fetched successfully
 *       404:
 *         description: No leads found
 */
router.post("/all", verifyJWT, getAllLeads);

/**
 * @swagger
 * /leads/search:
 *   get:
 *     summary: Search leads by name, email, or phone
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search term
 *     responses:
 *       200:
 *         description: Leads found
 *       404:
 *         description: No leads found
 */
router.get("/search", verifyJWT, searchLead);

/**
 * @swagger
 * /leads/{id}:
 *   get:
 *     summary: Get a single lead by ID
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Lead ID
 *     responses:
 *       200:
 *         description: Lead fetched successfully
 *       404:
 *         description: Lead not found
 */
router.get("/:id", verifyJWT, getLead);

/**
 * @swagger
 * /leads/{id}:
 *   patch:
 *     summary: Update a lead by ID
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Lead ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *               email:
 *                 type: string
 *                 example: "janedoe@example.com"
 *               phone:
 *                 type: string
 *                 example: "9876543211"
 *               pickupAddress:
 *                 type: string
 *                 example: "789 Pine Street"
 *               dropAddress:
 *                 type: string
 *                 example: "321 Oak Street"
 *               pickupDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-05T10:00:00Z"
 *               dropDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-06T15:00:00Z"
 *     responses:
 *       200:
 *         description: Lead updated successfully
 *       404:
 *         description: Lead not found
 */
router.patch("/:id", verifyJWT, updateLead);

/**
 * @swagger
 * /leads/{id}:
 *   delete:
 *     summary: Delete a lead by ID
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Lead ID
 *     responses:
 *       200:
 *         description: Lead deleted successfully
 *       404:
 *         description: Lead not found
 */
router.delete("/:id", verifyJWT, deleteLead);

export default router;
