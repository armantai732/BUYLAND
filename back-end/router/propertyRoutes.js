import express from "express";
import { approveProperty, createProperty, getApprovedProperties, getMyProperties, getProcessingProperties, rejectProperty } from "../controler/propertyController.js";
import verifyToken from "../middelware/verifyToken.js";
import isAdmin from "../middelware/isAdmin.js";

const propertyRoutes = express.Router();

// Public: Only admin-approved properties
propertyRoutes.get("/approved", getApprovedProperties);

// User: Submit a property (default status: Processing)
propertyRoutes.post("/", verifyToken, createProperty);

// User: View own submitted properties and their status
propertyRoutes.get("/my-properties", verifyToken, getMyProperties);

// Admin: View properties awaiting approval
propertyRoutes.get(
    "/admin/processing",
    verifyToken,
    isAdmin,
    getProcessingProperties
);

// Admin: Approve property and optionally change listing price
propertyRoutes.patch(
    "/admin/:id/approve",
    verifyToken,
    isAdmin,
    approveProperty
);

// Admin: Reject property
propertyRoutes.patch(
    "/admin/:id/reject",
    verifyToken,
    isAdmin,
    rejectProperty
);

export default propertyRoutes;