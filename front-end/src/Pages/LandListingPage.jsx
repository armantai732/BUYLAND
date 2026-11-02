import React, { useState, useMemo } from "react";
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
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const INITIAL_PROPERTIES = [
  {
    id: 1,
    title: "Agricultural Land in Mehsana",
    location: "Mehsana, Gujarat",
    city: "Mehsana",
    type: "Agricultural Land",
    price: 3200000,
    priceFormatted: "₹ 32,00,000",
    sqydPrice: "5 Bigha",
    area: "5 Bigha",
    facing: "Agricultural",
    posted: "Posted 3 days ago",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
    badge: "For Sale",
    badgeColor: "bg-emerald-500 text-white",
  },
  {
    id: 2,
    title: "Luxury Villa in Ahmedabad",
    location: "Ahmedabad, Gujarat",
    city: "Ahmedabad",
    type: "Residential Plot",
    price: 25000000,
    priceFormatted: "₹ 2,50,00,000",
    sqydPrice: "2500 Sq.Ft",
    area: "2500 Sq.Ft",
    facing: "Residential",
    posted: "Posted today ago",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    badge: "For Sale",
    badgeColor: "bg-emerald-500 text-white",
  },
  {
    id: 3,
    title: "Commercial Plot in Surat",
    location: "Surat, Gujarat",
    city: "Surat",
    type: "Commercial Land",
    price: 12500000,
    priceFormatted: "₹ 1,25,00,000",
    sqydPrice: "1800 Sq.Ft",
    area: "1800 Sq.Ft",
    facing: "Commercial",
    posted: "Posted 5 days ago",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    badge: "For Sale",
    badgeColor: "bg-emerald-500 text-white",
  },
  {
    id: 4,
    title: "Premium Land in Vadodara",
    location: "Vadodara, Gujarat",
    city: "Vadodara",
    type: "Agricultural Land",
    price: 4500000,
    priceFormatted: "₹ 45,00,000",
    sqydPrice: "2 Bigha",
    area: "2 Bigha",
    facing: "Agricultural",
    posted: "Posted 2 days ago",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop",
    badge: "Featured",
    badgeColor: "bg-rose-500 text-white",
  },
  {
    id: 5,
    title: "Residential Plot in Rajkot",
    location: "Rajkot, Gujarat",
    city: "Rajkot",
    type: "Residential Plot",
    price: 2800000,
    priceFormatted: "₹ 28,00,000",
    sqydPrice: "1200 Sq.Ft",
    area: "1200 Sq.Ft",
    facing: "Residential",
    posted: "Posted 1 week ago",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop",
    badge: "For Sale",
    badgeColor: "bg-emerald-500 text-white",
  },
  {
    id: 6,
    title: "Modern House in Gandhinagar",
    location: "Gandhinagar, Gujarat",
    city: "Gandhinagar",
    type: "Residential Plot",
    price: 8500000,
    priceFormatted: "₹ 85,00,000",
    sqydPrice: "1800 Sq.Ft",
    area: "1800 Sq.Ft",
    facing: "Residential",
    posted: "Posted today",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=800&auto=format&fit=crop",
    badge: "Sold Out",
    badgeColor: "bg-slate-700 text-white",
  },
  {
    id: 7,
    title: "Agricultural Land in Surat",
    location: "Surat, Gujarat",
    city: "Surat",
    type: "Agricultural Land",
    price: 1800000,
    priceFormatted: "₹ 18,00,000",
    sqydPrice: "1 Acre",
    area: "1 Acre",
    facing: "Agricultural",
    posted: "Posted 1 week ago",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
    badge: "For Sale",
    badgeColor: "bg-emerald-500 text-white",
  },
  {
    id: 8,
    title: "Commercial Plot in Ahmedabad",
    location: "Ahmedabad, Gujarat",
    city: "Ahmedabad",
    type: "Commercial Land",
    price: 9000000,
    priceFormatted: "₹ 90,00,000",
    sqydPrice: "1500 Sq.Ft",
    area: "1500 Sq.Ft",
    facing: "Commercial",
    posted: "Posted 1 week ago",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
    badge: "For Sale",
    badgeColor: "bg-emerald-500 text-white",
  },
  {
    id: 9,
    title: "Residential Plot in Gandhinagar",
    location: "Gandhinagar, Gujarat",
    city: "Gandhinagar",
    type: "Residential Plot",
    price: 4000000,
    priceFormatted: "₹ 40,00,000",
    sqydPrice: "1500 Sq.Ft",
    area: "1500 Sq.Ft",
    facing: "Residential",
    posted: "Posted 1 week ago",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    badge: "For Sale",
    badgeColor: "bg-emerald-500 text-white",
  },
];

const PROPERTY_TYPES = ["Residential Plot", "Agricultural Land", "Commercial Land", "Industrial Land"];
const LOCATIONS = ["Ahmedabad", "Viramgam", "Surat", "Rajkot", "Vadodara", "Mehsana", "Gandhinagar"];

