
import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getActiveTab = () => {
    const path = location.pathname;

    if (path === "/admindashboard") return "Overview";
    if (path.startsWith("/admindashboard/properties")) return "Property Listings";
    if (path.startsWith("/admindashboard/users")) return "User Management";
    if (path.startsWith("/admindashboard/kyc")) return "Approvals & KYC";
    if (path.startsWith("/admindashboard/revenue")) return "Revenue & Subscriptions";
    if (path.startsWith("/admindashboard/settings")) return "Settings";

    return "Admin Dashboard";
  };

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!sidebarOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">

      {/* Fixed Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50">
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="min-w-0 md:pl-8 md:ml-64">

        <AdminHeader
          activeTab={getActiveTab()}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="min-w-0">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
