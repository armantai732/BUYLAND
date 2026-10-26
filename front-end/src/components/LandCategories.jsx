import React from "react";
import {
  Home,
  Sprout,
  Building2,
  Factory,
  Trees,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    id: 1,
    title: "Residential Land",
    Icon: Home,
  },
  {
    id: 2,
    title: "Agricultural Land",
    Icon: Sprout,
  },
  {
    id: 3,
    title: "Commercial Land",
    Icon: Building2,
  },
  {
    id: 4,
    title: "Industrial Land",
    Icon: Factory,
  },
  {
    id: 5,
    title: "Recreational Land",
    Icon: Trees,
  },
  {
    id: 6,
    title: "Investment Land",
    Icon: TrendingUp,
  },
];

export default function LandCategories() {
  return (
    <section className="w-full bg-[#061517] py-12 sm:py-20 text-white font-sans">
      <div className="mx-auto max-w-7xl px-3 sm:px-8 lg:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Land Categories
            </h2>
            <p className="mt-2 text-xs text-gray-400 font-light sm:text-sm">
              Choose from a wide range of land types based on your needs.
            </p>
          </div>

          {/* View All Categories Button */}
          <div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffe59a] via-[#f4ca68] to-[#edbb4d] px-5 py-2.5 text-xs font-bold text-[#30230c] shadow-md transition-all hover:brightness-105 active:scale-[0.98] sm:text-sm"
            >
              <span>View All Categories</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Categories Cards Grid (Mobile: 2 Columns - grid-cols-2) */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-6">
          {categories.map(({ id, title, Icon }) => (
            <div
              key={id}
              className="group relative flex flex-col items-center justify-center rounded-2xl border border-[#d8b46a]/40 bg-[#0c2225]/60 p-6 sm:p-8 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#ffd77f] hover:bg-[#102d31] hover:shadow-[0_0_25px_rgba(216,180,106,0.2)] cursor-pointer"
            >
              {/* Golden Icon */}
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-[#d8b46a]/10 text-[#ffd77f] transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.7} />
              </div>

              {/* Title */}
              <h3 className="mt-4 font-serif text-xs sm:text-sm font-semibold text-white tracking-wide transition-colors group-hover:text-[#ffd77f]">
                {title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}