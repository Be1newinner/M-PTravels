import mongoose from "mongoose";
import { ENV_CONFIGS } from "./envs.config.ts";

const connectToDB = async (): Promise<void> => {
  try {
    const connectionInstance = await mongoose.connect(
      `${ENV_CONFIGS.MONGODB_URI}`,
      {
        maxPoolSize: 10, // Use a connection pool to avoid full reconnects
        serverSelectionTimeoutMS: 5000, // Reduce connection timeout
      }
    );
    console.log(
      `\n✅ MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("❌ MongoDB Connection Failed", error);
    process.exit(1);
  }
};

export default connectToDB;
