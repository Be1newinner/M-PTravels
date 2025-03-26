import { NextFunction, Request, Response } from "express";
import Package from "../models/package.model.ts";
import { bucket } from "../config/firebaseInit.ts";
import fs from "fs/promises";
import AppError from "../utils/AppError.ts";
import { SendResponse } from "../utils/JsonResponse.ts";
import { parseQueryInt } from "../utils/parseQueryInt.ts";

export const createPackage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { title, description, price, price_unit } = req.body;

  try {
    if (!title || !description || !price || !price_unit)
      return next(new AppError("All fields are required", 400));

    let image = "";

    if (req.file) {
      await bucket.upload(req.file.path, {
        destination: `cab-booking/packages/${req.file.filename}`,
      });

      image = `https://firebasestorage.googleapis.com/v0/b/wingfi-9b5b7.appspot.com/o/${encodeURIComponent(`cab-booking/packages/${req.file.filename}`)}?alt=media`;

      await fs.rm(req.file.path);
    }

    const createdPackage = await Package.create({
      title,
      description,
      price,
      price_unit,
      image,
    });

    SendResponse(res, {
      message: "Package created successfully",
      data: createdPackage,
      status_code: 201,
    });
  } catch (error: unknown) {
    console.error("Error while creating package", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};

export const getPackages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { page, limit } = req.query;
    const pageNum = parseQueryInt(page, 1);
    const limitNum = parseQueryInt(limit, 9);

    const PackagesResponse = await Package.aggregate([
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [
            { $sort: { updatedAt: -1 } },
            { $skip: (pageNum - 1) * limitNum },
            { $limit: limitNum },
            {
              $project: {
                title: 1,
                image: 1,
                slug: 1,
                description: 1,
              },
            },
          ],
        },
      },
    ]);

    const Packages = PackagesResponse[0]?.data || [];
    const totalPackages = PackagesResponse[0]?.metadata[0]?.total || 0;

    SendResponse(res, {
      status_code: 200,
      message: "Packages fetched successfully",
      data: Packages,
      meta: {
        length: Packages.length,
        total: totalPackages,
        page: pageNum,
        limit: limitNum,
      },
    });
  } catch (error: unknown) {
    console.error("Error while getting packages", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};

export const getPackage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const existingPackage = await Package.findById(id);

    if (!existingPackage) return next(new AppError("Package not found", 404));

    SendResponse(res, {
      message: "Package fetched successfully",
      data: existingPackage,
      status_code: 200,
    });
  } catch (error: unknown) {
    console.error("Error while getting package", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};

export const updatePackage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const { title, description, price, price_unit } = req.body;

  // console.log("req.body", req.body);

  try {
    const existingPackage = await Package.findById(id);

    if (!existingPackage) return next(new AppError("Package not found", 404));

    if (req.file) {
      if (existingPackage.image) {
        const fileName =
          existingPackage?.image
            ?.split("/")
            .pop()
            ?.split("?")[0]
            .replace(/%2F/g, "/") ?? "";

        await bucket.file(fileName).delete();
      }

      await bucket.upload(req.file.path, {
        destination: `cab-booking/packages/${req.file.filename}`,
      });

      existingPackage.image = `https://firebasestorage.googleapis.com/v0/b/wingfi-9b5b7.appspot.com/o/${encodeURIComponent(`cab-booking/packages/${req.file.filename}`)}?alt=media`;

      await fs.rm(req.file.path);
    }

    if (title) existingPackage.title = title;
    if (description) existingPackage.description = description;
    if (price) existingPackage.price = price;
    if (price_unit) existingPackage.price_unit = price_unit;

    await existingPackage.save();

    SendResponse(res, {
      message: "Package updated successfully",
      data: existingPackage,
      status_code: 200,
    });
  } catch (error: unknown) {
    console.error("Error while updating package", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};

export const deletePackage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const existingPackage = await Package.findById(id);

    if (!existingPackage) return next(new AppError("Package not found", 404));

    if (existingPackage.image && existingPackage.image !== "") {
      let fileName =
        existingPackage?.image
          ?.split("/")
          .pop()
          ?.split("?")[0]
          .replace(/%2F/g, "/") ?? "";

      await bucket.file(fileName).delete();
    }

    await existingPackage.deleteOne();

    SendResponse(res, {
      message: "Package deleted successfully",
      data: existingPackage,
      status_code: 200,
    });
  } catch (error: unknown) {
    console.error("Error while deleting package", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};
