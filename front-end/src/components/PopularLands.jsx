import React, { useState } from "react";
import {
  Heart,
  MapPin,
  ArrowRight,
  Maximize2,
  Compass,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const propertiesData = [
  {
    id: 1,
    title: "Residential Plot in Ahmedabad",
    location: "Ahmedabad, Gujarat",
    price: "₹ 45,00,000",
    size: "1,200 Sq.Ft",
    facing: "East Facing",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop",
    tag: "For Sale",
  },
  {
    id: 2,
    title: "Agricultural Land in Mehsana",
    location: "Mehsana, Gujarat",
    price: "₹ 32,00,000",
    size: "5 Bigha",
    facing: "North Facing",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop",
    tag: "For Sale",
  },
  {
    id: 3,
    title: "Commercial Plot in Surat",
    location: "Surat, Gujarat",
    price: "₹ 1,25,00,000",
    size: "2,000 Sq.Ft",
    facing: "Main Road",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600&auto=format&fit=crop",
    tag: "For Sale",
  },
  {
    id: 4,
    title: "Residential Land in Vadodara",
    location: "Vadodara, Gujarat",
    price: "₹ 75,00,000",
    size: "1,500 Sq.Ft",
    facing: "West Facing",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop",
    tag: "For Sale",
  },
];

export default function PopularLands() {
  const [favorites, setFavorites] = useState({});
  const navigate = useNavigate();

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="w-full bg-[#fbf9f5] py-12 sm:py-16 text-gray-900 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">

        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {/* Small Gold Tag with Line */}
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#b88c3a] uppercase">
              <span className="h-[2px] w-6 bg-[#b88c3a]" />
              <span>Popular Lands</span>
            </div>

            {/* Main Title */}
            <h2 className="mt-1 font-serif text-2xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Most Popular Properties
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-500 font-medium">
              Explore our handpicked properties in the best locations.
            </p>
          </div>

          {/* View All Properties Outline Button */}
          <div>
            <button
              type="button"
              onClick={() => navigate("/properties")}
              className="inline-flex items-center gap-2 rounded-full border border-[#d8b46a] bg-white px-5 py-2.5 text-xs font-bold text-gray-800 shadow-sm transition-all hover:bg-amber-50 hover:text-[#b88c3a] active:scale-[0.98] sm:text-sm"
            >
              <span>View All Properties</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Properties Cards Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {propertiesData.map((property) => (
            <div
              key={property.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-200/80 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              {/* Image Container */}
              <div className="relative h-44 w-full overflow-hidden sm:h-48">
                <img
                  src={property.image}
                  alt={property.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Green "For Sale" Badge */}
                <span className="absolute left-3 top-3 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-bold text-white shadow-sm">
                  {property.tag}
                </span>

                {/* Favorite Heart Button */}
                <button
                  type="button"
                  onClick={() => toggleFavorite(property.id)}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-700 backdrop-blur-md shadow-sm transition hover:bg-white hover:text-rose-500"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      favorites[property.id]
                        ? "fill-red-500 text-red-500"
                        : "text-gray-700"
                    }`}
                  />
                </button>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                <div>
                  {/* Title */}
                  <h3 className="font-serif text-sm sm:text-base font-bold text-gray-900 line-clamp-1">
                    {property.title}
                  </h3>

                  {/* Location */}
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-[#b88c3a]" />
                    <span className="truncate">{property.location}</span>
                  </div>
                </div>

                {/* Price & Size / Arrow Footer */}
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                  <div>
                    <span className="font-serif text-base sm:text-lg font-extrabold text-gray-900">
                      {property.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-500">
                      {property.size}
                    </span>

                    {/* Circular Golden Arrow Button */}
                    <button
                      type="button"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[#b88c3a] shadow-sm transition hover:bg-[#b88c3a] hover:text-white active:scale-95"
                    >
                      <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}