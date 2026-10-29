import Property from "../model/propertyModel.js";

// GET /api/dashboard/stats
export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id || req.user.userId;

    const totalProperties = await Property.countDocuments({
      seller: userId,
    });

    return res.status(200).json({
      success: true,
      stats: {
        totalProperties,
        savedProperties: 0,
        messages: 0,
        profileViews: 0,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    return res.status(500).json({
      success: false,
      message: "Dashboard stats fetch failed",
    });
  }
};

// GET /api/dashboard/activities
export const getRecentActivities = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id || req.user.userId;

    const properties = await Property.find({
      seller: userId,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const activities = properties.map((property) => ({
      _id: property._id,
      title: property.title || "Property submitted",
      location: [
        property.city,
        property.state,
      ].filter(Boolean).join(", "),
      price: property.listingPrice ?? property.price,
      image: Array.isArray(property.images)
        ? property.images[0] || ""
        : "",
      date: property.createdAt,
    }));

    return res.status(200).json({
      success: true,
      activities,
    });
  } catch (error) {
    console.error("Dashboard activities error:", error);

    return res.status(500).json({
      success: false,
      message: "Recent activities fetch failed",
    });
  }
};
