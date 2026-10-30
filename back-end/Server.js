import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { DBCONNECT } from "./config/DB.js";
import authRoute from "./router/authRouter.js";
import activitiesRouter from "./router/activityRoutes.js";
import propertyRoutes from "./router/propertyRoutes.js";
import dashboardRouter from "./router/dashboardRoutes.js";
import multer from "multer";

dotenv.config();

const app = express();

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://buyland-alpha.vercel.app",
    ],
    credentials: true,
  })
);

// JSON requests only (multipart/form-data is handled by Multer)
app.use(express.json({
  limit: "10mb",
  type: ["application/json", "application/*+json"],
}));

// URL-encoded requests
app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);


// API routes
app.use("/api/auth", authRoute);
app.use("/api/activities", activitiesRouter);
app.use("/api/property", propertyRoutes);
app.use("/api/dashboard", dashboardRouter);


const PORT = process.env.PORT || 8080;

try {
  await DBCONNECT();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.error("Database connection failed:", error);
  process.exit(1);
}