import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    title: "Residential Plots",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Agricultural Land",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Commercial Land",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Industrial Land",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Investment Land",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=400&auto=format&fit=crop",
  },
];

export default function LandCategories() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-[#fbf9f5] py-12 sm:py-16 text-gray-900 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Header Section (Col 4) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Small Gold Tag with Line */}
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#b88c3a] uppercase">
              <span className="h-[2px] w-6 bg-[#b88c3a]" />
              <span>Land Categories</span>
            </div>

            {/* Main Title */}
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Explore Land Categories
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
              Find the perfect property as per your needs.
            </p>

            {/* View All Categories Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate("/properties")}
                className="inline-flex items-center gap-2 rounded-full bg-[#b88c3a] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:bg-[#a17730] active:scale-[0.98]"
              >
                <span>View All Categories</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Right Cards Grid (Col 8) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.map(({ id, title, image }) => (
              <div
                key={id}
                onClick={() => navigate(`/properties?category=${encodeURIComponent(title)}`)}
                className="group relative flex flex-col items-center rounded-2xl bg-white border border-gray-200/80 p-3 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative h-32 w-full overflow-hidden rounded-xl">
                  <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Title */}
                <h3 className="mt-3 text-center font-serif text-xs sm:text-sm font-bold text-gray-900 transition-colors group-hover:text-[#b88c3a]">
                  {title}
                </h3>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}