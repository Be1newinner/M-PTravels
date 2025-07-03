import { Schema, Types, model } from "mongoose";

export interface IPackage {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  price?: number;
  price_unit?: string;
  image: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const packageSchema = new Schema<IPackage>(
  {
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
    slug: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      trim: false,
    },
    price_unit: {
      type: String,
      trim: false,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Package = model<IPackage>("Package", packageSchema);
export default Package;
