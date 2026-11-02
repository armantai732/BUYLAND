import React from "react";
import {
  Home,
  Building2,
  Building,
  Users,
  MapPin,
  FileCheck,
  TrendingUp,
  Search,
  MessageSquare,
  CheckCircle2,
  Handshake,
  ShieldCheck,
  Headphones,
  Layers,
  Award,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const servicesList = [
  {
    title: "Buy Property",
    desc: "Find the best residential, agricultural and commercial lands at the right price.",
    Icon: Home,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Sell Property",
    desc: "List your property with us and get the best value with expert assistance.",
    Icon: Building2,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Property Consultancy",
    desc: "Get professional advice from our real estate experts for smart investment.",
    Icon: Users,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Location Guidance",
    desc: "Explore the best locations in Gujarat for your dream property.",
    Icon: MapPin,
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Legal Support",
    desc: "Complete legal assistance for a hassle-free and secure transaction.",
    Icon: FileCheck,
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Investment Guidance",
    desc: "Make profitable investments with our expert market insights.",
    Icon: TrendingUp,
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=600&auto=format&fit=crop",
  },
];

const processSteps = [
  { step: "1", title: "1. Search", desc: "Find your ideal property", Icon: Search },
  { step: "2", title: "2. Consult", desc: "Talk to our experts", Icon: MessageSquare },
  { step: "3", title: "3. Verify", desc: "Complete all formalities", Icon: CheckCircle2 },
  { step: "4", title: "4. Transact", desc: "Secure and smooth deal", Icon: Handshake },
  { step: "5", title: "5. Own", desc: "Get your dream property", Icon: Home },
];

const whyChooseBadges = [
  { title: "Trusted & Secure Platform", Icon: ShieldCheck },
  { title: "Transparent Deals", Icon: Gem },
  { title: "Expert Support 24/7", Icon: Headphones },
  { title: "Wide Property Options", Icon: Layers },
  { title: "Best Market Value", Icon: Award },
];

import { Gem } from "lucide-react";

export default function Services() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fbf9f5] font-sans text-gray-800 antialiased">
      
      {/* 1. HERO HEADER BANNER */}
      <div className="relative bg-[#090b0c] text-white overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
            alt="Luxury modern estate background"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">
            OUR SERVICES
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight mt-1 text-white">
            Our <span className="text-amber-400">Services</span>
          </h1>
          <p className="mt-1.5 text-xs sm:text-base text-gray-300 font-medium">
            Complete Real Estate Solutions Under One Roof
          </p>

          {/* Breadcrumb */}
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-300">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 hover:text-amber-400 transition"
            >
              <Home className="h-3.5 w-3.5" />
              <span>Home</span>
            </button>
            <span>&gt;</span>
            <span className="text-amber-400 font-semibold">Services</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* 2. WHAT WE OFFER SECTION */}
        <div className="space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-amber-600 uppercase mb-1">
              <span className="h-[2px] w-6 bg-amber-500" />
              <span>What We Offer</span>
              <span className="h-[2px] w-6 bg-amber-500" />
            </div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium max-w-xl mx-auto">
              From buying to selling, we provide end-to-end real estate services with trust, transparency and professional support.
            </p>
          </div>

          {/* 6 Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map(({ title, desc, Icon, image }, idx) => (
              <div
                key={idx}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                {/* Image & Floating Icon */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-white shadow-md border-2 border-white">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-gray-900 group-hover:text-amber-600 transition">
                      {title}
                    </h3>
                    <p className="mt-2 text-xs text-gray-500 font-medium leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3">
                    <button
                      type="button"
                      onClick={() => navigate("/properties")}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#0c2225] px-4 py-2 text-xs font-bold text-white shadow transition hover:bg-[#153a3e]"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* 3. OUR WORKING PROCESS TIMELINE */}
      <div className="bg-[#091519] text-white py-12 sm:py-16 border-t border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Our <span className="text-amber-400">Working Process</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              A simple and transparent process to help you with ease
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 relative">
            {processSteps.map(({ title, desc, Icon }, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative z-10 space-y-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-amber-400/60 bg-amber-500/10 text-amber-400 shadow-lg">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-white">
                    {title}
                  </h3>
                  <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* 4. WHY CHOOSE BUYLAND? SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Badges Grid */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900">
                Why Choose <span className="text-amber-600">BuyLand?</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                Your trust is our priority
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {whyChooseBadges.map(({ title, Icon }, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center p-4 rounded-2xl bg-white border border-gray-100 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 mb-2">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-800 leading-snug">
                    {title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5">
            <div className="relative h-64 sm:h-72 w-full rounded-3xl overflow-hidden shadow-xl border border-amber-100">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop"
                alt="Real estate guidance preview"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>

      {/* 5. BOTTOM CTA FOOTER BANNER */}
      <div className="bg-[#090b0c] text-white py-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white font-bold">
              <Building className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-sm sm:text-base font-bold text-amber-400">
                Ready to Find Your Dream Property?
              </h3>
              <p className="text-[11px] text-gray-400">
                Get started today and explore the best properties with BuyLand.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/properties")}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 px-6 py-2.5 text-xs font-bold text-gray-900 shadow-md transition hover:scale-105 active:scale-95"
          >
            <span>Explore Properties</span>
            <ArrowRight className="h-4 w-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

    </div>
  );
}