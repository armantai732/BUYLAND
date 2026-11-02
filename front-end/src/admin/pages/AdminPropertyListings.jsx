
import React, { useEffect, useMemo, useState } from "react";
import {
  Building2,
  Search,
  Home,
  Clock,
  CheckCircle2,
  Store,
  MapPin,
  Eye,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  X,
  Phone,
  User,
  ExternalLink,
  ShieldCheck,
  FileText,
  Tag,
  DollarSign,
  CheckCircle,
  XCircle,
  Image as ImageIcon,
} from "lucide-react";

import {
  getAllProperties,
  approvePropertyAPI,
  updateApprovedPropertyAPI,
} from "../../api/api";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop";

const PAGE_SIZE = 5;

export default function AdminProperties() {
  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [sortBy, setSortBy] = useState("newest");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Modals
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [approvingProperty, setApprovingProperty] = useState(null);
  const [editingApprovedProperty, setEditingApprovedProperty] =
    useState(null);

  const [rejectingProperty, setRejectingProperty] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const [priceForm, setPriceForm] = useState({
    realPrice: "",
    newPrice: "",
  });

  // Format price
  const formatPrice = (price) => {
    if (price === undefined || price === null || price === "") {
      return "N/A";
    }

    return `₹ ${Number(price).toLocaleString("en-IN")}`;
  };

  // Get location
  const getLocation = (item) => {
    if (typeof item.location === "string") {
      return item.location;
    }

    if (item.location && typeof item.location === "object") {
      return [
        item.location.city,
        item.location.state,
      ].filter(Boolean).join(", ") || item.city || "N/A";
    }

    return item.city  || "N/A";
  };

  // Get seller name
  const getSellerName = (item) =>
    item.sellerName || item.seller?.name || "N/A";

  // Get seller phone
  const getSellerPhone = (item) =>
    item.sellerPhone ||
    item.seller?.mobileNumber ||
    item.seller?.phone ||
    "N/A";

  // Get property images
  const getImages = (item) => {
    if (Array.isArray(item.images) && item.images.length > 0) {
      return item.images;
    }
    return [FALLBACK_IMAGE];
  };

  // Fetch properties from MongoDB
  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllProperties();

      if (data.success) {
        setProperties(data.properties || []);
      } else {
        setProperties([]);
        setError(data.message || "Failed to load properties.");
      }
    } catch (err) {
      console.error("Fetch properties error:", err);
      setError(err.message || "Failed to load properties.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Dynamic statistics
  const stats = useMemo(() => [
    {
      title: "Total Properties",
      value: properties.length,
      icon: Home,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Pending Approval",
      value: properties.filter(
        (p) => p.status === "Processing"
      ).length,
      icon: Clock,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "Approved",
      value: properties.filter(
        (p) => p.status === "Approved"
      ).length,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Sold Out",
      value: properties.filter(
        (p) => p.status === "Sold Out"
      ).length,
      icon: Store,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
  ], [properties]);

  // Unique filter options
  const locations = useMemo(() => {
    return [...new Set(
      properties.map(getLocation).filter((v) => v !== "N/A")
    )];
  }, [properties]);

  const types = useMemo(() => {
    return [...new Set(
      properties.map((p) => p.propertyType).filter(Boolean)
    )];
  }, [properties]);

  // Search + Filters + Sorting
  const filteredProperties = useMemo(() => {
    let result = properties.filter((item) => {
      const title = item.title || "";
      const owner = getSellerName(item);
      const location = getLocation(item);
      const type = item.propertyType || "";
      const status = item.status || "";

      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        title.toLowerCase().includes(search) ||
        owner.toLowerCase().includes(search) ||
        location.toLowerCase().includes(search) ||
        type.toLowerCase().includes(search);

      const matchesType =
        selectedType === "All Types" ||
        type === selectedType;

      const matchesLocation =
        selectedLocation === "All Locations" ||
        location === selectedLocation;

      const matchesStatus =
        selectedStatus === "All Status" ||
        status === selectedStatus;

      return (
        matchesSearch &&
        matchesType &&
        matchesLocation &&
        matchesStatus
      );
    });

    result.sort((a, b) => {
      if (sortBy === "low") {
        return Number(a.price || 0) - Number(b.price || 0);
      }

      if (sortBy === "high") {
        return Number(b.price || 0) - Number(a.price || 0);
      }

      return (
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
      );
    });

    return result;
  }, [
    properties,
    searchTerm,
    selectedType,
    selectedLocation,
    selectedStatus,
    sortBy,
  ]);

  // Pagination
  const totalPages = Math.ceil(
    filteredProperties.length / PAGE_SIZE
  );

  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType, selectedLocation, selectedStatus, sortBy]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Open approve modal
  const handleOpenApproveModal = (property) => {
    setApprovingProperty(property);

    setPriceForm({
      realPrice: property.price || "",
      newPrice: String(property.price || ""),
    });
  };

  // Approve property with verified price
  const handlePriceSubmit = async (e) => {
    e.preventDefault();

    const newPrice = Number(
      String(priceForm.newPrice).replace(/,/g, "").trim()
    );

    if (!Number.isFinite(newPrice) || newPrice <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await approvePropertyAPI(
        approvingProperty._id,
        {
          price: newPrice,
          adminRemark: "",
        }
      );

      if (response.success) {
        setProperties((prev) =>
          prev.map((item) =>
            item._id === approvingProperty._id
              ? response.property
              : item
          )
        );

        setSelectedProperty(null);
        setApprovingProperty(null);

        alert("Property approved successfully!");
      } else {
        alert(response.message || "Failed to approve property.");
      }
    } catch (err) {
      console.error("Approve error:", err);
      alert(err.message || "Failed to approve property.");
    } finally {
      setSubmitting(false);
    }
  };

  // Open sold out modal
  const handleOpenSoldOutModal = (property) => {
    setEditingApprovedProperty(property);

    setPriceForm({
      realPrice: property.price || "",
      newPrice: String(property.price || ""),
    });
  };

  // Update price + Sold Out
  const handleSoldOutSubmit = async (e) => {
    e.preventDefault();

    const newPrice = Number(
      String(priceForm.newPrice).replace(/,/g, "").trim()
    );

    if (!Number.isFinite(newPrice) || newPrice <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    if (!window.confirm(
      "Are you sure you want to update the price and mark this property as Sold Out?"
    )) {
      return;
    }

    try {
      setSubmitting(true);

      const response = await updateApprovedPropertyAPI(
        editingApprovedProperty._id,
        newPrice
      );

      if (response.success) {
        setProperties((prev) =>
          prev.map((item) =>
            item._id === editingApprovedProperty._id
              ? response.property
              : item
          )
        );

        setSelectedProperty(null);
        setEditingApprovedProperty(null);

        alert("Price updated and property marked as Sold Out!");
      } else {
        alert(response.message || "Update failed.");
      }
    } catch (err) {
      console.error("Sold Out Update Error:", err);
      alert(err.message || "Failed to update property.");
    } finally {
      setSubmitting(false);
    }
  };

  // Reject property
  // IMPORTANT: This is frontend-only until a rejection API is added.
  const handleRejectSubmit = (e) => {
    e.preventDefault();

    if (!rejectionReason.trim()) {
      alert("Please enter a rejection reason.");
      return;
    }

    const id = rejectingProperty._id;

    setProperties((prev) =>
      prev.filter((item) => item._id !== id)
    );

    alert(
      `Property #${id} rejected locally. Reason: ${rejectionReason}`
    );

    setRejectingProperty(null);
    setRejectionReason("");
    setSelectedProperty(null);
  };

  // Status styles
  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";

      case "Processing":
        return "bg-amber-100 text-amber-700 border-amber-200";

      case "Sold Out":
        return "bg-slate-100 text-slate-700 border-slate-200";

      case "Rejected":
        return "bg-rose-100 text-rose-700 border-rose-200";

      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // Type styles
  const getTypeStyle = (type) => {
    if (type?.toLowerCase().includes("residential")) {
      return "bg-blue-50 text-blue-700";
    }

    if (type?.toLowerCase().includes("commercial")) {
      return "bg-purple-50 text-purple-700";
    }

    if (type?.toLowerCase().includes("agricultural")) {
      return "bg-green-50 text-green-700";
    }

    return "bg-amber-50 text-amber-700";
  };

  return (
    <div className="min-h-screen flex-1 bg-[#f8f9fa] p-4 sm:p-6 lg:p-8 text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-50 text-amber-600">
                  <Building2 className="h-6 w-6" />
                </span>

                <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  Property Listings
                </h1>
              </div>

              <p className="mt-1.5 text-xs sm:text-sm text-gray-500 font-medium">
                Manage listings, review seller KYC and approve properties.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700">
                Total: {properties.length}
              </span>

              <button
                type="button"
                onClick={fetchProperties}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block opacity-20">
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop"
              alt="Real estate"
              className="h-full w-full object-cover"
              style={{
                maskImage: "linear-gradient(to right, transparent, black 60%)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 60%)",
              }}
            />
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 flex items-center justify-between transition hover:shadow-md"
              >
                <div>
                  <p className="text-xs font-semibold text-gray-500">
                    {stat.title}
                  </p>

                  <h3 className="text-2xl font-extrabold text-gray-900 mt-1 font-serif">
                    {stat.value.toLocaleString("en-IN")}
                  </h3>
                </div>

                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.bg} ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            );
          })}
        </div>

        {/* SEARCH & FILTERS */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100 flex flex-wrap items-center gap-3">

          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search title, owner, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-10 pr-4 text-xs sm:text-sm outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs font-medium text-gray-600 outline-none"
          >
            <option>All Types</option>
            {types.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs font-medium text-gray-600 outline-none max-w-[180px]"
          >
            <option>All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs font-medium text-gray-600 outline-none"
          >
            <option>All Status</option>
            <option>Processing</option>
            <option>Approved</option>
            <option>Sold Out</option>
            <option>Rejected</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs font-semibold text-gray-700 outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        {/* PROPERTY TABLE */}
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">

          <div className="flex items-center justify-between gap-3 p-4 sm:p-5 border-b border-gray-100">
            <div>
              <h2 className="font-serif text-base sm:text-lg font-bold text-gray-900">
                All Property Listings
              </h2>

              <p className="text-[11px] text-gray-400 mt-1">
                {filteredProperties.length} properties found
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[850px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">#</th>
                  <th className="py-3.5 px-4">Property Details</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">

                {loading ? (
                  <tr>
                    <td colSpan="7" className="py-16 text-center text-gray-400">
                      <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
                      Loading properties...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="7" className="py-12 text-center">
                      <p className="text-sm text-red-500 mb-3">{error}</p>
                      <button
                        onClick={fetchProperties}
                        className="rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white"
                      >
                        Try Again
                      </button>
                    </td>
                  </tr>
                ) : paginatedProperties.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-16 text-center text-gray-400">
                      No properties found.
                    </td>
                  </tr>
                ) : (
                  paginatedProperties.map((property, index) => (
                    <tr
                      key={property._id}
                      className="transition hover:bg-gray-50/60"
                    >
                      <td className="py-3 px-4 text-gray-400">
                        {(currentPage - 1) * PAGE_SIZE + index + 1}
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={getImages(property)[0]}
                            alt={property.title}
                            className="h-12 w-16 rounded-xl object-cover shrink-0 border border-gray-200"
                          />

                          <div className="min-w-0">
                            <h4 className="font-bold text-xs text-gray-900 max-w-[220px] truncate">
                              {property.title || "Untitled Property"}
                            </h4>

                            <p className="text-[11px] text-gray-400 mt-1">
                              Owner: {getSellerName(property)}
                            </p>

                            <p className="text-[10px] text-gray-400">
                              ID: #{property._id?.slice(-6)}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className={`inline-block rounded-lg px-2.5 py-1 text-[11px] font-bold ${getTypeStyle(property.propertyType)}`}>
                          {property.propertyType || "N/A"}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1 text-gray-600">
                          <MapPin className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                          <span>{getLocation(property)}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-bold text-amber-700">
                        {formatPrice(property.price)}
                      </td>

                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold ${getStatusStyle(property.status)}`}>
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {property.status || "N/A"}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">

                          <button
                            type="button"
                            title="View Details"
                            onClick={() => {
                              setSelectedProperty(property);
                              setActiveImageIndex(0);
                            }}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-600"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>

                          {property.status === "Processing" && (
                            <>
                              <button
                                type="button"
                                title="Approve Property"
                                onClick={() => handleOpenApproveModal(property)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                              >
                                <CheckCircle className="h-3.5 w-3.5" />
                              </button>

                              <button
                                type="button"
                                title="Reject Property"
                                onClick={() => {
                                  setRejectingProperty(property);
                                  setRejectionReason("");
                                }}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100"
                              >
                                <XCircle className="h-3.5 w-3.5" />
                              </button>
                            </>
                          )}

                          {property.status === "Approved" && (
                            <button
                              type="button"
                              title="Update Price & Sold Out"
                              onClick={() => handleOpenSoldOutModal(property)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-200 bg-amber-50 text-amber-600 hover:bg-amber-100"
                            >
                              <Tag className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}

              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 p-4 text-xs text-gray-500">

            <p>
              Showing{" "}
              <span className="font-semibold text-gray-800">
                {filteredProperties.length === 0
                  ? 0
                  : (currentPage - 1) * PAGE_SIZE + 1}
                {" "}to{" "}
                {Math.min(currentPage * PAGE_SIZE, filteredProperties.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-800">
                {filteredProperties.length}
              </span>{" "}
              properties
            </p>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={currentPage === 1 || totalPages === 0}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white disabled:opacity-40 hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) =>
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1
                )
                .map((page, index, arr) => (
                  <React.Fragment key={page}>
                    {index > 0 && arr[index - 1] !== page - 1 && (
                      <span className="px-1">...</span>
                    )}

                    <button
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                        currentPage === page
                          ? "bg-amber-600 text-white shadow"
                          : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                ))}

              <button
                type="button"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white disabled:opacity-40 hover:bg-gray-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PROPERTY DETAILS MODAL */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-3xl rounded-3xl bg-white p-5 sm:p-7 shadow-2xl max-h-[92vh] overflow-y-auto text-gray-900">

            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="border-b border-gray-100 pb-4 pr-8">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${getTypeStyle(selectedProperty.propertyType)}`}>
                  {selectedProperty.propertyType || "N/A"}
                </span>

                <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${getStatusStyle(selectedProperty.status)}`}>
                  {selectedProperty.status}
                </span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold">
                {selectedProperty.title}
              </h2>

              <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="h-3.5 w-3.5 text-amber-600" />
                {getLocation(selectedProperty)}
              </p>
            </div>

            <div className="mt-5 space-y-5">

              {/* PROPERTY IMAGES */}
              <div>
                <div className="relative h-52 sm:h-72 rounded-2xl overflow-hidden bg-gray-100">
                  <img
                    src={
                      getImages(selectedProperty)[activeImageIndex] ||
                      FALLBACK_IMAGE
                    }
                    alt={selectedProperty.title}
                    className="h-full w-full object-cover"
                  />

                  <span className="absolute bottom-3 right-3 rounded-full bg-black/80 px-4 py-2 text-sm font-bold text-amber-300">
                    {formatPrice(selectedProperty.price)}
                  </span>
                </div>

                {getImages(selectedProperty).length > 1 && (
                  <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                    {getImages(selectedProperty).map((img, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveImageIndex(index)}
                        className={`h-14 w-20 shrink-0 rounded-xl overflow-hidden border-2 ${
                          activeImageIndex === index
                            ? "border-amber-500"
                            : "border-gray-200"
                        }`}
                      >
                        <img src={img} alt={`Property ${index + 1}`} className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* PROPERTY INFORMATION */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs">
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-semibold">Area</p>
                  <p className="font-bold mt-1">
                    {selectedProperty.area || selectedProperty.areaSize || "N/A"} {selectedProperty.areaUnit || ""}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-semibold">Ownership</p>
                  <p className="font-bold mt-1">{selectedProperty.ownershipType || "N/A"}</p>
                </div>

                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-semibold">Seller Type</p>
                  <p className="font-bold mt-1">{selectedProperty.sellerType || "N/A"}</p>
                </div>

                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-semibold">Added On</p>
                  <p className="font-bold mt-1">
                    {selectedProperty.createdAt
                      ? new Date(selectedProperty.createdAt).toLocaleDateString("en-IN")
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-semibold">Listing ID</p>
                  <p className="font-bold mt-1">#{selectedProperty._id?.slice(-6)}</p>
                </div>

                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-semibold">Price</p>
                  <p className="font-bold text-amber-700 mt-1">{formatPrice(selectedProperty.price)}</p>
                </div>
              </div>

              {/* SELLER KYC */}
              <div className="rounded-2xl bg-amber-50/60 p-4 border border-amber-200/60 space-y-3">
                <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                  <h4 className="text-xs font-bold uppercase flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-amber-600" />
                    Seller & KYC Information
                  </h4>

                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">
                    {selectedProperty.kycStatus || "Not specified"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">

                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-amber-600" />
                    <span>Name: <strong>{getSellerName(selectedProperty)}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-amber-600" />
                    <span>Phone: <strong>{getSellerPhone(selectedProperty)}</strong></span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-amber-100">
                    <p>Aadhaar No: <strong>{selectedProperty.aadhaarNo || "N/A"}</strong></p>

                    {selectedProperty.aadhaarPhoto ? (
                      <a
                        href={selectedProperty.aadhaarPhoto}
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-700 font-bold underline mt-2 inline-flex items-center gap-1"
                      >
                        <Eye className="h-3 w-3" />
                        View Aadhaar Photo
                      </a>
                    ) : (
                      <p className="text-gray-400 text-[10px] mt-1">Photo not uploaded</p>
                    )}
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-amber-100">
                    <p>PAN No: <strong>{selectedProperty.panNo || "N/A"}</strong></p>

                    {selectedProperty.panPhoto ? (
                      <a
                        href={selectedProperty.panPhoto}
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-700 font-bold underline mt-2 inline-flex items-center gap-1"
                      >
                        <Eye className="h-3 w-3" />
                        View PAN Photo
                      </a>
                    ) : (
                      <p className="text-gray-400 text-[10px] mt-1">Photo not uploaded</p>
                    )}
                  </div>
                </div>
              </div>

              {/* LEGAL DOCUMENTS */}
              <div className="rounded-2xl bg-gray-50 p-4 border border-gray-200 space-y-3">
                <h4 className="text-xs font-bold uppercase flex items-center gap-2">
                  <FileText className="h-4 w-4 text-amber-600" />
                  Property Legal Documents
                </h4>

                {selectedProperty.propertyLegalDocs?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProperty.propertyLegalDocs.map((doc, index) => (
                      <a
                        key={index}
                        href={doc}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-white border border-gray-200 p-3 rounded-xl text-xs font-semibold text-gray-700 hover:border-amber-400 hover:text-amber-700"
                      >
                        <FileText className="h-4 w-4 text-amber-600" />
                        Document #{index + 1}
                        <ExternalLink className="h-3 w-3 ml-auto" />
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400">
                    No legal documents uploaded.
                  </p>
                )}
              </div>

              {/* DESCRIPTION */}
              <div>
                <h4 className="text-xs font-bold uppercase mb-2">Description</h4>
                <p className="text-xs leading-relaxed text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  {selectedProperty.description || "No description provided."}
                </p>
              </div>

              {/* GOOGLE MAPS */}
              {(selectedProperty.googleMapsLink || selectedProperty.mapLink) && (
                <a
                  href={selectedProperty.googleMapsLink || selectedProperty.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open Location on Google Maps
                </a>
              )}
            </div>

            {/* MODAL ACTIONS */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-end gap-2 flex-wrap">
              <button
                onClick={() => setSelectedProperty(null)}
                className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-semibold hover:bg-gray-50"
              >
                Close
              </button>

              {selectedProperty.status === "Processing" && (
                <>
                  <button
                    onClick={() => {
                      setRejectingProperty(selectedProperty);
                      setRejectionReason("");
                    }}
                    className="flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    Reject
                  </button>

                  <button
                    onClick={() => handleOpenApproveModal(selectedProperty)}
                    className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700"
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                    Approve & Update Price
                  </button>
                </>
              )}

              {selectedProperty.status === "Approved" && (
                <button
                  onClick={() => handleOpenSoldOutModal(selectedProperty)}
                  className="flex items-center gap-1.5 rounded-xl bg-gray-800 px-4 py-2 text-xs font-bold text-white hover:bg-black"
                >
                  <Tag className="h-3.5 w-3.5 text-amber-400" />
                  Update Price & Sold Out
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* REJECT MODAL */}
      {rejectingProperty && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">

            <button
              onClick={() => setRejectingProperty(null)}
              className="absolute top-4 right-4 rounded-full bg-gray-100 p-2"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="font-serif text-lg font-bold text-gray-900">
              Reject Property Listing
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              {rejectingProperty.title}
            </p>

            <form onSubmit={handleRejectSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-2">
                  Rejection Reason *
                </label>

                <textarea
                  required
                  rows="4"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Explain why this property is being rejected..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-xs outline-none focus:border-red-400"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRejectingProperty(null)}
                  className="rounded-xl border px-4 py-2 text-xs font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700"
                >
                  Confirm Reject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* APPROVE & PRICE MODAL */}
      {approvingProperty && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">

            <button
              disabled={submitting}
              onClick={() => setApprovingProperty(null)}
              className="absolute top-4 right-4 rounded-full bg-gray-100 p-2 disabled:opacity-50"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="font-serif text-lg font-bold text-gray-900">
              Approve Property & Update Price
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              {approvingProperty.title}
            </p>

            <form onSubmit={handlePriceSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-2">
                  Seller Submitted Price
                </label>

                <input
                  type="text"
                  disabled
                  value={formatPrice(approvingProperty.price)}
                  className="w-full rounded-xl border bg-gray-100 px-4 py-3 text-xs font-bold text-gray-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-2">
                  New Verified Price (₹) *
                </label>

                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-600" />

                  <input
                    type="number"
                    min="1"
                    step="any"
                    required
                    value={priceForm.newPrice}
                    onChange={(e) =>
                      setPriceForm((prev) => ({
                        ...prev,
                        newPrice: e.target.value,
                      }))
                    }
                    placeholder="Enter verified price"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-3 text-xs outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => setApprovingProperty(null)}
                  className="rounded-xl border px-4 py-2 text-xs font-semibold disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white disabled:opacity-50"
                >
                  {submitting ? "Please wait..." : "Confirm & Approve"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* APPROVED PROPERTY PRICE + SOLD OUT MODAL */}
      {editingApprovedProperty && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">

            <button
              disabled={submitting}
              onClick={() => setEditingApprovedProperty(null)}
              className="absolute top-4 right-4 rounded-full bg-gray-100 p-2 disabled:opacity-50"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="font-serif text-lg font-bold text-gray-900">
              Update Price & Mark Sold Out
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              {editingApprovedProperty.title}
            </p>

            <form onSubmit={handleSoldOutSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-2">
                  Current Approved Price
                </label>

                <input
                  type="text"
                  disabled
                  value={formatPrice(editingApprovedProperty.price)}
                  className="w-full rounded-xl border bg-gray-100 px-4 py-3 text-xs font-bold text-gray-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-2">
                  New Updated Price (₹) *
                </label>

                <input
                  type="number"
                  min="1"
                  step="any"
                  required
                  value={priceForm.newPrice}
                  onChange={(e) =>
                    setPriceForm((prev) => ({
                      ...prev,
                      newPrice: e.target.value,
                    }))
                  }
                  placeholder="Enter new price"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs outline-none focus:border-amber-400"
                />

                <p className="text-[10px] text-gray-400 mt-1">
                  You can increase or decrease the approved price.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-2">
                  New Property Status
                </label>

                <input
                  disabled
                  value="Sold Out"
                  className="w-full rounded-xl border bg-gray-100 px-4 py-3 text-xs font-bold text-gray-500"
                />
              </div>

              <div className="rounded-xl bg-amber-50 border border-amber-200 p-3">
                <p className="text-[11px] text-amber-800">
                  After confirmation, the new price and Sold Out status will be saved in the database.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => setEditingApprovedProperty(null)}
                  className="rounded-xl border px-4 py-2 text-xs font-semibold disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 rounded-xl bg-gray-800 px-5 py-2 text-xs font-bold text-white hover:bg-black disabled:opacity-50"
                >
                  <Tag className="h-3.5 w-3.5 text-amber-400" />
                  {submitting ? "Updating..." : "Update & Sold Out"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}