import React, { useState } from "react";
import {
  Home,
  MapPin,
  Maximize2,
  UserCheck,
  Building,
  CheckCircle2,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageSquare,
  Send,
  ShieldCheck,
  Star,
  Compass,
  FileCheck,
  Eye,
  ArrowRight,
  Navigation,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const galleryImages = [
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&auto=format&fit=crop",
];

const similarProperties = [
  {
    id: 1,
    title: "Agricultural Land in Mehsana",
    location: "Mehsana, Gujarat",
    price: "₹ 32,00,000",
    size: "5 Bigha",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop",
    badge: "For Sale",
    badgeColor: "bg-emerald-500",
  },
  {
    id: 2,
    title: "Commercial Plot in Surat",
    location: "Surat, Gujarat",
    price: "₹ 1,25,00,000",
    size: "800 Sq.Yd",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600&auto=format&fit=crop",
    badge: "For Sale",
    badgeColor: "bg-emerald-500",
  },
  {
    id: 3,
    title: "Residential Plot in Vadodara",
    location: "Vadodara, Gujarat",
    price: "₹ 75,00,000",
    size: "1,500 Sq.Ft",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop",
    badge: "For Sale",
    badgeColor: "bg-emerald-500",
  },
  {
    id: 4,
    title: "Modern House in Ahmedabad",
    location: "Ahmedabad, Gujarat",
    price: "₹ 85,00,000",
    size: "1,800 Sq.Ft",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop",
    badge: "Sold Out",
    badgeColor: "bg-rose-500",
  },
];

export default function PropertyDetails() {
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    message: "I'm interested in this property...",
  });

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name || "User"}! Your message has been sent to the owner.`);
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] font-sans text-gray-800 antialiased">
      
      {/* BREADCRUMB */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
            <button onClick={() => navigate("/")} className="flex items-center gap-1 hover:text-amber-600 transition">
              <Home className="h-3.5 w-3.5" />
              <span>Home</span>
            </button>
            <span>&gt;</span>
            <button onClick={() => navigate("/properties")} className="hover:text-amber-600 transition">
              Properties
            </button>
            <span>&gt;</span>
            <span className="text-gray-900 font-semibold truncate">Property Details</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* HEADER TITLE & PRICE BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Premium Residential Plot Near SP Ring Road
            </h1>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <MapPin className="h-3.5 w-3.5 text-amber-500" />
              <span>Ahmedabad, Gujarat</span>
            </div>

            {/* QUICK FEATURE BADGES */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-gray-700">
              <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-lg border border-gray-200">
                <Maximize2 className="h-3.5 w-3.5 text-gray-500" /> 1,000 Sq.Ft
              </span>
              <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-lg border border-gray-200">
                <Building className="h-3.5 w-3.5 text-gray-500" /> Residential Plot
              </span>
              <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-lg border border-gray-200">
                <UserCheck className="h-3.5 w-3.5 text-gray-500" /> Single Owner
              </span>
              <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-lg border border-gray-200">
                <CheckCircle2 className="h-3.5 w-3.5 text-gray-500" /> Ready for Construction
              </span>
            </div>
          </div>

          <div className="text-left md:text-right shrink-0">
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900">
              ₹ 45,00,000
            </div>
            <div className="text-xs font-semibold text-gray-400 mt-0.5">
              (₹ 4,500 / Sq.Ft)
            </div>
            
            <div className="mt-2.5 flex items-center md:justify-end gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified Property
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-800 border border-amber-300">
                <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" /> Featured
              </span>
            </div>
          </div>
        </div>

        {/* IMAGE GALLERY & RIGHT CONTACT SIDEBAR SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: GALLERY (Col 8) */}
          <div className="lg:col-span-8 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              
              {/* Main Large Image */}
              <div className="relative md:col-span-8 h-[300px] sm:h-[380px] rounded-2xl overflow-hidden bg-gray-900 group shadow-md">
                <img
                  src={galleryImages[activeImageIndex]}
                  alt="Property Main View"
                  className="h-full w-full object-cover transition-all duration-300"
                />

                {/* Back to Listings Button */}
                <button
                  type="button"
                  onClick={() => navigate("/properties")}
                  className="absolute top-3 left-3 flex items-center gap-1.5 rounded-xl bg-black/60 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-black/80"
                >
                  <ChevronLeft className="h-4 w-4" /> Back to Listings
                </button>

                {/* Left/Right Slider Arrows */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition hover:bg-black/80"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition hover:bg-black/80"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Image Count Indicator */}
                <span className="absolute bottom-3 left-3 rounded-md bg-black/60 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-md">
                  📷 {activeImageIndex + 1} / {galleryImages.length}
                </span>
              </div>

              {/* Thumbnails Stack (Col 4) */}
              <div className="hidden md:grid md:col-span-4 grid-cols-1 gap-2.5 h-[380px]">
                {galleryImages.slice(1, 4).map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImageIndex(idx + 1)}
                    className={`relative rounded-xl overflow-hidden cursor-pointer h-[115px] border-2 transition ${
                      activeImageIndex === idx + 1 ? "border-amber-500 shadow-md" : "border-transparent opacity-85 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx}`} className="h-full w-full object-cover" />
                  </div>
                ))}

                {/* More Photos Overlay Box */}
                <div
                  onClick={() => setActiveImageIndex(4)}
                  className="relative rounded-xl overflow-hidden cursor-pointer h-[115px] bg-slate-900 group"
                >
                  <img src={galleryImages[4]} alt="More" className="h-full w-full object-cover opacity-40 group-hover:opacity-30" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold text-sm">
                    <span>+{galleryImages.length - 4}</span>
                    <span className="text-[10px] font-normal">More Photos</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT: CONTACT OWNER & INQUIRY FORM (Col 4) */}
          <div className="lg:col-span-4 rounded-2xl bg-white p-5 shadow-sm border border-gray-100 space-y-5">
            
            {/* Owner Details */}
            <div className="flex items-start gap-3 border-b border-gray-100 pb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-amber-700 font-bold text-lg">
                👤
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-base font-bold text-gray-900">Contact Owner</h3>
                <p className="text-xs text-gray-500">Get in touch for more details or site visit.</p>
                
                <div className="mt-2.5 font-bold text-sm text-gray-900">
                  Rahul Patel <span className="text-xs font-normal text-gray-500">(Owner)</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-700 bg-gray-50 px-3 py-2 rounded-xl">
                <span>+91 98765 43210</span>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-1.5 rounded-lg bg-[#111827] px-3 py-1.5 text-xs font-bold text-white hover:bg-black transition"
                >
                  <Phone className="h-3.5 w-3.5 text-amber-400" /> Call Now
                </a>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-gray-700 bg-gray-50 px-3 py-2 rounded-xl">
                <span>+91 98765 43210</span>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 transition"
                >
                  <MessageSquare className="h-3.5 w-3.5" /> WhatsApp
                </a>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium pt-1">
              <MapPin className="h-3.5 w-3.5 text-amber-500" />
              <span>Ahmedabad, Gujarat</span>
            </div>

            {/* Send a Message Form */}
            <form onSubmit={handleSubmitMessage} className="pt-2 border-t border-gray-100 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                Or Send a Message
              </h4>

              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-800 outline-none focus:border-amber-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">Your Mobile *</label>
                <input
                  type="tel"
                  required
                  placeholder="Enter mobile number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-800 outline-none focus:border-amber-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">Your Message *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-800 outline-none focus:border-amber-400 focus:bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 py-2.5 text-xs font-bold text-white shadow-md transition hover:brightness-105 active:scale-95"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Send Message</span>
              </button>
            </form>

          </div>

        </div>

        {/* PROPERTY DETAILS TABLE & AMENITIES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-8 space-y-6">
            
            {/* Property Details Specs Table */}
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                <h3 className="font-serif text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Home className="h-5 w-5 text-amber-500" /> Property Details
                </h3>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert("Link copied to clipboard!")}
                    className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-100"
                  >
                    <Share2 className="h-3.5 w-3.5 text-gray-500" /> Share
                  </button>
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-100"
                  >
                    <Heart className={`h-3.5 w-3.5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Property Type</span>
                  <span className="font-bold text-gray-900">Residential Plot</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Location</span>
                  <span className="font-bold text-gray-900">SP Ring Road, Ahmedabad</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Ownership Type</span>
                  <span className="font-bold text-gray-900">Single Owner</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Facing</span>
                  <span className="font-bold text-gray-900">East</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Seller Type</span>
                  <span className="font-bold text-gray-900">Owner</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Road Width</span>
                  <span className="font-bold text-gray-900">30 Ft Road</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Total Area</span>
                  <span className="font-bold text-gray-900">1,000 Sq.Ft</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Legal Status</span>
                  <span className="font-bold text-gray-900">Clear Title</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Price</span>
                  <span className="font-bold text-gray-900">₹ 45,00,000</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Available From</span>
                  <span className="font-bold text-gray-900">Immediately</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-500 font-medium">Price Per Sq.Ft</span>
                  <span className="font-bold text-gray-900">₹ 4,500</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-500 font-medium">Property Status</span>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">For Sale</span>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
              <h3 className="font-serif text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                ⭐ Amenities
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-y-3 text-xs font-semibold text-gray-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Good Location</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Electricity</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Wide Road</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Green Area</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Water Connection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Suitable for Home/Investment</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: REAL GOOGLE MAP & WHY CHOOSE THIS PROPERTY (Col 4) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Real Google Map Card */}
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100 space-y-3">
              <h3 className="font-serif text-base font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-500" /> Property Location
              </h3>
              
              <div className="relative h-60 w-full rounded-xl overflow-hidden border border-gray-200 shadow-inner bg-gray-100">
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

              <a
                href="https://maps.google.com/?q=Ahmedabad,+Gujarat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gray-900 py-2.5 text-xs font-bold text-white shadow hover:bg-black transition"
              >
                <Navigation className="h-3.5 w-3.5 text-amber-400" />
                <span>Get Directions (Ahmedabad, Gujarat)</span>
              </a>
            </div>

            {/* Why Choose This Property Promo Card */}
            <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/60 p-5 shadow-sm border border-amber-200/60 space-y-3">
              <h3 className="font-serif text-base font-bold text-gray-900 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-amber-600" /> Why Choose This Property?
              </h3>
              
              <div className="space-y-2 text-xs font-semibold text-gray-800">
                <div className="flex items-center gap-2">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-white text-[10px]">✓</span>
                  <span>Prime Location Near SP Ring Road</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-white text-[10px]">✓</span>
                  <span>High Investment Value</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-white text-[10px]">✓</span>
                  <span>Clear Title &amp; Legal Papers</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-white text-[10px]">✓</span>
                  <span>Well Connected to Ahmedabad City</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* SIMILAR PROPERTIES CARDS SECTION */}
        <div className="pt-6 border-t border-gray-200 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-gray-900 flex items-center gap-2">
              🏢 Similar Properties
            </h2>
            <button
              onClick={() => navigate("/properties")}
              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              View All Properties <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {similarProperties.map((prop) => (
              <div
                key={prop.id}
                onClick={() => navigate(`/propertiesDetails?id=${prop.id}`)}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className={`absolute top-2.5 left-2.5 rounded-md px-2.5 py-0.5 text-[10px] font-bold text-white shadow ${prop.badgeColor}`}>
                    {prop.badge}
                  </span>
                </div>

                <div className="p-4 flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xs sm:text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-amber-600 transition">
                      {prop.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-1 text-[11px] text-gray-500">
                      <MapPin className="h-3 w-3 text-amber-500 shrink-0" />
                      <span className="truncate">{prop.location}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
                    <span className="font-serif text-sm font-extrabold text-gray-900">
                      {prop.price}
                    </span>
                    <span className="text-[10px] font-semibold text-gray-400">
                      ({prop.size})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}