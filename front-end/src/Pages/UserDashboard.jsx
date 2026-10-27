import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardContent from "../components/DashboardContent";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#061517] flex font-sans m-0 p-0">
      {/* Left Sidebar Component */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Right Content Component */}
      <DashboardContent />
    </div>
  );
}