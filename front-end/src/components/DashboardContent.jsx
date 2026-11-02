import React from "react";
import {
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  Edit3,
  Eye,
  Home,
  Heart,
  Building,
  TrendingUp,
  PlusCircle,
  HelpCircle,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f4f7fb] font-sans text-gray-800 antialiased overflow-x-hidden">
      
      {/* 1. TOP HEADER BAR */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3 sm:gap-4 w-full max-w-xl">
          <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 shrink-0">
            <span className="sr-only">Menu</span>
            ☰
          </button>

          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search properties..."
              className="w-full rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 py-2 text-xs sm:text-sm text-gray-800 outline-none focus:border-amber-400 focus:bg-white"
            />
          </div>
        </div>

        {/* Right Action Icons & Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button className="relative p-2 rounded-full hover:bg-gray-100 text-gray-600">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              2
            </span>
          </button>

          <button className="relative p-2 rounded-full hover:bg-gray-100 text-gray-600">
            <MessageSquare className="h-5 w-5" />
            <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-gray-200 cursor-pointer">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0c2225] text-white font-bold text-sm shadow">
              A
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500 hidden sm:block" />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* 2. WELCOME BANNER & STATS CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Left Welcome Hero Card (Col 7) */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden bg-[#090b0c] text-white p-6 sm:p-8 shadow-xl border border-amber-200/30 flex flex-col justify-between min-h-[160px] sm:min-h-[180px]">
            <div className="absolute inset-0 opacity-40">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop"
                alt="Luxury villa background"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />

            <div className="relative z-10 space-y-2">
              <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Welcome Back,
              </h3>
              <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-white flex flex-wrap items-center gap-2">
                <span>Arman Patel</span> <span className="animate-bounce">👋</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 font-medium pt-1">
                Here's your dashboard overview
              </p>
            </div>
          </div>

          {/* Right Stats Cards (Col 5) */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-3">

            {/* Stat 1: Total Properties */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Home className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="mt-3 sm:mt-4">
                <span className="font-serif text-lg sm:text-2xl font-extrabold text-gray-900">5</span>
                <p className="text-[10px] sm:text-[11px] font-bold text-gray-500 mt-0.5 truncate">Total Properties</p>
              </div>
            </div>

            {/* Stat 2: Wishlist Items */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="mt-3 sm:mt-4">
                <span className="font-serif text-lg sm:text-2xl font-extrabold text-gray-900">8</span>
                <p className="text-[10px] sm:text-[11px] font-bold text-gray-500 mt-0.5 truncate">Wishlist Items</p>
              </div>
            </div>

            {/* Stat 3: New Messages */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 relative">
                <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
              </div>
              <div className="mt-3 sm:mt-4">
                <span className="font-serif text-lg sm:text-2xl font-extrabold text-gray-900">3</span>
                <p className="text-[10px] sm:text-[11px] font-bold text-gray-500 mt-0.5 truncate">New Messages</p>
              </div>
            </div>

          </div>

        </div>

        {/* 3. MIDDLE SECTION: MY PROFILE & MY PROPERTIES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Left: My Profile Card (Col 6) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="font-serif text-base sm:text-lg font-bold text-gray-900">
                My Profile
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <div className="relative shrink-0">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0c2225] text-white font-bold text-2xl shadow-md">
                  A
                </div>
                <div className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-700 shadow border border-gray-200">
                  📷
                </div>
              </div>

              <div className="flex-1 space-y-1 w-full">
                <div className="flex items-center justify-center sm:justify-start gap-1.5">
                  <h4 className="font-serif text-base font-bold text-gray-900">Arman Patel</h4>
                  <ShieldCheck className="h-4 w-4 text-blue-500 fill-blue-500 shrink-0" />
                </div>
                <span className="inline-block rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                  Property Owner
                </span>

                <div className="pt-2 space-y-1.5 text-xs text-gray-600 font-medium break-all sm:break-normal">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Phone className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Mail className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                    <span>armanpatel@gmail.com</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                    <span>Ahmedabad, Gujarat</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right: My Properties Card (Col 6) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="font-serif text-base sm:text-lg font-bold text-gray-900">
                My Properties
              </h3>
              <button
                onClick={() => navigate("/my-properties")}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 shrink-0"
              >
                View All
              </button>
            </div>

            {/* Property Item Card */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
              <div className="relative h-32 sm:h-28 w-full sm:w-36 rounded-xl overflow-hidden shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=400&auto=format&fit=crop"
                  alt="Property Preview"
                  className="h-full w-full object-cover"
                />
                <span className="absolute top-2 left-2 rounded bg-emerald-500 px-2 py-0.5 text-[9px] font-bold text-white">
                  Active
                </span>
              </div>

              <div className="flex-1 space-y-1 w-full text-center sm:text-left">
                <h4 className="font-serif text-xs sm:text-sm font-bold text-gray-900">
                  Premium Residential Plot Near SP Ring Road
                </h4>
                <div className="font-serif text-sm sm:text-base font-extrabold text-amber-600">
                  ₹ 45,00,000
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-1 text-[11px] text-gray-500">
                  <MapPin className="h-3 w-3 text-amber-500 shrink-0" />
                  <span>Ahmedabad, Gujarat</span>
                </div>

                <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
                  <button
                    onClick={() => navigate("/edit-property")}
                    className="flex items-center gap-1 rounded-lg bg-gray-200/70 px-3 py-1.5 text-[11px] font-bold text-gray-700 hover:bg-gray-200"
                  >
                    <Edit3 className="h-3 w-3" /> Edit
                  </button>
                  <button
                    onClick={() => navigate("/propertiesDetails")}
                    className="flex items-center gap-1 rounded-lg bg-[#0c2225] px-3 py-1.5 text-[11px] font-bold text-white hover:bg-black"
                  >
                    <Eye className="h-3 w-3" /> View Details
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-1.5 pt-1">
              <span className="h-1.5 w-4 rounded-full bg-amber-500" />
              <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
              <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
              <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-10 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3 text-center sm:text-left">
        <p>© 2025 BuyLand. All Rights Reserved</p>
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4">
          <a href="/privacy" className="hover:text-amber-600">Privacy Policy</a>
          <span>|</span>
          <a href="/terms" className="hover:text-amber-600">Terms &amp; Conditions</a>
          <span>|</span>
          <a href="/support" className="hover:text-amber-600">Support</a>
        </div>
      </footer>

    </div>
  );
}