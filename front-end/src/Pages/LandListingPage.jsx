import React, { useState, useMemo, useEffect } from "react";
import {
  MapPin,
  Heart,
  SlidersHorizontal,
  X,
  ChevronDown,
  Maximize2,
  Compass,
  RotateCcw,
  Check,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const INITIAL_PROPERTIES = [
  {
    id: 1,
    title: "Premium Plot in Ahmedabad",
    location: "Ahmedabad, Gujarat",
    city: "Ahmedabad",
    type: "Residential",
    price: 4500000,
    priceFormatted: "₹ 45,00,000",
    sqydPrice: "₹ 2,500/sq.yd",
    sqydPriceNum: 2500,
    area: "1800 sq.yd",
    facing: "East Facing",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop",
    badgeColor: "bg-[#fef3c7] text-[#92400e] border-[#fde68a]",
  },
  {
    id: 2,
    title: "Fertile Land in Gujarat",
    location: "Mehsana, Gujarat",
    city: "Mehsana",
    type: "Agricultural",
    price: 2800000,
    priceFormatted: "₹ 28,00,000",
    sqydPrice: "₹ 1,200/sq.yd",
    sqydPriceNum: 1200,
    area: "2500 sq.yd",
    facing: "North Facing",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
    badgeColor: "bg-[#dcfce7] text-[#166534] border-[#bbf7d0]",
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
    image:
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=800&auto=format&fit=crop",
    badgeColor: "bg-[#fef3c7] text-[#92400e] border-[#fde68a]",
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
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop",
    badgeColor: "bg-[#fef3c7] text-[#92400e] border-[#fde68a]",
  },
];

const PROPERTY_TYPES = ["Residential", "Agricultural", "Commercial"];

const BUDGET_OPTIONS = [
  { value: "", label: "Any Budget" },
  { value: "under-10-lakh", label: "Under ₹10 Lakh" },
  { value: "10-25-lakh", label: "₹10–25 Lakh" },
  { value: "25-50-lakh", label: "₹25–50 Lakh" },
  { value: "above-50-lakh", label: "Above ₹50 Lakh" },
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

function matchesBudget(price, budget) {
  switch (budget) {
    case "under-10-lakh":
      return price < 1000000;

    case "10-25-lakh":
      return price >= 1000000 && price <= 2500000;

    case "25-50-lakh":
      return price > 2500000 && price <= 5000000;

    case "above-50-lakh":
      return price > 5000000;

    default:
      return true;
  }
}

function getInitialTypes(type) {
  return PROPERTY_TYPES.includes(type) ? [type] : PROPERTY_TYPES;
}

export default function Properties() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Read search criteria from Hero URL
  const queryLocation = searchParams.get("location") || "";
  const queryType = searchParams.get("type") || "";
  const queryBudget = searchParams.get("budget") || "";

  const [selectedLocation, setSelectedLocation] = useState(
    LOCATIONS.includes(queryLocation) ? queryLocation : "All"
  );

  const [selectedTypes, setSelectedTypes] = useState(
    getInitialTypes(queryType)
  );

  const [selectedBudget, setSelectedBudget] = useState(
    BUDGET_OPTIONS.some((option) => option.value === queryBudget)
      ? queryBudget
      : ""
  );

  const [maxPrice, setMaxPrice] = useState(15000000);
  const [sortBy, setSortBy] = useState("latest");
  const [favorites, setFavorites] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Update filters when URL query changes
  useEffect(() => {
    setSelectedLocation(
      LOCATIONS.includes(queryLocation) ? queryLocation : "All"
    );
    setSelectedTypes(getInitialTypes(queryType));
    setSelectedBudget(
      BUDGET_OPTIONS.some((option) => option.value === queryBudget)
        ? queryBudget
        : ""
    );
  }, [queryLocation, queryType, queryBudget]);

  const handleTypeChange = (type) => {
    setSelectedTypes((previous) => {
      if (previous.includes(type)) {
        // Allow all types to be unchecked
        return previous.filter((item) => item !== type);
      }

      return [...previous, type];
    });
  };

  const handleClearAll = () => {
    setSelectedLocation("All");
    setSelectedTypes(PROPERTY_TYPES);
    setSelectedBudget("");
    setMaxPrice(15000000);
    setSortBy("latest");
  };

  const toggleFavorite = (id, event) => {
    event.stopPropagation();

    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((favoriteId) => favoriteId !== id)
        : [...previous, id]
    );
  };

  const filteredProperties = useMemo(() => {
    return INITIAL_PROPERTIES.filter((item) => {
      if (
        selectedLocation !== "All" &&
        item.city.toLowerCase() !== selectedLocation.toLowerCase()
      ) {
        return false;
      }

      if (!selectedTypes.includes(item.type)) {
        return false;
      }

      if (!matchesBudget(item.price, selectedBudget)) {
        return false;
      }

      if (item.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "sqyd-low") return a.sqydPriceNum - b.sqydPriceNum;

      return b.id - a.id;
    });
  }, [selectedLocation, selectedTypes, selectedBudget, maxPrice, sortBy]);

  const FilterFields = () => (
    <div className="space-y-6">
      {/* Location */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
          Location
        </label>

        <div className="relative mt-2">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 pr-9 text-xs font-medium text-gray-800 shadow-sm outline-none focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20"
          >
            <option value="All">All Locations</option>
            {LOCATIONS.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
          Property Type
        </label>

        <div className="mt-3 space-y-2.5">
          {PROPERTY_TYPES.map((type) => {
            const checked = selectedTypes.includes(type);

            return (
              <label
                key={type}
                className="flex cursor-pointer items-center gap-3 text-xs font-medium text-gray-700 hover:text-gray-900"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleTypeChange(type)}
                  className="sr-only"
                />
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded border transition ${
                    checked
                      ? "border-[#a87a2a] bg-[#b88c38] text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {checked && <Check className="h-3 w-3 stroke-[3]" />}
                </span>
                <span>{type}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
          Budget
        </label>

        <div className="relative mt-2">
          <select
            value={selectedBudget}
            onChange={(e) => setSelectedBudget(e.target.value)}
            className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 pr-9 text-xs font-medium text-gray-800 shadow-sm outline-none focus:border-[#d4a853]"
          >
            {BUDGET_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Maximum Price */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
            Maximum Price
          </label>
          <span className="text-[11px] font-semibold text-[#966b1e]">
            {maxPrice >= 10000000
              ? `₹${(maxPrice / 10000000).toFixed(2)} Cr`
              : `₹${(maxPrice / 100000).toFixed(0)} Lakh`}
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
            <span>₹20 Lakh</span>
            <span>₹1.5 Cr</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-[#1a1c1e] antialiased">
      <div className="mx-auto max-w-[1400px] px-3 py-6 sm:px-6 lg:px-10 lg:py-10">
        {/* Page Header */}
        <header className="flex flex-col gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-[#111315] sm:text-3xl lg:text-4xl">
              Our Premium Lands
            </h1>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Explore the best properties for investment and living
            </p>
            <p className="mt-2 text-xs font-semibold text-[#966b1e]">
              {filteredProperties.length} properties found
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4 text-[#b48835]" />
              Filters
            </button>

            <div className="relative flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
              <span className="whitespace-nowrap text-xs font-medium text-gray-500">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="cursor-pointer bg-transparent pr-4 text-xs font-bold text-gray-900 outline-none"
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

        {/* Sidebar and Property Cards */}
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Desktop Filters */}
          <aside className="hidden w-72 shrink-0 rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] lg:block">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="font-serif text-lg font-bold text-gray-900">
                Filters
              </h2>
              <button
                type="button"
                onClick={handleClearAll}
                className="flex items-center gap-1 text-xs font-semibold text-gray-400 transition hover:text-[#a17424]"
              >
                <RotateCcw className="h-3 w-3" />
                Clear All
              </button>
            </div>

            <div className="mt-5">
              <FilterFields />
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          {isMobileFilterOpen && (
            <div
              className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileFilterOpen(false)}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Property filters"
                className="ml-auto flex h-full w-full max-w-xs flex-col bg-white p-5 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h2 className="font-serif text-lg font-bold text-gray-900">
                    Filters
                  </h2>
                  <button
                    type="button"
                    onClick={() => setIsMobileFilterOpen(false)}
                    aria-label="Close filters"
                    className="rounded-full p-1 text-gray-400 hover:bg-gray-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-5 flex-1 overflow-y-auto pr-1">
                  <FilterFields />
                </div>

                <div className="mt-4 flex gap-2 border-t border-gray-100 pt-3">
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="w-1/3 rounded-xl border border-gray-200 py-2.5 text-xs font-semibold text-gray-600"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-2/3 rounded-xl bg-gradient-to-r from-[#976c20] to-[#c69842] py-2.5 text-xs font-bold text-white"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Property Results */}
          <main className="min-w-0 flex-1">
            {filteredProperties.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">
                <MapPin className="h-10 w-10 text-gray-300" />
                <h3 className="mt-3 text-base font-semibold text-gray-800">
                  No properties found
                </h3>
                <p className="mt-1 text-xs text-gray-400">
                  Try adjusting your location, property type or budget.
                </p>
                <button
                  type="button"
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
                      {/* Image */}
                      <div className="relative h-36 w-full overflow-hidden bg-gray-100 sm:h-48">
                        <img
                          onClick={() =>
                            navigate(`/propertiesDetails?id=${item.id}`)
                          }
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="h-full w-full cursor-pointer object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        <div className="absolute bottom-2.5 left-2.5">
                          <span
                            className={`inline-block rounded-md border px-2.5 py-0.5 text-[10px] font-semibold shadow-sm sm:text-xs ${item.badgeColor}`}
                          >
                            {item.type}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => toggleFavorite(item.id, e)}
                          aria-label={
                            isFav ? "Remove from favorites" : "Add to favorites"
                          }
                          className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 active:scale-95 sm:h-8 sm:w-8"
                        >
                          <Heart
                            className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
                              isFav ? "fill-red-500 text-red-500" : "text-white"
                            }`}
                          />
                        </button>
                      </div>

                      {/* Details */}
                      <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
                        <div>
                          <h3 className="line-clamp-2 text-xs font-bold text-gray-900 transition-colors group-hover:text-[#966b1e] sm:text-base">
                            {item.title}
                          </h3>

                          <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-gray-500 sm:text-xs">
                            <MapPin className="h-3 w-3 shrink-0 text-red-500" />
                            <span className="truncate">{item.location}</span>
                          </div>

                          <div className="mt-2.5 flex flex-wrap items-baseline gap-1.5">
                            <span className="text-sm font-extrabold text-[#111315] sm:text-lg">
                              {item.priceFormatted}
                            </span>
                            <span className="text-[10px] font-semibold text-gray-400 sm:text-xs">
                              {item.sqydPrice}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3.5 flex items-center justify-between gap-2 border-t border-gray-100 pt-2.5 text-[10px] font-medium text-gray-500 sm:text-xs">
                          <div className="flex items-center gap-1">
                            <Maximize2 className="h-3 w-3 shrink-0 text-gray-400" />
                            <span>{item.area}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Compass className="h-3 w-3 shrink-0 text-gray-400" />
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