import React, { useState, useMemo } from "react";
import {
  MapPin,
  Heart,
  SlidersHorizontal,
  X,
  ChevronDown,
  Maximize2,
  Compass,
  ArrowUpDown,
  RotateCcw,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Sample Property Data strictly aligned with the design image
const INITIAL_PROPERTIES = [
  {
    id: 1,
    title: "Premium Plot in Ahmedabad",
    location: "Ahmedabad, Gujarat",
    city: "Ahmedabad",
    type: "Residential",
    price: 4500000,
    priceFormatted: "₹ 45,000,000",
    sqydPrice: "₹ 2,500/sq.yd",
    sqydPriceNum: 2500,
    area: "1800 sq.yd",
    facing: "East Facing",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop",
    badgeColor: "bg-[#fef3c7] text-[#92400e] border-[#fde68a]", // Golden/Warm pill
  },
  {
    id: 2,
    title: "Fertile Land in Gujarat",
    location: "Mehsana, Gujarat",
    city: "Mehsana",
    type: "Agricultural",
    price: 2800000,
    priceFormatted: "₹ 28,000,000",
    sqydPrice: "₹ 1,200/sq.yd",
    sqydPriceNum: 1200,
    area: "2500 sq.yd",
    facing: "North Facing",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
    badgeColor: "bg-[#dcfce7] text-[#166534] border-[#bbf7d0]", // Greenish pill
  },
  {
    id: 3,
    title: "Commercial Land",
    location: "Gandhinagar, Gujarat",
    city: "Gandhinagar",
    type: "Commercial",
    price: 12000000,
    priceFormatted: "₹ 1,20,00,000",
    sqydPrice: "₹ 5,000/sq.yd",
    sqydPriceNum: 5000,
    area: "5000 sq.yd",
    facing: "Main Road",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=800&auto=format&fit=crop",
    badgeColor: "bg-[#fef3c7] text-[#92400e] border-[#fde68a]", // Golden pill
  },
  {
    id: 4,
    title: "Agricultural Farm Plot",
    location: "Viramgam, Gujarat",
    city: "Viramgam",
    type: "Agricultural",
    price: 3500000,
    priceFormatted: "₹ 35,00,000",
    sqydPrice: "₹ 1,400/sq.yd",
    sqydPriceNum: 1400,
    area: "2200 sq.yd",
    facing: "West Facing",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    badgeColor: "bg-[#dcfce7] text-[#166534] border-[#bbf7d0]",
  },
  {
    id: 5,
    title: "Highway Commercial Plot",
    location: "Surat, Gujarat",
    city: "Surat",
    type: "Commercial",
    price: 9500000,
    priceFormatted: "₹ 95,00,000",
    sqydPrice: "₹ 4,200/sq.yd",
    sqydPriceNum: 4200,
    area: "3200 sq.yd",
    facing: "Corner Plot",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
    badgeColor: "bg-[#fef3c7] text-[#92400e] border-[#fde68a]",
  },
  {
    id: 6,
    title: "Luxury Gated Residency Plot",
    location: "Ahmedabad, Gujarat",
    city: "Ahmedabad",
    type: "Residential",
    price: 6800000,
    priceFormatted: "₹ 68,00,000",
    sqydPrice: "₹ 3,100/sq.yd",
    sqydPriceNum: 3100,
    area: "2100 sq.yd",
    facing: "South-East Facing",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop",
    badgeColor: "bg-[#fef3c7] text-[#92400e] border-[#fde68a]",
  },
];

export default function App() {
  // Filter States
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedTypes, setSelectedTypes] = useState(["Residential", "Agricultural", "Commercial"]);
  const [maxPrice, setMaxPrice] = useState(15000000); // 1.5 Cr max
  const [sortBy, setSortBy] = useState("latest");
  const [favorites, setFavorites] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Toggle Checkbox logic
  const handleTypeChange = (type) => {
    if (selectedTypes.includes(type)) {
      if (selectedTypes.length > 1) {
        setSelectedTypes(selectedTypes.filter((t) => t !== type));
      }
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  // Clear Filters
  const handleClearAll = () => {
    setSelectedLocation("All");
    setSelectedTypes(["Residential", "Agricultural", "Commercial"]);
    setMaxPrice(15000000);
    setSortBy("latest");
  };

  // Toggle Favorite
  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Filtered & Sorted Logic
  const filteredProperties = useMemo(() => {
    return INITIAL_PROPERTIES.filter((item) => {
      // Location Filter
      if (selectedLocation !== "All" && item.city !== selectedLocation) {
        return false;
      }
      // Type Filter
      if (!selectedTypes.includes(item.type)) {
        return false;
      }
      // Price Filter
      if (item.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "sqyd-low") return a.sqydPriceNum - b.sqydPriceNum;
      return b.id - a.id; // Latest default
    });
  }, [selectedLocation, selectedTypes, maxPrice, sortBy]);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-[#1a1c1e] antialiased">
      {/* Outer Wrapper */}
      <div className="mx-auto max-w-[1400px] px-3 py-6 sm:px-6 lg:px-10 lg:py-10">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between pb-6">
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-[#111315] sm:text-3xl lg:text-4xl">
              Our Premium Lands
            </h1>
            <p className="mt-1 text-xs font-normal text-gray-500 sm:text-sm">
              Explore the best properties for investment and living
            </p>
          </div>

          {/* Right Controls: Sort Dropdown & Mobile Filter Button */}
          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4 text-[#b48835]" />
              <span>Filters</span>
            </button>

            <div className="relative flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm transition hover:border-gray-300">
              <span className="text-xs font-medium text-gray-500 whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="cursor-pointer bg-transparent text-xs font-bold text-gray-900 outline-none pr-4"
              >
                <option value="latest">Latest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="sqyd-low">Rate: Low to High</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </header>

        {/* MAIN LAYOUT: Sidebar + Cards Grid */}
        <div className="mt-2 flex flex-col gap-6 lg:flex-row lg:items-start">
          
          {/* 1. LEFT SIDEBAR FILTERS (Desktop) */}
          <aside className="hidden w-72 shrink-0 rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] lg:block">
            {/* Filter Title & Clear All */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="font-serif text-lg font-bold text-gray-900">Filters</h2>
              <button
                onClick={handleClearAll}
                className="flex items-center gap-1 text-xs font-semibold text-gray-400 transition hover:text-[#a17424]"
              >
                <RotateCcw className="h-3 w-3" />
                Clear All
              </button>
            </div>

            {/* Filter Sections */}
            <div className="mt-5 space-y-6">
              
              {/* Location Select */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Location
                </label>
                <div className="relative mt-2">
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-medium text-gray-800 shadow-sm outline-none transition focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20"
                  >
                    <option value="All">All Locations</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Mehsana">Mehsana</option>
                    <option value="Gandhinagar">Gandhinagar</option>
                    <option value="Viramgam">Viramgam</option>
                    <option value="Surat">Surat</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Property Type Checkboxes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Property Type
                </label>
                <div className="mt-3 space-y-2.5">
                  {["Residential", "Agricultural", "Commercial"].map((type) => {
                    const isChecked = selectedTypes.includes(type);
                    return (
                      <label
                        key={type}
                        className="flex cursor-pointer items-center gap-3 text-xs font-medium text-gray-700 hover:text-gray-900"
                      >
                        <div
                          onClick={() => handleTypeChange(type)}
                          className={`flex h-4 w-4 items-center justify-center rounded border transition ${
                            isChecked
                              ? "border-[#a87a2a] bg-[#b88c38] text-white"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                        </div>
                        <span onClick={() => handleTypeChange(type)}>{type}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    Price Range
                  </label>
                  <span className="text-[11px] font-semibold text-[#966b1e]">
                    Up to ₹{(maxPrice / 100000).toFixed(0)}L
                  </span>
                </div>
                
                <div className="mt-3 px-1">
                  <input
                    type="range"
                    min={2000000}
                    max={15000000}
                    step={500000}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-[#b88c38]"
                  />
                  <div className="mt-2 flex justify-between text-[10px] font-medium text-gray-400">
                    <span>₹0</span>
                    <span>₹1.5 Cr+</span>
                  </div>
                </div>
              </div>

              {/* Apply Filters Button */}
              <button
                onClick={() => {}}
                className="w-full rounded-xl bg-gradient-to-r from-[#976c20] via-[#c69842] to-[#7d5614] py-2.5 text-xs font-bold text-white shadow-md transition-all hover:brightness-110 active:scale-[0.98]"
              >
                Apply Filters
              </button>
            </div>
          </aside>

          {/* MOBILE FILTER MODAL / DRAWER */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-sm lg:hidden">
              <div className="ml-auto flex h-full w-full max-w-xs flex-col bg-white p-5 shadow-2xl animate-in slide-in-from-right duration-200">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h2 className="font-serif text-lg font-bold text-gray-900">Filters</h2>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="rounded-full p-1 text-gray-400 hover:bg-gray-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4 flex-1 space-y-5 overflow-y-auto pr-1">
                  {/* Location Select */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                      Location
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-gray-200 p-2.5 text-xs font-medium text-gray-800 outline-none"
                    >
                      <option value="All">All Locations</option>
                      <option value="Ahmedabad">Ahmedabad</option>
                      <option value="Mehsana">Mehsana</option>
                      <option value="Gandhinagar">Gandhinagar</option>
                      <option value="Viramgam">Viramgam</option>
                      <option value="Surat">Surat</option>
                    </select>
                  </div>

                  {/* Property Type Checkboxes */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                      Property Type
                    </label>
                    <div className="mt-2.5 space-y-2">
                      {["Residential", "Agricultural", "Commercial"].map((type) => (
                        <label key={type} className="flex items-center gap-2.5 text-xs font-medium text-gray-700">
                          <input
                            type="checkbox"
                            checked={selectedTypes.includes(type)}
                            onChange={() => handleTypeChange(type)}
                            className="h-4 w-4 rounded border-gray-300 accent-[#b88c38]"
                          />
                          <span>{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Slider */}
                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase text-gray-700">
                      <span>Price Range</span>
                      <span className="text-[#a87a2a]">Up to ₹{(maxPrice / 100000).toFixed(0)}L</span>
                    </div>
                    <input
                      type="range"
                      min={2000000}
                      max={15000000}
                      step={500000}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="mt-3 w-full bg-gray-200 accent-[#b88c38]"
                    />
                  </div>
                </div>

                <div className="mt-4 flex gap-2 border-t border-gray-100 pt-3">
                  <button
                    onClick={handleClearAll}
                    className="w-1/3 rounded-xl border border-gray-200 py-2.5 text-xs font-semibold text-gray-600"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-2/3 rounded-xl bg-gradient-to-r from-[#976c20] to-[#c69842] py-2.5 text-xs font-bold text-white"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. PROPERTY CARDS GRID (Mobile: 2 Columns, Desktop: 3 Columns) */}
          <main className="flex-1">
            {filteredProperties.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center shadow-sm">
                <MapPin className="h-10 w-10 text-gray-300" />
                <h3 className="mt-3 text-base font-semibold text-gray-800">No properties found</h3>
                <p className="mt-1 text-xs text-gray-400">Try adjusting your filters to find suitable land options.</p>
                <button
                  onClick={handleClearAll}
                  className="mt-4 rounded-xl bg-gray-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-gray-800"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
                {filteredProperties.map((item) => {
                  const isFav = favorites.includes(item.id);
                  return (
                    <article
                      key={item.id}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      {/* Card Image Container */}
                      <div className="relative h-36 w-full overflow-hidden bg-gray-100 sm:h-48">
                        <img
                          onClick={()=>navigate("/propertiesDetails")}
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        
                        {/* Property Type Badge Overlay */}
                        <div className="absolute bottom-2.5 left-2.5">
                          <span
                            className={`inline-block rounded-md px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold shadow-sm backdrop-blur-sm ${item.badgeColor}`}
                          >
                            {item.type}
                          </span>
                        </div>

                        {/* Favorite Button Overlay */}
                        <button
                          onClick={(e) => toggleFavorite(item.id, e)}
                          className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 active:scale-95 sm:h-8 sm:w-8"
                          aria-label="Add to favorite"
                        >
                          <Heart
                            className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
                              isFav ? "fill-red-500 text-red-500" : "text-white"
                            }`}
                          />
                        </button>
                      </div>

                      {/* Card Body Details */}
                      <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
                        <div>
                          {/* Title */}
                          <h3 className="line-clamp-1 text-xs font-bold text-gray-900 sm:text-base group-hover:text-[#966b1e] transition-colors">
                            {item.title}
                          </h3>

                          {/* Location with Pin Icon */}
                          <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-gray-500 sm:text-xs">
                            <MapPin className="h-3 w-3 shrink-0 text-[#ef4444]" />
                            <span className="truncate">{item.location}</span>
                          </div>

                          {/* Price Breakdown */}
                          <div className="mt-2.5 flex flex-wrap items-baseline gap-1.5">
                            <span className="text-sm sm:text-lg font-extrabold text-[#111315]">
                              {item.priceFormatted}
                            </span>
                            <span className="text-[10px] sm:text-xs font-semibold text-gray-400">
                              {item.sqydPrice}
                            </span>
                          </div>
                        </div>

                        {/* Specs Bottom Row */}
                        <div className="mt-3.5 flex items-center justify-between border-t border-gray-100 pt-2.5 text-[10px] sm:text-xs font-medium text-gray-500">
                          <div className="flex items-center gap-1">
                            <Maximize2 className="h-3 w-3 text-gray-400" />
                            <span>{item.area}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Compass className="h-3 w-3 text-gray-400" />
                            <span>{item.facing}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}