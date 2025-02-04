import { Request, Response } from "express";
import Package from "../models/package.model.ts";
import { bucket } from "../config/firebaseInit.ts";
import fs from "fs/promises";

export const createPackage = async (req: Request, res: Response): Promise<void> => {
    const { title, description, price, price_unit } = req.body;

    try {
        if (!title || !description || !price || !price_unit) {
            res.status(400).json({
                success: false,
                statusCode: 400,
                message: "All fields are required"
            });
            return;
        }

        let image_url = "";

        if (req.file) {
            await bucket.upload(req.file.path, {
                destination: `cab-booking/packages/${req.file.filename}`
            })

            image_url = `https://firebasestorage.googleapis.com/v0/b/wingfi-9b5b7.appspot.com/o/${encodeURIComponent(`cab-booking/packages/${req.file.filename}`)}?alt=media`

            await fs.rm(req.file.path);
        }

        const createdPackage = await Package.create({
            title,
            description,
            price,
            price_unit,
            image_url
        });

        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Package created successfully",
            data: createdPackage
        })
    } catch (error: unknown) {
        console.error("Error while creating package", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error?.message || "Internal Server Error",
            error
        })
    }
}

export const getPackages = async (req: Request, res: Response): Promise<void> => {
    try {
        const existingPackages = await Package.find({});

        if (existingPackages.length === 0) {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: "No packages found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Packages fetched successfully",
            data: existingPackages
        })
    } catch (error: unknown) {
        console.error("Error while getting packages", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error?.message || "Internal Server Error",
            error
        })
    }
}

export const getPackage = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const existingPackage = await Package.findById(id);

        if (!existingPackage) {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Package not found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Package fetched successfully",
            data: existingPackage
        })
    } catch (error: unknown) {
        console.error("Error while getting package", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error?.message || "Internal Server Error",
            error
        })
    }
}

export const updatePackage = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, description, price, price_unit } = req.body;

    console.log("req.body", req.body);

    try {
        const existingPackage = await Package.findById(id);

        if (!existingPackage) {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Package not found"
            });
            return;
        }


        if (req.file) {
            if (existingPackage.image_url) {
                const fileName = existingPackage?.image_url?.split('/').pop()?.split('?')[0].replace(/%2F/g, '/') ?? '';

                await bucket.file(fileName).delete();
            }

            await bucket.upload(req.file.path, {
                destination: `cab-booking/packages/${req.file.filename}`
            })

            existingPackage.image_url = `https://firebasestorage.googleapis.com/v0/b/wingfi-9b5b7.appspot.com/o/${encodeURIComponent(`cab-booking/packages/${req.file.filename}`)}?alt=media`

            await fs.rm(req.file.path);
        }

        if (title) existingPackage.title = title;
        if (description) existingPackage.description = description;
        if (price) existingPackage.price = price;
        if (price_unit) existingPackage.price_unit = price_unit;

        await existingPackage.save();

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Package updated successfully",
            data: existingPackage
        })
    } catch (error: unknown) {
        console.error("Error while updating package", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error?.message || "Internal Server Error",
            error
        })
    }
}

export const deletePackage = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const existingPackage = await Package.findById(id);

        if (!existingPackage) {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Package not found"
            });
            return;
        }

        if (existingPackage.image_url && existingPackage.image_url !== "") {
            let fileName = existingPackage?.image_url?.split('/').pop()?.split('?')[0].replace(/%2F/g, '/') ?? '';

            await bucket.file(fileName).delete();
        }

        await existingPackage.deleteOne();

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Package deleted successfully"
        })
    } catch (error: unknown) {
        console.error("Error while deleting package", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error?.message || "Internal Server Error",
            error
        })
    }
} 