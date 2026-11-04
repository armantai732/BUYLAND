import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Eye,
  Edit3,
  Trash2,
  MapPin,
  Maximize2,
  Navigation,
  Compass,
  Calendar,
  Loader2,
  X,
  CheckCircle,
} from "lucide-react";

import { getMyProperties, updateMyPropertyAPI } from "../api/api";

export default function MyProperties() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("all");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit Modal State & Full Form Fields matching Mongoose Schema
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  
  const [editFormData, setEditFormData] = useState({
    title: "",
    propertyType: "Residential Plot",
    ownershipType: "Single Owner",
    sellerType: "Owner",
    sellerName: "",
    sellerPhone: "",
    sellerWhatsapp: "",
    price: "",
    isNegotiable: "Yes",
    area: "",
    areaUnit: "sq. yd",
    frontageFeet: "",
    depthFeet: "",
    facing: "East Facing",
    cornerPlot: "No",
    roadWidth: "",
    naStatus: "",
    titleClear: "Yes",
    zoneType: "",
    address: "",
    tpNumber: "",
    city: "",
    state: "",
    pincode: "",
    googleMapsLink: "",
    description: "",
  });

  // Fetch logged-in user's properties
  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getMyProperties();

      const propertyList = Array.isArray(data)
        ? data
        : data?.properties ||
          data?.data?.properties ||
          data?.data ||
          [];

      setProperties(Array.isArray(propertyList) ? propertyList : []);
    } catch (err) {
      setError(err.message || "Failed to load properties.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Status counts
  const allCount = properties.length;
  const approvedCount = properties.filter(
    (p) => p.status?.toLowerCase() === "approved"
  ).length;
  const processingCount = properties.filter(
    (p) => p.status?.toLowerCase() === "processing"
  ).length;
  const soldOutCount = properties.filter(
    (p) => p.status?.toLowerCase() === "sold out"
  ).length;

  // Filter properties
  const filteredProperties = properties.filter((p) => {
    const status = p.status?.toLowerCase();
    if (activeTab === "approved") return status === "approved";
    if (activeTab === "processing") return status === "processing";
    if (activeTab === "sold out") return status === "sold out";
    return true;
  });

  // View property details
  const handleViewDetails = (property) => {
    const propertyId = property._id || property.id;
    if (!propertyId) {
      alert("Property ID not found");
      return;
    }
    navigate(`/propertiesDetails?id=${propertyId}`);
  };

  // Open Edit Modal & Pre-fill
  const handleEditProperty = (property) => {
    const propertyId = property._id || property.id;

    if (!propertyId) {
      alert("Property ID not found");
      return;
    }

    if (property.status?.toLowerCase() !== "processing") {
      alert("Only processing properties can be edited.");
      return;
    }

    setEditingPropertyId(propertyId);
    setEditFormData({
      title: property.title || "",
      propertyType: property.propertyType || "Residential Plot",
      ownershipType: property.ownershipType || "Single Owner",
      sellerType: property.sellerType || "Owner",
      sellerName: property.sellerName || "",
      sellerPhone: property.sellerPhone || "",
      sellerWhatsapp: property.sellerWhatsapp || "",
      price: property.price || "",
      isNegotiable: property.isNegotiable || "Yes",
      area: property.area || "",
      areaUnit: property.areaUnit || "sq. yd",
      frontageFeet: property.frontageFeet || 0,
      depthFeet: property.depthFeet || 0,
      facing: property.facing || "East Facing",
      cornerPlot: property.cornerPlot || "No",
      roadWidth: property.roadWidth || "",
      naStatus: property.naStatus || "",
      titleClear: property.titleClear || "Yes",
      zoneType: property.zoneType || "",
      address: property.address || "",
      tpNumber: property.tpNumber || "",
      city: property.city || "",
      state: property.state || "",
      pincode: property.pincode || "",
      googleMapsLink: property.googleMapsLink || "",
      description: property.description || "",
    });
    setUpdateError(null);
    setIsEditModalOpen(true);
  };

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit Update Form
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editingPropertyId) return;

    try {
      setUpdating(true);
      setUpdateError(null);

      await updateMyPropertyAPI(editingPropertyId, editFormData);

      setIsEditModalOpen(false);
      setEditingPropertyId(null);
      await fetchProperties();
    } catch (err) {
      setUpdateError(err.message || "Failed to update property.");
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveProperty = (property) => {
    const propertyId = property._id || property.id;
    if (!propertyId) {
      alert("Property ID not found");
      return;
    }
    alert("Remove property API abhi connect nahi hai.");
  };

  const formatPrice = (price) => {
    if (price === undefined || price === null || price === "") {
      return "Price on Request";
    }
    const numericPrice = Number(price);
    return Number.isNaN(numericPrice)
      ? price
      : `₹ ${numericPrice.toLocaleString("en-IN")}`;
  };

  const formatDate = (property) => {
    if (property.date) return property.date;
    if (!property.createdAt) return "N/A";
    return new Date(property.createdAt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusStyle = (status) => {
    const currentStatus = status?.toLowerCase();
    if (currentStatus === "approved") return "bg-emerald-500";
    if (currentStatus === "processing") return "bg-amber-500";
    if (currentStatus === "sold out") return "bg-blue-600";
    if (currentStatus === "rejected") return "bg-red-500";
    return "bg-gray-600";
  };

  return (
    <div className="min-h-[80%] bg-[#f4f7fb] font-sans text-gray-800 antialiased flex overflow-x-hidden relative">
      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                My Properties
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Manage your listed properties
              </p>
            </div>

            <button
              onClick={() => navigate("/sale")}
              className="self-start sm:self-auto flex items-center gap-1.5 rounded-xl bg-amber-400 px-4 py-2 text-xs sm:text-sm font-bold text-gray-900 hover:bg-amber-500 transition shadow-sm"
            >
              <Plus className="h-4 w-4" />
              Add New Property
            </button>
          </div>

          {/* FILTER TABS */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === "all" ? "bg-[#0c2225] text-white shadow" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              All Properties ({allCount})
            </button>
            <button
              onClick={() => setActiveTab("approved")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === "approved" ? "bg-[#0c2225] text-white shadow" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Approved ({approvedCount})
            </button>
            <button
              onClick={() => setActiveTab("processing")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === "processing" ? "bg-[#0c2225] text-white shadow" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Processing ({processingCount})
            </button>
            <button
              onClick={() => setActiveTab("sold out")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === "sold out" ? "bg-[#0c2225] text-white shadow" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Sold Out ({soldOutCount})
            </button>
          </div>

          {/* PROPERTIES LIST */}
          <div className="space-y-4">
            {loading ? (
              <div className="bg-white p-12 rounded-3xl text-center flex flex-col items-center justify-center border border-gray-100">
                <Loader2 className="h-8 w-8 animate-spin text-amber-600 mb-2" />
                <p className="text-sm text-gray-500 font-medium">Loading your properties...</p>
              </div>
            ) : error ? (
              <div className="bg-white p-10 rounded-3xl text-center text-red-500 border border-gray-100">
                {error}
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="bg-white p-10 rounded-3xl text-center text-gray-500 border border-gray-100">
                <div className="text-4xl mb-3">🏡</div>
                <h3 className="text-lg font-bold text-gray-800">No Properties Found</h3>
                <p className="text-sm mt-1">No properties found in this category.</p>
                {activeTab === "all" && (
                  <button
                    onClick={() => navigate("/sale")}
                    className="mt-5 inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold px-5 py-2.5 rounded-xl text-sm transition"
                  >
                    <Plus className="w-4 h-4" />
                    Add Your First Property
                  </button>
                )}
              </div>
            ) : (
              filteredProperties.map((prop) => {
                const currentStatus = prop.status?.toLowerCase();
                const isEditable = currentStatus === "processing";
                const canViewDetails = currentStatus !== "processing";
                const image = prop.image || prop.images?.[0] || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop";

                return (
                  <div
                    key={prop._id || prop.id}
                    className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6"
                  >
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 w-full lg:w-auto flex-1">
                      <div className="relative h-40 w-full sm:w-52 sm:h-36 rounded-2xl overflow-hidden shrink-0 shadow-sm bg-gray-100">
                        <img
                          src={image}
                          alt={prop.title || "Property"}
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop";
                          }}
                          className="h-full w-full object-cover"
                        />
                        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold text-white shadow ${getStatusStyle(prop.status)}`}>
                          {prop.status || "Pending"}
                        </span>
                      </div>

                      <div className="space-y-2 w-full text-center sm:text-left">
                        <h3 className="font-serif text-base sm:text-lg font-bold text-gray-900">
                          {prop.title || "Untitled Property"}
                        </h3>
                        <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-gray-500">
                          <MapPin className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                          <span>{prop.address || prop.city || "Location not available"}</span>
                        </div>

                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
                          <span className="font-serif text-lg sm:text-xl font-extrabold text-amber-600">
                            {formatPrice(prop.price)}
                          </span>
                          <span className="rounded-md bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                            {prop.isNegotiable || "Negotiable"}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs font-medium text-gray-600">
                          <div className="flex items-center gap-1.5">
                            <Maximize2 className="h-3.5 w-3.5 text-gray-400" />
                            <span>{prop.area ? `${prop.area} ${prop.areaUnit || ""}` : "Area not specified"}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Navigation className="h-3.5 w-3.5 text-gray-400" />
                            <span>{prop.roadWidth || "Road width not specified"}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Compass className="h-3.5 w-3.5 text-gray-400" />
                            <span>{prop.facing || "Facing not specified"}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col items-center justify-between lg:justify-center w-full lg:w-auto gap-5 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-gray-100 lg:pl-6 shrink-0">
                      <div className="text-center lg:text-left space-y-1 w-full sm:w-auto">
                        <div className="text-[11px] text-gray-400 font-medium">Listed On</div>
                        <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs font-bold text-gray-700">
                          <Calendar className="h-3.5 w-3.5 text-gray-400" />
                          <span>{formatDate(prop)}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full sm:w-44">
                        {canViewDetails && (
                          <button
                            onClick={() => handleViewDetails(prop)}
                            className="flex items-center justify-center gap-1.5 rounded-xl bg-[#0c2225] px-4 py-2 text-xs font-bold text-white hover:bg-black transition shadow-sm"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            View Details
                          </button>
                        )}
                        {isEditable && (
                          <button
                            onClick={() => handleEditProperty(prop)}
                            className="flex items-center justify-center gap-1.5 rounded-xl bg-amber-100/70 px-4 py-2 text-xs font-bold text-amber-900 hover:bg-amber-200 transition"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                            Edit Property
                          </button>
                        )}
                        <button
                          onClick={() => handleRemoveProperty(prop)}
                          className="flex items-center justify-center gap-1.5 rounded-xl bg-red-50 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-100 transition"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>

        <footer className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-10 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3 text-center sm:text-left">
          <p>© 2026 BuyLand. All Rights Reserved</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4">
            <a href="/privacy" className="hover:text-amber-600">Privacy Policy</a>
            <span>|</span>
            <a href="/terms" className="hover:text-amber-600">Terms &amp; Conditions</a>
            <span>|</span>
            <a href="/support" className="hover:text-amber-600">Support</a>
          </div>
        </footer>
      </div>

      {/* EDIT PROPERTY MODAL FORM WITH ALL SCHEMA FIELDS */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-3xl p-6 sm:p-8 shadow-2xl relative my-8 border border-gray-100 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 bg-gray-100 p-2 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-gray-900">
                Edit Processing Property
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Update your property details according to system requirements.
              </p>
            </div>

            {updateError && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs font-semibold rounded-xl border border-red-100">
                {updateError}
              </div>
            )}

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Property Type *</label>
                  <select
                    name="propertyType"
                    value={editFormData.propertyType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="Residential Plot">Residential Plot</option>
                    <option value="Agricultural Land">Agricultural Land</option>
                    <option value="Commercial Land">Commercial Land</option>
                    <option value="Industrial Land">Industrial Land</option>
                    <option value="Recreational Land">Recreational Land</option>
                    <option value="Investment Land">Investment Land</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Ownership Type</label>
                  <input
                    type="text"
                    name="ownershipType"
                    value={editFormData.ownershipType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Seller Type *</label>
                  <select
                    name="sellerType"
                    value={editFormData.sellerType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm"
                  >
                    <option value="Owner">Owner</option>
                    <option value="Agent / Broker">Agent / Broker</option>
                    <option value="Builder / Developer">Builder / Developer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Seller Name *</label>
                  <input
                    type="text"
                    name="sellerName"
                    value={editFormData.sellerName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Seller Phone *</label>
                  <input
                    type="text"
                    name="sellerPhone"
                    value={editFormData.sellerPhone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Seller WhatsApp *</label>
                  <input
                    type="text"
                    name="sellerWhatsapp"
                    value={editFormData.sellerWhatsapp}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    value={editFormData.price}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Is Negotiable</label>
                  <select
                    name="isNegotiable"
                    value={editFormData.isNegotiable}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm"
                  >
                    <option value="Yes">Yes</option>
                    <option value="Fixed Price">Fixed Price</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Area *</label>
                  <input
                    type="number"
                    name="area"
                    value={editFormData.area}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Area Unit *</label>
                  <select
                    name="areaUnit"
                    value={editFormData.areaUnit}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm"
                  >
                    <option value="sq. yd">sq. yd</option>
                    <option value="sq. ft">sq. ft</option>
                    <option value="Acre">Acre</option>
                    <option value="Bigha">Bigha</option>
                    <option value="Guntha">Guntha</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Frontage (Ft)</label>
                  <input
                    type="number"
                    name="frontageFeet"
                    value={editFormData.frontageFeet}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Depth (Ft)</label>
                  <input
                    type="number"
                    name="depthFeet"
                    value={editFormData.depthFeet}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Facing *</label>
                  <select
                    name="facing"
                    value={editFormData.facing}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm"
                  >
                    <option value="East Facing">East Facing</option>
                    <option value="West Facing">West Facing</option>
                    <option value="North Facing">North Facing</option>
                    <option value="South Facing">South Facing</option>
                    <option value="Corner Plot">Corner Plot</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Corner Plot</label>
                  <select
                    name="cornerPlot"
                    value={editFormData.cornerPlot}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Road Width *</label>
                  <input
                    type="text"
                    name="roadWidth"
                    value={editFormData.roadWidth}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">NA Status *</label>
                  <input
                    type="text"
                    name="naStatus"
                    value={editFormData.naStatus}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Title Clear *</label>
                  <select
                    name="titleClear"
                    value={editFormData.titleClear}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm"
                  >
                    <option value="Yes">Yes</option>
                    <option value="In Progress">In Progress</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Zone Type *</label>
                  <input
                    type="text"
                    name="zoneType"
                    value={editFormData.zoneType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={editFormData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">TP Number</label>
                  <input
                    type="text"
                    name="tpNumber"
                    value={editFormData.tpNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={editFormData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={editFormData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={editFormData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  rows="3"
                  value={editFormData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-gray-900 bg-amber-400 hover:bg-amber-500 transition shadow-sm disabled:opacity-50"
                >
                  {updating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}