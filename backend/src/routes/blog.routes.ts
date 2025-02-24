import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.ts";
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  searchBlogs,
  updateBlog,
} from "../controllers/blog.controller.ts";
import { upload } from "../middlewares/multer.middleware.ts";

const router: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blog management APIs
 */

/**
 * @swagger
 * /blog:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
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
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Blog created successfully
 *       401:
 *         description: Unauthorized
 */
// router.route("/").post(verifyJWT, upload.single("image"), createBlog);
// router.route("/").post(, createBlog);

router.post("/", upload.single("image"), createBlog);

/**
 * @swagger
 * /F:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: A list of blogs
 */
router.route("/").get(getBlogs);

/**
 * @swagger
 * /blog/search:
 *   get:
 *     summary: Search blogs by title
 *     tags: [Blogs]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search keyword
 *     responses:
 *       200:
 *         description: List of matching blogs
 *       404:
 *         description: Blogs not found
 */
router.get("/search", searchBlogs);

/**
 * @swagger
 * /blog/{id}:
 *   get:
 *     summary: Get a single blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog fetched successfully
 *       404:
 *         description: Blog not found
 */
router.route("/:slug").get(getBlog);

/**
 * @swagger
 * /blog/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 *       401:
 *         description: Unauthorized
 */
router.route("/:id").delete(verifyJWT, deleteBlog);

/**
 * @swagger
 * /blog/{id}:
 *   patch:
 *     summary: Update a blog by ID
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       404:
 *         description: Blog not found
 *       401:
 *         description: Unauthorized
 */
router.route("/:id").patch(verifyJWT, updateBlog);

export default router;
