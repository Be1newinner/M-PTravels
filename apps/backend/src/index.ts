import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectToDB from "./config/db";
import { setupSwagger } from "./config/swagger";
import { ENV_CONFIGS } from "./config/envs.config";
import { errorHandler } from "./middlewares/error.middleware";
// import fs from "fs";
// import path from "path";
// import https from "https";
import helmet from "helmet";
// import { fileURLToPath } from "node:url";

// Import Routes
import userRoutes from "./routes/user.routes";
import blogRoutes from "./routes/blog.routes";
import leadRoutes from "./routes/lead.routes";
import cabRoutes from "./routes/cab.routes";
import packageRoutes from "./routes/package.routes";
import { imagesRouter } from "./routes/images.routes";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const privateKey = fs.readFileSync(
//   path.join(__dirname, "../", "localhost-key.pem"),
//   "utf8"
// );
// const certificate = fs.readFileSync(
//   path.join(__dirname, "../", "localhost.pem"),
//   "utf8"
// );
// const credentials = { key: privateKey, cert: certificate };

const app = express();
const PORT = ENV_CONFIGS.PORT || 5000;

const WHITELIST_DOMAINS = process.env.CORS_WHITELIST?.split(",");

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: WHITELIST_DOMAINS,
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
app.use("/images", imagesRouter);

// Root Route
app.get("/", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Shipsar Developers's MP TRavels APIs",
    meta: {
      organization: "M and P Travels",
    },
  });
});

// Global Error Handling Middleware
app.use(errorHandler);

// Database Connection & Server Start
connectToDB()
  .then(() => {
    // const httpsServer = https.createServer(credentials, app);

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
