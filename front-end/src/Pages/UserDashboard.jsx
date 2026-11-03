import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen w-full bg-[#f8fafc]">

            {/* Sidebar */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Content */}
            <main className="w-full min-w-0 md:ml-72 md:w-[calc(100%-18rem)]">

                <DashboardHeader
                    onMenuClick={() => setSidebarOpen(true)}
                />

                <Outlet />

            </main>
        </div>
    );
}