import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectToDB from "./config/db";
import { setupSwagger } from "./config/swagger";
import { ENV_CONFIGS } from "./config/envs.config";
import { errorHandler } from "./middlewares/error.middleware";

// Import Routes
import userRoutes from "./routes/user.routes";
import blogRoutes from "./routes/blog.routes";
import leadRoutes from "./routes/lead.routes";
import cabRoutes from "./routes/cab.routes";
import packageRoutes from "./routes/package.routes";
import helmet from "helmet";

const app = express();
const PORT = ENV_CONFIGS.PORT || 5000;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
      "https://firefly-top-jackal.ngrok-free.app",
      "https://mptravels.vercel.app",
      "https://mnp-admin.vercel.app",
      /^https:\/\/.*\.lite\.vusercontent\.net$/,
      "https://zp1v56uxy8rdx5ypatb0ockcb9tr6a-oci3--3000--55edb8f4.local-credentialless.webcontainer-api.io",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// app.use((req, res, next)=>{
//   console.log("URL => ", req.url);
//   next()
// })

// Setup Swagger (Move it before routes)
setupSwagger(app);

// Define Routes
app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);
app.use("/leads", leadRoutes);
app.use("/cabs", cabRoutes);
app.use("/packages", packageRoutes);

// Root Route
app.get("/", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Shipsar Developers's MP TRavels APIs",
    meta: {
      organisation: "M and P Travels",
    },
  });
});

// Global Error Handling Middleware
app.use(errorHandler);

// Database Connection & Server Start
connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️  Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error: unknown) => {
    console.error("❌ Error connecting to database", error);
    process.exit(1);
  });

// Graceful Shutdown for Database Connection
process.on("SIGINT", async () => {
  console.log("⚠️  Shutting down gracefully...");
  process.exit(0);
});
