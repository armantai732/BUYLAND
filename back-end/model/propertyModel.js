import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    // User who submitted the property
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Basic details
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
      default: "Single Owner",
    },
    sellerType: {
      type: String,
      enum: ["Owner", "Agent / Broker", "Builder / Developer"],
      default: "Owner",
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
      default: "",
    },

    // Price and dimensions
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
      default: "sq. yd",
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
      default: "East Facing",
    },
    cornerPlot: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    roadWidth: {
      type: String,
      default: "Main Road (60ft+)",
    },

    // Legal details
    naStatus: {
      type: String,
      default: "NA Approved",
    },
    titleClear: {
      type: String,
      default: "Yes",
    },
    zoneType: {
      type: String,
      default: "Residential Zone",
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
    plotNumber: {
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

    // Description and images
    description: {
      type: String,
      default: "",
    },
    amenities: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },

    // Approval workflow
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
      ref: "User",
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