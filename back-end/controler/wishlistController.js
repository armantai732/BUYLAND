
// ================= ADD TO WISHLIST =================

import mongoose from "mongoose";
import Property from "../model/propertyModel.js";
import Wishlist from "../model/wishlistModel.js";

export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { propertyId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
    }

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: userId,
        properties: [propertyId],
      });
    } else {
      const alreadyExists = wishlist.properties.some(
        (id) => id.toString() === propertyId
      );

      if (alreadyExists) {
        return res.status(400).json({
          success: false,
          message: "Property already in wishlist",
        });
      }

      wishlist.properties.push(propertyId);
      await wishlist.save();
    }

    wishlist = await Wishlist.findById(wishlist._id)
      .populate("properties");

    return res.status(200).json({
      success: true,
      message: "Property added to wishlist successfully",
      wishlist,
    });

  } catch (error) {
    console.error("Add Wishlist Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= GET MY WISHLIST =================

export const getMyWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const wishlist = await Wishlist.findOne({ user: userId })
      .populate("properties");

    return res.status(200).json({
      success: true,
      count: wishlist?.properties?.length || 0,
      properties: wishlist?.properties || [],
    });

  } catch (error) {
    console.error("Get Wishlist Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= REMOVE FROM WISHLIST =================

export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
    }

    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    wishlist.properties = wishlist.properties.filter(
      (id) => id.toString() !== propertyId
    );

    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Property removed from wishlist",
      properties: wishlist.properties,
    });

  } catch (error) {
    console.error("Remove Wishlist Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= CLEAR WISHLIST =================

export const clearWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    wishlist.properties = [];
    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Wishlist cleared successfully",
    });

  } catch (error) {
    console.error("Clear Wishlist Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
