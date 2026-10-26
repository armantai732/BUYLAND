import React, { useState } from "react";
import {
  Flame,
  ArrowRight,
  Heart,
  MapPin,
  Compass,
  Maximize2,
} from "lucide-react";

const propertiesData = [
  {
    id: 1,
    title: "Residential Plot",
    location: "Ahmedabad, Gujarat",
    price: "₹ 45,000,000",
    size: "1200 sq.yd",
    facing: "East Facing",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop",
    tag: "For Sale",
  },
  {
    id: 2,
    title: "Agricultural Land",
    location: "Mehsana, Gujarat",
    price: "₹ 28,000,000",
    size: "2500 sq.yd",
    facing: "North Facing",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop",
    tag: "For Sale",
  },
  {
    id: 3,
    title: "Commercial Land",
    location: "Gandhinagar, Gujarat",
    price: "₹ 1,20,00,000",
    size: "5000 sq.yd",
    facing: "Main Road",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600&auto=format&fit=crop",
    tag: "For Sale",
  },
  {
    id: 4,
    title: "Residential Plot",
    location: "Surendranagar, Gujarat",
    price: "₹ 32,00,000",
    size: "1500 sq.yd",
    facing: "West Facing",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop",
    tag: "For Sale",
  },
];

export default function PopularLands() {
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="w-full bg-[#061517] py-12 sm:py-20 text-white font-sans">
      <div className="mx-auto max-w-7xl px-3 sm:px-8 lg:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {/* Tag */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#f5ca7b]">
              <Flame className="h-4 w-4 fill-[#f5ca7b] text-[#f5ca7b]" />
              <span>Featured Properties</span>
            </div>

            {/* Main Title */}
            <h2 className="mt-1 font-serif text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Popular Lands for You
            </h2>
            <p className="mt-2 text-xs text-gray-400 font-light sm:text-sm">
              Explore our handpicked properties and find the perfect land for your future.
            </p>
          </div>

          {/* View All Button */}
          <div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffe59a] via-[#f4ca68] to-[#edbb4d] px-5 py-2.5 text-xs font-bold text-[#30230c] shadow-md transition-all hover:brightness-105 active:scale-[0.98] sm:text-sm"
            >
              <span>View All Properties</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Properties Cards Grid (Mobile: 2 Columns - grid-cols-2) */}
        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:gap-6 lg:grid-cols-4">
          {propertiesData.map((property) => (
            <div
              key={property.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white text-gray-800 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
            >
              {/* Image Container */}
              <div className="relative h-32 w-full overflow-hidden sm:h-48">
                <img
                  src={property.image}
                  alt={property.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* For Sale Pill Badge */}
                <span className="absolute left-2.5 top-2.5 rounded-full bg-[#0f292a]/80 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md sm:text-xs">
                  {property.tag}
                </span>

                {/* Favorite Heart Button */}
                <button
                  type="button"
                  onClick={() => toggleFavorite(property.id)}
                  className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition hover:bg-black/60 sm:h-8 sm:w-8"
                >
                  <Heart
                    className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
                      favorites[property.id]
                        ? "fill-red-500 text-red-500"
                        : "text-white"
                    }`}
                  />
                </button>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-3 sm:p-5">
                <div>
                  {/* Title */}
                  <h3 className="font-serif text-xs font-bold text-gray-900 sm:text-lg line-clamp-1">
                    {property.title}
                  </h3>

                  {/* Location */}
                  <div className="mt-1 flex items-center gap-1 text-[10px] text-gray-500 sm:text-xs">
                    <MapPin className="h-3 w-3 shrink-0 text-[#d8b46a]" />
                    <span className="truncate">{property.location}</span>
                  </div>

                  {/* Price */}
                  <p className="mt-2 font-bold text-[#b88c3a] text-xs sm:text-xl">
                    {property.price}
                  </p>
                </div>

                {/* Card Footer Features & Arrow Action Button */}
                <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2.5">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] text-gray-500 sm:text-xs font-medium">
                    {/* Size */}
                    <div className="flex items-center gap-1">
                      <Maximize2 className="h-2.5 w-2.5 text-gray-400 sm:h-3 sm:w-3" />
                      <span>{property.size}</span>
                    </div>

                    {/* Facing */}
                    <div className="flex items-center gap-1">
                      <Compass className="h-2.5 w-2.5 text-gray-400 sm:h-3 sm:w-3" />
                      <span className="truncate">{property.facing}</span>
                    </div>
                  </div>

                  {/* Circular Golden Action Button */}
                  <button
                    type="button"
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f4ca68] text-[#30230c] shadow-sm transition hover:scale-110 active:scale-95 sm:h-8 sm:w-8"
                  >
                    <ArrowRight className="h-3 w-3 stroke-[2.5] sm:h-4 sm:w-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}