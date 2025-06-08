import { Schema, model } from "mongoose";

export interface ILead {
  _id?: Schema.Types.ObjectId;
  name: string;
  email?: string;
  phone: string;
  pickupAddress: string;
  dropAddress: string;
  pickupDate: Date;
  dropDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
  message?: string;
  source?: string;
}

const leadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v: string) =>
          v ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) : true,
        message: (props) => `${props.value} is not a valid email!`,
      },
      required: false,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    pickupAddress: {
      type: String,
      required: [true, "Pickup address is required"],
      trim: true,
    },
    dropAddress: {
      type: String,
      required: [true, "Drop address is required"],
      trim: true,
    },
    pickupDate: {
      type: Date,
      required: [true, "Pickup date is required"],
    },
    dropDate: {
      type: Date,
      required: [true, "Drop date is required"],
    },
    message: String,
    source: String,
  },
  { timestamps: true, versionKey: false }
);

const Lead = model<ILead>("Lead", leadSchema);
export default Lead;
