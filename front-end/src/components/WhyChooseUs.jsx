import React from "react";
import { CheckCircle, ShieldCheck, Headphones, Tag } from "lucide-react";

const features = [
  {
    title: "Verified Properties",
    description: "100% genuine listings",
    Icon: CheckCircle,
  },
  {
    title: "Secure Transactions",
    description: "Safe & reliable",
    Icon: ShieldCheck,
  },
  {
    title: "Expert Support",
    description: "24/7 assistance",
    Icon: Headphones,
  },
  {
    title: "Best Price",
    description: "Competitive rates",
    Icon: Tag,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-[#fbf9f5] py-12 sm:py-20 text-gray-900 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        
        {/* Main Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Content & Features (Span 7) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Header */}
            <div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-gray-900">
                Why Choose BuyLand?
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-gray-600 font-light">
                Your trusted partner in land investment.
              </p>
            </div>

            {/* Features Grid (2x2 on Mobile, 4-in-a-row or 2x2 on Desktop) */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {features.map(({ title, description, Icon }, index) => (
                <div key={index} className="flex items-center gap-4">
                  {/* Circular Golden Badge Icon */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#f3d38b] to-[#fbebb7] text-[#8a5f1a] shadow-md border border-amber-200">
                    <Icon className="h-6 w-6 stroke-[2]" />
                  </div>

                  {/* Text Content */}
                  <div>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-gray-900">
                      {title}
                    </h3>
                    <p className="mt-0.5 text-xs text-gray-500 font-light">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Landscape Image Container (Span 5) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg h-56 sm:h-72 lg:h-64 rounded-3xl overflow-hidden shadow-2xl border border-amber-100">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop"
                alt="Scenic landscape sunset over land investment"
                className="h-full w-full object-cover object-center"
              />
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}