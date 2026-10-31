
import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    // Seller
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
      index: true,
    },

    // Basic Details
    title: {
      type: String,
      required: true,
      trim: true,
    },
    propertyType: {
      type: String,
      required: true,
      enum: [
        "Residential Plot",
        "Agricultural Land",
        "Commercial Land",
        "Industrial Land",
        "Recreational Land",
        "Investment Land",
      ],
    },
    ownershipType: {
      type: String,
      required: true,
      default: "Single Owner",
    },
    sellerType: {
      type: String,
      enum: ["Owner", "Agent / Broker", "Builder / Developer"],
      default: "Owner",
      required: true,
    },
    sellerName: {
      type: String,
      required: true,
      trim: true,
    },
    sellerPhone: {
      type: String,
      required: true,
      trim: true,
    },
    sellerWhatsapp: {
      type: String,
      required: true,
      trim: true,
    },

    // KYC Details
    aadhaarNo: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },
    panNo: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      select: false,
    },
    aadhaarPhoto: {
      type: String,
      required: true,
      select: false,
    },
    panPhoto: {
      type: String,
      required: true,
      select: false,
    },

    // Pricing & Area
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    isNegotiable: {
      type: String,
      enum: ["Yes", "Fixed Price"],
      default: "Yes",
    },
    area: {
      type: Number,
      required: true,
      min: 0,
    },
    areaUnit: {
      type: String,
      required: true,
      enum: ["sq. yd", "sq. ft", "Acre", "Bigha", "Guntha"],
    },
    frontageFeet: {
      type: Number,
      default: 0,
    },
    depthFeet: {
      type: Number,
      default: 0,
    },
    facing: {
      type: String,
      required: true,
      enum: [
        "East Facing",
        "West Facing",
        "North Facing",
        "South Facing",
        "Corner Plot",
      ],
    },
    cornerPlot: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    roadWidth: {
      type: String,
      required: true,
    },

    // Legal & Approval Details
    naStatus: {
      type: String,
      required: true,
    },
    titleClear: {
      type: String,
      required: true,
      enum: ["Yes", "In Progress"],
    },
    zoneType: {
      type: String,
      required: true,
    },

    // Location
    address: {
      type: String,
      required: true,
      trim: true,
    },
    tpNumber: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: String,
      default: "",
    },
    googleMapsLink: {
      type: String,
      default: "",
    },

    // Description
    description: {
      type: String,
      default: "",
    },

    // Amenities
    amenities: {
      type: [String],
      default: [],
    },

    // Main Property Images
    images: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => value.length > 0,
        message: "At least one property image is required.",
      },
    },

    // Multiple Property Legal Documents
    propertyLegalDocs: {
      type: [String],
      default: [],
      select: false,
    },

    // Approval Workflow
    status: {
      type: String,
      enum: ["Processing", "Approved", "Rejected"],
      default: "Processing",
      index: true,
    },
    adminRemark: {
      type: String,
      default: "",
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      default: null,
    },
    reviewedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

propertySchema.index({ status: 1, createdAt: -1 });
propertySchema.index({ city: 1, propertyType: 1, status: 1 });

const Property = mongoose.model("Property", propertySchema);

export default Property;
