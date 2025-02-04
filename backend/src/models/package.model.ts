import { Schema, model } from "mongoose";

export interface IPackage {
    _id?: Schema.Types.ObjectId;
    title: string;
    description: string;
    price: number;
    price_unit: string;
    image_url: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const packageSchema = new Schema<IPackage>({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        trim: true,
    },
    price_unit: {
        type: String,
        required: [true, "Price unit is required"],
        trim: true,
    },
    image_url: {
        type: String,
        required: [true, "Image is required"],
        trim: true,
    },
}, { timestamps: true, versionKey: false });

const Package = model<IPackage>("Package", packageSchema);
export default Package;