export default function Properties() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const queryLocation = searchParams.get("location") || "";
  const queryType = searchParams.get("type") || "";

  const [selectedLocation, setSelectedLocation] = useState(
    LOCATIONS.includes(queryLocation) ? queryLocation : ""
  );
  const [selectedTypes, setSelectedTypes] = useState(
    PROPERTY_TYPES.includes(queryType) ? [queryType] : PROPERTY_TYPES
  );
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [maxArea, setMaxArea] = useState(10000);
  const [sortBy, setSortBy] = useState("Newest First");
  const [favorites, setFavorites] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleClearAll = () => {
    setSelectedLocation("");
    setSelectedTypes(PROPERTY_TYPES);
    setMaxPrice(10000000);
    setMaxArea(10000);
  };

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const filteredProperties = useMemo(() => {
    return INITIAL_PROPERTIES.filter((item) => {
      if (selectedLocation && item.city.toLowerCase() !== selectedLocation.toLowerCase()) {
        return false;
      }
      if (!selectedTypes.includes(item.type)) {
        return false;
      }
      if (item.price > maxPrice) {
        return false;
      }
      return true;
    });
  }, [selectedLocation, selectedTypes, maxPrice]);

  const FilterFields = () => (
    <div className="space-y-6 text-xs">
      {/* Location */}
      <div>
        <label className="block font-bold text-gray-700 mb-2">Location</label>
        <div className="relative">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 pr-8 text-xs font-medium text-gray-800 outline-none focus:border-amber-400 focus:bg-white"
          >
            <option value="">Select Location</option>
            {LOCATIONS.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Property Type */}
      <div>
        <label className="block font-bold text-gray-700 mb-2.5">Property Type</label>
        <div className="space-y-2.5">
          {PROPERTY_TYPES.map((type) => {
            const checked = selectedTypes.includes(type);
            return (
              <label key={type} className="flex cursor-pointer items-center gap-2.5 font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleTypeChange(type)}
                  className="rounded border-gray-300 text-amber-600 focus:ring-amber-400 cursor-pointer h-4 w-4"
                />
                <span>{type}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Budget Range */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="font-bold text-gray-700">Budget Range</label>
          <span className="font-bold text-amber-600">
            {maxPrice >= 10000000 ? `₹${(maxPrice / 10000000).toFixed(1)} Cr+` : `₹${(maxPrice / 100000).toFixed(0)} Lakh`}
          </span>
        </div>
        <input
          type="range"
          min={1000000}
          max={10000000}
          step={500000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-amber-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>₹0</span>
          <span>₹10 Cr+</span>
        </div>
      </div>

      {/* Area (Sq.Ft) */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="font-bold text-gray-700">Area (Sq.Ft)</label>
          <span className="font-bold text-amber-600">0 - {maxArea.toLocaleString()} Sq.Ft</span>
        </div>
        <input
          type="range"
          min={500}
          max={10000}
          step={500}
          value={maxArea}
          onChange={(e) => setMaxArea(Number(e.target.value))}
          className="w-full accent-amber-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>0</span>
          <span>10000+ Sq.Ft</span>
        </div>
      </div>

      {/* Sort By */}
      <div>
        <label className="block font-bold text-gray-700 mb-2">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 pr-8 text-xs font-medium text-gray-800 outline-none focus:border-amber-400 focus:bg-white cursor-pointer"
        >
          <option>Newest First</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>

      {/* Apply Filters Button */}
      <button
        type="button"
        onClick={() => setIsMobileFilterOpen(false)}
        className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 py-3 text-xs font-bold text-white shadow-md transition hover:scale-[1.02] active:scale-95"
      >
        Apply Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-gray-800">

      {/* HERO HEADER BANNER */}
      <div className="relative bg-[#090b0c] text-white overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
            alt="Luxury building background"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">
            PREMIUM REAL ESTATE
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-1 text-white">
            Our Properties
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-gray-300 font-medium">
            Find the perfect property that matches your needs.
          </p>

          {/* Breadcrumb */}
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-300">
            <button onClick={() => navigate("/")} className="flex items-center gap-1 hover:text-amber-400 transition">
              <Home className="h-3.5 w-3.5" />
              <span>Home</span>
            </button>
            <span>&gt;</span>
            <span className="text-amber-400 font-semibold">Properties</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Top Count & View Toggle Bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs sm:text-sm font-semibold text-gray-600">
            Showing <span className="text-gray-900 font-bold">1-{filteredProperties.length}</span> of <span className="text-gray-900 font-bold">48</span> Properties
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 shadow-sm lg:hidden hover:bg-gray-50"
            >
              <SlidersHorizontal className="h-4 w-4 text-amber-500" />
              <span>Filters</span>
            </button>

            <div className="hidden sm:flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
              <button className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                <Grid className="h-4 w-4" />
              </button>
              <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600">
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* SIDEBAR AND PROPERTY CARDS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

          {/* DESKTOP FILTERS SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-1 rounded-2xl bg-white p-6 shadow-sm border border-gray-100 space-y-6 sticky top-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="font-serif text-base font-bold text-gray-900 flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-amber-500" /> Search Filters
              </h2>
              <button
                type="button"
                onClick={handleClearAll}
                className="flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-amber-600 transition"
              >
                <RotateCcw className="h-3 w-3" />
                Clear
              </button>
            </div>
            <FilterFields />

            {/* SIDEBAR PROMO CARD: Have a Property to Sell? */}
            <div className="relative overflow-hidden rounded-2xl bg-[#090b0c] p-5 text-white shadow-md border border-amber-500/30">
              <div className="absolute -right-4 -bottom-4 opacity-15">
                <MapPin className="h-32 w-32 text-amber-400" />
              </div>
              <div className="relative z-10 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white shadow">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-base font-bold text-white leading-tight">
                  Have a Property to Sell?
                </h3>
                <p className="text-[11px] text-gray-300 leading-relaxed">
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
            <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setIsMobileFilterOpen(false)}>
              <div className="ml-auto flex h-full w-full max-w-xs flex-col bg-white p-6 shadow-2xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                  <h2 className="font-serif text-base font-bold text-gray-900">Search Filters</h2>
                  <button type="button" onClick={() => setIsMobileFilterOpen(false)} className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <FilterFields />
              </div>
            </div>
          )}

          {/* PROPERTY RESULTS GRID */}
          <main className="lg:col-span-3">
            {filteredProperties.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center shadow-sm">
                <MapPin className="h-10 w-10 text-gray-300 mb-2" />
                <h3 className="text-base font-bold text-gray-800">No properties found</h3>
                <p className="text-xs text-gray-400 mt-1">Try adjusting your location, property type or budget range.</p>
                <button type="button" onClick={handleClearAll} className="mt-4 rounded-xl bg-gray-900 px-4 py-2 text-xs font-semibold text-white">
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((item) => {
                  const isFav = favorites.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      {/* Image Thumbnail */}
                      <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="h-full w-full cursor-pointer object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Status Badge */}
                        <span className={`absolute top-3 left-3 rounded-md px-2.5 py-1 text-[10px] font-bold shadow-sm ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                        {/* Favorite Heart */}
                        <button
                          type="button"
                          onClick={(e) => toggleFavorite(item.id, e)}
                          className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-gray-700 backdrop-blur-md shadow hover:text-rose-500 transition"
                        >
                          <Heart className={`h-4 w-4 ${isFav ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
                        </button>
                      </div>

                      {/* Card Details */}
                      <div className="flex flex-1 flex-col justify-between p-4">
                        <div>
                          <h3
                            onClick={() => navigate(`/propertiesDetails?id=${item.id}`)}
                            className="font-serif text-sm font-bold text-gray-900 line-clamp-1 cursor-pointer hover:text-amber-600 transition"
                          >
                            {item.title}
                          </h3>

                          <div className="mt-1 flex items-center gap-1 text-[11px] text-gray-500">
                            <MapPin className="h-3 w-3 text-amber-500 shrink-0" />
                            <span className="truncate">{item.location}</span>
                          </div>

                          <div className="mt-3 flex items-baseline justify-between">
                            <span className="font-serif text-base font-extrabold text-gray-900">
                              {item.priceFormatted}
                            </span>
                            <span className="text-[11px] font-bold text-gray-400">
                              {item.sqydPrice}
                            </span>
                          </div>
                        </div>

                        {/* Specs Footer */}
                        <div className="mt-3.5 pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500 font-medium">
                          <div className="flex items-center gap-1">
                            <Maximize2 className="h-3 w-3 text-gray-400" />
                            <span>{item.area}</span>
                          </div>
                          <span>•</span>
                          <span>{item.facing}</span>
                          <span>•</span>
                          <span className="text-gray-400">{item.posted}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-3.5 grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => navigate(`/propertiesDetails?id=${item.id}`)}
                            className="flex items-center justify-center gap-1 rounded-xl border border-gray-200 bg-white py-2 text-xs font-bold text-gray-700 shadow-sm hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700 transition"
                          >
                            <Eye className="h-3.5 w-3.5 text-amber-500" />
                            <span>View Details</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => alert(`Contacting owner for property #${item.id}`)}
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

            {/* PAGINATION FOOTER */}
            <div className="mt-10 flex items-center justify-center gap-1.5">
              <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50">
                &lt;
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-xs font-bold text-white shadow">
                1
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50">
                3
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50">
                4
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50">
                &gt;
              </button>
            </div>
          </main>

        </div>

      </div>

      {/* BOTTOM TRUST BADGES BANNER */}
      <div className="mt-16 bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-gray-900">Find Your Dream Property Today</h3>
              <p className="text-xs text-gray-500">BuyLand - Your Trusted Real Estate Partner</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-gray-700">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-amber-500" />
              <span>100% Verified Properties</span>[cite: 6]
            </div>
            <div className="flex items-center gap-2">
              <Handshake className="h-4 w-4 text-amber-500" />
              <span>Trusted Platform</span>[cite: 6]
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="h-4 w-4 text-amber-500" />
              <span>24/7 Support</span>[cite: 6]
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