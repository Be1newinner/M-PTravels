import { Schema, model } from "mongoose";

export interface IBlog {
    _id?: Schema.Types.ObjectId
    title: string
    description: string
    image: string
    createdAt?: Date
    updatedAt?: Date
}

const blogSchema = new Schema<IBlog>({
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
    image: {
        type: String,
        required: [true, "Image is required"],
        trim: true,
    },
}, { timestamps: true, versionKey: false });

const Blog = model<IBlog>("Blog", blogSchema);
export default Blog;