
import React, { useState, useEffect } from "react";
import {
  Home,
  MapPin,
  Maximize2,
  UserCheck,
  Building,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageSquare,
  Send,
  ShieldCheck,
  Navigation,
} from "lucide-react";

import { useNavigate, useSearchParams } from "react-router-dom";
import { getPropertyById } from "../api/api";

// Leaflet Imports
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";

// Leaflet Default Marker Icon Fix
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Google Maps link se location name extract karna
const getLocationFromGoogleMapsLink = (link) => {
  if (!link) return "";

  try {
    const url = new URL(link);

    const query =
      url.searchParams.get("q") ||
      url.searchParams.get("query") ||
      url.searchParams.get("destination");

    return query ? query.replace(/\+/g, " ") : "";
  } catch (error) {
    console.error("Google Maps Link Error:", error);
    return "";
  }
};

export default function PropertyDetails() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const propertyId = searchParams.get("id");

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [mapCoordinates, setMapCoordinates] = useState(null);
  const [mapLoading, setMapLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    message: "I'm interested in this property...",
  });
  // Fixed BuyLand Contact Number
  const contactNumber = "8401918533";
  const whatsappNumber = "8401918533";

  // Database se property fetch
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        if (!propertyId) {
          setError("Property ID not found");
          setLoading(false);
          return;
        }

        setLoading(true);
        setError("");

        const response = await getPropertyById(propertyId);

        const propertyData =
          response?.property || response?.data?.property || response?.data || response;

        if (!propertyData || !propertyData._id) {
          throw new Error("Property not found in database");
        }

        setProperty(propertyData);
      } catch (err) {
        console.error("Property Details Error:", err);
        setError(
          err.message || "Failed to load property details from database"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  // Google Maps link se coordinates fetch karna
  useEffect(() => {
    if (!property?.googleMapsLink) {
      setMapCoordinates(null);
      return;
    }

    const fetchMapCoordinates = async () => {
      const mapLocation = getLocationFromGoogleMapsLink(
        property.googleMapsLink
      );

      if (!mapLocation) {
        setMapCoordinates(null);
        return;
      }

      try {
        setMapLoading(true);
        setMapCoordinates(null);

        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            mapLocation
          )}&limit=1`
        );

        if (!response.ok) {
          throw new Error("Unable to fetch map coordinates");
        }

        const data = await response.json();

        if (data.length > 0) {
          setMapCoordinates([
            Number(data[0].lat),
            Number(data[0].lon),
          ]);
        } else {
          setMapCoordinates(null);
        }
      } catch (err) {
        console.error("Map Location Error:", err);
        setMapCoordinates(null);
      } finally {
        setMapLoading(false);
      }
    };

    fetchMapCoordinates();
  }, [property?.googleMapsLink]);

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f6f8]">
        <div className="text-center">
          <div className="h-10 w-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-semibold">
            Loading property details from database...
          </p>
        </div>
      </div>
    );
  }

  // Error Screen
  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#f4f6f8] px-4">
        <h2 className="text-xl font-bold text-gray-900 text-center">
          {error || "Property not found"}
        </h2>

        <button
          onClick={() => navigate("/properties")}
          className="bg-amber-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-amber-700"
        >
          Back to Properties
        </button>
      </div>
    );
  }

  // Property Images
  const rawImages =
    property.images || property.photos || property.media || [];

  const images = Array.isArray(rawImages)
    ? rawImages
      .map((img) =>
        typeof img === "string"
          ? img
          : img?.url || img?.secure_url
      )
      .filter(Boolean)
    : [];

  const galleryImages =
    images.length > 0
      ? images
      : [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop",
      ];

  // Property Location
  const location = [
    property.address,
    property.city,
    property.state,
    property.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  // Property Area
  const area = `${property.area || property.plotSize || "N/A"} ${property.areaUnit || property.unit || ""
    }`.trim();

  // Price Formatting
  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-IN");

  const pricePerUnit =
    Number(property.area || property.plotSize) > 0
      ? Number(property.price) /
      Number(property.area || property.plotSize)
      : null;

  // Seller Details
  const sellerName =
    property.seller?.name ||
    property.sellerName ||
    property.ownerName ||
    "Property Owner";

  const sellerType = property.sellerType || "Seller";

  // Amenities
  const rawAmenities = property.amenities || property.features || [];

  const propertyAmenities = Array.isArray(rawAmenities)
    ? rawAmenities
    : [];

  // Description
  const propertyDescription =
    property.description ||
    property.details ||
    property.about ||
    "No description provided by the seller.";

  // Next Image
  const handleNextImage = () => {
    setActiveImageIndex(
      (prev) => (prev + 1) % galleryImages.length
    );
  };

  // Previous Image
  const handlePrevImage = () => {
    setActiveImageIndex(
      (prev) =>
        (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  // WhatsApp Property Details Message
  const handleWhatsApp = () => {
    if (!whatsappNumber) {
      alert("Seller WhatsApp number is not available");
      return;
    }

    const propertyLink = window.location.href;

    const message = `
Hello ${sellerName},

I am interested in your property listed on BuyLand.

🏡 PROPERTY DETAILS
━━━━━━━━━━━━━━━━━━

📌 Property Name: ${property.title || "N/A"}
🏢 Property Type: ${property.propertyType || "N/A"}
📍 Location: ${location || "N/A"}
📐 Area: ${area || "N/A"}
💰 Price: ₹${formatPrice(property.price)}
💵 Price Per Unit: ${pricePerUnit
        ? `₹${formatPrice(Math.round(pricePerUnit))} / ${property.areaUnit || "Unit"}`
        : "N/A"
      }
📏 Facing: ${property.facing || "N/A"}
🛣️ Road Width: ${property.roadWidth || "N/A"} Ft
👤 Ownership: ${property.ownershipType || "N/A"}
🏷️ Seller Type: ${sellerType}
📋 NA Status: ${property.naStatus || "N/A"}
✅ Legal Status: ${property.titleClear || "N/A"}
📍 TP Number: ${property.tpNumber || "N/A"}

📝 DESCRIPTION:
${propertyDescription}

⭐ AMENITIES:
${propertyAmenities.length > 0
        ? propertyAmenities.join(", ")
        : "Not specified"
      }

🔗 PROPERTY LINK:
${propertyLink}

━━━━━━━━━━━━━━━━━━

I would like to know more details about this property.

Thank you!
BuyLand Customer
`;

    const whatsappURL = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  };

  // Contact Message
  const handleSubmitMessage = (e) => {
    e.preventDefault();

    alert(
      `Thank you ${formData.name || "User"}! Your message has been sent to the owner.`
    );
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] font-sans text-gray-800 antialiased">

      {/* BREADCRUMB */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 hover:text-amber-600 transition"
            >
              <Home className="h-3.5 w-3.5" />
              <span>Home</span>
            </button>

            <span>&gt;</span>

            <button
              onClick={() => navigate("/properties")}
              className="hover:text-amber-600 transition"
            >
              Properties
            </button>

            <span>&gt;</span>

            <span className="text-gray-900 font-semibold truncate">
              {property.title || "Property Details"}
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">

        {/* HEADER TITLE & PRICE */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {property.title}
            </h1>

            <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <MapPin className="h-3.5 w-3.5 text-amber-500" />
              <span>{location || "Location not available"}</span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-gray-700">
              <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-lg border border-gray-200">
                <Maximize2 className="h-3.5 w-3.5 text-gray-500" />
                {area}
              </span>

              <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-lg border border-gray-200">
                <Building className="h-3.5 w-3.5 text-gray-500" />
                {property.propertyType || "N/A"}
              </span>

              <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-lg border border-gray-200">
                <UserCheck className="h-3.5 w-3.5 text-gray-500" />
                {property.ownershipType || "N/A"}
              </span>

              <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-lg border border-gray-200">
                <CheckCircle2 className="h-3.5 w-3.5 text-gray-500" />
                {property.naStatus || "N/A Status"}
              </span>
            </div>
          </div>

          <div className="text-left md:text-right shrink-0">
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900">
              ₹ {formatPrice(property.price)}
            </div>

            <div className="text-xs font-semibold text-gray-400 mt-0.5">
              {pricePerUnit
                ? `₹ ${formatPrice(Math.round(pricePerUnit))} / ${property.areaUnit || "Unit"
                }`
                : "Price details"}
            </div>

            <div className="mt-2.5 flex items-center md:justify-end gap-2">
              {property.status === "Approved" && (
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified Property
                </span>
              )}

              {property.status === "Sold Out" && (
                <span className="rounded-md bg-rose-500 px-2.5 py-1 text-[11px] font-bold text-white">
                  Sold Out
                </span>
              )}
            </div>
          </div>
        </div>

        {/* IMAGE GALLERY & CONTACT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* IMAGE GALLERY */}
          <div className="lg:col-span-8 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="relative md:col-span-8 h-[300px] sm:h-[380px] rounded-2xl overflow-hidden bg-gray-900 group shadow-md">
                <img
                  src={galleryImages[activeImageIndex]}
                  alt={property.title}
                  className="h-full w-full object-cover transition-all duration-300"
                />

                <button
                  type="button"
                  onClick={() => navigate("/properties")}
                  className="absolute top-3 left-3 flex items-center gap-1.5 rounded-xl bg-black/60 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-black/80"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back to Listings
                </button>

                {galleryImages.length > 1 && (
                  <>
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
                  </>
                )}

                <span className="absolute bottom-3 left-3 rounded-md bg-black/60 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-md">
                  📷 {activeImageIndex + 1} / {galleryImages.length}
                </span>
              </div>

              <div className="hidden md:grid md:col-span-4 grid-cols-1 gap-2.5 h-[380px]">
                {galleryImages.slice(1, 4).map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImageIndex(idx + 1)}
                    className={`relative rounded-xl overflow-hidden cursor-pointer h-[115px] border-2 transition ${activeImageIndex === idx + 1
                      ? "border-amber-500 shadow-md"
                      : "border-transparent opacity-85 hover:opacity-100"
                      }`}
                  >
                    <img
                      src={img}
                      alt={`Property ${idx + 2}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CONTACT OWNER */}
          <div className="lg:col-span-4 rounded-2xl bg-white p-5 shadow-sm border border-gray-100 space-y-5">
            <div className="flex items-start gap-3 border-b border-gray-100 pb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-amber-700 font-bold text-lg">
                👤
              </div>

              <div className="flex-1">
                <h3 className="font-serif text-base font-bold text-gray-900">
                  Contact Owner
                </h3>

                <p className="text-xs text-gray-500">
                  Get in touch for more details or site visit.
                </p>

                <div className="mt-2.5 font-bold text-sm text-gray-900">
                  {sellerName}
                  <span className="text-xs font-normal text-gray-500">
                    {" "}({sellerType})
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2 text-xs font-semibold text-gray-700 bg-gray-50 px-3 py-2 rounded-xl">
                <span>{contactNumber || "Phone not available"}</span>

                <a
                  href={contactNumber ? `tel:${contactNumber}` : undefined}
                  className={`flex items-center gap-1.5 rounded-lg bg-[#111827] px-3 py-1.5 text-xs font-bold text-white hover:bg-black transition ${!contactNumber ? "pointer-events-none opacity-50" : ""
                    }`}
                >
                  <Phone className="h-3.5 w-3.5 text-amber-400" />
                  Call Now
                </a>
              </div>

              <div className="flex items-center justify-between gap-2 text-xs font-semibold text-gray-700 bg-gray-50 px-3 py-2 rounded-xl">
                <span>{whatsappNumber || "WhatsApp not available"}</span>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  disabled={!whatsappNumber}
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  WhatsApp
                </button>
              </div>
            </div>

            {/* MESSAGE FORM */}
            <form
              onSubmit={handleSubmitMessage}
              className="pt-2 border-t border-gray-100 space-y-3"
            >
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                Or Send a Message
              </h4>

              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Your Name *
                </label>

                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-800 outline-none focus:border-amber-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Your Mobile *
                </label>

                <input
                  type="tel"
                  required
                  placeholder="Enter mobile number"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mobile: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-800 outline-none focus:border-amber-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Your Message *
                </label>

                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
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

        {/* DETAILS TABLE, AMENITIES & MAP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT DETAILS */}
          <div className="lg:col-span-8 space-y-6">
            {/* PROPERTY DETAILS */}
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
              <h3 className="font-serif text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                <Home className="h-5 w-5 text-amber-500" />
                Property Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-xs">
                <DetailRow
                  label="Property Type"
                  value={property.propertyType}
                />

                <DetailRow label="Location" value={location} />

                <DetailRow
                  label="Ownership Type"
                  value={property.ownershipType}
                />

                <DetailRow
                  label="Facing"
                  value={property.facing}
                />

                <DetailRow
                  label="Seller Type"
                  value={property.sellerType}
                />

                <DetailRow
                  label="Road Width"
                  value={
                    property.roadWidth
                      ? `${property.roadWidth} Ft`
                      : "N/A"
                  }
                />

                <DetailRow label="Total Area" value={area} />

                <DetailRow
                  label="Legal Status"
                  value={property.titleClear}
                />

                <DetailRow
                  label="Price"
                  value={`₹ ${formatPrice(property.price)}`}
                />

                <DetailRow
                  label="NA Status"
                  value={property.naStatus}
                />

                <DetailRow
                  label="Price Per Unit"
                  value={
                    pricePerUnit
                      ? `₹ ${formatPrice(Math.round(pricePerUnit))}`
                      : "N/A"
                  }
                />

                <DetailRow
                  label="Property Status"
                  value={property.status}
                />
              </div>
            </div>

            {/* AMENITIES */}
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
              <h3 className="font-serif text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                ⭐ Amenities
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-y-3 text-xs font-semibold text-gray-700">
                {propertyAmenities.length > 0 ? (
                  propertyAmenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span>{amenity}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No amenities listed
                  </p>
                )}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
              <h3 className="font-serif text-lg font-bold text-gray-900 mb-3">
                Property Description
              </h3>

              <p className="text-sm text-gray-600 leading-7 whitespace-pre-line">
                {propertyDescription}
              </p>
            </div>
          </div>

          {/* RIGHT MAP SECTION */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100 space-y-3">
              <h3 className="font-serif text-base font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-500" />
                Property Location Map
              </h3>

              <div className="relative h-60 w-full rounded-xl overflow-hidden border border-gray-200 shadow-inner z-0">
                {mapLoading ? (
                  <div className="h-full flex items-center justify-center text-sm text-gray-500">
                    Loading property map...
                  </div>
                ) : mapCoordinates ? (
                  <MapContainer
                    key={`${mapCoordinates[0]}-${mapCoordinates[1]}`}
                    center={mapCoordinates}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={mapCoordinates}>
                      <Popup>
                        <b>{property.title}</b>
                        <br />
                        {location}
                      </Popup>
                    </Marker>
                  </MapContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-sm text-gray-500 text-center px-3">
                    Property map location not available
                  </div>
                )}
              </div>

              {property.googleMapsLink && (
                <a
                  href={property.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gray-900 py-2.5 text-xs font-bold text-white shadow hover:bg-black transition"
                >
                  <Navigation className="h-3.5 w-3.5 text-amber-400" />
                  <span>Open in Google Maps</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// PROPERTY DETAIL ROW
function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between gap-3 py-1.5 border-b border-gray-50">
      <span className="text-gray-500 font-medium">
        {label}
      </span>

      <span className="font-bold text-gray-900 text-right">
        {value !== undefined && value !== null && value !== ""
          ? value
          : "N/A"}
      </span>
    </div>
  );
}
