import React, { useState } from "react";
import {
  Upload,
  MapPin,
  DollarSign,
  Maximize2,
  Compass,
  FileText,
  CheckCircle2,
  Road,
  Zap,
  Droplets,
  Trees,
  ShieldCheck,
  Phone,
  User,
  Ruler,
  FileCheck,
  Trash2,
} from "lucide-react";

export default function SellProperty() {
  const [formData, setFormData] = useState({
    // Basic Details
    title: "",
    propertyType: "Residential Plot",
    ownershipType: "Single Owner",
    sellerType: "Owner", // Owner / Agent / Builder
    sellerName: "",
    sellerPhone: "",
    sellerWhatsapp: "",

    // Pricing & Area
    price: "",
    isNegotiable: "Yes",
    area: "",
    areaUnit: "sq. yd",
    frontageFeet: "",
    depthFeet: "",
    facing: "East Facing",
    cornerPlot: "No",
    roadWidth: "Main Road (60ft+)",

    // Legal & Approvals
    naStatus: "NA Approved", // NA Approved / Agricultural / TP Scheme
    titleClear: "Yes",
    zoneType: "Residential Zone",

    // Location
    address: "",
    tpNumber: "",
    plotNumber: "",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "",
    googleMapsLink: "",

    // Description
    description: "",
  });

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [images, setImages] = useState([]);

  const amenityOptions = [
    { name: "Main Road Connectivity", icon: Road },
    { name: "Electricity Supply", icon: Zap },
    { name: "Water Supply / Borewell", icon: Droplets },
    { name: "Nearby Parks / Greenery", icon: Trees },
    { name: "24/7 Security / Boundary Wall", icon: ShieldCheck },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenityToggle = (amenityName) => {
    if (selectedAmenities.includes(amenityName)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenityName));
    } else {
      setSelectedAmenities([...selectedAmenities, amenityName]);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImageUrls]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalListingData = {
      ...formData,
      amenities: selectedAmenities,
      images,
    };
    console.log("Full Property Data Submitted:", finalListingData);
    alert("Property listed successfully with all details!");
  };

  return (
    <div className="w-full bg-[#061517] min-h-screen py-10 px-4 sm:px-8 lg:px-12 text-white font-sans">
      <div className="mx-auto max-w-5xl">
        
        {/* Page Header */}
        <div className="mb-8 text-center sm:text-left">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#ffd77f]">
            List Your Property
          </span>
          <h1 className="mt-1 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Sell Land & <span className="bg-gradient-to-r from-[#ffe59a] via-[#ffd77f] to-[#d7b66b] bg-clip-text text-transparent">Plots</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-400 font-light max-w-xl">
            Provide complete plot dimensions, legal status, pricing, and contact details to get verified buyers fast.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECTION 1: SELLER CONTACT DETAILS */}
          <div className="rounded-3xl border border-white/10 bg-[#0c2225]/80 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#ffd77f] border-b border-white/10 pb-3 flex items-center gap-2">
              <User className="h-5 w-5 text-[#d8b46a]" />
              1. Seller Contact Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  I am *
                </label>
                <select
                  name="sellerType"
                  value={formData.sellerType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#122e32] px-4 py-3 text-sm text-white outline-none transition focus:border-[#ffd77f]"
                >
                  <option value="Owner">Owner</option>
                  <option value="Agent / Broker">Agent / Broker</option>
                  <option value="Builder / Developer">Builder / Developer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  name="sellerName"
                  required
                  placeholder="Enter your name"
                  value={formData.sellerName}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#122e32] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#ffd77f]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="sellerPhone"
                  required
                  placeholder="+91 9876543210"
                  value={formData.sellerPhone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#122e32] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#ffd77f]"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: BASIC PROPERTY INFO */}
          <div className="rounded-3xl border border-white/10 bg-[#0c2225]/80 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#ffd77f] border-b border-white/10 pb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#d8b46a]" />
              2. Basic Property Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Property Title / Headline *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Prime NA Resident Plot near SP Ring Road"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#122e32] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#ffd77f]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Property Category *
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#122e32] px-4 py-3 text-sm text-white outline-none transition focus:border-[#ffd77f]"
                >
                  <option value="Residential Plot">Residential Plot</option>
                  <option value="Agricultural Land">Agricultural Land</option>
                  <option value="Commercial Land">Commercial Land</option>
                  <option value="Industrial Land">Industrial Land</option>
                  <option value="Recreational Land">Recreational Land</option>
                  <option value="Investment Land">Investment Land</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Ownership Type
                </label>
                <select
                  name="ownershipType"
                  value={formData.ownershipType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#122e32] px-4 py-3 text-sm text-white outline-none transition focus:border-[#ffd77f]"
                >
                  <option value="Single Owner">Single Owner</option>
                  <option value="Joint Ownership">Joint Ownership</option>
                  <option value="Power of Attorney">Power of Attorney</option>
                  <option value="Builder/Developer">Builder/Developer</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 3: LEGAL & APPROVAL STATUS (IMPORTANT FOR LAND) */}
          <div className="rounded-3xl border border-white/10 bg-[#0c2225]/80 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#ffd77f] border-b border-white/10 pb-3 flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-[#d8b46a]" />
              3. Legal & Approval Status
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  N.A. Status *
                </label>
                <select
                  name="naStatus"
                  value={formData.naStatus}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#122e32] px-4 py-3 text-sm text-white outline-none transition focus:border-[#ffd77f]"
                >
                  <option value="NA Approved">NA Approved (Residential/Commercial)</option>
                  <option value="Agricultural Land (Old Tenure)">Agricultural Land (Old Tenure / જૂની શરત)</option>
                  <option value="Agricultural Land (New Tenure)">Agricultural Land (New Tenure / નવી શરત)</option>
                  <option value="TP Scheme Approved">TP Scheme Approved</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Title Clear? *
                </label>
                <select
                  name="titleClear"
                  value={formData.titleClear}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#122e32] px-4 py-3 text-sm text-white outline-none transition focus:border-[#ffd77f]"
                >
                  <option value="Yes">Yes (Title Clear & Marketable)</option>
                  <option value="In Progress">In Progress</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Zone Type
                </label>
                <select
                  name="zoneType"
                  value={formData.zoneType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#122e32] px-4 py-3 text-sm text-white outline-none transition focus:border-[#ffd77f]"
                >
                  <option value="Residential Zone (R1/R2)">Residential Zone (R1/R2)</option>
                  <option value="Commercial Zone">Commercial Zone</option>
                  <option value="Industrial Zone">Industrial Zone</option>
                  <option value="Green/Agricultural Zone">Green/Agricultural Zone</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 4: PRICING & DIMENSIONS */}
          <div className="rounded-3xl border border-white/10 bg-[#0c2225]/80 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#ffd77f] border-b border-white/10 pb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-[#d8b46a]" />
              4. Price & Plot Dimensions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Expected Price (₹) *
                </label>
                <input
                  type="text"
                  name="price"
                  required
                  placeholder="e.g. 45,00,000"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#122e32] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#ffd77f]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Price Negotiable?
                </label>
                <select
                  name="isNegotiable"
                  value={formData.isNegotiable}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#122e32] px-4 py-3 text-sm text-white outline-none transition focus:border-[#ffd77f]"
                >
                  <option value="Yes">Yes (Negotiable)</option>
                  <option value="Fixed Price">Fixed Price</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Total Size / Area *
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="area"
                    required
                    placeholder="1200"
                    value={formData.area}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-[#122e32] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#ffd77f]"
                  />
                  <select
                    name="areaUnit"
                    value={formData.areaUnit}
                    onChange={handleChange}
                    className="rounded-xl border border-white/10 bg-[#122e32] px-2 py-3 text-xs text-white outline-none"
                  >
                    <option value="sq. yd">sq. yd</option>
                    <option value="sq. ft">sq. ft</option>
                    <option value="Acre">Acre</option>
                    <option value="Bigha">Bigha</option>
                    <option value="Guntha">Guntha</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Facing Direction
                </label>
                <select
                  name="facing"
                  value={formData.facing}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#122e32] px-4 py-3 text-sm text-white outline-none transition focus:border-[#ffd77f]"
                >
                  <option value="East Facing">East Facing</option>
                  <option value="West Facing">West Facing</option>
                  <option value="North Facing">North Facing</option>
                  <option value="South Facing">South Facing</option>
                  <option value="Corner Plot">Corner Plot</option>
                </select>
              </div>

              {/* Frontage & Depth */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Frontage / Road Front (ft)
                </label>
                <input
                  type="number"
                  name="frontageFeet"
                  placeholder="e.g. 40 ft"
                  value={formData.frontageFeet}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#122e32] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#ffd77f]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Plot Depth (ft)
                </label>
                <input
                  type="number"
                  name="depthFeet"
                  placeholder="e.g. 60 ft"
                  value={formData.depthFeet}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#122e32] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#ffd77f]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Road Width
                </label>
                <select
                  name="roadWidth"
                  value={formData.roadWidth}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#122e32] px-4 py-3 text-sm text-white outline-none transition focus:border-[#ffd77f]"
                >
                  <option value="Main Road (60ft+)">Main Road (60ft+)</option>
                  <option value="Internal Road (30ft/40ft)">Internal Road (30ft/40ft)</option>
                  <option value="Touch Highway">Touch Highway</option>
                  <option value="Service Road">Service Road</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Corner Plot?
                </label>
                <select
                  name="cornerPlot"
                  value={formData.cornerPlot}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#122e32] px-4 py-3 text-sm text-white outline-none transition focus:border-[#ffd77f]"
                >
                  <option value="No">No (1 Side Road)</option>
                  <option value="Yes">Yes (2 Side Roads)</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 5: LOCATION DETAILS */}
          <div className="rounded-3xl border border-white/10 bg-[#0c2225]/80 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#ffd77f] border-b border-white/10 pb-3 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#d8b46a]" />
              5. Location & Scheme Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Complete Address or Landmark *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="e.g. Plot No. 45, Science City Road, Near SP Ring Road"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#122e32] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#ffd77f]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  TP No. / Revenue Survey No.
                </label>
                <input
                  type="text"
                  name="tpNumber"
                  placeholder="e.g. TP 44, Survey 120"
                  value={formData.tpNumber}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#122e32] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#ffd77f]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="e.g. Ahmedabad"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#122e32] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#ffd77f]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#122e32] px-4 py-3 text-sm text-white outline-none transition focus:border-[#ffd77f]"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Google Maps Location Link (Optional)
                </label>
                <input
                  type="url"
                  name="googleMapsLink"
                  placeholder="https://maps.google.com/?q=..."
                  value={formData.googleMapsLink}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#122e32] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#ffd77f]"
                />
              </div>
            </div>
          </div>

          {/* SECTION 6: AMENITIES & PHOTOS */}
          <div className="rounded-3xl border border-white/10 bg-[#0c2225]/80 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#ffd77f] border-b border-white/10 pb-3 flex items-center gap-2">
              <Upload className="h-5 w-5 text-[#d8b46a]" />
              6. Photos & Amenities
            </h2>

            {/* Amenities Grid */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">
                Available Features
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {amenityOptions.map(({ name, icon: Icon }, idx) => {
                  const isChecked = selectedAmenities.includes(name);

                  return (
                    <div
                      key={idx}
                      onClick={() => handleAmenityToggle(name)}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        isChecked
                          ? "border-[#ffd77f] bg-[#d8b46a]/20 text-[#ffd77f]"
                          : "border-white/10 bg-[#122e32] text-gray-300 hover:border-white/20"
                      }`}
                    >
                      <Icon className="h-5 w-5 text-[#d8b46a]" />
                      <span className="text-xs font-semibold">{name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Photos Upload */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-gray-300 mb-2">
                Upload Land Images *
              </label>
              <div className="relative border-2 border-dashed border-[#d8b46a]/40 rounded-2xl p-6 text-center bg-[#122e32]/50 hover:border-[#ffd77f] transition">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center">
                  <Upload className="h-6 w-6 text-[#ffd77f] mb-2" />
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    Click to upload property photos
                  </p>
                </div>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 pt-4">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative h-24 rounded-xl overflow-hidden border border-white/20 group">
                      <img src={img} alt={`Preview ${idx}`} className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white shadow-md hover:bg-red-700"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* SECTION 7: DESCRIPTION */}
          <div className="rounded-3xl border border-white/10 bg-[#0c2225]/80 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#ffd77f] border-b border-white/10 pb-3">
              7. Detailed Description
            </h2>
            <textarea
              name="description"
              rows="4"
              placeholder="Describe soil type, nearby developments, connectivity to highway, surrounding environment, or investment potential..."
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-[#122e32] p-4 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#ffd77f]"
            ></textarea>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-[#ffe59a] via-[#f4ca68] to-[#edbb4d] py-4 text-base font-bold text-[#30230c] shadow-xl transition-all hover:brightness-110 active:scale-[0.99]"
            >
              Post Property For Sale
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}