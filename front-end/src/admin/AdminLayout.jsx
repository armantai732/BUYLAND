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

  // Close mobile sidebar after route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Prevent background scrolling while mobile sidebar is open
  useEffect(() => {
    if (!sidebarOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] md:flex">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-w-0 flex-1">
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