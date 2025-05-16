import { Schema, Types, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV_CONFIGS } from "../config/envs.config";
import { StringValue } from "../types";

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  refreshToken: string;
  resetPasswordToken: string;
  resetPasswordTokenExpiry: Date;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      select: false,
    },
    refreshToken: String,
    resetPasswordToken: String,
    resetPasswordTokenExpiry: Date,
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    ENV_CONFIGS.ACCESS_TOKEN_SECRET as string,
    { expiresIn: (ENV_CONFIGS.ACCESS_TOKEN_EXPIRY as StringValue) || "1d" }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      username: this.username,
    },
    ENV_CONFIGS.REFRESH_TOKEN_SECRET as string,
    { expiresIn: (ENV_CONFIGS.REFRESH_TOKEN_EXPIRY as StringValue) || "20d" }
  );
};

const User = model<IUser>("User", userSchema);
export default User;
