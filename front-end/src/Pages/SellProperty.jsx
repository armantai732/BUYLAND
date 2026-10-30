
import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  MapPin,
  DollarSign,
  FileText,
  Road,
  Zap,
  Droplets,
  Trees,
  ShieldCheck,
  User,
  FileCheck,
  Trash2,
} from "lucide-react";
import { createProperty } from "../api/api";

// Initial form values
const initialFormData = {
  // Basic Details
  title: "",
  propertyType: "",
  ownershipType: "",
  sellerType: "",
  sellerName: "",
  sellerPhone: "",
  sellerWhatsapp: "",

  // Pricing & Area
  price: "",
  isNegotiable: "",
  area: "",
  areaUnit: "",
  frontageFeet: "",
  depthFeet: "",
  facing: "",
  cornerPlot: "",
  roadWidth: "",

  // Legal & Approvals
  naStatus: "",
  titleClear: "",
  zoneType: "",

  // Location
  address: "",
  tpNumber: "",
  city: "",
  state: "",
  pincode: "",
  googleMapsLink: "",

  // Description
  description: "",
};

export default function SellProperty() {
  const [formData, setFormData] = useState({ ...initialFormData });
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const fileInputRef = useRef(null);
  const imageUrlsRef = useRef([]);

  const amenityOptions = [
    { name: "Main Road Connectivity", icon: Road },
    { name: "Electricity Supply", icon: Zap },
    { name: "Water Supply / Borewell", icon: Droplets },
    { name: "Nearby Parks / Greenery", icon: Trees },
    { name: "24/7 Security / Boundary Wall", icon: ShieldCheck },
  ];

  // Clean up image preview URLs
  useEffect(() => {
    return () => {
      imageUrlsRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });

      imageUrlsRef.current = [];
    };
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle amenities
  const handleAmenityToggle = (amenityName) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityName)
        ? prev.filter((amenity) => amenity !== amenityName)
        : [...prev, amenityName]
    );
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    imageUrlsRef.current.push(...newImages.map((img) => img.preview));

    setImages((prev) => [...prev, ...newImages]);

    e.target.value = "";
  };

  // Remove image
  const removeImage = (index) => {
    setImages((prev) => {
      const imageToRemove = prev[index];

      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);

        imageUrlsRef.current = imageUrlsRef.current.filter(
          (url) => url !== imageToRemove.preview
        );
      }

      return prev.filter((_, i) => i !== index);
    });
  };

  // Reset form
  const resetForm = () => {
    setFormData({ ...initialFormData });
    setSelectedAmenities([]);

    images.forEach((img) => {
      URL.revokeObjectURL(img.preview);
    });

    imageUrlsRef.current = [];
    setImages([]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Submit property

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first to submit a property.");
      return;
    }

    if (images.length === 0) {
      alert("Please upload at least one property image.");
      return;
    }

    try {
      setSubmitting(true);

      const propertyData = new FormData();

      // All form fields
      Object.entries(formData).forEach(([key, value]) => {
        propertyData.append(key, value ?? "");
      });

      // Amenities
      propertyData.append(
        "amenities",
        JSON.stringify(selectedAmenities)
      );

      // Actual image files (IMPORTANT)
      images.forEach((image) => {
        propertyData.append("images", image.file);
      });

      const response = await createProperty(propertyData);


      alert(
        response.message ||
        "Property submitted successfully!"
      );

      resetForm();

    } catch (error) {
      console.error("Property submission error:", error);
      alert(error.message || "Property submission failed.");
    } finally {
      setSubmitting(false);
    }
  };


  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#122e32] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#ffd77f]";

  const labelClass =
    "mb-1.5 block text-xs font-semibold text-gray-300";

  const sectionClass =
    "space-y-6 rounded-3xl border border-white/10 bg-[#0c2225]/80 p-6 shadow-2xl backdrop-blur-md sm:p-8";

  const headingClass =
    "flex items-center gap-2 border-b border-white/10 pb-3 font-serif text-xl font-bold text-[#ffd77f]";

  return (
    <div className="min-h-screen w-full bg-[#061517] px-4 py-10 font-sans text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">

        {/* Page Header */}
        <div className="mb-8 text-center sm:text-left">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#ffd77f]">
            List Your Property
          </span>

          <h1 className="mt-1 font-serif text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Sell Land &{" "}
            <span className="bg-gradient-to-r from-[#ffe59a] via-[#ffd77f] to-[#d7b66b] bg-clip-text text-transparent">
              Plots
            </span>
          </h1>

          <p className="mt-2 max-w-xl text-xs font-light text-gray-400 sm:text-sm">
            Provide complete plot dimensions, legal status, pricing, and
            contact details to get verified buyers fast.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* SECTION 1: SELLER CONTACT DETAILS */}
          <section className={sectionClass}>
            <h2 className={headingClass}>
              <User className="h-5 w-5 text-[#d8b46a]" />
              1. Seller Contact Details
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

              <div>
                <label className={labelClass}>I am *</label>
                <select
                  name="sellerType"
                  value={formData.sellerType}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="" disabled>Select Seller Type</option>
                  <option value="Owner">Owner</option>
                  <option value="Agent / Broker">Agent / Broker</option>
                  <option value="Builder / Developer">
                    Builder / Developer
                  </option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Your Full Name *</label>
                <input
                  type="text"
                  name="sellerName"
                  required
                  placeholder="Enter your name"
                  value={formData.sellerName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Mobile Number *</label>
                <input
                  type="tel"
                  name="sellerPhone"
                  required
                  placeholder="+91 9876543210"
                  value={formData.sellerPhone}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>WhatsApp Number *</label>
                <input
                  type="tel"
                  name="sellerWhatsapp"
                  required
                  placeholder="+91 9876543210"
                  value={formData.sellerWhatsapp}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

            </div>
          </section>

          {/* SECTION 2: BASIC PROPERTY DETAILS */}
          <section className={sectionClass}>
            <h2 className={headingClass}>
              <FileText className="h-5 w-5 text-[#d8b46a]" />
              2. Basic Property Details
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              <div className="sm:col-span-2">
                <label className={labelClass}>
                  Property Title / Headline *
                </label>

                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Prime NA Resident Plot near SP Ring Road"
                  value={formData.title}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Property Category *</label>

                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="" disabled>Select Property Type</option>
                  <option value="Residential Plot">Residential Plot</option>
                  <option value="Agricultural Land">Agricultural Land</option>
                  <option value="Commercial Land">Commercial Land</option>
                  <option value="Industrial Land">Industrial Land</option>
                  <option value="Recreational Land">Recreational Land</option>
                  <option value="Investment Land">Investment Land</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Ownership Type *</label>

                <select
                  name="ownershipType"
                  value={formData.ownershipType}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="" disabled>Select Ownership Type</option>
                  <option value="Single Owner">Single Owner</option>
                  <option value="Joint Ownership">Joint Ownership</option>
                  <option value="Power of Attorney">Power of Attorney</option>
                  <option value="Builder/Developer">Builder/Developer</option>
                </select>
              </div>

            </div>
          </section>

          {/* SECTION 3: LEGAL & APPROVAL STATUS */}
          <section className={sectionClass}>
            <h2 className={headingClass}>
              <FileCheck className="h-5 w-5 text-[#d8b46a]" />
              3. Legal & Approval Status
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

              <div>
                <label className={labelClass}>N.A. Status *</label>

                <select
                  name="naStatus"
                  value={formData.naStatus}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="" disabled>Select N.A. Status</option>
                  <option value="NA Approved">
                    NA Approved (Residential/Commercial)
                  </option>
                  <option value="Agricultural Land (Old Tenure)">
                    Agricultural Land (Old Tenure / જૂની શરત)
                  </option>
                  <option value="Agricultural Land (New Tenure)">
                    Agricultural Land (New Tenure / નવી શરત)
                  </option>
                  <option value="TP Scheme Approved">
                    TP Scheme Approved
                  </option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Title Clear? *</label>

                <select
                  name="titleClear"
                  value={formData.titleClear}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="" disabled>Select Title Status</option>
                  <option value="Yes">Yes (Title Clear & Marketable)</option>
                  <option value="In Progress">In Progress</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Zone Type *</label>

                <select
                  name="zoneType"
                  value={formData.zoneType}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="" disabled>Select Zone Type</option>
                  <option value="Residential Zone">Residential Zone</option>
                  <option value="Residential Zone (R1/R2)">
                    Residential Zone (R1/R2)
                  </option>
                  <option value="Commercial Zone">Commercial Zone</option>
                  <option value="Industrial Zone">Industrial Zone</option>
                  <option value="Green/Agricultural Zone">
                    Green/Agricultural Zone
                  </option>
                </select>
              </div>

            </div>
          </section>

          {/* SECTION 4: PRICING & DIMENSIONS */}
          <section className={sectionClass}>
            <h2 className={headingClass}>
              <DollarSign className="h-5 w-5 text-[#d8b46a]" />
              4. Price & Plot Dimensions
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

              <div>
                <label className={labelClass}>Expected Price (₹) *</label>

                <input
                  type="text"
                  name="price"
                  required
                  placeholder="e.g. 45,00,000"
                  value={formData.price}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Price Negotiable? *</label>

                <select
                  name="isNegotiable"
                  value={formData.isNegotiable}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="" disabled>Select Price Type</option>
                  <option value="Yes">Yes (Negotiable)</option>
                  <option value="Fixed Price">Fixed Price</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Total Size / Area *</label>

                <div className="flex gap-2">
                  <input
                    type="number"
                    name="area"
                    required
                    min="0.01"
                    step="any"
                    placeholder="1200"
                    value={formData.area}
                    onChange={handleChange}
                    className={inputClass}
                  />

                  <select
                    name="areaUnit"
                    value={formData.areaUnit}
                    onChange={handleChange}
                    className="rounded-xl border border-white/10 bg-[#122e32] px-2 py-3 text-xs text-white outline-none"
                    required
                  >
                    <option value="" disabled>Select Unit</option>
                    <option value="sq. yd">sq. yd</option>
                    <option value="sq. ft">sq. ft</option>
                    <option value="Acre">Acre</option>
                    <option value="Bigha">Bigha</option>
                    <option value="Guntha">Guntha</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Facing Direction *</label>

                <select
                  name="facing"
                  value={formData.facing}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="" disabled>Select Facing Direction</option>
                  <option value="East Facing">East Facing</option>
                  <option value="West Facing">West Facing</option>
                  <option value="North Facing">North Facing</option>
                  <option value="South Facing">South Facing</option>
                  <option value="Corner Plot">Corner Plot</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Frontage / Road Front (ft)</label>

                <input
                  type="number"
                  name="frontageFeet"
                  min="0"
                  placeholder="e.g. 40 ft"
                  value={formData.frontageFeet}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Plot Depth (ft)</label>

                <input
                  type="number"
                  name="depthFeet"
                  min="0"
                  placeholder="e.g. 60 ft"
                  value={formData.depthFeet}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Road Width *</label>

                <select
                  name="roadWidth"
                  value={formData.roadWidth}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="" disabled>Select Road Width</option>
                  <option value="Main Road (60ft+)">
                    Main Road (60ft+)
                  </option>
                  <option value="Internal Road (30ft/40ft)">
                    Internal Road (30ft/40ft)
                  </option>
                  <option value="Touch Highway">Touch Highway</option>
                  <option value="Service Road">Service Road</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Corner Plot? *</label>

                <select
                  name="cornerPlot"
                  value={formData.cornerPlot}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="" disabled>Select Corner Plot</option>
                  <option value="Yes">Yes (2 Side Roads)</option>
                  <option value="No">No (1 Side Road)</option>
                </select>
              </div>

            </div>
          </section>

          {/* SECTION 5: LOCATION DETAILS */}
          <section className={sectionClass}>
            <h2 className={headingClass}>
              <MapPin className="h-5 w-5 text-[#d8b46a]" />
              5. Location & Scheme Details
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

              <div className="sm:col-span-2 lg:col-span-3">
                <label className={labelClass}>
                  Complete Address or Landmark *
                </label>

                <input
                  type="text"
                  name="address"
                  required
                  placeholder="e.g. Plot No. 45, Science City Road, Near SP Ring Road"
                  value={formData.address}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  TP No. / Revenue Survey No.
                </label>

                <input
                  type="text"
                  name="tpNumber"
                  placeholder="e.g. TP 44, Survey 120"
                  value={formData.tpNumber}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>City *</label>

                <input
                  type="text"
                  name="city"
                  required
                  placeholder="e.g. Ahmedabad"
                  value={formData.city}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>State *</label>

                <input
                  type="text"
                  name="state"
                  required
                  placeholder="e.g. Gujarat"
                  value={formData.state}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Pincode</label>

                <input
                  type="text"
                  name="pincode"
                  placeholder="Enter pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-3">
                <label className={labelClass}>
                  Google Maps Location Link (Optional)
                </label>

                <input
                  type="url"
                  name="googleMapsLink"
                  placeholder="https://maps.google.com/?q=..."
                  value={formData.googleMapsLink}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

            </div>
          </section>

          {/* SECTION 6: AMENITIES & PHOTOS */}
          <section className={sectionClass}>
            <h2 className={headingClass}>
              <Upload className="h-5 w-5 text-[#d8b46a]" />
              6. Photos & Amenities
            </h2>

            {/* Amenities */}
            <div>
              <label className={`${labelClass} mb-2`}>
                Available Features
              </label>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

                {amenityOptions.map(({ name, icon: Icon }) => {
                  const isChecked = selectedAmenities.includes(name);

                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => handleAmenityToggle(name)}
                      aria-pressed={isChecked}
                      className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all ${isChecked
                        ? "border-[#ffd77f] bg-[#d8b46a]/20 text-[#ffd77f]"
                        : "border-white/10 bg-[#122e32] text-gray-300 hover:border-white/20"
                        }`}
                    >
                      <Icon className="h-5 w-5 text-[#d8b46a]" />
                      <span className="text-xs font-semibold">{name}</span>
                    </button>
                  );
                })}

              </div>
            </div>

            {/* Image Upload */}
            <div className="pt-2">
              <label className={`${labelClass} mb-2`}>
                Upload Land Images *
              </label>

              <div className="relative rounded-2xl border-2 border-dashed border-[#d8b46a]/40 bg-[#122e32]/50 p-6 text-center transition hover:border-[#ffd77f]">

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />

                <div className="pointer-events-none flex flex-col items-center justify-center">
                  <Upload className="mb-2 h-6 w-6 text-[#ffd77f]" />

                  <p className="text-xs font-semibold text-white sm:text-sm">
                    Click to upload property photos
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    You can select multiple images
                  </p>
                </div>
              </div>

              {/* Image Preview */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-4 lg:grid-cols-5">

                  {images.map((img, idx) => (
                    <div
                      key={img.preview}
                      className="group relative h-24 overflow-hidden rounded-xl border border-white/20"
                    >
                      <img
                        src={img.preview}
                        alt={`Property preview ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        aria-label={`Remove image ${idx + 1}`}
                        className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white shadow-md hover:bg-red-700"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}

                </div>
              )}
            </div>
          </section>

          {/* SECTION 7: DESCRIPTION */}
          <section className={sectionClass}>
            <h2 className={headingClass}>
              7. Detailed Description
            </h2>

            <textarea
              name="description"
              rows="4"
              placeholder="Describe soil type, nearby developments, connectivity to highway, surrounding environment, or investment potential..."
              value={formData.description}
              onChange={handleChange}
              className={inputClass}
            />
          </section>

          {/* SUBMIT BUTTON */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-2xl bg-gradient-to-r from-[#ffe59a] via-[#f4ca68] to-[#edbb4d] py-4 text-base font-bold text-[#30230c] shadow-xl transition-all hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? "Submitting Property..."
                : "Post Property For Sale"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
