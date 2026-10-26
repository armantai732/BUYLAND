import React from "react";
import {
  Landmark,
  FileCheck2,
  MapPin,
  Scale,
  HandCoins,
  Building,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "Land Buying & Selling",
    description: "Verified residential, agricultural, and commercial land deals with complete transparency.",
    Icon: Landmark,
  },
  {
    id: 2,
    title: "Legal Title Verification",
    description: "In-depth legal checking of land documents and title deeds by experienced legal experts.",
    Icon: Scale,
  },
  {
    id: 3,
    title: "Site Inspection & Survey",
    description: "Physical boundary measurement, road connectivity check, and drone survey assistance.",
    Icon: MapPin,
  },
  {
    id: 4,
    title: "Documentation & Registry",
    description: "Hassle-free sale deed registration, 7/12 & 8A extraction, and stamp duty assistance.",
    Icon: FileCheck2,
  },
  {
    id: 5,
    title: "Plotting & Development",
    description: "Converting raw agricultural land into NA/NOC approved residential & commercial schemes.",
    Icon: Building,
  },
  {
    id: 6,
    title: "Land Loan Assistance",
    description: "Easy home & plot loan approvals through leading banks with competitive interest rates.",
    Icon: HandCoins,
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full bg-[#0a0c0e] py-12 sm:py-20 text-white font-sans">
      <div className="mx-auto max-w-7xl px-3 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#d8b46a] uppercase">
            Our Expertise
          </span>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-5xl">
            Services We <span className="bg-gradient-to-r from-[#ffe59a] via-[#ffd77f] to-[#d7b66b] bg-clip-text text-transparent">Provide</span>
          </h2>
          <p className="mt-3 text-xs sm:text-base text-gray-400 font-light">
            Comprehensive real estate solutions tailored for plot buyers, farmers, and commercial investors.
          </p>
        </div>

        {/* Services Grid (Mobile: 2 Columns - grid-cols-2) */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3">
          {services.map(({ id, title, description, Icon }) => (
            <div
              key={id}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121519] p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#d8b46a]/60 hover:shadow-xl hover:shadow-[#d8b46a]/5"
            >
              <div>
                {/* Icon Container */}
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-[#d8b46a]/30 bg-[#d8b46a]/10 text-[#ffd77f] transition-colors group-hover:bg-[#d8b46a] group-hover:text-[#30230c]">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3 className="mt-4 font-serif text-sm font-semibold text-white sm:text-xl group-hover:text-[#ffd77f] transition-colors line-clamp-2">
                  {title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-[11px] sm:text-sm text-gray-400 font-light leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {description}
                </p>
              </div>

              {/* Read More Link */}
              <div className="mt-4 sm:mt-6 border-t border-white/5 pt-3">
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#ffd77f] transition-all group-hover:translate-x-1"
                >
                  <span>Know More</span>
                  <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}