
import express from "express";

import {
  approveProperty,
  createProperty,
  getAllProperties,
  getApprovedProperties,
  getMyProperties,
  getMyPropertyProfile,
  getProcessingProperties,
  getPropertyById,
  rejectProperty,
  updateApprovedProperty,
} from "../controler/propertyController.js";

import verifyToken from "../middelware/verifyToken.js";
import isAdmin from "../middelware/isAdmin.js";
import upload from "../middelware/upload.js";

const propertyRoutes = express.Router();

// Public: Approved properties
propertyRoutes.get("/approved", getApprovedProperties);

// User: Submit property
propertyRoutes.post(
  "/",
  verifyToken,
  createProperty
);

// User: Own properties
propertyRoutes.get(
  "/my-properties",
  verifyToken,
  getMyProperties
);

// Admin: Processing properties
propertyRoutes.get(
  "/admin/processing",
  verifyToken,
  isAdmin,
  getProcessingProperties
);

// Admin: Approve property
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


propertyRoutes.get("/admin/all", verifyToken, isAdmin, getAllProperties);

propertyRoutes.patch(
  "/admin/:id/sold-out",
  verifyToken,
  isAdmin,
  updateApprovedProperty
);


propertyRoutes.get("/my-property-profile", verifyToken, getMyPropertyProfile);
propertyRoutes.get("/:id", getPropertyById);


export default propertyRoutes;
