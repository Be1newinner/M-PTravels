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

router
  .route("/")
  .post(verifyJWT, upload.single("image"), createBlog)
  .get(getBlogs);

router.get("/search", searchBlogs);

router
  .route("/:id")
  .get(getBlog)
  .delete(verifyJWT, deleteBlog)
  .patch(verifyJWT, updateBlog);

export default router;
