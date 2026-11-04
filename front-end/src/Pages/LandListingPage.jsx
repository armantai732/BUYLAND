
import React, { useState, useEffect, useMemo } from "react";
import {
  MapPin,
  Heart,
  SlidersHorizontal,
  X,
  ChevronDown,
  Maximize2,
  Compass,
  RotateCcw,
  Home,
  Eye,
  Phone,
  ArrowRight,
  ShieldCheck,
  Handshake,
  Headphones,
  Award,
  Grid,
  List,
  Loader2,
} from "lucide-react";

import { useNavigate, useSearchParams } from "react-router-dom";

import {
  addToWishlistAPI,
  removeFromWishlistAPI,
  getApprovedProperties,
  getMyWishlistAPI,
} from "../api/api";

const PROPERTY_TYPES = [
  "Residential Plot",
  "Agricultural Land",
  "Commercial Land",
  "Industrial Land",
];

const LOCATIONS = [
  "Ahmedabad",
  "Viramgam",
  "Surat",
  "Rajkot",
  "Vadodara",
  "Mehsana",
  "Gandhinagar",
];

export default function Properties() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const queryLocation = searchParams.get("location") || "";
  const queryType = searchParams.get("type") || "";

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedLocation, setSelectedLocation] = useState(
    LOCATIONS.includes(queryLocation) ? queryLocation : ""
  );

  const [selectedTypes, setSelectedTypes] = useState(
    PROPERTY_TYPES.includes(queryType)
      ? [queryType]
      : PROPERTY_TYPES
  );

  const [maxPrice, setMaxPrice] = useState(10000000);
  const [maxArea, setMaxArea] = useState(10000);
  const [sortBy, setSortBy] = useState("Newest First");

  // Database wishlist IDs
  const [favorites, setFavorites] = useState([]);

  // Individual wishlist button loading
  const [wishlistLoading, setWishlistLoading] = useState({});

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // ==========================================
  // FETCH APPROVED PROPERTIES
  // ==========================================

  useEffect(() => {
    const fetchApprovedProperties = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getApprovedProperties();

        const propertyList = Array.isArray(data)
          ? data
          : data?.properties || data?.data || [];

        setProperties(propertyList);
      } catch (err) {
        console.error("Fetch Properties Error:", err);
        setError(err.message || "Failed to load approved properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedProperties();
  }, []);

  // ==========================================
  // FETCH USER WISHLIST FROM DATABASE
  // ==========================================

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setFavorites([]);
        return;
      }

      try {
        const data = await getMyWishlistAPI();

        const wishlistIds = (data.properties || []).map((property) =>
          typeof property === "string" ? property : property._id
        );

        setFavorites(wishlistIds.filter(Boolean));
      } catch (error) {
        console.error("Fetch Wishlist Error:", error);
      }
    };

    fetchWishlist();
  }, []);

  // ==========================================
  // ADD / REMOVE WISHLIST
  // ==========================================

  const toggleFavorite = async (id, e) => {
    e.stopPropagation();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to add properties to wishlist.");
      navigate("/login");
      return;
    }

    if (wishlistLoading[id]) return;

    const isFav = favorites.includes(id);

    try {
      setWishlistLoading((prev) => ({
        ...prev,
        [id]: true,
      }));

      if (isFav) {
        await removeFromWishlistAPI(id);

        setFavorites((prev) =>
          prev.filter((favId) => favId !== id)
        );
      } else {
        await addToWishlistAPI(id);

        setFavorites((prev) => [...prev, id]);
      }
    } catch (error) {
      console.error("Wishlist Error:", error);
      alert(error.message || "Wishlist update failed.");
    } finally {
      setWishlistLoading((prev) => ({
        ...prev,
        [id]: false,
      }));
    }
  };

  // ==========================================
  // PROPERTY TYPE FILTER
  // ==========================================

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  // ==========================================
  // CLEAR FILTERS
  // ==========================================

  const handleClearAll = () => {
    setSelectedLocation("");
    setSelectedTypes(PROPERTY_TYPES);
    setMaxPrice(10000000);
    setMaxArea(10000);
    setSortBy("Newest First");
  };

  // ==========================================
  // FILTER AND SORT PROPERTIES
  // ==========================================

  const filteredProperties = useMemo(() => {
    let result = properties.filter((item) => {
      const itemCity = item.city || item.location || "";
      const itemType = item.type || item.propertyType || "";
      const itemPrice = Number(item.price) || 0;
      const itemArea = Number(item.area) || 0;

      if (
        selectedLocation &&
        !itemCity.toLowerCase().includes(selectedLocation.toLowerCase())
      ) {
        return false;
      }

      if (
        selectedTypes.length > 0 &&
        !selectedTypes.includes(itemType)
      ) {
        return false;
      }

      if (itemPrice > maxPrice) {
        return false;
      }

      if (itemArea > maxArea) {
        return false;
      }

      return true;
    });

    if (sortBy === "Price: Low to High") {
      result.sort(
        (a, b) => Number(a.price || 0) - Number(b.price || 0)
      );
    } else if (sortBy === "Price: High to Low") {
      result.sort(
        (a, b) => Number(b.price || 0) - Number(a.price || 0)
      );
    } else {
      result.sort(
        (a, b) =>
          new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
    }

    return result;
  }, [
    properties,
    selectedLocation,
    selectedTypes,
    maxPrice,
    maxArea,
    sortBy,
  ]);

  // ==========================================
  // FILTER FIELDS
  // ==========================================

  const FilterFields = () => (
    <div className="space-y-6 text-xs">

      {/* LOCATION */}
      <div>
        <label className="block font-bold text-gray-700 mb-2">
          Location
        </label>

        <div className="relative">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 pr-8 text-xs font-medium text-gray-800 outline-none focus:border-amber-400 focus:bg-white"
          >
            <option value="">Select Location</option>

            {LOCATIONS.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* PROPERTY TYPE */}
      <div>
        <label className="block font-bold text-gray-700 mb-2.5">
          Property Type
        </label>

        <div className="space-y-2.5">
          {PROPERTY_TYPES.map((type) => {
            const checked = selectedTypes.includes(type);

            return (
              <label
                key={type}
                className="flex cursor-pointer items-center gap-2.5 font-medium text-gray-700"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleTypeChange(type)}
                  className="h-4 w-4 cursor-pointer rounded border-gray-300 text-amber-600 focus:ring-amber-400"
                />

                <span>{type}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* BUDGET RANGE */}
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="font-bold text-gray-700">
            Budget Range
          </label>

          <span className="font-bold text-amber-600">
            {maxPrice >= 10000000
              ? `₹${(maxPrice / 10000000).toFixed(1)} Cr+`
              : `₹${(maxPrice / 100000).toFixed(0)} Lakh`}
          </span>
        </div>

        <input
          type="range"
          min={1000000}
          max={10000000}
          step={500000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full cursor-pointer accent-amber-500"
        />

        <div className="mt-1 flex justify-between text-[10px] text-gray-400">
          <span>₹10 Lakh</span>
          <span>₹10 Cr+</span>
        </div>
      </div>

      {/* AREA RANGE */}
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="font-bold text-gray-700">
            Area (Sq.Ft)
          </label>

          <span className="font-bold text-amber-600">
            0 - {maxArea.toLocaleString()} Sq.Ft
          </span>
        </div>

        <input
          type="range"
          min={500}
          max={10000}
          step={500}
          value={maxArea}
          onChange={(e) => setMaxArea(Number(e.target.value))}
          className="w-full cursor-pointer accent-amber-500"
        />

        <div className="mt-1 flex justify-between text-[10px] text-gray-400">
          <span>0</span>
          <span>10000+ Sq.Ft</span>
        </div>
      </div>

      {/* SORT */}
      <div>
        <label className="mb-2 block font-bold text-gray-700">
          Sort By
        </label>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 pr-8 text-xs font-medium text-gray-800 outline-none focus:border-amber-400 focus:bg-white"
        >
          <option>Newest First</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>

      {/* APPLY */}
      <button
        type="button"
        onClick={() => setIsMobileFilterOpen(false)}
        className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 py-3 text-xs font-bold text-white shadow-md transition hover:scale-[1.02] active:scale-95"
      >
        Apply Filters
      </button>
    </div>
  );

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-gray-800">

      {/* HERO HEADER */}
      <div className="relative overflow-hidden border-b border-gray-800 bg-[#090b0c] text-white">

        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
            alt="Luxury building background"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">
            PREMIUM REAL ESTATE
          </span>

          <h1 className="mt-1 font-serif text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Our Properties
          </h1>

          <p className="mt-1.5 text-xs font-medium text-gray-300 sm:text-sm">
            Find the perfect property that matches your needs.
          </p>

          {/* BREADCRUMB */}
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-300">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 transition hover:text-amber-400"
            >
              <Home className="h-3.5 w-3.5" />
              <span>Home</span>
            </button>

            <span>&gt;</span>

            <span className="font-semibold text-amber-400">
              Properties
            </span>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* TOP COUNT AND VIEW */}
        <div className="mb-6 flex items-center justify-between">

          <p className="text-xs font-semibold text-gray-600 sm:text-sm">
            Showing{" "}
            <span className="font-bold text-gray-900">
              {filteredProperties.length > 0 ? 1 : 0}-{filteredProperties.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-gray-900">
              {properties.length}
            </span>{" "}
            Properties
          </p>

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4 text-amber-500" />
              <span>Filters</span>
            </button>

            <div className="hidden items-center gap-1 rounded-xl border border-gray-200 bg-white p-1 shadow-sm sm:flex">
              <button className="rounded-lg bg-amber-50 p-1.5 text-amber-600">
                <Grid className="h-4 w-4" />
              </button>

              <button className="rounded-lg p-1.5 text-gray-400 hover:text-gray-600">
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* SIDEBAR AND PROPERTY GRID */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-4">

          {/* DESKTOP FILTER SIDEBAR */}
          <aside className="sticky top-6 hidden space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-1 lg:block">

            <div className="flex items-center justify-between border-b border-gray-100 pb-4">

              <h2 className="flex items-center gap-2 font-serif text-base font-bold text-gray-900">
                <SlidersHorizontal className="h-4 w-4 text-amber-500" />
                Search Filters
              </h2>

              <button
                type="button"
                onClick={handleClearAll}
                className="flex items-center gap-1 text-xs font-semibold text-gray-400 transition hover:text-amber-600"
              >
                <RotateCcw className="h-3 w-3" />
                Clear
              </button>
            </div>

            <FilterFields />

            {/* PROMO CARD */}
            <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-[#090b0c] p-5 text-white shadow-md">

              <div className="absolute -bottom-4 -right-4 opacity-15">
                <MapPin className="h-32 w-32 text-amber-400" />
              </div>

              <div className="relative z-10 space-y-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white shadow">
                  <MapPin className="h-5 w-5" />
                </div>

                <h3 className="font-serif text-base font-bold leading-tight text-white">
                  Have a Property to Sell?
                </h3>

                <p className="text-[11px] leading-relaxed text-gray-300">
                  List Your Property with BuyLand and reach thousands of buyers.
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/add-property")}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 px-4 py-2 text-xs font-bold text-white shadow transition hover:scale-105"
                >
                  <span>List Property</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </aside>

          {/* MOBILE FILTER DRAWER */}
          {isMobileFilterOpen && (
            <div
              className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileFilterOpen(false)}
            >
              <div
                className="ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >

                <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-4">

                  <h2 className="font-serif text-base font-bold text-gray-900">
                    Search Filters
                  </h2>

                  <button
                    type="button"
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <FilterFields />
              </div>
            </div>
          )}

          {/* PROPERTY RESULTS */}
          <main className="lg:col-span-3">

            {loading ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-16 text-center shadow-sm">
                <Loader2 className="mb-3 h-8 w-8 animate-spin text-amber-500" />

                <p className="text-sm font-semibold text-gray-600">
                  Loading approved properties...
                </p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-white p-12 text-center text-red-500 shadow-sm">
                <p className="text-sm font-bold">{error}</p>
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center shadow-sm">

                <MapPin className="mb-2 h-10 w-10 text-gray-300" />

                <h3 className="text-base font-bold text-gray-800">
                  No properties found
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  Try adjusting your location, property type or budget range.
                </p>

                <button
                  type="button"
                  onClick={handleClearAll}
                  className="mt-4 rounded-xl bg-gray-900 px-4 py-2 text-xs font-semibold text-white"
                >
                  Reset Filters
                </button>
              </div>
            ) : (

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {filteredProperties.map((item) => {
                  const propId = item._id || item.id;

                  const isFav = favorites.includes(propId);

                  const isWishlistLoading = wishlistLoading[propId];

                  const imageUrl =
                    item.image ||
                    item.images?.[0] ||
                    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop";

                  const formattedPrice =
                    item.priceFormatted ||
                    `₹ ${Number(item.price || 0).toLocaleString("en-IN")}`;

                  return (
                    <div
                      key={propId}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >

                      {/* PROPERTY IMAGE */}
                      <div className="relative h-44 w-full overflow-hidden bg-gray-100">

                        <img
                          src={imageUrl}
                          alt={item.title || "Property"}
                          loading="lazy"
                          className="h-full w-full cursor-pointer object-cover transition-transform duration-500 group-hover:scale-105"
                          onClick={() =>
                            navigate(`/propertiesDetails?id=${propId}`)
                          }
                        />

                        {/* STATUS */}
                        <span
                          className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-[10px] font-bold shadow-sm ${
                            item.badgeColor ||
                            "bg-emerald-500 text-white"
                          }`}
                        >
                          {item.badge || item.status || "Approved"}
                        </span>

                        {/* DATABASE WISHLIST HEART */}
                        <button
                          type="button"
                          onClick={(e) => toggleFavorite(propId, e)}
                          disabled={isWishlistLoading}
                          title={
                            isFav
                              ? "Remove from Wishlist"
                              : "Add to Wishlist"
                          }
                          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow backdrop-blur-md transition hover:text-rose-500 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isWishlistLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
                          ) : (
                            <Heart
                              className={`h-4 w-4 transition ${
                                isFav
                                  ? "fill-red-500 text-red-500"
                                  : "text-gray-700"
                              }`}
                            />
                          )}
                        </button>
                      </div>

                      {/* PROPERTY DETAILS */}
                      <div className="flex flex-1 flex-col justify-between p-4">

                        <div>

                          <h3
                            onClick={() =>
                              navigate(`/propertiesDetails?id=${propId}`)
                            }
                            className="line-clamp-1 cursor-pointer font-serif text-sm font-bold text-gray-900 transition hover:text-amber-600"
                          >
                            {item.title}
                          </h3>

                          <div className="mt-1 flex items-center gap-1 text-[11px] text-gray-500">

                            <MapPin className="h-3 w-3 shrink-0 text-amber-500" />

                            <span className="truncate">
                              {item.location || item.city || "Location not available"}
                            </span>
                          </div>

                          <div className="mt-3 flex items-baseline justify-between">

                            <span className="font-serif text-base font-extrabold text-gray-900">
                              {formattedPrice}
                            </span>

                            <span className="text-[11px] font-bold text-gray-400">
                              {item.sqydPrice || ""}
                            </span>
                          </div>
                        </div>

                        {/* SPECS */}
                        <div className="mt-3.5 flex items-center justify-between border-t border-gray-100 pt-3 text-[10px] font-medium text-gray-500">

                          <div className="flex items-center gap-1">
                            <Maximize2 className="h-3 w-3 text-gray-400" />

                            <span>
                              {item.area || "Area not available"}
                            </span>
                          </div>

                          <span>•</span>

                          <span>
                            {item.facing || item.roadAccess || "Main Road"}
                          </span>

                          <span>•</span>

                          <span className="text-gray-400">
                            {item.posted || "Approved"}
                          </span>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="mt-3.5 grid grid-cols-2 gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/propertiesDetails?id=${propId}`)
                            }
                            className="flex items-center justify-center gap-1 rounded-xl border border-gray-200 bg-white py-2 text-xs font-bold text-gray-700 shadow-sm transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"
                          >
                            <Eye className="h-3.5 w-3.5 text-amber-500" />
                            <span>View Details</span>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              alert(`Contacting owner for property #${propId}`)
                            }
                            className="flex items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 py-2 text-xs font-bold text-white shadow transition hover:scale-105"
                          >
                            <Phone className="h-3.5 w-3.5" />
                            <span>Contact Owner</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* PAGINATION */}
            {!loading && filteredProperties.length > 0 && (
              <div className="mt-10 flex items-center justify-center gap-1.5">
                <button
                  type="button"
                  disabled
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40"
                >
                  &lt;
                </button>

                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-xs font-bold text-white shadow"
                >
                  1
                </button>

                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  2
                </button>

                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
                >
                  &gt;
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* TRUST BADGES */}
      <div className="mt-16 border-t border-gray-200 bg-white py-8">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row lg:px-8">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow">
              <MapPin className="h-6 w-6" />
            </div>

            <div>
              <h3 className="font-serif text-base font-bold text-gray-900">
                Find Your Dream Property Today
              </h3>

              <p className="text-xs text-gray-500">
                BuyLand - Your Trusted Real Estate Partner
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-gray-700">

            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-amber-500" />
              <span>100% Verified Properties</span>
            </div>

            <div className="flex items-center gap-2">
              <Handshake className="h-4 w-4 text-amber-500" />
              <span>Trusted Platform</span>
            </div>

            <div className="flex items-center gap-2">
              <Headphones className="h-4 w-4 text-amber-500" />
              <span>24/7 Support</span>
            </div>

            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-500" />
              <span>Best Deals</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
