import { Schema, model } from 'mongoose';

export interface ICab {
    _id?: Schema.Types.ObjectId;
    imageUrls: string[];
    defaultImageIndex: number;
    title: string;
    description: string;
    model: string;
    capacity: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const cabSchema = new Schema<ICab>({
    imageUrls: [{
        type: String
    }],
    defaultImageIndex: {
        type: Number,
        default: 0
    },
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
    model: {
        type: String,
        required: [true, "Model is required"],
        trim: true,
    },
    capacity: {
        type: Number,
        required: [true, "Capacity is required"],
        trim: true,
    },
}, { timestamps: true, versionKey: false });

const Cab = model<ICab>('Cab', cabSchema);
export default Cab;
