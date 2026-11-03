import React, { useState } from "react";
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
    Trash2,
    Eye,
    MapPin,
    Maximize2,
    Navigation,
    Compass,
    Calendar,
    X,
    Menu,
    PackageOpen,
} from "lucide-react";

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

export default function Wishlist() {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Wishlist state items
    const [wishlistItems, setWishlistItems] = useState([
        {
            id: 1,
            title: "Premium Residential Plot Near SP Ring Road",
            location: "Ahmedabad, Gujarat",
            price: "₹ 45,00,000",
            badgeText: "Negotiable",
            badgeColor: "bg-emerald-50 text-emerald-700",
            area: "1200 sq. ft",
            feature1: "Main Road",
            feature2: "North Facing",
            addedDate: "Oct 15, 2025",
            imageCount: "1/5",
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop",
        },
        {
            id: 2,
            title: "Commercial Land Near SG Highway",
            location: "Ahmedabad, Gujarat",
            price: "₹ 1,25,00,000",
            badgeText: "Sold",
            badgeColor: "bg-gray-100 text-gray-700",
            area: "5000 sq. ft",
            feature1: "Touch Highway",
            feature2: "Commercial",
            addedDate: "Oct 10, 2025",
            imageCount: "1/4",
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop",
        },
    ]);


    const removeItem = (id) => {
        setWishlistItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearWishlist = () => {
        setWishlistItems([]);
    };

    return (
        <div className="min-h-screen bg-[#f4f7fb] font-sans text-gray-800 antialiased flex overflow-x-hidden">

            {/* 2. RIGHT MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col min-w-0">


                {/* MAIN PAGE CONTENT */}
                <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

                    {/* TOP HEADER SECTION */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <div>
                            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                                <Heart className="h-6 w-6 text-red-500 fill-red-500" /> My Wishlist
                            </h1>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                Your favourite properties saved for later
                            </p>
                        </div>

                        {wishlistItems.length > 0 && (
                            <button
                                onClick={clearWishlist}
                                className="self-start sm:self-auto flex items-center gap-1.5 rounded-xl bg-amber-100/70 px-4 py-2 text-xs sm:text-sm font-bold text-amber-900 hover:bg-amber-200 transition shadow-sm"
                            >
                                <Trash2 className="h-4 w-4 text-amber-800" /> Clear Wishlist
                            </button>
                        )}
                    </div>

                    {/* WISHLIST ITEMS GRID */}
                    {wishlistItems.length === 0 ? (
                        <div className="bg-white p-12 rounded-3xl text-center border border-gray-100 shadow-sm space-y-4">
                            <div className="flex justify-center">
                                <div className="h-20 w-20 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                                    <PackageOpen className="h-10 w-10" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-serif text-lg font-bold text-gray-900">
                                    No more properties in your wishlist!
                                </h3>
                                <p className="text-xs text-gray-500">
                                    Explore properties and add your favorites
                                </p>
                            </div>
                            <button
                                onClick={() => navigate("/properties")}
                                className="inline-flex items-center gap-2 rounded-xl bg-[#0c2225] px-6 py-2.5 text-xs font-bold text-white hover:bg-black transition shadow"
                            >
                                <Search className="h-4 w-4" /> Browse Properties
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {wishlistItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4"
                                >
                                    <div className="flex flex-col sm:flex-row gap-5">
                                        {/* Image Thumbnail */}
                                        <div className="relative h-44 w-full sm:w-48 rounded-2xl overflow-hidden shrink-0 shadow-sm bg-gray-100">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="h-full w-full object-cover"
                                            />
                                            <span className="absolute top-3 left-3 flex items-center gap-1 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                                                <Heart className="h-3 w-3 text-red-500 fill-red-500" /> In Wishlist
                                            </span>
                                            <span className="absolute bottom-3 left-3 rounded bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                                                🖼️ {item.imageCount}
                                            </span>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="absolute top-3 right-3 h-7 w-7 rounded-full bg-white flex items-center justify-center text-red-500 shadow hover:scale-105 transition"
                                            >
                                                ♥
                                            </button>
                                        </div>

                                        {/* Details */}
                                        <div className="space-y-2 flex-1">
                                            <h3 className="font-serif text-sm sm:text-base font-bold text-gray-900 leading-snug">
                                                {item.title}
                                            </h3>

                                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                <MapPin className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                                                <span>{item.location}</span>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-3 pt-1">
                                                <span className="font-serif text-lg font-extrabold text-amber-600">
                                                    {item.price}
                                                </span>
                                                <span className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${item.badgeColor}`}>
                                                    {item.badgeText}
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-medium text-gray-600 border-t border-gray-50 mt-2">
                                                <div className="flex items-center gap-1">
                                                    <Maximize2 className="h-3 w-3 text-gray-400" />
                                                    <span>{item.area}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Navigation className="h-3 w-3 text-gray-400" />
                                                    <span>{item.feature1}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Compass className="h-3 w-3 text-gray-400" />
                                                    <span>{item.feature2}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Row: Added Date & Buttons */}
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-gray-100">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                                            <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                            <span>Added on: {item.addedDate}</span>
                                        </div>

                                        <div className="flex items-center gap-2 w-full sm:w-auto">
                                            <button
                                                onClick={() => navigate("/propertiesDetails")}
                                                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-xl bg-[#0c2225] px-4 py-2 text-xs font-bold text-white hover:bg-black transition shadow-sm"
                                            >
                                                <Eye className="h-3.5 w-3.5" /> View Details
                                            </button>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-xl bg-amber-50 px-4 py-2 text-xs font-bold text-amber-900 hover:bg-amber-100 transition border border-amber-200/50"
                                            >
                                                <Trash2 className="h-3.5 w-3.5 text-amber-700" /> Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

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