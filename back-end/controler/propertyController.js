
import mongoose from "mongoose";
import Property from "../model/propertyModel.js";

const getUserId = (req) =>
  req.user?._id || req.user?.id || req.user?.userId;

// Parse Indian price format
const parsePrice = (value) => {
  if (typeof value === "string") {
    return Number(value.replace(/,/g, "").trim());
  }
  return Number(value);
};

// Get Cloudinary URLs
const getFileUrls = (files = []) =>
  files
    .map((file) => file.path || file.secure_url)
    .filter((url) => typeof url === "string" && url.trim() !== "");

// 1. USER: CREATE PROPERTY
// POST /api/property
export const createProperty = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first.",
      });
    }

    const {
      title,
      propertyType,
      ownershipType,
      sellerType,
      sellerName,
      sellerPhone,
      sellerWhatsapp,

      price,
      isNegotiable,
      area,
      areaUnit,
      frontageFeet,
      depthFeet,
      facing,
      cornerPlot,
      roadWidth,

      naStatus,
      titleClear,
      zoneType,

      address,
      tpNumber,
      city,
      state,
      pincode,
      googleMapsLink,

      description,
      amenities,
    } = req.body;

    const parsedPrice = parsePrice(price);
    const parsedArea = Number(area);

    if (
      !Number.isFinite(parsedPrice) ||
      parsedPrice < 0 ||
      !Number.isFinite(parsedArea) ||
      parsedArea <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid price and area.",
      });
    }

    // Parse amenities
    let parsedAmenities = [];

    try {
      parsedAmenities = amenities ? JSON.parse(amenities) : [];

      if (!Array.isArray(parsedAmenities)) {
        throw new Error("Amenities must be an array.");
      }
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid amenities data.",
      });
    }

    // Uploaded property images
    const files = req.files || {};
    const uploadedImages = getFileUrls(files.images);

    if (uploadedImages.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one property image.",
      });
    }

    if (uploadedImages.length !== (files.images || []).length) {
      return res.status(400).json({
        success: false,
        message: "Some property images failed to upload.",
      });
    }

    const property = await Property.create({
      seller: userId,

      title,
      propertyType,
      ownershipType,
      sellerType,
      sellerName,
      sellerPhone,
      sellerWhatsapp,

      price: parsedPrice,
      isNegotiable,
      area: parsedArea,
      areaUnit,
      frontageFeet: frontageFeet ? Number(frontageFeet) : 0,
      depthFeet: depthFeet ? Number(depthFeet) : 0,
      facing,
      cornerPlot,
      roadWidth,

      naStatus,
      titleClear,
      zoneType,

      address,
      tpNumber,
      city,
      state,
      pincode,
      googleMapsLink,

      description,
      amenities: parsedAmenities,
      images: uploadedImages,

      status: "Processing",
    });

    return res.status(201).json({
      success: true,
      message: "Property submitted successfully. Waiting for admin approval.",
      property,
    });

  } catch (error) {
    console.error("Create Property Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
};

// 2. ADMIN: GET PROCESSING PROPERTIES
// GET /api/property/admin/processing
export const getProcessingProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      status: "Processing",
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });

  } catch (error) {
    console.error("Get Processing Properties Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 3. ADMIN: APPROVE PROPERTY
// PATCH /api/property/admin/:id/approve
export const approveProperty = async (req, res) => {
  try {
    const adminId = getUserId(req);
    const { id } = req.params;
    const { price, adminRemark } = req.body;

    const updates = {
      status: "Approved",
      adminRemark: adminRemark || "",
      reviewedBy: adminId,
      reviewedAt: new Date(),
    };

    if (price !== undefined) {
      const newPrice = parsePrice(price);

      if (!Number.isFinite(newPrice) || newPrice <= 0) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid price greater than zero.",
        });
      }

      updates.price = newPrice;
    }

    const property = await Property.findOneAndUpdate(
      { _id: id, status: "Processing" },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Processing property not found or already reviewed.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Property approved successfully.",
      property,
    });

  } catch (error) {
    console.error("Approve Property Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to approve property.",
    });
  }
};

// 4. ADMIN: REJECT PROPERTY
// PATCH /api/property/admin/:id/reject
export const rejectProperty = async (req, res) => {
  try {
    const adminId = getUserId(req);
    const { id } = req.params;

    const property = await Property.findOneAndUpdate(
      { _id: id, status: "Processing" },
      {
        $set: {
          status: "Rejected",
          adminRemark: req.body?.adminRemark || "",
          reviewedBy: adminId,
          reviewedAt: new Date(),
        },
      },
      { new: true, runValidators: true }
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Processing property not found or already reviewed.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Property rejected successfully.",
      property,
    });

  } catch (error) {
    console.error("Reject Property Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to reject property.",
    });
  }
};

// 5. PUBLIC: GET APPROVED PROPERTIES
// GET /api/property/approved
export const getApprovedProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      status: { $ne: "Processing" },
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });

  } catch (error) {
    console.error("Get Approved Properties Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch properties.",
    });
  }
};

// 6. USER: GET OWN PROPERTIES
// GET /api/property/my-properties
export const getMyProperties = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first.",
      });
    }

    const properties = await Property.find({
      seller: userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });

  } catch (error) {
    console.error("Get My Properties Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch your properties.",
    });
  }
};

// 7. ADMIN: GET ALL PROPERTIES
// GET /api/property/admin/all
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({})
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });

  } catch (error) {
    console.error("Get All Properties Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch all properties.",
    });
  }
};

