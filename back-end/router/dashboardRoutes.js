
import express from "express";
import verifyToken from "../middelware/verifyToken.js";
import {
  getDashboardStats,
  getRecentActivities,
} from "../controler/dashboardController.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/stats", verifyToken, getDashboardStats);
dashboardRouter.get("/activities", verifyToken, getRecentActivities);

export default dashboardRouter;
