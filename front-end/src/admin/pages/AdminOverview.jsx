import React, { useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  Home,
  Users,
  IndianRupee,
  Crown,
  TrendingUp,
  PieChart,
  PlusCircle,
  UserCheck,
  BarChart3,
  Settings,
  MapPin,
  Eye,
  Heart,
  ArrowRight,
  Building2
} from "lucide-react";

export default function AdminOverview() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("Last 6 Months");

  // Stat cards data matching screenshot
  const stats = [
    {
      title: "Total Properties",
      value: "1,248",
      change: "+12.5%",
      icon: Home,
    },
    {
      title: "Total Users",
      value: "8,742",
      change: "+8.3%",
      icon: Users,
    },
    {
      title: "Profit",
      value: "₹4,85,230",
      change: "+15.7%",
      icon: IndianRupee,
    }
  ];

  // Property status doughnut chart legend items
  const propertyStatuses = [
    { label: "Approved", count: 720, percentage: "57.7%", color: "bg-emerald-500" },
    { label: "Processing", count: 312, percentage: "25.0%", color: "bg-amber-400" },
    { label: "Rejected", count: 104, percentage: "8.3%", color: "bg-rose-500" },
    { label: "Sold Out", count: 112, percentage: "9.0%", color: "bg-slate-600" },
  ];

  // Recent properties listing matching screenshot
  const recentProperties = [
    {
      id: 1,
      title: "Luxury Villa in Ahmedabad",
      price: "₹1.25 Cr",
      location: "Ahmedabad",
      views: "2.5K",
      status: "Approved",
      statusColor: "bg-emerald-100 text-emerald-700 border-emerald-300",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Premium Plot in SG Highway",
      price: "₹85 Lakh",
      location: "Ahmedabad",
      views: "1.8K",
      status: "Processing",
      statusColor: "bg-amber-100 text-amber-700 border-amber-300",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "2 BHK Apartment",
      price: "₹72 Lakh",
      location: "Ahmedabad",
      views: "1.2K",
      status: "Approved",
      statusColor: "bg-emerald-100 text-emerald-700 border-emerald-300",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen flex-1 bg-[#f8f9fa] p-4 sm:p-6 lg:p-8 text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
  

        {/* HERO BANNER CARD */}
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="relative z-10 max-w-lg">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">👋</span>
              <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Welcome Back, Admin!
              </h1>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-gray-500 font-medium">
              Here's what's happening with your real estate platform today.
            </p>
          </div>

          {/* Background House Banner */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
              alt="Luxury modern house"
              className="h-full w-full object-cover object-left mask-linear-gradient"
              style={{
                maskImage: "linear-gradient(to right, transparent, black 40%)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 40%)",
              }}
            />
          </div>
        </div>

        {/* 4 STATS CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm border border-gray-100 flex items-center gap-4 transition hover:shadow-md"
              >
                {/* Gold Circle Badge Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-white shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <div>
                  <p className="text-xs font-semibold text-gray-500">{stat.title}</p>
                  <h3 className="text-xl font-extrabold text-gray-900 mt-0.5 font-serif">
                    {stat.value}
                  </h3>
                  <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-bold text-emerald-600">
                    <span>↑</span> {stat.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CHARTS SECTION (2 COLUMNS) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Revenue Overview (Line Chart) */}
          <div className="lg:col-span-2 rounded-2xl bg-white p-5 sm:p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-gray-50">
              <div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-amber-500" />
                  <h2 className="font-serif text-base font-bold text-gray-900">
                    Profit Overview
                  </h2>
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-gray-900 font-serif">
                    ₹4,85,230
                  </span>
                  <span className="text-xs font-bold text-emerald-600">
                    ↑ +15.7%
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 font-medium">Total Profit</p>
              </div>

              {/* Timeframe Selector Dropdown */}
              <div className="relative">
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 outline-none cursor-pointer"
                >
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                  <option>This Month</option>
                </select>
              </div>
            </div>

            {/* SVG Line Chart Representation */}
            <div className="mt-6 h-48 w-full">
              <svg className="h-full w-full overflow-visible" viewBox="0 0 500 150">
                {/* Grid Lines */}
                <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeDasharray="4" />
                <line x1="0" y1="70" x2="500" y2="70" stroke="#f1f5f9" strokeDasharray="4" />
                <line x1="0" y1="110" x2="500" y2="110" stroke="#f1f5f9" strokeDasharray="4" />

                {/* Y Axis Labels */}
                <text x="0" y="25" fill="#94a3b8" fontSize="10">5L</text>
                <text x="0" y="65" fill="#94a3b8" fontSize="10">3L</text>
                <text x="0" y="105" fill="#94a3b8" fontSize="10">1L</text>

                {/* Line Path */}
                <path
                  d="M 30,110 L 110,85 L 190,70 L 270,88 L 350,55 L 430,40"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Data Points */}
                {[[30, 110], [110, 85], [190, 70], [270, 88], [350, 55], [430, 40]].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="4" fill="#d97706" stroke="#ffffff" strokeWidth="2" />
                ))}

                {/* X Axis Labels */}
                <text x="25" y="145" fill="#64748b" fontSize="11">May</text>
                <text x="105" y="145" fill="#64748b" fontSize="11">Jun</text>
                <text x="185" y="145" fill="#64748b" fontSize="11">Jul</text>
                <text x="265" y="145" fill="#64748b" fontSize="11">Aug</text>
                <text x="345" y="145" fill="#64748b" fontSize="11">Sep</text>
                <text x="425" y="145" fill="#64748b" fontSize="11">Oct</text>
              </svg>
            </div>
          </div>

          {/* Property Status (Doughnut Chart) */}
          <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-50">
              <PieChart className="h-4 w-4 text-amber-500" />
              <h2 className="font-serif text-base font-bold text-gray-900">
                Property Status
              </h2>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Donut Chart SVG */}
              <div className="relative flex items-center justify-center h-36 w-36 shrink-0">
                <svg className="h-full w-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Background Circle */}
                  <path
                    className="text-gray-100"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Approved 57.7% */}
                  <path
                    className="text-emerald-500"
                    strokeDasharray="57.7, 100"
                    strokeWidth="4"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Processing 25% */}
                  <path
                    className="text-amber-400"
                    strokeDasharray="25, 100"
                    strokeDashoffset="-57.7"
                    strokeWidth="4"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>

                {/* Center Total Count */}
                <div className="absolute text-center">
                  <span className="block text-base font-extrabold text-gray-900 leading-tight">
                    1,248
                  </span>
                  <span className="block text-[10px] text-gray-400 font-medium">
                    Total
                  </span>
                </div>
              </div>

              {/* Status Legends */}
              <div className="w-full space-y-2">
                {propertyStatuses.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                      <span className="font-medium text-gray-600">
                        {item.label} <span className="text-gray-400">({item.count})</span>
                      </span>
                    </div>
                    <span className="font-bold text-gray-800">{item.percentage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: RECENT PROPERTIES & QUICK ACTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Recent Properties Grid (2 Cols wide) */}
          <div className="lg:col-span-2 rounded-2xl bg-white p-5 sm:p-6 shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-50 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-amber-500" />
                <h2 className="font-serif text-base font-bold text-gray-900">
                  Recent Properties
                </h2>
              </div>
              <button
                type="button"
                className="flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700 transition"
              >
                <span>View All</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recentProperties.map((prop) => (
                <div
                  key={prop.id}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="relative h-32 w-full overflow-hidden">
                    <img
                      src={prop.image}
                      alt={prop.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Status Badge */}
                    <span
                      className={`absolute top-2 left-2 rounded-md border px-2 py-0.5 text-[10px] font-bold shadow-sm backdrop-blur-md ${prop.statusColor}`}
                    >
                      {prop.status}
                    </span>

                    {/* Heart Action Icon */}
                    <button
                      type="button"
                      className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/80 text-gray-600 backdrop-blur-md hover:text-rose-500"
                    >
                      <Heart className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="p-3">
                    <h4 className="font-serif text-xs font-bold text-gray-900 truncate">
                      {prop.title}
                    </h4>

                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-xs font-extrabold text-amber-600">
                        {prop.price}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-gray-400">
                        <Eye className="h-3 w-3" />
                        <span>{prop.views}</span>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-1 text-[10px] text-gray-400">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span>{prop.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions (1 Col wide) */}
          <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
              <span className="text-amber-500 text-base">⚡</span>
              <h2 className="font-serif text-base font-bold text-gray-900">
                Quick Actions
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex flex-col items-center justify-center gap-2 rounded-xl bg-gray-50 border border-gray-100 p-4 transition hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 active:scale-95"
              >
                <PlusCircle className="h-6 w-6 text-gray-700" />
                <span className="text-xs font-semibold text-gray-700">Add Property</span>
              </button>

              <button
                type="button"
                className="flex flex-col items-center justify-center gap-2 rounded-xl bg-gray-50 border border-gray-100 p-4 transition hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 active:scale-95"
              >
                <UserCheck className="h-6 w-6 text-gray-700" />
                <span className="text-xs font-semibold text-gray-700">Manage Users</span>
              </button>


              <button
                type="button"
                className="flex flex-col items-center justify-center gap-2 rounded-xl bg-gray-50 border border-gray-100 p-4 transition hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 active:scale-95"
              >
                <Settings className="h-6 w-6 text-gray-700" />
                <span className="text-xs font-semibold text-gray-700">Site Settings</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}