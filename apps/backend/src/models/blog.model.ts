import { Schema, model } from "mongoose";

export interface IBlog {
  title: string;
  image: string;
  slug: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Blog Data is required!"],
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      required: [true, "Slug is required!"],
    },
  },
  { timestamps: true }
);

const Blog = model<IBlog>("Blog", blogSchema);
export default Blog;
