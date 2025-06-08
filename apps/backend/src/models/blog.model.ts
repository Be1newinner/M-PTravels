import { Schema, model } from "mongoose";

export interface IBlog {
  title: string;
  blog: string;
  image: string;
  slug: string;
  desc: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    blog: {
      type: String,
      required: [true, "Blog Data is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      trim: true,
    },
    desc: {
      type: String,
      required: [true, "Short Description is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Blog = model<IBlog>("Blog", blogSchema);
export default Blog;
