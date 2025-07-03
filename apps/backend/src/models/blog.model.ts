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
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    desc: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Blog = model<IBlog>("Blog", blogSchema);
export default Blog;
