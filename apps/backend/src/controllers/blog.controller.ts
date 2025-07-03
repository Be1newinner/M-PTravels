import { NextFunction, Request, Response } from "express";
import Blog from "../models/blog.model";
import { SendResponse } from "../utils/JsonResponse";
import AppError from "../utils/AppError";
import { parseQueryInt } from "../utils/parseQueryInt";

export const createBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { title, content, slug, image } = req.body;

  try {
    const blogData = await Blog.create({
      title,
      content,
      slug,
      image,
    });
    SendResponse(res, {
      status_code: 201,
      message: "Blog created successfully",
      data: blogData,
    });
  } catch (error: unknown) {
    console.log("Error while creating blog", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";
    console.log({ message });
    return next(new AppError(message, 500));
  }
};

export const getBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const pageNum = parseQueryInt(req.query.page, 1);
    const limitNum = parseQueryInt(req.query.limit, 6, 20);

    const blogsResponse = await Blog.aggregate([
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [
            { $sort: { updatedAt: -1 } },
            { $skip: (pageNum - 1) * limitNum },
            { $limit: limitNum },
            {
              $project: {
                title: true,
                image: true,
                updatedAt: true,
                content: true,
                slug: true,
              },
            },
          ],
        },
      },
    ]);

    const blogs = blogsResponse[0]?.data || [];
    const totalBlogs = blogsResponse[0]?.metadata[0]?.total || 0;

    SendResponse(res, {
      status_code: 200,
      message: "Blogs fetched successfully",
      data: blogs,
      meta: {
        length: blogs.length,
        total: totalBlogs,
        page: pageNum,
        limit: limitNum,
      },
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
  const { slug } = req.params;

  try {
    const blog = await Blog.findOne({ slug });

    SendResponse(res, {
      status_code: 200,
      message: "Blog fetched successfully",
      data: blog || [],
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
  const { slug } = req.params;
  const { title, content, image } = req.body;

  try {
    const blog = await Blog.findOneAndUpdate(
      { slug },
      {
        title,
        content,
        image,
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
