import React, { useState } from "react";
import {
  Building2,
  Users,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  Home,
  Eye,
  X,
  MapPin,
  Maximize2,
  Compass,
  Phone,
  User,
  ExternalLink,
} from "lucide-react";

export default function AdminOverview() {
  const [selectedProperty, setSelectedProperty] = useState(null);

  const stats = [
    { title: "Total Properties", value: "1,240", icon: Home, change: "+12% this month" },
    { title: "Active Users", value: "8,540", icon: Users, change: "+240 new today" },
    { title: "Pending Approvals", value: "18", icon: Clock, change: "Requires action" },
    { title: "Total Revenue", value: "₹ 45,20,000", icon: DollarSign, change: "+18% growth" },
  ];

  const pendingListings = [
    {
      id: 1,
      title: "Commercial Plot near SG Highway",
      owner: "Ramesh Patel",
      phone: "+91 98765 43210",
      email: "ramesh@gmail.com",
      type: "Commercial Plot",
      price: "₹ 85,00,000",
      area: "2400 sq. yd",
      facing: "East Facing",
      naStatus: "NA Approved",
      location: "SG Highway, Ahmedabad, Gujarat",
      mapLink: "https://maps.google.com/?q=SG+Highway+Ahmedabad",
      date: "28 Oct 2026",
      description:
        "Prime commercial land touch with 60ft main road. Ideal for showroom, office complex or commercial tower development with full clear title.",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Agricultural Land in Mehsana",
      owner: "Suresh Joshi",
      phone: "+91 98123 45678",
      email: "suresh.j@gmail.com",
      type: "Agricultural Land",
      price: "₹ 28,00,000",
      area: "5 Bigha",
      facing: "North-East Facing",
      naStatus: "Agricultural (Old Tenure)",
      location: "Unjha Road, Mehsana, Gujarat",
      mapLink: "https://maps.google.com/?q=Mehsana+Gujarat",
      date: "27 Oct 2026",
      description:
        "Fertile agricultural land with tubewell water supply and electricity connection. Direct access from district main road.",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop",
    },
  ];

  const handleApprove = (id) => {
    alert(`Property ID #${id} Approved Successfully!`);
    setSelectedProperty(null);
  };

  const handleReject = (id) => {
    alert(`Property ID #${id} Rejected!`);
    setSelectedProperty(null);
  };

  return (
    <div className="flex-1 bg-[#fbf9f5] min-h-screen overflow-y-auto p-4 sm:p-6 lg:p-10 text-gray-900 font-sans">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Page Title & Welcome */}
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Admin Overview
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-600 font-medium flex items-center gap-1.5">
            <span>Welcome back, System Administrator</span>
            <span>🚀</span>
          </p>
        </div>

        {/* 4 Stats Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white p-4 sm:p-5 shadow-sm border border-amber-100 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] sm:text-xs font-semibold text-gray-500">
                    {stat.title}
                  </span>
                  <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-amber-50 text-[#b88c3a]">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </div>
                <div className="mt-3 sm:mt-4">
                  <span className="font-serif text-xl sm:text-3xl font-extrabold text-gray-900">
                    {stat.value}
                  </span>
                  <p className="mt-0.5 text-[10px] sm:text-[11px] text-gray-400 font-medium">
                    {stat.change}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pending Property Approvals Section */}
        <div className="rounded-3xl bg-white p-4 sm:p-6 shadow-sm border border-amber-100 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
            <h2 className="font-serif text-base sm:text-lg font-bold text-gray-900">
              Pending Property Approvals
            </h2>
            <span className="inline-flex w-fit rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-[#b88c3a]">
              18 Pending
            </span>
          </div>

          {/* List items */}
          <div className="space-y-3">
            {pendingListings.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 sm:p-4 rounded-2xl bg-gray-50/80 border border-gray-100 transition hover:shadow-md"
              >
                {/* Property Info */}
                <div className="flex items-center gap-3.5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 w-20 sm:h-16 sm:w-20 rounded-xl object-cover shrink-0 border border-gray-200"
                  />
                  <div>
                    <h4 className="font-serif text-xs sm:text-sm font-bold text-gray-900 line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="mt-0.5 text-[11px] sm:text-xs text-gray-500">
                      Owner:{" "}
                      <span className="font-semibold text-gray-700">
                        {item.owner}
                      </span>
                    </p>
                    <p className="text-[11px] sm:text-xs text-gray-500">
                      Type:{" "}
                      <span className="font-semibold text-gray-700">
                        {item.type}
                      </span>{" "}
                      | Price:{" "}
                      <span className="font-bold text-[#b88c3a]">
                        {item.price}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Actions: View Details, Approve & Reject */}
                <div className="flex items-center gap-2 justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-200">
                  {/* View Details Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedProperty(item)}
                    className="flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs font-bold text-gray-700 shadow-sm transition hover:bg-amber-50 hover:border-[#d8b46a] hover:text-[#b88c3a] active:scale-95"
                  >
                    <Eye className="h-3.5 w-3.5 text-[#b88c3a]" />
                    <span>View Details</span>
                  </button>

                  {/* Approve */}
                  <button
                    type="button"
                    onClick={() => handleApprove(item.id)}
                    className="flex items-center gap-1 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow hover:bg-emerald-700 transition active:scale-95"
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span>Approve</span>
                  </button>

                  {/* Reject */}
                  <button
                    type="button"
                    onClick={() => handleReject(item.id)}
                    className="flex items-center gap-1 rounded-xl bg-red-600 px-3.5 py-2 text-xs font-bold text-white shadow hover:bg-red-700 transition active:scale-95"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ================= PROPERTY FULL DETAILS MODAL POPUP ================= */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-amber-100 max-h-[90vh] overflow-y-auto font-sans text-gray-900">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProperty(null)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-red-100 hover:text-red-600"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Title Header */}
            <div className="border-b border-gray-100 pb-4">
              <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold text-[#b88c3a] mb-1.5">
                {selectedProperty.type}
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900">
                {selectedProperty.title}
              </h2>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                <MapPin className="h-3.5 w-3.5 text-[#b88c3a]" />
                <span>{selectedProperty.location}</span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="mt-5 space-y-5">
              {/* Image Preview */}
              <div className="relative h-48 sm:h-64 w-full rounded-2xl overflow-hidden shadow-inner border border-gray-100">
                <img
                  src={selectedProperty.image}
                  alt={selectedProperty.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md text-[#ffd77f] font-extrabold text-sm px-3.5 py-1.5 rounded-full shadow">
                  {selectedProperty.price}
                </div>
              </div>

              {/* Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                    Area Size
                  </span>
                  <span className="font-bold text-gray-800">
                    {selectedProperty.area}
                  </span>
                </div>

                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                    Facing
                  </span>
                  <span className="font-bold text-gray-800">
                    {selectedProperty.facing}
                  </span>
                </div>

                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                    N.A. Status
                  </span>
                  <span className="font-bold text-emerald-700">
                    {selectedProperty.naStatus}
                  </span>
                </div>
              </div>

              {/* Owner Contact Information */}
              <div className="rounded-2xl bg-amber-50/60 p-4 border border-amber-200/50 space-y-2">
                <h4 className="font-serif text-xs font-bold text-[#30230c] uppercase tracking-wider">
                  Owner / Seller Contact Info
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-800">
                  <div className="flex items-center gap-2">
                    <User className="h-3.5 w-3.5 text-[#b88c3a]" />
                    <span>Name: <strong>{selectedProperty.owner}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-[#b88c3a]" />
                    <span>Phone: <strong>{selectedProperty.phone}</strong></span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-serif text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">
                  Property Description
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                  {selectedProperty.description}
                </p>
              </div>

              {/* Google Maps Link */}
              <div>
                <a
                  href={selectedProperty.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b88c3a] hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Open Location in Google Maps</span>
                </a>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedProperty(null)}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => handleReject(selectedProperty.id)}
                className="flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white shadow transition hover:bg-red-700"
              >
                <XCircle className="h-3.5 w-3.5" />
                <span>Reject</span>
              </button>

              <button
                type="button"
                onClick={() => handleApprove(selectedProperty.id)}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow transition hover:bg-emerald-700"
              >
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Approve Listing</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}