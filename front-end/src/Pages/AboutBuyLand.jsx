import React from "react";
import {
  Home,
  ShieldCheck,
  CheckCircle2,
  Headphones,
  Handshake,
  Building,
  Target,
  Eye,
  Gem,
  UsersRound,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "Trusted Platform",
    desc: "A reliable and secure platform for all users.",
    Icon: ShieldCheck,
  },
  {
    title: "Verified Properties",
    desc: "100% verified listings for your peace of mind.",
    Icon: CheckCircle2,
  },
  {
    title: "Expert Support",
    desc: "Get help anytime from our dedicated team.",
    Icon: Headphones,
  },
  {
    title: "Transparent Deals",
    desc: "Honest and clear process always.",
    Icon: Handshake,
  },
  {
    title: "Wide Range",
    desc: "Residential, Agricultural & Commercial lands.",
    Icon: Building,
  },
];

const achievements = [
  { value: "10K+", label: "Properties Listed", Icon: Building },
  { value: "5K+", label: "Happy Customers", Icon: UsersRound },
  { value: "10+", label: "Cities Covered", Icon: MapPin },
  { value: "100%", label: "Trusted Partner", Icon: Handshake },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fbf9f5] font-sans text-gray-800 antialiased">
      
      {/* 1. HERO HEADER BANNER */}
      <div className="relative bg-[#090b0c] text-white overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop"
            alt="Luxury modern villa background"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-300 mb-2">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 hover:text-amber-400 transition"
            >
              <Home className="h-3.5 w-3.5" />
              <span>Home</span>
            </button>
            <span>&gt;</span>
            <span className="text-amber-400 font-semibold">About Us</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            About <span className="text-amber-400">Us</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-300 font-medium">
            Building Trust. Creating Better Tomorrow.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">
        
        {/* 2. OUR STORY SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Content (Col 7) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-amber-600 uppercase">
              <span className="h-[2px] w-6 bg-amber-500" />
              <span>Our Story</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Welcome to BuyLand
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              At BuyLand, we believe that land is more than just property — it's a foundation for dreams, a place to build a future, and a valuable investment for generations.
            </p>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              Our journey started with a simple idea: to make buying and selling land easier, safer, and more transparent for everyone. Today, we are proud to be a trusted real estate partner for thousands of customers across Gujarat and beyond.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate("/properties")}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md transition hover:scale-105 active:scale-95"
              >
                <span>Explore Properties</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Right Image with Map Pin Card (Col 5) */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-64 sm:h-80 w-full rounded-3xl overflow-hidden shadow-xl border border-amber-200/60 bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop"
                alt="Green farmland preview"
                className="h-full w-full object-cover"
              />
              
              {/* Center Map Pin Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center animate-bounce">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl border-2 border-white">
                    <Home className="h-6 w-6" />
                  </div>
                  <div className="h-2 w-2 bg-red-600 rotate-45 -mt-1 shadow-lg" />
                </div>
              </div>

              {/* Bottom Badge */}
              <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md px-3.5 py-2 rounded-2xl text-white text-xs flex items-center gap-2 border border-white/20 shadow-lg">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0" />
                <span className="font-semibold text-[11px]">Your Dream Property is Just a Click Away</span>
              </div>
            </div>
          </div>

        </div>

        {/* 3. WHAT MAKES US DIFFERENT? */}
        <div className="space-y-6 text-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-amber-600 uppercase mb-1">
              <span className="h-[2px] w-6 bg-amber-500" />
              <span>What Makes Us <span className="text-amber-600">Different?</span></span>
              <span className="h-[2px] w-6 bg-amber-500" />
            </div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              We go beyond just listings. We provide complete real estate solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {features.map(({ title, desc, Icon }, idx) => (
              <div
                key={idx}
                className="group flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-gray-100 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mb-3 group-hover:bg-amber-500 group-hover:text-white transition">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-sm font-bold text-gray-900 mb-1">
                  {title}
                </h3>
                <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. MISSION, VISION & VALUES SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left BuyLand Brand Card (Col 4) */}
          <div className="lg:col-span-4 rounded-3xl bg-[#090b0c] p-8 text-white flex flex-col items-center justify-center text-center shadow-lg border border-amber-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-amber-500/10" />
            <div className="relative z-10 space-y-3">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-amber-400 bg-amber-500/10 text-amber-400 shadow-xl">
                <Home className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl font-extrabold text-amber-400 tracking-wider">
                BuyLand
              </h3>
              <p className="text-xs text-gray-300 font-medium tracking-wide">
                Find Your Dream Land
              </p>
            </div>
          </div>

          {/* Right 3 Pillars Grid (Col 8) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Our Mission */}
            <div className="rounded-3xl bg-white p-6 border border-gray-100 shadow-sm flex flex-col justify-between space-y-3">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 mb-3">
                  <Target className="h-5 w-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-gray-900">
                  Our Mission
                </h4>
                <p className="mt-2 text-xs text-gray-500 font-medium leading-relaxed">
                  To make real estate simple, transparent and accessible for everyone.
                </p>
              </div>
            </div>

            {/* Our Vision */}
            <div className="rounded-3xl bg-white p-6 border border-gray-100 shadow-sm flex flex-col justify-between space-y-3">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 mb-3">
                  <Eye className="h-5 w-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-gray-900">
                  Our Vision
                </h4>
                <p className="mt-2 text-xs text-gray-500 font-medium leading-relaxed">
                  To become India's most trusted real estate platform for land and property.
                </p>
              </div>
            </div>

            {/* Our Values */}
            <div className="rounded-3xl bg-white p-6 border border-gray-100 shadow-sm flex flex-col justify-between space-y-3">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 mb-3">
                  <Gem className="h-5 w-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-gray-900">
                  Our Values
                </h4>
                <p className="mt-2 text-xs text-gray-500 font-medium leading-relaxed">
                  Trust • Transparency • Customer First • Growth
                </p>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* 5. OUR ACHIEVEMENTS BANNER */}
      <div className="bg-[#090b0c] text-white py-10 border-t border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="mb-6">
            <h3 className="font-serif text-xl sm:text-2xl font-bold">
              Our Achievements
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Numbers that show our commitment
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-x-0 lg:divide-x divide-gray-800">
            {achievements.map(({ value, label, Icon }, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 mb-2">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-serif text-2xl sm:text-3xl font-extrabold text-amber-400">
                  {value}
                </span>
                <span className="text-xs font-semibold text-gray-300 mt-1">
                  {label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* 6. BOTTOM CTA BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-3xl bg-white p-6 sm:p-8 border border-amber-200/60 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-5">
            <div className="h-16 w-24 rounded-2xl overflow-hidden shrink-0 shadow">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop"
                alt="House Preview"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
                Ready to Find Your Dream Property?
              </span>
              <h3 className="font-serif text-base sm:text-xl font-bold text-gray-900 mt-0.5">
                Start Your Real Estate Journey with BuyLand Today!
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Explore properties, connect with sellers, and make the right move.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/properties")}
            className="shrink-0 flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md transition hover:scale-105 active:scale-95"
          >
            <span>Browse Properties</span>
            <ArrowRight className="h-4 w-4 stroke-[2.5]" />
          </button>

        </div>
      </div>

    </div>
  );
}