import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Building2,
  Heart,
  MessageSquare,
  Settings,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  Plus,
  Eye,
  Edit3,
  Trash2,
  MapPin,
  Maximize2,
  Navigation,
  Compass,
  Calendar,
  X,
  Menu,
  Loader2,
} from "lucide-react";
import { getMyProperties } from "../api/api";

const sidebarLinks = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "My Profile", path: "/profile", icon: User },
  { name: "My Properties", path: "/my-properties", icon: Building2 },
  { name: "Wishlist", path: "/wishlist", icon: Heart },
  { name: "Messages", path: "/messages", icon: MessageSquare, badge: 2 },
  { name: "Settings", path: "/settings", icon: Settings },
];

function HouseLogo() {
  return (
    <svg
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12 shrink-0"
      aria-label="BuyLand house logo"
    >
      <path
        d="M5 27L29 4L53 27V52H5V27Z"
        stroke="#F5D58A"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 28L29 12L46 28V46H12V28Z"
        stroke="#D7B66B"
        strokeWidth="1.4"
      />
      <path
        d="M21 45V32L29 26L37 32V45"
        stroke="#F5D58A"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M26 45V37H32V45"
        stroke="#F5D58A"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function MyProperties() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch properties from API on component mount
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await getMyProperties();
        const propertyList = Array.isArray(data) ? data : data?.properties || [];
        setProperties(propertyList);
      } catch (err) {
        setError(err.message || "Failed to load properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  // Filter counts calculation based on exact statuses
  const allCount = properties.length;
  const approvedCount = properties.filter((p) => p.status?.toLowerCase() === "approved").length;
  const processingCount = properties.filter((p) => p.status?.toLowerCase() === "processing").length;
  const soldOutCount = properties.filter((p) => p.status?.toLowerCase() === "sold out").length;

  const filteredProperties = properties.filter((p) => {
    const status = p.status?.toLowerCase();
    if (activeTab === "approved") return status === "approved";
    if (activeTab === "processing") return status === "processing";
    if (activeTab === "sold out") return status === "sold out";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f4f7fb] font-sans text-gray-800 antialiased flex overflow-x-hidden">

      {/* RIGHT MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* MAIN PAGE CONTENT */}
        <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

          {/* TOP HEADER SECTION */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                My Properties
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Manage your listed properties
              </p>
            </div>

            <button
              onClick={() => navigate("/sale")}
              className="self-start sm:self-auto flex items-center gap-1.5 rounded-xl bg-amber-400 px-4 py-2 text-xs sm:text-sm font-bold text-gray-900 hover:bg-amber-500 transition shadow-sm"
            >
              <Plus className="h-4 w-4" /> Add New Property
            </button>
          </div>

          {/* FILTER TABS */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${activeTab === "all"
                  ? "bg-[#0c2225] text-white shadow"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
            >
              All Properties ({allCount})
            </button>
            <button
              onClick={() => setActiveTab("approved")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${activeTab === "approved"
                  ? "bg-[#0c2225] text-white shadow"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
            >
              Approved ({approvedCount})
            </button>
            <button
              onClick={() => setActiveTab("processing")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${activeTab === "processing"
                  ? "bg-[#0c2225] text-white shadow"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
            >
              Processing ({processingCount})
            </button>
            <button
              onClick={() => setActiveTab("sold out")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${activeTab === "sold out"
                  ? "bg-[#0c2225] text-white shadow"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
            >
              Sold Out ({soldOutCount})
            </button>
          </div>

          {/* PROPERTIES LIST CONTAINER */}
          <div className="space-y-4">
            {loading ? (
              <div className="bg-white p-12 rounded-3xl text-center flex flex-col items-center justify-center border border-gray-100">
                <Loader2 className="h-8 w-8 animate-spin text-amber-600 mb-2" />
                <p className="text-sm text-gray-500 font-medium">Loading your properties...</p>
              </div>
            ) : error ? (
              <div className="bg-white p-10 rounded-3xl text-center text-red-500 border border-gray-100">
                {error}
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="bg-white p-10 rounded-3xl text-center text-gray-500 border border-gray-100">
                No properties found in this category.
              </div>
            ) : (
              filteredProperties.map((prop) => {
                const currentStatus = prop.status?.toLowerCase();
                let badgeBg = "bg-gray-600";
                if (currentStatus === "approved") badgeBg = "bg-emerald-500";
                else if (currentStatus === "processing") badgeBg = "bg-amber-500";
                else if (currentStatus === "sold out") badgeBg = "bg-blue-600";

                // Strictly hide edit button if status is Approved or Sold Out (Only show for Processing)
                const isEditable = currentStatus === "processing";

                return (
                  <div
                    key={prop._id || prop.id}
                    className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6"
                  >
                    {/* Left: Property Thumbnail & Details */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 w-full lg:w-auto flex-1">
                      <div className="relative h-40 w-full sm:w-52 sm:h-36 rounded-2xl overflow-hidden shrink-0 shadow-sm bg-gray-100">
                        <img
                          src={prop.image || prop.images?.[0] || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop"}
                          alt={prop.title}
                          className="h-full w-full object-cover"
                        />
                        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold text-white shadow ${badgeBg}`}>
                          {prop.status}
                        </span>
                      </div>

                      <div className="space-y-2 w-full text-center sm:text-left">
                        <h3 className="font-serif text-base sm:text-lg font-bold text-gray-900">
                          {prop.title}
                        </h3>

                        <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-gray-500">
                          <MapPin className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                          <span>{prop.location || prop.city || "Ahmedabad, Gujarat"}</span>
                        </div>

                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
                          <span className="font-serif text-lg sm:text-xl font-extrabold text-amber-600">
                            ₹ {prop.price?.toLocaleString() || prop.price}
                          </span>
                          <span className="rounded-md bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                            {prop.badgeType || "Negotiable"}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs font-medium text-gray-600">
                          <div className="flex items-center gap-1.5">
                            <Maximize2 className="h-3.5 w-3.5 text-gray-400" />
                            <span>{prop.area || "1200 sq. ft"}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Navigation className="h-3.5 w-3.5 text-gray-400" />
                            <span>{prop.feature1 || prop.roadAccess || "Main Road"}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Compass className="h-3.5 w-3.5 text-gray-400" />
                            <span>{prop.feature2 || prop.facing || "North Facing"}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Date, Views & Action Buttons */}
                    <div className="flex flex-col sm:flex-row lg:flex-col items-center justify-between lg:justify-center w-full lg:w-auto gap-5 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-gray-100 lg:pl-6 shrink-0">
                      <div className="text-center lg:text-left space-y-1 w-full sm:w-auto">
                        <div className="text-[11px] text-gray-400 font-medium">{prop.dateLabel || "Listed On"}</div>
                        <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs font-bold text-gray-700">
                          <Calendar className="h-3.5 w-3.5 text-gray-400" />
                          <span>{prop.date || new Date(prop.createdAt || Date.now()).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full sm:w-44">
                        <button
                          onClick={() => navigate(`/propertiesDetails`)}
                          className="flex items-center justify-center gap-1.5 rounded-xl bg-[#0c2225] px-4 py-2 text-xs font-bold text-white hover:bg-black transition shadow-sm"
                        >
                          <Eye className="h-3.5 w-3.5" /> View Details
                        </button>

                        {/* Edit Property button render logic */}
                        {isEditable && (
                          <button
                            onClick={() => navigate(`/edit-property`)}
                            className="flex items-center justify-center gap-1.5 rounded-xl bg-amber-100/70 px-4 py-2 text-xs font-bold text-amber-900 hover:bg-amber-200 transition"
                          >
                            <Edit3 className="h-3.5 w-3.5" /> Edit Property
                          </button>
                        )}

                        <button
                          onClick={() => alert(`Remove property ${prop._id || prop.id}`)}
                          className="flex items-center justify-center gap-1.5 rounded-xl bg-red-50 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-100 transition"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </main>

        {/* FOOTER */}
        <footer className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-10 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3 text-center sm:text-left">
          <p>© 2025 BuyLand. All Rights Reserved</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4">
            <a href="/privacy" className="hover:text-amber-600">Privacy Policy</a>
            <span>|</span>
            <a href="/terms" className="hover:text-amber-600">Terms &amp; Conditions</a>
            <span>|</span>
            <a href="/support" className="hover:text-amber-600">Support</a>
          </div>
        </footer>

      </div>

    </div>
  );
}