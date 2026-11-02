import { useState } from "react";
import {
  UsersRound,
  House,
  MapPin,
  Handshake,
  ChevronDown,
  Search,
  ShieldCheck,
  Headphones,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import landHero from "../assets/GoldenBg.png";

export default function Hero() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (location) params.set("location", location);
    if (type) params.set("type", type);
    if (budget) params.set("budget", budget);

    navigate(`/properties${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const selectClass =
    "h-[48px] w-full appearance-none rounded-xl bg-white px-4 pr-10 text-sm font-medium text-[#2a2d34] outline-none transition focus:ring-2 focus:ring-[#d8b46a] lg:h-[50px] lg:rounded-none lg:bg-transparent lg:px-5 lg:focus:ring-0";

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[650px] flex-col justify-between overflow-hidden bg-[#090b0c] text-white sm:min-h-[700px] lg:min-h-[646px]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <img
          src={landHero}
          alt="Golden luxury villa real estate background"
          className="h-full w-full object-cover object-[65%_center] brightness-90 sm:object-center"
        />
      </div>

      {/* Background Overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/95 via-black/70 to-black/20 sm:from-black/90 sm:via-black/60 sm:to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#090b0c] via-transparent to-black/40" />

      {/* Bottom Right Trusted Real Estate Partner Badge */}
      <div className="pointer-events-none absolute right-[6%] bottom-[15%] -z-10 hidden rotate-[-4deg] scale-95 lg:block xl:scale-100">
        <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-[#facc15] bg-[#17191c]/90 px-6 py-4 shadow-[0_0_40px_rgba(250,204,21,0.4)] backdrop-blur-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-yellow-400/40 bg-yellow-500/10 text-[#ffd77f] shadow-xl mb-1.5">
            <House className="h-6 w-6 fill-amber-500/20" />
          </div>
          <span className="font-serif text-xs font-bold tracking-wider text-amber-300">
            Your Trusted
          </span>
          <span className="text-[11px] font-medium text-gray-300">
            Real Estate Partner
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-8 pt-10 sm:px-8 sm:pt-16 lg:px-12 lg:pt-12">
        <div className="max-w-[700px]">
          {/* Premium Real Estate Subtitle Tag */}
          <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#ffd77f]">
            Premium Real Estate
          </span>

          <h1 className="font-serif text-[40px] font-semibold leading-[1.08] tracking-tight sm:text-6xl sm:leading-[1.05] lg:text-[72px]">
            <span className="block text-white">Find Your</span>
            <span className="mt-1 block bg-gradient-to-r from-[#FFE59A] via-[#FFD77F] to-[#D7B66B] bg-clip-text italic text-transparent">
              Dream Land
            </span>
          </h1>

          <p className="mt-4 max-w-[500px] text-sm leading-relaxed text-gray-200 sm:mt-5 sm:text-base sm:leading-7 lg:text-lg">
            Buy, Sell and Invest in the Best Properties with Confidence.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="mt-6 flex flex-col gap-2.5 rounded-2xl bg-white/95 p-3 shadow-2xl backdrop-blur-md sm:mt-8 sm:gap-3 sm:p-4 lg:mt-8 lg:flex-row lg:items-center lg:gap-0 lg:rounded-full lg:bg-white lg:p-1.5 lg:shadow-[0_15px_40px_rgba(0,0,0,0.4)]"
          >
            {/* Location Input with MapPin Icon */}
            <div className="relative min-w-0 flex-1 lg:border-r lg:border-gray-200 flex items-center">
              <MapPin className="absolute left-3.5 h-4 w-4 text-gray-400 lg:left-4" />
              <input
                type="text"
                placeholder="Search by location (e.g. Ahmedabad)..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-[48px] w-full rounded-xl bg-white pl-10 pr-4 text-sm font-medium text-[#2a2d34] outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-[#d8b46a] lg:h-[50px] lg:rounded-none lg:bg-transparent lg:pl-10 lg:pr-5 lg:focus:ring-0"
              />
            </div>

            {/* Property Type Dropdown */}
            <div className="relative min-w-0 flex-1 lg:border-r lg:border-gray-200">
              <select
                aria-label="Property type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={selectClass}
              >
                <option value="">Property Type</option>
                <option value="Residential">Residential</option>
                <option value="Agricultural">Agricultural</option>
                <option value="Commercial">Commercial</option>
                <option value="Plot">Plot</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 lg:right-4" />
            </div>

            {/* Budget Dropdown */}
            <div className="relative min-w-0 flex-1">
              <select
                aria-label="Budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className={selectClass}
              >
                <option value="">Budget</option>
                <option value="under-10-lakh">Under ₹10 Lakh</option>
                <option value="10-25-lakh">₹10–25 Lakh</option>
                <option value="25-50-lakh">₹25–50 Lakh</option>
                <option value="above-50-lakh">Above ₹50 Lakh</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 lg:right-4" />
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="mt-1 flex h-[48px] w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FFE59A] via-[#F4CA68] to-[#EDBB4D] px-7 text-sm font-bold text-[#30230C] shadow-md transition-all hover:brightness-105 active:scale-[0.98] lg:mt-0 lg:h-[48px] lg:w-auto lg:rounded-full"
            >
              <Search className="h-4 w-4 stroke-[2.5]" />
              <span>Search</span>
            </button>
          </form>

          {/* Feature Badges below Search */}
          <div className="mt-5 flex flex-wrap items-center gap-6 text-xs font-semibold text-gray-300 sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-[#ffd77f]">
                <ShieldCheck className="h-3.5 w-3.5" />
              </span>
              <span>Trusted &amp; Secure</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-[#ffd77f]">
                <Handshake className="h-3.5 w-3.5" />
              </span>
              <span>Verified Properties</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-[#ffd77f]">
                <Headphones className="h-3.5 w-3.5" />
              </span>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}