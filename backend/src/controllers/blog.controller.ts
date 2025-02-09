import { NextFunction, Request, Response } from "express";
import Blog from "../models/blog.model.ts";
import { bucket } from "../config/firebaseInit.ts";
import fs from "fs/promises";
import { SendResponse } from "../utils/JsonResponse.ts";
import AppError from "../utils/AppError.ts";

export const createBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { title, description } = req.body;

  let imageUrl = "";

  if (req.file) {
    await bucket.upload(req.file.path, {
      destination: `cab-booking/blogs/${req.file.originalname}`,
    });

    imageUrl = `https://firebasestorage.googleapis.com/v0/b/wingfi-9b5b7.appspot.com/o/${encodeURIComponent(`cab-booking/blogs/${req.file.originalname}`)}?alt=media`;

    await fs.rm(req.file.path);
  }

  try {
    const blog = await Blog.create({
      title,
      description,
      image: imageUrl,
    });

    SendResponse(res, {
      status_code: 201,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error: unknown) {
    console.error("Error while creating blog", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};

export const getBlogs = async (
  _: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    if (blogs.length === 0) return next(new AppError("Blogs not found!", 404));

    SendResponse(res, {
      status_code: 200,
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (error: unknown) {
    console.error("Error while creating blog", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};

export const getBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) return next(new AppError("Blogs not found!", 404));

    SendResponse(res, {
      status_code: 200,
      message: "Blog fetched successfully",
      data: blog,
    });
  } catch (error: unknown) {
    console.error("Error while getting blog", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};

export const updateBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true }
    );

    if (!blog) return next(new AppError("Blogs not found", 404));

    SendResponse(res, {
      status_code: 200,
      message: "Blogs fetched successfully",
      data: blog,
    });
  } catch (error: unknown) {
    console.error("Error while updating blog", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};

export const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);

    if (!blog) return next(new AppError("Blogs not found", 404));

    if (blog?.image && blog?.image !== "") {
      let fileName =
        blog?.image?.split("/").pop()?.split("?")[0].replace(/%2F/g, "/") ?? "";

      await bucket.file(fileName).delete();
    }

    await Blog.findByIdAndDelete(id);

    SendResponse(res, {
      status_code: 200,
      message: "Blog deleted successfully",
    });
  } catch (error: unknown) {
    console.error("Error while deleting blog", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};

export const searchBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { query } = req.query;

  try {
    const blogs = await Blog.find({ title: { $regex: query, $options: "i" } });

    if (blogs.length === 0) return next(new AppError("Blogs not found", 404));

    SendResponse(res, {
      status_code: 200,
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (error: unknown) {
    console.error("Error while searching blog", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};
