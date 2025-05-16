import { NextFunction, Request, Response } from "express";
import Lead from "../models/lead.model";
import AppError from "../utils/AppError";
import { SendResponse } from "../utils/JsonResponse";

export const createLead = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    name,
    email,
    phone,
    pickupAddress,
    dropAddress,
    pickupDate,
    dropDate,
    message,
    source,
  } = req.body;

  try {
    const lead = await Lead.create({
      name,
      email,
      phone,
      pickupAddress,
      dropAddress,
      pickupDate,
      dropDate,
      message,
      source,
    });

    SendResponse(res, {
      status_code: 201,
      message: "Lead created successfully",
      data: lead,
    });
  } catch (error: unknown) {
    console.error("Error while creating lead", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};

export const getAllLeads = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const { filters = {}, projection } = req.body || {};

    const filterConditions: Record<
      string,
      { $regex: unknown; $options: string }
    >[] = [];

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          filterConditions.push({ [key]: { $regex: value, $options: "i" } });
        }
      });
    }

    const filterObjects =
      filterConditions.length > 0 ? { $or: filterConditions } : {};

    const projectionObject = projection || {
      name: 1,
      email: 1,
      phone: 1,
      pickupAddress: 1,
      dropAddress: 1,
      pickupDate: 1,
      dropDate: 1,
      createdAt: 1,
      updatedAt: 1,
    };

    const leads = await Lead.find(filterObjects, projectionObject)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (leads.length === 0) return next(new AppError("Leads not found", 404));

    const totalCount = await Lead.countDocuments(filterObjects);

    SendResponse(res, {
      status_code: 200,
      message: "Lead fetched successfully",
      data: {
        data: leads,
        pagination: {
          total_records: totalCount,
          total_pages: Math.ceil(totalCount / limit),
          limit,
          current_page: page,
          next_page: page < Math.ceil(totalCount / limit) ? page + 1 : null,
          prev_page: page > 1 ? page - 1 : null,
        },
      },
    });
  } catch (error: unknown) {
    console.error("Error while getting leads", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};

export const getLead = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const existingLead = await Lead.findById(id);

    if (!existingLead) return next(new AppError("Lead not found", 404));

    SendResponse(res, {
      message: "Lead fetched successfully",
      data: existingLead,
      status_code: 200,
    });
  } catch (error: unknown) {
    console.error("Error while getting lead", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};

export const updateLead = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const {
    name,
    email,
    phone,
    pickupAddress,
    dropAddress,
    pickupDate,
    dropDate,
  } = req.body;

  try {
    const existingLead = await Lead.findById(id);

    if (!existingLead) return next(new AppError("Lead not found", 404));

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          email,
          phone,
          pickupAddress,
          dropAddress,
          pickupDate,
          dropDate,
        },
      },
      { new: true }
    );

    SendResponse(res, {
      message: "Lead updated successfully",
      data: updatedLead,
      status_code: 200,
    });
  } catch (error: unknown) {
    console.error("Error while updating lead", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};

export const deleteLead = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const existingLead = await Lead.findById(id);

    if (!existingLead) return next(new AppError("Lead not found", 404));

    await existingLead.deleteOne();

    SendResponse(res, {
      message: "Lead deleted successfully",
      status_code: 200,
    });
  } catch (error: unknown) {
    console.error("Error while deleting lead", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};

export const searchLead = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { query } = req.query;

  try {
    const leads = await Lead.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
      ],
    });

    if (leads.length === 0) return next(new AppError("Leads not found", 404));

    SendResponse(res, {
      message: "Leads fetched successfully",
      data: leads,
      status_code: 200,
    });
  } catch (error: unknown) {
    console.error("Error while searching lead", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error!";

    return next(new AppError(message, 500));
  }
};
