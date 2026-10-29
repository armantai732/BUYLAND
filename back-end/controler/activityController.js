import mongoose from "mongoose";
import Property from "../model/propertyModel.js";
import Activity from "../model/activityModel.js";


// Save user activity
export const addActivity = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    const { propertyId, type } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    if (
      !mongoose.isValidObjectId(propertyId) ||
      !["viewed", "wishlisted"].includes(type)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID or activity type",
      });
    }

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const activity = await Activity.create({
      user: userId,
      property: propertyId,
      type,
    });

    return res.status(201).json({
      success: true,
      message: "Activity saved successfully",
      activity,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get recent activity for logged-in user
export const getRecentActivities = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const activities = await Activity.find({ user: userId })
      .populate("property")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    return res.status(200).json({
      success: true,
      count: activities.length,
      activities: activities.filter((item) => item.property),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get actual property views count for logged-in user's own listings
export const getPropertyViewsCount = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    // Count views only for properties owned by this user
    const properties = await Property.find({ seller: userId })
      .select("_id")
      .lean();

    const propertyIds = properties.map((property) => property._id);

    const totalViews = await Activity.countDocuments({
      property: { $in: propertyIds },
      type: "viewed",
    });

    return res.status(200).json({
      success: true,
      totalViews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
