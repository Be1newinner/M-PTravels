import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectToDB from "./config/db.ts";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Database Connection
connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️  Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database", error);
    process.exit(1);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());

// Routes Import
import userRoutes from "./routes/user.routes.ts";
import blogRoutes from "./routes/blog.routes.ts";
import leadRoutes from "./routes/lead.routes.ts";
import cabRoutes from "./routes/cab.routes.ts";
import packageRoutes from "./routes/package.routes.ts";
import { errorHandler } from "./middlewares/error.middleware.ts";

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/lead", leadRoutes);
app.use("/api/v1/cab", cabRoutes);
app.use("/api/v1/package", packageRoutes);

app.get("/", (_, res) => {
  res.send({
    success: true,
    status: 200,
    message: "Welcome to Cab Booking API",
  });
});

// Global Error Handling Middleware
app.use(errorHandler);

// Graceful Shutdown
process.on("SIGINT", () => {
  console.log("Shutting down gracefully...");
  process.exit(0);
});
