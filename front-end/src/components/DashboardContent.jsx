
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
  Edit3,
  Home,
  ShieldCheck,
  Phone,
  Mail,
  X,
} from "lucide-react";

import {
  getMyProfile,
  getMyProperties,
  getMyWishlistAPI,
} from "../api/api";

// Sidebar Links
const sidebarLinks = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, end: true },
  { name: "My Profile", path: "/dashboard/profile", icon: User },
  { name: "My Properties", path: "/dashboard/my-properties", icon: Building2 },
  { name: "Wishlist", path: "/dashboard/wishlist", icon: Heart },
  { name: "Messages", path: "/dashboard/messages", icon: MessageSquare, badge: 2 },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
];

// House Logo
function HouseLogo() {
  return (
    <svg
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 shrink-0 sm:h-12 sm:w-12"
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

// Format Price
const formatPrice = (price) => {
  if (price === undefined || price === null || price === "") {
    return "Price not available";
  }

  return `₹ ${Number(price).toLocaleString("en-IN")}`;
};

// Get Property Image
const getPropertyImage = (property) => {
  const images = property?.images;

  if (Array.isArray(images) && images.length > 0) {
    const firstImage = images[0];

    return typeof firstImage === "string"
      ? firstImage
      : firstImage?.url || firstImage?.secure_url || "";
  }

  return (
    property?.image ||
    property?.propertyImage ||
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=400&auto=format&fit=crop"
  );
};

// Get Location
const getPropertyLocation = (property) => {
  const location = property?.location;

  if (typeof location === "string") {
    return location;
  }

  if (location && typeof location === "object") {
    return [
      location.city,
      location.state,
      location.address,
    ].filter(Boolean).join(", ") || "Location not available";
  }

  return property?.address || "Location not available";
};

// Property Status
const getStatus = (property) => {
  const status = property?.status || "Processing";

  const normalized = status.toLowerCase();

  if (
    normalized === "approved" ||
    normalized === "active" ||
    normalized === "success"
  ) {
    return {
      label: "Approved",
      className: "bg-emerald-500",
    };
  }

  if (normalized === "sold" || normalized === "sold out") {
    return {
      label: "Sold Out",
      className: "bg-red-500",
    };
  }

  return {
    label: "Processing",
    className: "bg-amber-500",
  };
};

export default function Dashboard() {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // PROFILE STATES
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState("");

  // PROPERTY STATES
  const [properties, setProperties] = useState([]);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [propertiesError, setPropertiesError] = useState("");

  // WISHLIST STATES
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistLoading, setWishlistLoading] = useState(true);

  // FETCH PROFILE
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setProfileLoading(true);
        setProfileError("");

        const data = await getMyProfile();

        const userData = data.user || data.data || data;

        setProfile(userData);
      } catch (error) {
        console.error("Profile fetch error:", error);
        setProfileError(error.message || "Failed to load profile");
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // FETCH MY PROPERTIES
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setPropertiesLoading(true);
        setPropertiesError("");

        const data = await getMyProperties();

        const propertyList = Array.isArray(data)
          ? data
          : Array.isArray(data?.properties)
          ? data.properties
          : Array.isArray(data?.data)
          ? data.data
          : [];

        setProperties(propertyList);
      } catch (error) {
        console.error("Properties fetch error:", error);
        setPropertiesError(error.message || "Failed to load properties.");
      } finally {
        setPropertiesLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // FETCH WISHLIST COUNT
  useEffect(() => {
    const fetchWishlistCount = async () => {
      try {
        setWishlistLoading(true);

        const data = await getMyWishlistAPI();

        const wishlistProperties = Array.isArray(data)
          ? data
          : Array.isArray(data?.properties)
          ? data.properties
          : Array.isArray(data?.data?.properties)
          ? data.data.properties
          : [];

        setWishlistCount(wishlistProperties.length);
      } catch (error) {
        console.error("Wishlist count fetch error:", error);
        setWishlistCount(0);
      } finally {
        setWishlistLoading(false);
      }
    };

    fetchWishlistCount();
  }, []);

  // TOTAL PROPERTY COUNT
  const allCount = properties.length;

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    window.dispatchEvent(new Event("authChange"));

    navigate("/login");
  };

  // USER INITIAL
  const userInitial = profile?.name
    ? profile.name.charAt(0).toUpperCase()
    : "U";

  // FIRST PROPERTY
  const firstProperty = properties[0];

  return (
    <div className="min-h[80%] bg-[#f4f7fb] font-sans text-gray-800 antialiased flex flex-col md:flex-row overflow-x-hidden">

      {/* MOBILE SIDEBAR */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 md:hidden flex">

          <div className="w-72 bg-[#07111d] px-6 py-8 text-white flex flex-col justify-between h-full shadow-2xl relative">

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X size={22} />
            </button>

            <div className="space-y-6 overflow-y-auto">

              <div
                onClick={() => {
                  navigate("/");
                  setMobileMenuOpen(false);
                }}
                className="flex flex-col items-center text-center cursor-pointer group pt-2"
              >
                <HouseLogo />

                <span className="font-serif text-xl font-extrabold tracking-tight text-[#F5D58A] mt-1">
                  BuyLand
                </span>
              </div>

              <nav className="space-y-2">

                {sidebarLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      end={link.end}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                          isActive
                            ? "bg-[#F5D58A] text-[#07111d] font-bold"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className="flex items-center gap-3">
                            <Icon
                              size={18}
                              className={
                                isActive
                                  ? "text-[#07111d]"
                                  : "text-[#F5D58A]"
                              }
                            />

                            <span>{link.name}</span>
                          </div>

                          {link.badge && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                              {link.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}

                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-300 hover:bg-red-500/10 hover:text-red-400"
                >
                  <LogOut size={18} className="text-red-400" />
                  <span>Logout</span>
                </button>

              </nav>
            </div>
          </div>

          <div
            className="flex-1"
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">

        <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

          {/* WELCOME BANNER & STATS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

            {/* WELCOME BANNER */}
            <div className="lg:col-span-7 relative rounded-3xl overflow-hidden bg-[#090b0c] text-white p-6 sm:p-8 shadow-xl border border-amber-200/30 flex flex-col justify-between min-h-[160px] sm:min-h-[180px]">

              <div className="absolute inset-0 opacity-40">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop"
                  alt="Luxury villa background"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />

              <div className="relative z-10 space-y-2">

                <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Welcome Back,
                </h3>

                <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-white flex flex-wrap items-center gap-2">
                  <span>
                    {profileLoading
                      ? "Loading..."
                      : profile?.name || "User"}
                  </span>

                  <span>👋</span>
                </h1>

                <p className="text-xs sm:text-sm text-gray-300 font-medium pt-1">
                  Here's your dashboard overview
                </p>

              </div>
            </div>

            {/* STATS CARDS */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">

              {/* TOTAL PROPERTIES */}
              <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">

                <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Home className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>

                <div className="mt-3 sm:mt-4">
                  <span className="font-serif text-lg sm:text-2xl font-extrabold text-gray-900">
                    {propertiesLoading ? "..." : allCount}
                  </span>

                  <p className="text-[10px] sm:text-[11px] font-bold text-gray-500 mt-0.5 truncate">
                    Total Properties
                  </p>
                </div>

              </div>

              {/* WISHLIST */}
              <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">

                <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>

                <div className="mt-3 sm:mt-4">
                  <span className="font-serif text-lg sm:text-2xl font-extrabold text-gray-900">
                    {wishlistLoading ? "..." : wishlistCount}
                  </span>

                  <p className="text-[10px] sm:text-[11px] font-bold text-gray-500 mt-0.5 truncate">
                    Wishlist Items
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* PROFILE & PROPERTIES */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* MY PROFILE CARD */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100 space-y-5">

              <div className="flex items-center justify-between border-b border-gray-100 pb-4">

                <h3 className="font-serif text-base sm:text-lg font-bold text-gray-900">
                  My Profile
                </h3>

              </div>

              {profileLoading ? (

                <div className="py-8 text-center text-sm text-gray-500">
                  Loading profile...
                </div>

              ) : profileError ? (

                <div className="py-8 text-center text-sm text-red-500">
                  {profileError}
                </div>

              ) : (

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">

                  {/* AVATAR */}
                  <div className="relative shrink-0">

                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0c2225] text-white font-bold text-2xl shadow-md">
                      {userInitial}
                    </div>

                  </div>

                  <div className="flex-1 space-y-1 w-full">

                    {/* NAME */}
                    <div className="flex items-center justify-center sm:justify-start gap-1.5">

                      <h4 className="font-serif text-base font-bold text-gray-900">
                        {profile?.name || "N/A"}
                      </h4>

                      <ShieldCheck className="h-4 w-4 text-blue-500 shrink-0" />

                    </div>

                    {/* ROLE */}
                    <span className="inline-block rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 capitalize">
                      {profile?.role || "User"}
                    </span>

                    {/* MOBILE & EMAIL */}
                    <div className="pt-2 space-y-1.5 text-xs text-gray-600 font-medium break-all sm:break-normal">

                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <Phone className="h-3.5 w-3.5 text-gray-400 shrink-0" />

                        <span>
                          {profile?.mobileNumber || "Mobile not available"}
                        </span>
                      </div>

                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <Mail className="h-3.5 w-3.5 text-gray-400 shrink-0" />

                        <span>
                          {profile?.email || "Email not available"}
                        </span>
                      </div>

                    </div>

                    {/* EDIT PROFILE */}
                    <div className="pt-3">

                      <button
                        onClick={() => navigate("/dashboard/profile")}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#0c2225] px-4 py-2 text-xs font-bold text-white hover:bg-black transition"
                      >
                        <Edit3 size={13} />
                        Edit Profile
                      </button>

                    </div>

                  </div>

                </div>

              )}

            </div>

          </div>

        </main>

        {/* FOOTER */}
        <footer className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-10 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3 text-center sm:text-left">

          <p>© 2026 BuyLand. All Rights Reserved</p>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4">

            <a href="/privacy" className="hover:text-amber-600">
              Privacy Policy
            </a>

            <span>|</span>

            <a href="/terms" className="hover:text-amber-600">
              Terms & Conditions
            </a>

            <span>|</span>

            <a href="/support" className="hover:text-amber-600">
              Support
            </a>

          </div>

        </footer>

      </div>

    </div>
  );
}
