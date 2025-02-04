import { Schema, model } from "mongoose";

export interface ILead {
    _id?: Schema.Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    pickupAddress: string;
    dropAddress: string;
    pickupDate: Date;
    dropDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

const leadSchema = new Schema<ILead>({
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
            validator: function (v: string) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email!`,
        },
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
}, { timestamps: true, versionKey: false });

const Lead = model<ILead>("Lead", leadSchema);
export default Lead;