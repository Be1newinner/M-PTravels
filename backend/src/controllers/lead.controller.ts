import { Request, Response } from "express";
import Lead from "../models/lead.model.ts";

export const createLead = async (
  req: Request,
  res: Response
): Promise<void> => {
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
    const lead = await Lead.create({
      name,
      email,
      phone,
      pickupAddress,
      dropAddress,
      pickupDate,
      dropDate,
    });

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Lead created successfully",
      data: lead,
    });
  } catch (error: unknown) {
    console.error("Error while creating lead", error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error?.message || "Internal Server Error",
      error,
    });
  }
};

export const getAllLeads = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const { filters = {}, projection } = req.body || {};

    const filterConditions: unknown[] = [];

    if (filters) {
      if (filters.name) {
        filterConditions.push({
          name: { $regex: filters.name, $options: "i" },
        });
      }
      if (filters.email) {
        filterConditions.push({
          email: { $regex: filters.email, $options: "i" },
        });
      }
      if (filters.phone) {
        filterConditions.push({
          phone: { $regex: filters.phone, $options: "i" },
        });
      }
      if (filters.pickupAddress) {
        filterConditions.push({
          pickupAddress: { $regex: filters.pickupAddress, $options: "i" },
        });
      }
      if (filters.dropAddress) {
        filterConditions.push({
          dropAddress: { $regex: filters.dropAddress, $options: "i" },
        });
      }
      if (filters.pickupDate) {
        filterConditions.push({
          pickupDate: { $regex: filters.pickupDate, $options: "i" },
        });
      }
      if (filters.dropDate) {
        filterConditions.push({
          dropDate: { $regex: filters.dropDate, $options: "i" },
        });
      }
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

    if (leads.length === 0) {
      res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Leads not found",
      });
      return;
    }

    const totalCount = await Lead.countDocuments(filterObjects);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Leads fetched successfully",
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
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error?.message || "Internal Server Error",
      error,
    });
  }
};

export const getLead = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const existingLead = await Lead.findById(id);

    if (!existingLead) {
      res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Lead not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Lead fetched successfully",
      data: existingLead,
    });
  } catch (error: unknown) {
    console.error("Error while getting lead", error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error?.message || "Internal Server Error",
      error,
    });
  }
};

export const updateLead = async (
  req: Request,
  res: Response
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

    if (!existingLead) {
      res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Lead not found",
      });
      return;
    }

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

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Lead updated successfully",
      data: updatedLead,
    });
  } catch (error: unknown) {
    console.error("Error while updating lead", error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error?.message || "Internal Server Error",
      error,
    });
  }
};

export const deleteLead = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const existingLead = await Lead.findById(id);

    if (!existingLead) {
      res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Lead not found",
      });
      return;
    }

    await existingLead.deleteOne();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Lead deleted successfully",
    });
  } catch (error: unknown) {
    console.error("Error while deleting lead", error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error?.message || "Internal Server Error",
      error,
    });
  }
};

export const searchLead = async (
  req: Request,
  res: Response
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

    if (leads.length === 0) {
      res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Leads not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Leads fetched successfully",
      data: leads,
    });
  } catch (error: unknown) {
    console.error("Error while searching lead", error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error?.message || "Internal Server Error",
      error,
    });
  }
};
