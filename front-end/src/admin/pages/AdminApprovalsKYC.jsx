import React, { useState } from "react";
import {
  FileCheck,
  Search,
  CheckCircle,
  XCircle,
  Eye,
  X,
  User,
  Phone,
  Mail,
  ShieldCheck,
  FileText,
  Clock,
  Download,
  Building,
  MapPin,
  ExternalLink,
} from "lucide-react";

export default function AdminApprovalsKYC() {
  const [activeTab, setActiveTab] = useState("KYC"); // "KYC" or "PropertyNA"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  // Mock User KYC Requests
  const kycRequests = [
    {
      id: "KYC-101",
      name: "Ramesh Patel",
      role: "Owner",
      phone: "+91 98765 43210",
      email: "ramesh@gmail.com",
      aadhaarNo: "4589-1234-5678",
      panNo: "ABCDE1234F",
      submittedDate: "28 Oct 2026",
      status: "Pending",
      aadhaarDoc: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop",
      panDoc: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: "KYC-102",
      name: "Suresh Joshi",
      role: "Agent",
      phone: "+91 98123 45678",
      email: "suresh.j@gmail.com",
      aadhaarNo: "7890-5678-1234",
      panNo: "FGHIJ5678K",
      submittedDate: "27 Oct 2026",
      status: "Pending",
      aadhaarDoc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      panDoc: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop",
    },
  ];

  // Mock Property NA/Legal Approvals Requests
  const naApprovals = [
    {
      id: "NA-201",
      title: "Commercial Plot near SG Highway",
      owner: "Ramesh Patel",
      phone: "+91 98765 43210",
      naStatus: "NA Residential/Commercial",
      surveyNo: "Revenue Survey No. 142/2, TP 44",
      location: "Ahmedabad, Gujarat",
      submittedDate: "28 Oct 2026",
      status: "Pending",
      aadhaarDoc: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=400&auto=format&fit=crop",
      naOrderDoc: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=400&auto=format&fit=crop",
    },
  ];

  const handleApprove = (id) => {
    alert(`Request ID #${id} Verified & Approved Successfully!`);
    setSelectedItem(null);
  };

  const handleReject = (id) => {
    alert(`Request ID #${id} Rejected!`);
    setSelectedItem(null);
  };

  return (
    <div className="flex-1 bg-[#fbf9f5]  overflow-y-auto p-4 sm:p-6 lg:p-10 text-gray-900 font-sans">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Approvals & KYC Verification
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-600 font-medium">
              Verify user identity documents (Aadhaar/PAN) & Property NA legal papers.
            </p>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex items-center rounded-2xl bg-gray-200/70 p-1 border border-gray-300 w-fit">
            <button
              type="button"
              onClick={() => setActiveTab("KYC")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeTab === "KYC"
                  ? "bg-[#061517] text-[#ffd77f] shadow"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              <User className="h-3.5 w-3.5" />
              <span>User KYC ({kycRequests.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("PropertyNA")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeTab === "PropertyNA"
                  ? "bg-[#061517] text-[#ffd77f] shadow"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Property NA ({naApprovals.length})</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search by name, ID or mobile..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 pl-10 text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none shadow-sm focus:border-[#d8b46a] focus:ring-1 focus:ring-[#d8b46a]"
          />
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
        </div>

        {/* ================= SECTION 1: USER KYC LIST ================= */}
        {activeTab === "KYC" && (
          <div className="rounded-3xl bg-white p-4 sm:p-6 shadow-sm border border-amber-100 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="font-serif text-base sm:text-lg font-bold text-gray-900">
                Pending User KYC Verifications
              </h2>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-[#b88c3a]">
                {kycRequests.length} Pending
              </span>
            </div>

            <div className="space-y-3">
              {kycRequests.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gray-50/80 border border-gray-100 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#061517] text-[#ffd77f] font-bold text-sm shadow shrink-0">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-sm font-bold text-gray-900">
                          {user.name}
                        </h4>
                        <span className="rounded-md bg-gray-200/80 px-2 py-0.5 text-[10px] font-bold text-gray-700">
                          {user.role}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Phone: <span className="font-semibold text-gray-700">{user.phone}</span> | Aadhaar: <span className="font-semibold text-gray-700">{user.aadhaarNo}</span>
                      </p>
                      <p className="text-[11px] text-gray-400">Submitted: {user.submittedDate}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-200">
                    <button
                      type="button"
                      onClick={() => setSelectedItem({ type: "KYC", ...user })}
                      className="flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs font-bold text-gray-700 shadow-sm transition hover:bg-amber-50 hover:border-[#d8b46a] hover:text-[#b88c3a]"
                    >
                      <Eye className="h-3.5 w-3.5 text-[#b88c3a]" />
                      <span>View Documents</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleApprove(user.id)}
                      className="flex items-center gap-1 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow hover:bg-emerald-700 transition"
                    >
                      <CheckCircle className="h-3.5 w-3.5" />
                      <span>Verify & Approve</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleReject(user.id)}
                      className="flex items-center gap-1 rounded-xl bg-red-600 px-3.5 py-2 text-xs font-bold text-white shadow hover:bg-red-700 transition"
                    >
                      <XCircle className="h-3.5 w-3.5" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= SECTION 2: PROPERTY NA APPROVALS LIST ================= */}
        {activeTab === "PropertyNA" && (
          <div className="rounded-3xl bg-white p-4 sm:p-6 shadow-sm border border-amber-100 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="font-serif text-base sm:text-lg font-bold text-gray-900">
                Pending Property N.A. Legal Documents
              </h2>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-[#b88c3a]">
                {naApprovals.length} Pending
              </span>
            </div>

            <div className="space-y-3">
              {naApprovals.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gray-50/80 border border-gray-100 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-[#b88c3a] font-bold text-sm shadow shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-gray-900">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Owner: <span className="font-semibold text-gray-700">{item.owner}</span> | Status: <span className="font-semibold text-emerald-700">{item.naStatus}</span>
                      </p>
                      <p className="text-[11px] text-gray-400">{item.surveyNo}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-200">
                    <button
                      type="button"
                      onClick={() => setSelectedItem({ type: "PropertyNA", ...item })}
                      className="flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs font-bold text-gray-700 shadow-sm transition hover:bg-amber-50 hover:border-[#d8b46a] hover:text-[#b88c3a]"
                    >
                      <Eye className="h-3.5 w-3.5 text-[#b88c3a]" />
                      <span>View Papers</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleApprove(item.id)}
                      className="flex items-center gap-1 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow hover:bg-emerald-700 transition"
                    >
                      <CheckCircle className="h-3.5 w-3.5" />
                      <span>Approve NA</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleReject(item.id)}
                      className="flex items-center gap-1 rounded-xl bg-red-600 px-3.5 py-2 text-xs font-bold text-white shadow hover:bg-red-700 transition"
                    >
                      <XCircle className="h-3.5 w-3.5" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ================= VERIFICATION MODAL POPUP ================= */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-amber-100 max-h-[90vh] overflow-y-auto font-sans text-gray-900">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-red-100 hover:text-red-600"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Header */}
            <div className="border-b border-gray-100 pb-4">
              <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold text-[#b88c3a] mb-1.5">
                {selectedItem.type === "KYC" ? "User Identity Documents" : "Property NA & Title Papers"}
              </span>
              <h2 className="font-serif text-xl font-bold text-gray-900">
                {selectedItem.name || selectedItem.title}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Submitted Request ID: <span className="font-bold text-gray-800">{selectedItem.id}</span>
              </p>
            </div>

            {/* Modal Content */}
            <div className="mt-5 space-y-5">
              
              {/* User Details */}
              {selectedItem.type === "KYC" && (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs">
                    <div>
                      <span className="text-gray-400 block text-[10px] font-semibold">Phone</span>
                      <span className="font-bold text-gray-800">{selectedItem.phone}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px] font-semibold">Aadhaar No.</span>
                      <span className="font-bold text-gray-800">{selectedItem.aadhaarNo}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px] font-semibold">PAN Card No.</span>
                      <span className="font-bold text-gray-800">{selectedItem.panNo}</span>
                    </div>
                  </div>

                  {/* Document Scans Preview */}
                  <div className="space-y-3">
                    <h4 className="font-serif text-xs font-bold text-gray-900 uppercase">
                      Uploaded Identification Copies
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-gray-200 p-3 bg-gray-50 text-center">
                        <span className="text-xs font-bold text-gray-700 block mb-2">Aadhaar Card Copy</span>
                        <img src={selectedItem.aadhaarDoc} alt="Aadhaar" className="h-36 w-full object-cover rounded-xl border" />
                      </div>
                      <div className="rounded-2xl border border-gray-200 p-3 bg-gray-50 text-center">
                        <span className="text-xs font-bold text-gray-700 block mb-2">PAN Card Copy</span>
                        <img src={selectedItem.panDoc} alt="PAN" className="h-36 w-full object-cover rounded-xl border" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Property NA Papers */}
              {selectedItem.type === "PropertyNA" && (
                <>
                  <div className="grid grid-cols-2 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs">
                    <div>
                      <span className="text-gray-400 block text-[10px] font-semibold">Survey No / TP Scheme</span>
                      <span className="font-bold text-gray-800">{selectedItem.surveyNo}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px] font-semibold">N.A. Status</span>
                      <span className="font-bold text-emerald-700">{selectedItem.naStatus}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-serif text-xs font-bold text-gray-900 uppercase">
                      Uploaded Revenue & NA Legal Papers
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-gray-200 p-3 bg-gray-50 text-center">
                        <span className="text-xs font-bold text-gray-700 block mb-2">7/12 & 8A Utara Copy</span>
                        <img src={selectedItem["712Doc"]} alt="7/12" className="h-36 w-full object-cover rounded-xl border" />
                      </div>
                      <div className="rounded-2xl border border-gray-200 p-3 bg-gray-50 text-center">
                        <span className="text-xs font-bold text-gray-700 block mb-2">Collector N.A. Order Order</span>
                        <img src={selectedItem.naOrderDoc} alt="NA Order" className="h-36 w-full object-cover rounded-xl border" />
                      </div>
                    </div>
                  </div>
                </>
              )}

            </div>

            {/* Modal Actions */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => handleReject(selectedItem.id)}
                className="flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white shadow transition hover:bg-red-700"
              >
                <XCircle className="h-3.5 w-3.5" />
                <span>Reject Request</span>
              </button>

              <button
                type="button"
                onClick={() => handleApprove(selectedItem.id)}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow transition hover:bg-emerald-700"
              >
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Verify & Approve</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}