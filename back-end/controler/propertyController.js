import Property from "../model/propertyModel.js";

// Helper: get logged-in user ID
const getUserId = (req) =>
    req.user?._id || req.user?.id || req.user?.userId;

// Helper: clean price such as "45,00,000"
const parsePrice = (value) => {
    if (typeof value === "string") {
        return Number(value.replace(/,/g, "").trim());
    }
    return Number(value);
};

// 1. USER: Submit property
// POST /api/property
export const createProperty = async (req, res) => {
    try {
        // 1. Logged-in user
        const userId =
            req.user?._id ||
            req.user?.id ||
            req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Please login first.",
            });
        }

        // 2. Form data
        const { title, propertyType, ownershipType, sellerType, sellerName, sellerPhone, sellerWhatsapp, price, isNegotiable, area, areaUnit, frontageFeet, depthFeet, facing, cornerPlot, roadWidth, naStatus, titleClear, zoneType, address, tpNumber, city, state, pincode, googleMapsLink, description, amenities, } = req.body;

        // 4. Price and area validation
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

        // 5. Parse amenities
        let parsedAmenities = [];

        try {
            parsedAmenities = amenities
                ? JSON.parse(amenities)
                : [];
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Invalid amenities data.",
            });
        }


        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No images received. Please upload property images.",
            });
        }

        // 7. Get Cloudinary URLs
        const uploadedImages = req.files
            .map((file) => {
                return file.path || file.secure_url;
            })
            .filter((url) => typeof url === "string" && url.trim() !== "");

        console.log("Cloudinary image URLs:", uploadedImages);

        if (uploadedImages.length !== req.files.length) {
            return res.status(500).json({
                success: false,
                message: "Some images were not uploaded to Cloudinary.",
            });
        }

        // 8. Create property
        const property = await Property.create({
            seller: userId,

            // Basic details
            title,
            propertyType,
            ownershipType,
            sellerType,
            sellerName,
            sellerPhone,
            sellerWhatsapp,

            // Price and dimensions
            price: parsedPrice,
            isNegotiable: isNegotiable || "Yes",
            area: parsedArea,
            areaUnit,

            frontageFeet: frontageFeet
                ? Number(frontageFeet)
                : 0,

            depthFeet: depthFeet
                ? Number(depthFeet)
                : 0,

            facing,
            cornerPlot: cornerPlot || "No",
            roadWidth,

            // Legal details
            naStatus,
            titleClear: titleClear || "Yes",
            zoneType,

            // Location
            address,
            tpNumber,
            city,
            state,
            pincode,
            googleMapsLink,
            description,

            // Amenities and images
            amenities: parsedAmenities,
            images: uploadedImages,

            // Approval
            status: "Processing",
        });

        // 9. Success response
        return res.status(201).json({
            success: true,
            message:
                "Property submitted successfully. Waiting for admin approval.",
            property,
        });

    } catch (error) {
        console.error("Create Property Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};


// 2. ADMIN: Get all properties awaiting approval
// GET /api/property/admin/processing
export const getProcessingProperties = async (req, res) => {
    try {

        const properties = await Property.find({
            status: "Processing"
        }).sort({ createdAt: -1 });


        return res.status(200).json({
            success: true,
            count: properties.length,
            properties,
        });

    } catch (error) {
        console.error("GET PROCESSING PROPERTIES ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 3. ADMIN: Approve a property
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

        // Admin can change the listing price
        if (price !== undefined) {
            const newPrice = Number(
                typeof price === "string" ? price.replace(/,/g, "") : price
            );

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
        console.error("Approve property error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to approve property.",
        });
    }
};

// 4. ADMIN: Reject a property
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
            message: "Property rejected.",
            property,
        });
    } catch (error) {
        console.error("Reject property error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to reject property.",
        });
    }
};

// 5. PUBLIC: Only approved properties
// GET /api/property/approved
export const getApprovedProperties = async (req, res) => {
    try {
        const properties = await Property.find({ status: "Approved" })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: properties.length,
            properties,
        });
    } catch (error) {
        console.error("Get approved properties error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch properties.",
        });
    }
};

// 6. USER: See their own submitted properties and status
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

        const properties = await Property.find({ seller: userId })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: properties.length,
            properties,
        });
    } catch (error) {
        console.error("Get my properties error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch your properties.",
        });
    }
};