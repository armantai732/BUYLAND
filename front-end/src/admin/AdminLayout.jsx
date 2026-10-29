import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

export default function AdminLayout() {
    const location = useLocation();

    // URL ના પાથ પરથી હાલનું એક્ટિવ ટેબ નક્કી કરો (Header માટે)
    const getActiveTabName = () => {
        const path = location.pathname;
        if (path.includes("properties")) return "Property Listings";
        if (path.includes("users")) return "User Management";
        if (path.includes("kyc")) return "Approvals & KYC";
        if (path.includes("revenue")) return "Revenue & Subscriptions";
        if (path.includes("settings")) return "Settings";
        return "Overview";
    };

    return (
        <div className="min-h-screen w-full bg-[#061517] flex flex-col md:flex-row font-sans m-0 p-0 overflow-x-hidden">

            {/* Admin Sidebar Navigation */}
            <AdminSidebar />

            {/* Main Content Wrapper (Includes Header & Nested Routes Outlet) */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden w-full">

                {/* Custom Admin Header */}
                <AdminHeader activeTab={getActiveTabName()} />

                {/* Scrollable Page View Area (React Router Outlet) */}
                <div className="flex-1 overflow-y-auto">
                    <Outlet />
                </div>

            </div>

        </div>
    );
}