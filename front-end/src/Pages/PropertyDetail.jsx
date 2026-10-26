import React, { useState } from "react";
import {
  MapPin,
  Maximize2,
  Compass,
  Building,
  Heart,
  PhoneCall,
  Navigation,
  Road,
  Zap,
  Droplets,
  Trees,
  ShieldCheck,
} from "lucide-react";

const property = {
  title: "Residential Plot",
  location: "Ahmedabad, Gujarat",
  price: "₹ 45,00,000",
  area: "1200 sq. yd",
  facing: "East Facing",
  nearRoad: "Near Main Road",
  availability: "Ready to Move",
  type: "Residential Plot",
  description:
    "This is a prime residential plot located in a well-developed area of Ahmedabad. The plot is ideal for building your dream home with excellent connectivity and nearby amenities.",
  images: [
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop",
  ],
  features: [
    { name: "Main Road", Icon: Road },
    { name: "Electricity", Icon: Zap },
    { name: "Water Supply", Icon: Droplets },
    { name: "Parks", Icon: Trees },
    { name: "Security", Icon: ShieldCheck },
  ],
};

export default function PropertyDetail() {
  const [activeImage, setActiveImage] = useState(property.images[0]);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="w-full bg-[#fbf9f5] min-h-screen py-8 px-4 sm:px-8 lg:px-12 text-gray-900 font-sans">
      <div className="mx-auto max-w-7xl">
        
        {/* ================= TOP GRID: GALLERY & PRICING CARD ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Image Gallery (Span 7) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Big Image Preview */}
            <div className="relative h-64 sm:h-[400px] w-full rounded-3xl overflow-hidden shadow-lg bg-gray-200 border border-amber-100">
              <img
                src={activeImage}
                alt="Property Main View"
                className="h-full w-full object-cover transition-all duration-300"
              />
              <div className="absolute top-4 left-4 bg-[#0a2325]/85 backdrop-blur-md text-white text-xs px-3.5 py-1.5 rounded-full font-semibold shadow">
                For Sale
              </div>
            </div>

            {/* Thumbnail Gallery Row */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`relative h-16 sm:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === img
                      ? "border-[#0a2325] scale-95 shadow-md"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Title, Price & Actions (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-amber-100/60">
            <div>
              {/* Title & Location */}
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                {property.title}
              </h1>
              <div className="mt-1.5 flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
                <MapPin className="h-4 w-4 text-[#b88c3a]" />
                <span>{property.location}</span>
              </div>

              {/* Price */}
              <div className="mt-4 text-2xl sm:text-3xl font-extrabold text-[#b88c3a]">
                {property.price}
              </div>

              {/* Quick Specs Badges */}
              <div className="mt-5 grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 text-xs sm:text-sm text-gray-700 font-medium">
                <div className="flex items-center gap-2">
                  <Maximize2 className="h-4 w-4 text-gray-400" />
                  <span>{property.area}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Compass className="h-4 w-4 text-gray-400" />
                  <span>{property.facing}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <Building className="h-4 w-4 text-gray-400" />
                  <span>{property.nearRoad}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons (Contact Seller & Save) */}
            <div className="mt-8 space-y-3">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0a2325] py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#11383b] active:scale-[0.98]"
              >
                <PhoneCall className="h-4 w-4 text-[#ffd77f]" />
                <span>Contact Seller</span>
              </button>

              <button
                type="button"
                onClick={() => setIsSaved(!isSaved)}
                className={`w-full flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition-all ${
                  isSaved
                    ? "border-red-500 bg-red-50 text-red-600"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Heart className={`h-4 w-4 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
                <span>{isSaved ? "Saved to Wishlist" : "Save"}</span>
              </button>
            </div>

          </div>

        </div>

        {/* ================= LOWER SECTION: TABS & GOOGLE MAP ================= */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Details Tabs & Specs (Span 7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-100/60">
            
            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-gray-100 pb-4 text-sm font-semibold text-gray-500">
              {["Overview", "Location", "Amenities", "Documents"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`transition-colors relative pb-1 ${
                    activeTab === tab ? "text-[#0a2325] font-bold border-b-2 border-[#b88c3a]" : "hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Overview Tab Content */}
            {activeTab === "Overview" && (
              <div className="mt-6 space-y-6">
                
                {/* Property Details Table */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-gray-900 mb-3">
                    Property Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 text-xs sm:text-sm bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="flex justify-between sm:justify-start gap-4">
                      <span className="text-gray-500 w-32">Property Type</span>
                      <span className="font-semibold text-gray-800">: {property.type}</span>
                    </div>
                    <div className="flex justify-between sm:justify-start gap-4">
                      <span className="text-gray-500 w-32">Area</span>
                      <span className="font-semibold text-gray-800">: {property.area}</span>
                    </div>
                    <div className="flex justify-between sm:justify-start gap-4">
                      <span className="text-gray-500 w-32">Location</span>
                      <span className="font-semibold text-gray-800">: {property.location}</span>
                    </div>
                    <div className="flex justify-between sm:justify-start gap-4">
                      <span className="text-gray-500 w-32">Price</span>
                      <span className="font-semibold text-gray-800">: {property.price}</span>
                    </div>
                    <div className="flex justify-between sm:justify-start gap-4">
                      <span className="text-gray-500 w-32">Availability</span>
                      <span className="font-semibold text-gray-800">: {property.availability}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-gray-900 mb-2">
                    Description
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                    {property.description}
                  </p>
                </div>

                {/* Features Badges */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-gray-900 mb-3">
                    Features
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {property.features.map(({ name, Icon }, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50/50 border border-amber-200/50 text-xs font-semibold text-gray-800"
                      >
                        <Icon className="h-4 w-4 text-[#b88c3a]" />
                        <span>{name}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {activeTab !== "Overview" && (
              <div className="py-16 text-center text-gray-400 text-sm">
                {activeTab} details will be updated here soon.
              </div>
            )}

          </div>

          {/* Right Column: Original Embedded Google Map Card (Span 5) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-100/60">
            <h3 className="font-serif text-lg font-bold text-gray-900 mb-4">
              Location
            </h3>

            {/* Real Google Maps Embed Iframe */}
            <div className="relative h-60 sm:h-68 w-full rounded-2xl overflow-hidden border border-gray-200 shadow-inner">
              <iframe
                title="Google Map Ahmedabad"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117223.77970342935!2d72.5031021727715!3d23.02047410000001!2m3!1f0!2f0!3f0!3m2!1f1024!2f768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* Get Directions Dark Button (Matches UI Image) */}
            <a
              href="https://maps.google.com/?q=Ahmedabad,+Gujarat"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 w-full flex items-center justify-center gap-2.5 rounded-2xl bg-[#0a2325] py-3.5 px-4 text-xs sm:text-sm font-bold text-white shadow-md transition hover:bg-[#11383b]"
            >
              <Navigation className="h-4 w-4 text-[#ffd77f]" />
              <span>Get Directions ({property.location})</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}