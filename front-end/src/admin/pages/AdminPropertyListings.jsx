import React, { useState, useEffect } from "react";
import {
  Building,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  MapPin,
  X,
  Phone,
  User,
  ExternalLink,
  ShieldCheck,
  DollarSign,
  Tag,
  FileText,
} from "lucide-react";
import { getProcessingProperties } from "../../api/api";

export default function AdminPropertyListings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All"); // "All", "Success", "Processing", "Sold Out"
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  // State for active image preview in modal
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // States for Approval Price Form Modal
  const [approvingProperty, setApprovingProperty] = useState(null);
  const [priceForm, setPriceForm] = useState({ realPrice: "", newPrice: "" });

  // States for Rejection Description Modal
  const [rejectingProperty, setRejectingProperty] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProcessingProperties();

      if (data.success) {
        setProperties(data.properties || []);
      } else {
        setProperties([]);
      }
    } catch (error) {
      console.error("Fetch properties error:", error);
      setError(error.message || "Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Mark as Sold Out function
  const handleMarkAsSold = (id) => {
    if (window.confirm("Are you sure you want to mark this property as Sold Out?")) {
      setProperties(
        properties.map((item) =>
          item._id === id ? { ...item, status: "Sold Out" } : item
        )
      );
      setSelectedProperty(null);
      alert(`Property ID #${id} has been marked as Sold Out!`);
    }
  };

  // Submit Rejection with Description
  const handleRejectSubmit = (e) => {
    e.preventDefault();
    if (!rejectionReason.trim()) {
      alert("Kripya rejection ka karan (description) darj karein.");
      return;
    }

    const id = rejectingProperty._id;
    setProperties(properties.filter((item) => item._id !== id));
    alert(`Property ID #${id} Rejected successfully! Reason: ${rejectionReason}`);
    
    setRejectingProperty(null);
    setRejectionReason("");
    setSelectedProperty(null);
    setApprovingProperty(null);
  };

  // Open Price Form Modal
  const handleOpenApproveModal = (property) => {
    setApprovingProperty(property);
    setPriceForm({
      realPrice: property.price,
      newPrice: property.price,
    });
  };

  // Submit Price Form & Change Status to Success
  const handlePriceSubmit = (e) => {
    e.preventDefault();
    setProperties(
      properties.map((item) =>
        item._id === approvingProperty._id
          ? { ...item, price: priceForm.newPrice, status: "Success" }
          : item
      )
    );
    alert(`Property ID #${approvingProperty._id} Approved Successfully with New Price: ${priceForm.newPrice}!`);
    setApprovingProperty(null);
    setSelectedProperty(null);
  };

  const filteredProperties = properties.filter((item) => {
    const title = item.title || "";
    const owner = item.seller?.name || item.sellerName || "";
    const location = item.location || item.address || "";

    const search = searchQuery.toLowerCase();

    const matchesSearch =
      title.toLowerCase().includes(search) ||
      owner.toLowerCase().includes(search) ||
      location.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 bg-[#fbf9f5] md:h-[660px] flex flex-col overflow-hidden p-4 sm:p-6 lg:p-10 text-gray-900 font-sans">
      <div className="max-w-6xl mx-auto w-full flex flex-col h-full space-y-6">

        {/* Header (Fixed) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Property Listings Management
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-600 font-medium">
              Monitor seller listings, review KYC details, and update property statuses.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-amber-100 px-3.5 py-1.5 text-xs font-bold text-[#b88c3a]">
              Total Listings: {properties.length}
            </span>
          </div>
        </div>

        {/* Search & Filters (Fixed) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by title, owner or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 pl-10 text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none shadow-sm focus:border-[#d8b46a] focus:ring-1 focus:ring-[#d8b46a]"
            />
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
          </div>

          <div className="flex items-center rounded-2xl bg-gray-200/70 p-1 border border-gray-300 w-fit flex-wrap gap-1">
            {["All", "Success", "Processing", "Sold Out"].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                  statusFilter === status
                    ? "bg-[#061517] text-[#ffd77f] shadow"
                    : "text-gray-700 hover:text-black"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Properties List Container */}
        <div className="rounded-3xl bg-white p-4 sm:p-6 shadow-sm border border-amber-100 flex flex-col flex-1 overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 shrink-0">
            <h2 className="font-serif text-base sm:text-lg font-bold text-gray-900">
              Listings ({filteredProperties.length})
            </h2>
          </div>

          <div className="space-y-3 overflow-y-auto pr-1 flex-1 mt-4">
            {loading ? (
              <div className="py-12 text-center text-gray-400 text-sm">
                Loading properties...
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="py-12 text-center text-gray-400 text-sm">
                No properties found matching your criteria.
              </div>
            ) : (
              filteredProperties.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 sm:p-4 rounded-2xl bg-gray-50/80 border border-gray-100 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={item.images?.[0] || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop"}
                      alt={item.title}
                      className="h-16 w-20 sm:h-16 sm:w-20 rounded-xl object-cover shrink-0 border border-gray-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-xs sm:text-sm font-bold text-gray-900 line-clamp-1">
                          {item.title}
                        </h4>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            item.status === "Success"
                              ? "bg-emerald-100 text-emerald-700"
                              : item.status === "Sold Out"
                              ? "bg-gray-200 text-gray-700"
                              : "bg-amber-100 text-[#b88c3a]"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] sm:text-xs text-gray-500">
                        Owner: <span className="font-semibold text-gray-700">{item?.sellerName || item?.seller?.name}</span> | Category: <span className="font-semibold text-gray-700">{item.propertyType}</span>
                      </p>
                      <p className="text-[11px] sm:text-xs font-extrabold text-[#b88c3a] mt-0.5">
                        {item.price ? `₹ ${Number(item.price).toLocaleString("en-IN")}` : "Price not available"} • <span className="text-gray-500 font-normal">{item.area || item.areaSize || "N/A"} {item.areaUnit || ""}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-200">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProperty(item);
                        setActiveImageIndex(0);
                      }}
                      className="flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs font-bold text-gray-700 shadow-sm transition hover:bg-amber-50 hover:border-[#d8b46a] hover:text-[#b88c3a]"
                    >
                      <Eye className="h-3.5 w-3.5 text-[#b88c3a]" />
                      <span>View Details</span>
                    </button>

                    {item.status !== "Sold Out" && (
                      <button
                        type="button"
                        onClick={() => handleMarkAsSold(item._id)}
                        className="flex items-center gap-1 rounded-xl bg-gray-800 px-3.5 py-2 text-xs font-bold text-white shadow hover:bg-black transition"
                      >
                        <Tag className="h-3.5 w-3.5 text-amber-400" />
                        <span>Mark Sold Out</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* ================= PROPERTY & SELLER KYC DETAILS MODAL ================= */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-amber-100 max-h-[90vh] overflow-y-auto font-sans text-gray-900">

            <button
              type="button"
              onClick={() => setSelectedProperty(null)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-red-100 hover:text-red-600"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="border-b border-gray-100 pb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold text-[#b88c3a]">
                  {selectedProperty.propertyType}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                    selectedProperty.status === "Success"
                      ? "bg-emerald-100 text-emerald-700"
                      : selectedProperty.status === "Sold Out"
                      ? "bg-gray-200 text-gray-700"
                      : "bg-amber-100 text-[#b88c3a]"
                  }`}
                >
                  Status: {selectedProperty.status}
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900">
                {selectedProperty.title}
              </h2>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                <MapPin className="h-3.5 w-3.5 text-[#b88c3a]" />
                <span>{selectedProperty.address || selectedProperty.location}</span>
              </div>
            </div>

            <div className="mt-5 space-y-5">
              {/* Main Selected Image Preview */}
              <div className="relative h-48 sm:h-64 w-full rounded-2xl overflow-hidden shadow-inner border border-gray-100 bg-black">
                <img
                  src={
                    selectedProperty.images?.[activeImageIndex] ||
                    selectedProperty.images?.[0] ||
                    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop"
                  }
                  alt={selectedProperty.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md text-[#ffd77f] font-extrabold text-sm px-3.5 py-1.5 rounded-full shadow">
                  {selectedProperty.price ? `₹ ${Number(selectedProperty.price).toLocaleString("en-IN")}` : "Price N/A"}
                </div>
              </div>

              {/* Multiple Property Photos Thumbnails Selection */}
              {selectedProperty.images && selectedProperty.images.length > 1 && (
                <div>
                  <span className="text-xs font-semibold text-gray-500 block mb-2">Property Photos ({selectedProperty.images.length}): Click to view</span>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {selectedProperty.images.map((imgUrl, imgIdx) => (
                      <button
                        key={imgIdx}
                        type="button"
                        onClick={() => setActiveImageIndex(imgIdx)}
                        className={`h-14 w-20 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                          activeImageIndex === imgIdx ? "border-[#b88c3a] ring-2 ring-amber-200" : "border-gray-200 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img src={imgUrl} alt={`Thumb ${imgIdx + 1}`} className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Property Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Area Size & Unit</span>
                  <span className="font-bold text-gray-800">{selectedProperty.area || selectedProperty.areaSize || "N/A"} {selectedProperty.areaUnit || ""}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Added On</span>
                  <span className="font-bold text-gray-800">{selectedProperty.createdAt ? new Date(selectedProperty.createdAt).toLocaleDateString() : "N/A"}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Listing ID</span>
                  <span className="font-bold text-gray-800">#{selectedProperty._id?.slice(-6)}</span>
                </div>
              </div>

              {/* Seller & KYC Information with Document Previews */}
              <div className="rounded-2xl bg-amber-50/60 p-4 border border-amber-200/50 space-y-3">
                <div className="flex items-center justify-between border-b border-amber-200/60 pb-2">
                  <h4 className="font-serif text-xs font-bold text-[#30230c] uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-[#b88c3a]" />
                    <span>Seller & KYC Information</span>
                  </h4>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    {selectedProperty.kycStatus || "Verified"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-800">
                  <div className="flex items-center gap-2">
                    <User className="h-3.5 w-3.5 text-[#b88c3a]" />
                    <span>Name: <strong>{selectedProperty.sellerName || selectedProperty.seller?.name || "N/A"}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-[#b88c3a]" />
                    <span>Phone: <strong>{selectedProperty.sellerPhone || selectedProperty.seller?.phone || "N/A"}</strong></span>
                  </div>

                  {/* Aadhaar Details & Image */}
                  <div className="bg-white p-2.5 rounded-xl border border-amber-100 space-y-1">
                    <span>Aadhaar No: <strong>{selectedProperty.aadhaarNo}</strong></span>
                    {selectedProperty.aadhaarPhoto ? (
                      <div className="mt-1">
                        <a href={selectedProperty.aadhaarPhoto} target="_blank" rel="noreferrer" className="text-[11px] text-[#b88c3a] font-bold underline flex items-center gap-1">
                          <Eye className="h-3 w-3" /> View Aadhaar Card Photo
                        </a>
                      </div>
                    ) : (
                      <span className="block text-[10px] text-gray-400">Photo not uploaded</span>
                    )}
                  </div>

                  {/* PAN Details & Image */}
                  <div className="bg-white p-2.5 rounded-xl border border-amber-100 space-y-1">
                    <span>PAN Card: <strong>{selectedProperty.panNo || "N/A"}</strong></span>
                    {selectedProperty.panPhoto ? (
                      <div className="mt-1">
                        <a href={selectedProperty.panPhoto} target="_blank" rel="noreferrer" className="text-[11px] text-[#b88c3a] font-bold underline flex items-center gap-1">
                          <Eye className="h-3 w-3" /> View PAN Card Photo
                        </a>
                      </div>
                    ) : (
                      <span className="block text-[10px] text-gray-400">Photo not uploaded</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Property Legal Documents Section */}
              <div className="rounded-2xl bg-gray-50 p-4 border border-gray-200/70 space-y-2">
                <h4 className="font-serif text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-[#b88c3a]" />
                  <span>Property Legal Documents (7/12, Sale Deed, etc.)</span>
                </h4>
                {selectedProperty.propertyLegalDocs && selectedProperty.propertyLegalDocs.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                    {selectedProperty.propertyLegalDocs.map((docUrl, docIdx) => (
                      <a
                        key={docIdx}
                        href={docUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:text-[#b88c3a] hover:border-[#b88c3a] transition"
                      >
                        <FileText className="h-3.5 w-3.5 text-[#b88c3a] shrink-0" />
                        <span className="truncate">Document #{docIdx + 1}</span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400">No legal documents attached for this property.</p>
                )}
              </div>

              <div>
                <h4 className="font-serif text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">
                  Description
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                  {selectedProperty.description || "No description provided."}
                </p>
              </div>

              {(selectedProperty.googleMapsLink || selectedProperty.mapLink) && (
                <div>
                  <a
                    href={selectedProperty.googleMapsLink || selectedProperty.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b88c3a] hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Open Location on Google Maps</span>
                  </a>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedProperty(null)}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Close
              </button>

              {selectedProperty.status === "Processing" && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setRejectingProperty(selectedProperty);
                      setRejectionReason("");
                    }}
                    className="flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white shadow transition hover:bg-red-700"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    <span>Reject</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenApproveModal(selectedProperty)}
                    className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow transition hover:bg-emerald-700"
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span>Approve & Update Price</span>
                  </button>
                </>
              )}

              {selectedProperty.status === "Success" && (
                <button
                  type="button"
                  onClick={() => handleMarkAsSold(selectedProperty._id)}
                  className="flex items-center gap-1.5 rounded-xl bg-gray-800 px-4 py-2 text-xs font-bold text-white shadow transition hover:bg-black"
                >
                  <Tag className="h-3.5 w-3.5 text-amber-400" />
                  <span>Mark as Sold Out</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ================= REJECT REASON MODAL ================= */}
      {rejectingProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-amber-100 font-sans text-gray-900">

            <button
              type="button"
              onClick={() => setRejectingProperty(null)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-red-100 hover:text-red-600"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="border-b border-gray-100 pb-3">
              <h3 className="font-serif text-lg font-bold text-gray-900">
                Reject Property Listing
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {rejectingProperty.title}
              </p>
            </div>

            <form onSubmit={handleRejectSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Rejection Reason / Description *
                </label>
                <textarea
                  required
                  rows="4"
                  placeholder="Kripya batayein ki yeh property kyun reject ki ja rahi hai (e.g. Invalid documents, incorrect details...)"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/70 p-3 text-xs text-gray-800 placeholder-gray-400 outline-none transition focus:border-red-500 focus:bg-white focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setRejectingProperty(null)}
                  className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-red-600 px-5 py-2 text-xs font-bold text-white shadow transition hover:bg-red-700"
                >
                  Confirm & Reject Property
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ================= APPROVE & PRICE UPDATE FORM MODAL ================= */}
      {approvingProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-amber-100 font-sans text-gray-900">

            <button
              type="button"
              onClick={() => setApprovingProperty(null)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-red-100 hover:text-red-600"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="border-b border-gray-100 pb-3">
              <h3 className="font-serif text-lg font-bold text-gray-900">
                Approve Property & Update Price
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {approvingProperty.title}
              </p>
            </div>

            <form onSubmit={handlePriceSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Real Price (Seller Submitted)
                </label>
                <input
                  type="text"
                  disabled
                  value={approvingProperty.price ? `₹ ${Number(approvingProperty.price).toLocaleString("en-IN")}` : "N/A"}
                  className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 text-xs text-gray-500 font-bold outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  New Verified Price (₹) *
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-gray-400">
                    <DollarSign className="h-4 w-4 text-[#b88c3a]" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 8500000"
                    value={priceForm.newPrice}
                    onChange={(e) => setPriceForm({ ...priceForm, newPrice: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/70 pl-10 pr-4 py-2.5 text-xs text-gray-800 placeholder-gray-400 outline-none transition focus:border-[#d8b46a] focus:bg-white focus:ring-1 focus:ring-[#d8b46a]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setApprovingProperty(null)}
                  className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow transition hover:bg-emerald-700"
                >
                  Confirm & Set Status Success
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}