
import Property from "../model/propertyModel.js";

// Get logged-in user ID
const getUserId = (req) =>
  req.user?._id || req.user?.id || req.user?.userId;

// Parse Indian price format: 45,00,000
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

      // KYC
      aadhaarNo,
      panNo,

      // Pricing
      price,
      isNegotiable,
      area,
      areaUnit,
      frontageFeet,
      depthFeet,
      facing,
      cornerPlot,
      roadWidth,

      // Legal
      naStatus,
      titleClear,
      zoneType,

      // Location
      address,
      tpNumber,
      city,
      state,
      pincode,
      googleMapsLink,

      // Other
      description,
      amenities,
    } = req.body;

    // Validate price and area
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

    // Validate KYC numbers
    const cleanAadhaar = String(aadhaarNo || "").replace(/\s/g, "");
    const cleanPan = String(panNo || "").trim().toUpperCase();

    if (!/^\d{12}$/.test(cleanAadhaar)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 12-digit Aadhaar number.",
      });
    }

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(cleanPan)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid PAN number.",
      });
    }

    // Parse amenities
    let parsedAmenities = [];

    try {
      parsedAmenities = amenities
        ? JSON.parse(amenities)
        : [];

      if (!Array.isArray(parsedAmenities)) {
        throw new Error("Amenities must be an array.");
      }
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid amenities data.",
      });
    }

    // Uploaded files
    const files = req.files || {};

    const uploadedImages = getFileUrls(files.images);
    const uploadedAadhaar = getFileUrls(files.aadhaarPhoto);
    const uploadedPan = getFileUrls(files.panPhoto);
    const uploadedLegalDocs = getFileUrls(files.propertyLegalDocs);

    // Required file validation
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

    if (uploadedAadhaar.length !== 1 || uploadedPan.length !== 1) {
      return res.status(400).json({
        success: false,
        message: "Aadhaar and PAN card photos are required.",
      });
    }

    if (
      uploadedAadhaar.length !== (files.aadhaarPhoto || []).length ||
      uploadedPan.length !== (files.panPhoto || []).length ||
      uploadedLegalDocs.length !== (files.propertyLegalDocs || []).length
    ) {
      return res.status(400).json({
        success: false,
        message: "Some verification or legal documents failed to upload.",
      });
    }

    // Create property
    const property = await Property.create({
      seller: userId,

      // Basic Details
      title,
      propertyType,
      ownershipType,
      sellerType,
      sellerName,
      sellerPhone,
      sellerWhatsapp,

      // KYC
      aadhaarNo: cleanAadhaar,
      panNo: cleanPan,
      aadhaarPhoto: uploadedAadhaar[0],
      panPhoto: uploadedPan[0],

      // Pricing & Dimensions
      price: parsedPrice,
      isNegotiable,
      area: parsedArea,
      areaUnit,
      frontageFeet: frontageFeet ? Number(frontageFeet) : 0,
      depthFeet: depthFeet ? Number(depthFeet) : 0,
      facing,
      cornerPlot,
      roadWidth,

      // Legal
      naStatus,
      titleClear,
      zoneType,

      // Location
      address,
      tpNumber,
      city,
      state,
      pincode,
      googleMapsLink,

      // Description
      description,

      // Amenities and Documents
      amenities: parsedAmenities,
      images: uploadedImages,
      propertyLegalDocs: uploadedLegalDocs,

      // Approval
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
    })
      .select("+aadhaarNo +panNo +aadhaarPhoto +panPhoto +propertyLegalDocs")
      .sort({ createdAt: -1 });

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
      { _id: req.params.id, status: "Processing" },
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
      status: "Approved",
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
