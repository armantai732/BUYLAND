import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function AboutBuyLand() {
  const features = [
    "Verified Properties",
    "Secure Transactions",
    "Expert Support 24/7",
  ];

  return (
    <section className="w-full bg-[#0a0c0e] py-12 sm:py-20 text-white font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          
          {/* Left Text Content */}
          <div className="flex flex-col justify-center">
            {/* Sub-heading */}
            <span className="text-sm sm:text-base font-medium tracking-wide text-[#d8b46a]">
              About BuyLand
            </span>

            {/* Main Heading */}
            <h2 className="mt-2 font-serif text-3xl font-semibold leading-tight sm:text-5xl lg:text-[54px] tracking-tight">
              Your <span className="bg-gradient-to-r from-[#ffe59a] via-[#ffd77f] to-[#d7b66b] bg-clip-text text-transparent">Trusted Partner</span> <br className="hidden sm:inline" />
              in Real Estate
            </h2>

            {/* Description */}
            <p className="mt-4 text-xs sm:text-base leading-relaxed text-gray-300 font-light max-w-lg">
              At BuyLand, we help you find the perfect land with transparency, trust and the best deals. Whether it's for home, farming or business — we're here to guide you every step of the way.
            </p>

            {/* Checkmark List */}
            <ul className="mt-6 space-y-3.5">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d8b46a]/20 text-[#ffd77f]">
                    <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
                  </div>
                  <span className="text-xs sm:text-base font-medium text-gray-200">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="mt-8">
              <button 
                type="button"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#ffe59a] via-[#f4ca68] to-[#edbb4d] px-7 py-3.5 text-xs sm:text-sm font-bold text-[#30230c] shadow-lg shadow-amber-500/10 transition-all hover:brightness-110 active:scale-[0.98]"
              >
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Right Image Container with Gold Border Arch & Floating Badge */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Arch-shaped Container with Golden Outline */}
            <div className="relative w-full max-w-[520px] rounded-tl-[100px] sm:rounded-tl-[140px] rounded-tr-3xl rounded-b-3xl border-2 border-[#d8b46a]/50 p-2 sm:p-2.5 bg-[#121519] shadow-2xl">
              
              {/* Inner Arch Image */}
              <div className="relative h-[320px] sm:h-[420px] w-full overflow-hidden rounded-tl-[92px] sm:rounded-tl-[130px] rounded-tr-2xl rounded-b-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop"
                  alt="Modern Luxury Home Real Estate"
                  className="h-full w-full object-cover"
                />
                
                {/* Subtle Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Floating "Trusted by" Badge */}
              <div className="absolute -bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-3 rounded-2xl bg-[#fff8ea] px-4 py-3 text-black shadow-xl border border-amber-200/50 backdrop-blur-md">
                {/* Customer Avatars */}
                <div className="flex -space-x-2 overflow-hidden">
                  <img
                    className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
                    alt="User 1"
                  />
                  <img
                    className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
                    alt="User 2"
                  />
                  <img
                    className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
                    alt="User 3"
                  />
                </div>

                {/* Badge Text */}
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                    Trusted by
                  </h4>
                  <p className="text-[10px] sm:text-xs font-semibold text-gray-700">
                    10,000+ Customers
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}