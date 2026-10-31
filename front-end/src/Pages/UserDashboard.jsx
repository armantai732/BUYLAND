import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardContent from "../components/DashboardContent";

export default function UserDashboard() {
    const [activeTab, setActiveTab] = useState("Dashboard");

    useEffect(() => {
        const handleDashboardTab = (event) => {
            setActiveTab(event.detail);
        };

        window.addEventListener("dashboardTabChange", handleDashboardTab);

        return () => {
            window.removeEventListener(
                "dashboardTabChange",
                handleDashboardTab
            );
        };
    }, []);

    return (
        <div className="flex min-h-screen w-full flex-col bg-[#090b0c] md:flex-row">
            {/* Sidebar: mobile par upar, desktop par left side */}
            <aside className="w-full shrink-0 sm:pt-[88px] md:w-64 md:pt-0 lg:w-72">
                <Sidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </aside>

            {/* Content: mobile par neeche, desktop par right side */}
            <div className="min-w-0 flex-1">
                <DashboardContent activeTab={activeTab} />
            </div>
        </div>
    );
}