import { useState } from "react";
import {
  UsersRound,
  House,
  MapPin,
  Handshake,
  ChevronDown,
  Search,
} from "lucide-react";

import landHero from "../assets/GoldenBg.png";

const stats = [
  { value: "10K+", label: "Happy Customers", Icon: UsersRound },
  { value: "5K+", label: "Properties Listed", Icon: House },
  { value: "50+", label: "Cities Covered", Icon: MapPin },
  { value: "100%", label: "Trusted Platform", Icon: Handshake },
];

export default function Hero() {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (location) params.set("location", location);
    if (type) params.set("type", type);
    if (budget) params.set("budget", budget);

    window.location.href = `/properties?${params.toString()}`;
  };

  const selectClass =
    "h-[48px] w-full appearance-none rounded-xl bg-white px-4 pr-10 text-sm font-medium text-[#2a2d34] outline-none transition focus:ring-2 focus:ring-[#d8b46a] lg:h-[50px] lg:rounded-none lg:bg-transparent lg:px-5 lg:focus:ring-0";

  return (
    <section
      id="home"
      className="relative isolate min-h-[650px] overflow-hidden bg-[#090b0c] text-white sm:min-h-[700px] lg:min-h-[640px] flex flex-col justify-between"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-20">
        <img
          src={landHero}
          alt="Golden sunset over available land"
          className="h-full w-full object-cover object-[65%_center] sm:object-center brightness-90"
        />
      </div>

      {/* Background gradient overlays for optimal text contrast */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/95 via-black/70 to-black/20 sm:from-black/90 sm:via-black/60 sm:to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#090b0c] via-transparent to-black/40" />

      {/* Glowing Plot Frame & Location Pin Overlay (Matches Reference Image) */}
      <div className="absolute right-[8%] top-[22%] -z-10 hidden lg:block pointer-events-none transform rotate-[-6deg] scale-95 xl:scale-100">
        <div className="relative w-80 h-48 xl:w-96 xl:h-56 rounded-2xl border-2 border-[#facc15] bg-yellow-400/10 backdrop-blur-[2px] shadow-[0_0_40px_rgba(250,204,21,0.5)]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-[#a16207] shadow-xl border border-yellow-400/40 animate-pulse">
              <House className="h-6 w-6 fill-amber-500/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-10 pb-8 sm:px-8 sm:pt-16 lg:px-12 lg:pt-12">
        <div className="max-w-[640px]">
          {/* Main Title */}
          <h1 className="font-serif text-[40px] font-semibold leading-[1.08] tracking-tight sm:text-6xl sm:leading-[1.05] lg:text-[72px]">
            <span className="block text-white">Find Your</span>
            <span className="mt-1 block italic bg-gradient-to-r from-[#FFE59A] via-[#FFD77F] to-[#D7B66B] bg-clip-text text-transparent">
              Dream Land
            </span>
          </h1>

          {/* Sub-text */}
          <p className="mt-4 max-w-[500px] text-sm leading-relaxed text-gray-200 sm:mt-5 sm:text-base sm:leading-7 lg:text-lg">
            Invest in the perfect land for a better tomorrow.
            <span className="block sm:inline lg:block">
              {" "}Residential, Agricultural &amp; Commercial lands.
            </span>
          </p>

          {/* Search Form Pill Container */}
          <form
            onSubmit={handleSearch}
            className="mt-6 flex flex-col gap-2.5 rounded-2xl bg-white/90 p-3 shadow-2xl backdrop-blur-md sm:mt-8 sm:gap-3 sm:p-4 lg:mt-8 lg:flex-row lg:items-center lg:gap-0 lg:rounded-full lg:bg-white lg:p-1.5 lg:shadow-[0_15px_40px_rgba(0,0,0,0.4)]"
          >
            {/* Location Filter */}
            <div className="relative min-w-0 flex-1 lg:border-r lg:border-gray-200">
              <select
                aria-label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={selectClass}
              >
                <option value="">All Location</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Viramgam">Viramgam</option>
                <option value="Surat">Surat</option>
                <option value="Rajkot">Rajkot</option>
                <option value="Vadodara">Vadodara</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 lg:right-4" />
            </div>

            {/* Property Type Filter */}
            <div className="relative min-w-0 flex-1 lg:border-r lg:border-gray-200">
              <select
                aria-label="Property type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={selectClass}
              >
                <option value="">All Type</option>
                <option value="Residential">Residential</option>
                <option value="Agricultural">Agricultural</option>
                <option value="Commercial">Commercial</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 lg:right-4" />
            </div>

            {/* Budget Filter */}
            <div className="relative min-w-0 flex-1">
              <select
                aria-label="Budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className={selectClass}
              >
                <option value="">Any Budget</option>
                <option value="under-10-lakh">Under ₹10 Lakh</option>
                <option value="10-25-lakh">₹10–25 Lakh</option>
                <option value="25-50-lakh">₹25–50 Lakh</option>
                <option value="above-50-lakh">Above ₹50 Lakh</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 lg:right-4" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-1 flex h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FFE59A] via-[#F4CA68] to-[#EDBB4D] px-7 text-sm font-bold text-[#30230C] shadow-md transition-all hover:brightness-105 active:scale-[0.98] lg:mt-0 lg:h-[48px] lg:w-auto lg:rounded-full shrink-0"
            >
              <Search className="h-4 w-4 stroke-[2.5]" />
              <span>Search</span>
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Statistics Bar */}
      <div className="w-full border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 gap-y-6 lg:grid-cols-4 lg:gap-y-0 lg:divide-x lg:divide-white/15">
            {stats.map(({ value, label, Icon }, index) => (
              <div
                key={label}
                className={`flex items-center gap-3.5 sm:gap-4 ${
                  index % 2 === 1 ? "pl-4 sm:pl-8 lg:pl-8" : "pr-2 lg:px-8"
                } ${index >= 2 ? "border-t border-white/10 pt-4 lg:border-t-0 lg:pt-0" : ""}`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFD16D]/10 text-[#FFD16D] sm:h-12 sm:w-12">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.8} />
                </div>

                <div className="min-w-0">
                  <p className="font-serif text-2xl font-bold leading-none text-white sm:text-3xl lg:text-[28px]">
                    <span className="bg-gradient-to-r from-[#FFE59A] to-[#FFD77F] bg-clip-text text-transparent">
                      {value}
                    </span>
                  </p>

                  <p className="mt-1 text-xs text-gray-300 font-medium sm:text-sm">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}