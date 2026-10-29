import express from "express";
import { addActivity, getPropertyViewsCount, getRecentActivities } from "../controler/activityController.js";
import verifyToken from "../middelware/verifyToken.js";

const activitiesRouter = express.Router();

// Add activity: property viewed or wishlisted
activitiesRouter.post("/", verifyToken, addActivity);

// Get logged-in user's recent activities
activitiesRouter.get("/recent", verifyToken, getRecentActivities);

// Get total views on seller's properties
activitiesRouter.get("/views-count", verifyToken, getPropertyViewsCount);

export default activitiesRouter;