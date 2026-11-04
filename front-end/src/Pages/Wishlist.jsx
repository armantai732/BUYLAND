
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Heart,
    Trash2,
    Search,
    Eye,
    MapPin,
    Maximize2,
    Navigation,
    Compass,
    Calendar,
    PackageOpen,
    Loader2,
    AlertCircle,
} from "lucide-react";

import {
    getMyWishlistAPI,
    removeFromWishlistAPI,
    clearWishlistAPI,
} from "../api/api";

export default function Wishlist() {
    const navigate = useNavigate();

    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [removingId, setRemovingId] = useState(null);
    const [clearing, setClearing] = useState(false);
    const [error, setError] = useState("");

    // ================= FETCH WISHLIST =================

    const fetchWishlist = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            if (!token) {
                setWishlistItems([]);
                setError("Please login to view your wishlist.");
                return;
            }

            const data = await getMyWishlistAPI();

            // Backend response: { properties: [...] }
            setWishlistItems(data?.properties || []);

        } catch (err) {
            console.error("Fetch Wishlist Error:", err);

            setWishlistItems([]);
            setError(err.message || "Unable to load wishlist.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    // ================= REMOVE SINGLE PROPERTY =================

    const removeItem = async (propertyId) => {
        try {
            setRemovingId(propertyId);

            await removeFromWishlistAPI(propertyId);

            setWishlistItems((prev) =>
                prev.filter((item) => item._id !== propertyId)
            );

        } catch (err) {
            console.error("Remove Wishlist Error:", err);
            alert(err.message || "Failed to remove property.");
        } finally {
            setRemovingId(null);
        }
    };

    // ================= CLEAR COMPLETE WISHLIST =================

    const clearWishlist = async () => {
        if (wishlistItems.length === 0) return;

        const confirmClear = window.confirm(
            "Are you sure you want to clear your complete wishlist?"
        );

        if (!confirmClear) return;

        try {
            setClearing(true);

            await clearWishlistAPI();

            setWishlistItems([]);

        } catch (err) {
            console.error("Clear Wishlist Error:", err);
            alert(err.message || "Failed to clear wishlist.");
        } finally {
            setClearing(false);
        }
    };

    // ================= PROPERTY DETAILS =================

    const viewDetails = (id) => {
        navigate(`/propertiesDetails?id=${id}`);
    };

    // ================= FORMAT PRICE =================

    const formatPrice = (price) => {
        if (price === undefined || price === null || price === "") {
            return "Price on Request";
        }

        return `₹ ${Number(price).toLocaleString("en-IN")}`;
    };

    // ================= FORMAT DATE =================

    const formatDate = (date) => {
        if (!date) return "Recently added";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "Recently added";
        }

        return parsedDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    // ================= GET IMAGE =================

    const getPropertyImage = (property) => {
        const images = property.images || [];

        if (images.length === 0) {
            return "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop";
        }

        const firstImage = images[0];

        return typeof firstImage === "string"
            ? firstImage
            : firstImage?.url || firstImage?.secure_url;
    };

    return (
        <div className="min-h-screen bg-[#f4f7fb] font-sans text-gray-800 antialiased flex overflow-x-hidden">

            <div className="flex-1 flex flex-col min-w-0">

                <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

                    {/* HEADER */}

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">

                        <div>
                            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                                <Heart className="h-6 w-6 text-red-500 fill-red-500" />
                                My Wishlist
                            </h1>

                            <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                Your favourite properties saved for later
                            </p>

                            <p className="text-xs text-gray-400 mt-2">
                                {wishlistItems.length} saved properties
                            </p>
                        </div>

                        {wishlistItems.length > 0 && (
                            <button
                                onClick={clearWishlist}
                                disabled={clearing}
                                className="self-start sm:self-auto flex items-center gap-1.5 rounded-xl bg-amber-100/70 px-4 py-2.5 text-xs sm:text-sm font-bold text-amber-900 hover:bg-amber-200 transition shadow-sm disabled:opacity-50"
                            >
                                {clearing ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Trash2 className="h-4 w-4 text-amber-800" />
                                )}

                                {clearing ? "Clearing..." : "Clear Wishlist"}
                            </button>
                        )}
                    </div>

                    {/* LOADING */}

                    {loading ? (
                        <div className="bg-white p-16 rounded-3xl text-center border border-gray-100 shadow-sm">
                            <Loader2 className="h-10 w-10 animate-spin text-amber-600 mx-auto" />
                            <p className="text-sm text-gray-500 mt-4">
                                Loading your wishlist...
                            </p>
                        </div>
                    ) : error ? (

                        /* ERROR */

                        <div className="bg-white p-12 rounded-3xl text-center border border-gray-100 shadow-sm space-y-4">

                            <AlertCircle className="h-10 w-10 text-red-500 mx-auto" />

                            <h3 className="font-bold text-gray-900">
                                {error}
                            </h3>

                            <button
                                onClick={() => {
                                    if (!localStorage.getItem("token")) {
                                        navigate("/login");
                                    } else {
                                        fetchWishlist();
                                    }
                                }}
                                className="rounded-xl bg-[#0c2225] px-6 py-2.5 text-xs font-bold text-white hover:bg-black transition"
                            >
                                {localStorage.getItem("token") ? "Try Again" : "Login"}
                            </button>

                        </div>

                    ) : wishlistItems.length === 0 ? (

                        /* EMPTY WISHLIST */

                        <div className="bg-white p-12 rounded-3xl text-center border border-gray-100 shadow-sm space-y-4">

                            <div className="flex justify-center">
                                <div className="h-20 w-20 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                                    <PackageOpen className="h-10 w-10" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <h3 className="font-serif text-lg font-bold text-gray-900">
                                    No properties in your wishlist!
                                </h3>

                                <p className="text-xs text-gray-500">
                                    Explore properties and add your favourites.
                                </p>
                            </div>

                            <button
                                onClick={() => navigate("/properties")}
                                className="inline-flex items-center gap-2 rounded-xl bg-[#0c2225] px-6 py-2.5 text-xs font-bold text-white hover:bg-black transition shadow"
                            >
                                <Search className="h-4 w-4" />
                                Browse Properties
                            </button>

                        </div>

                    ) : (

                        /* WISHLIST GRID */

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {wishlistItems.map((item) => {

                                const image = getPropertyImage(item);

                                const propertyId = item._id;

                                const area = item.area || item.plotArea || "N/A";

                                const location = [
                                    item.location,
                                    item.city,
                                    item.state,
                                ]
                                    .filter(Boolean)
                                    .join(", ") || "Location not available";

                                const features = Array.isArray(item.amenities)
                                    ? item.amenities
                                    : [];

                                return (
                                    <div
                                        key={propertyId}
                                        className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4"
                                    >

                                        <div className="flex flex-col sm:flex-row gap-5">

                                            {/* PROPERTY IMAGE */}

                                            <div className="relative h-44 w-full sm:w-48 rounded-2xl overflow-hidden shrink-0 shadow-sm bg-gray-100">

                                                <img
                                                    src={image}
                                                    alt={item.title || "Property"}
                                                    className="h-full w-full object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.src =
                                                            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop";
                                                    }}
                                                />

                                                <span className="absolute top-3 left-3 flex items-center gap-1 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                                                    <Heart className="h-3 w-3 text-red-500 fill-red-500" />
                                                    In Wishlist
                                                </span>

                                                <span className="absolute bottom-3 left-3 rounded bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                                                    🖼️ {item.images?.length || 0} Images
                                                </span>

                                                <button
                                                    onClick={() => removeItem(propertyId)}
                                                    disabled={removingId === propertyId}
                                                    className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white flex items-center justify-center text-red-500 shadow hover:scale-105 transition disabled:opacity-50"
                                                    title="Remove from wishlist"
                                                >
                                                    {removingId === propertyId ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <Heart className="h-4 w-4 fill-red-500" />
                                                    )}
                                                </button>

                                            </div>

                                            {/* PROPERTY DETAILS */}

                                            <div className="space-y-2 flex-1 min-w-0">

                                                <h3 className="font-serif text-sm sm:text-base font-bold text-gray-900 leading-snug">
                                                    {item.title || "Untitled Property"}
                                                </h3>

                                                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                    <MapPin className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                                                    <span>{location}</span>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-3 pt-1">

                                                    <span className="font-serif text-lg font-extrabold text-amber-600">
                                                        {formatPrice(item.price)}
                                                    </span>

                                                    <span className="rounded-md px-2 py-0.5 text-[11px] font-bold bg-emerald-50 text-emerald-700">
                                                        {item.status || "Available"}
                                                    </span>

                                                </div>

                                                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-medium text-gray-600 border-t border-gray-50 mt-2">

                                                    <div className="flex items-center gap-1">
                                                        <Maximize2 className="h-3 w-3 text-gray-400" />
                                                        <span>{area}</span>
                                                    </div>

                                                    {features[0] && (
                                                        <div className="flex items-center gap-1">
                                                            <Navigation className="h-3 w-3 text-gray-400" />
                                                            <span>{features[0]}</span>
                                                        </div>
                                                    )}

                                                    <div className="flex items-center gap-1">
                                                        <Compass className="h-3 w-3 text-gray-400" />
                                                        <span>{item.propertyType || "Property"}</span>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        {/* BOTTOM ROW */}

                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-gray-100">

                                            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                                                <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                                <span>
                                                    Added on: {formatDate(item.createdAt)}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 w-full sm:w-auto">

                                                <button
                                                    onClick={() => viewDetails(propertyId)}
                                                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-xl bg-[#0c2225] px-4 py-2 text-xs font-bold text-white hover:bg-black transition shadow-sm"
                                                >
                                                    <Eye className="h-3.5 w-3.5" />
                                                    View Details
                                                </button>

                                                <button
                                                    onClick={() => removeItem(propertyId)}
                                                    disabled={removingId === propertyId}
                                                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-xl bg-amber-50 px-4 py-2 text-xs font-bold text-amber-900 hover:bg-amber-100 transition border border-amber-200/50 disabled:opacity-50"
                                                >
                                                    {removingId === propertyId ? (
                                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="h-3.5 w-3.5 text-amber-700" />
                                                    )}

                                                    Remove
                                                </button>

                                            </div>

                                        </div>

                                    </div>
                                );
                            })}

                        </div>
                    )}

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
                            Terms &amp; Conditions
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