// 8. ADMIN: UPDATE PRICE AND MARK SOLD OUT
// PATCH /api/property/admin/:id/sold-out
export const updateApprovedProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;

    const newPrice = parsePrice(price);

    if (!Number.isFinite(newPrice) || newPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid price greater than zero.",
      });
    }

    const property = await Property.findOneAndUpdate(
      { _id: id, status: "Approved" },
      {
        $set: {
          price: newPrice,
          status: "Sold Out",
        },
      },
      { new: true, runValidators: true }
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Approved property not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Price updated and property marked as Sold Out.",
      property,
    });

  } catch (error) {
    console.error("Update Approved Property Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update property.",
    });
  }
};


export const getMyPropertyProfile = async (req, res) => {
  try {
    const properties = await Property.find({
      seller: req.user.id,
    })
      .select("sellerType city state sellerWhatsapp")
      .sort({ createdAt: -1 });

    if (!properties.length) {
      return res.status(200).json({
        success: true,
        message: "No properties found",
        data: {
          sellerType: "",
          city: "",
          state: "",
          whatsappNumber: "",
        },
      });
    }

    // Latest property ki details
    const latestProperty = properties[0];

    return res.status(200).json({
      success: true,
      data: {
        sellerType: latestProperty.sellerType,
        city: latestProperty.city,
        state: latestProperty.state,
        whatsappNumber: latestProperty.sellerWhatsapp,
      },
    });

  } catch (error) {
    console.error("Get My Property Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch property profile",
    });
  }
};



export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
    }

    const property = await Property.findOne({
      _id: id,
      status: { $ne: "Processing" },
    })
      .select("-aadhaarNo -panNo -aadhaarPhoto -panPhoto -propertyLegalDocs")
      .populate("seller", "name email mobileNumber");

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found or not approved",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Property details fetched successfully",
      property,
    });

  } catch (error) {
    console.error("Get Property By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch property details",
    });
  }
};




// UPDATE MY PROPERTY
export const updateMyProperty = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate property ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
    }

    // Logged-in user ID from verifyToken middleware
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login again.",
      });
    }

    // Find property belonging to logged-in user
    const property = await Property.findOne({
      _id: id,
      seller: userId,
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found or you are not authorized to edit it.",
      });
    }

    // Only Processing properties can be edited
    if (property.status !== "Processing") {
      return res.status(403).json({
        success: false,
        message: `You cannot edit a ${property.status} property.`,
      });
    }

    const {
      title,
      propertyType,
      ownershipType,
      sellerType,
      sellerName,
      sellerPhone,
      sellerWhatsapp,

      price,
      isNegotiable,
      area,
      areaUnit,
      frontageFeet,
      depthFeet,
      facing,
      cornerPlot,
      roadWidth,

      naStatus,
      titleClear,
      zoneType,

      address,
      tpNumber,
      city,
      state,
      pincode,
      googleMapsLink,

      description,
      amenities,
      images,
    } = req.body;

    // Only allow these fields to be updated
    const allowedFields = [
      "title",
      "propertyType",
      "ownershipType",
      "sellerType",
      "sellerName",
      "sellerPhone",
      "sellerWhatsapp",
      "price",
      "isNegotiable",
      "area",
      "areaUnit",
      "frontageFeet",
      "depthFeet",
      "facing",
      "cornerPlot",
      "roadWidth",
      "naStatus",
      "titleClear",
      "zoneType",
      "address",
      "tpNumber",
      "city",
      "state",
      "pincode",
      "googleMapsLink",
      "description",
    ];

    // Update normal fields
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        property[field] = req.body[field];
      }
    });

    // Convert numeric fields
    const numericFields = [
      "price",
      "area",
      "frontageFeet",
      "depthFeet",
    ];

    for (const field of numericFields) {
      if (req.body[field] !== undefined) {
        const value = req.body[field];

        if (value === "" || value === null) {
          return res.status(400).json({
            success: false,
            message: `${field} cannot be empty`,
          });
        }

        const numberValue = Number(value);

        if (!Number.isFinite(numberValue)) {
          return res.status(400).json({
            success: false,
            message: `Invalid ${field}`,
          });
        }

        property[field] = numberValue;
      }
    }

    // Update amenities
    if (amenities !== undefined) {
      let parsedAmenities = amenities;

      if (typeof parsedAmenities === "string") {
        try {
          parsedAmenities = JSON.parse(parsedAmenities);
        } catch {
          parsedAmenities = parsedAmenities
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
        }
      }

      if (!Array.isArray(parsedAmenities)) {
        return res.status(400).json({
          success: false,
          message: "Amenities must be an array",
        });
      }

      property.amenities = parsedAmenities;
    }

    // Update images only when new images are provided
    if (images !== undefined) {
      let parsedImages = images;

      if (typeof parsedImages === "string") {
        try {
          parsedImages = JSON.parse(parsedImages);
        } catch {
          parsedImages = [parsedImages];
        }
      }

      if (!Array.isArray(parsedImages)) {
        return res.status(400).json({
          success: false,
          message: "Images must be an array",
        });
      }

      property.images = parsedImages;
    }

    // Save and validate schema
    await property.save();

    const updatedProperty = await Property.findById(property._id)
      .populate("seller", "name email mobileNumber role");

    return res.status(200).json({
      success: true,
      message: "Property updated successfully",
      property: updatedProperty,
    });

  } catch (error) {
    console.error("Update Property Error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update property",
      error: error.message,
    });
  }
};
