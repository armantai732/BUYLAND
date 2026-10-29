
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { DBCONNECT } from "./config/DB.js";
import authRoute from "./router/authRouter.js";
import activitiesRouter from "./router/activityRoutes.js";
import propertyRoutes from "./router/propertyRoutes.js";
import dashboardRouter from "./router/dashboardRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://buyland-dusky.vercel.app",
  ],
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "BuyLand backend is running",
  });
});

app.use("/api/auth", authRoute);
app.use("/api/activities", activitiesRouter);
app.use("/api/property", propertyRoutes);
app.use("/api/dashboard", dashboardRouter);

// Return JSON instead of an HTML 404 page for unknown API routes
app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
    path: req.originalUrl,
  });
});

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
