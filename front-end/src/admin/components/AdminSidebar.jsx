import React from "react";
import {
    LayoutDashboard,
    Building,
    Users,
    FileText,
    DollarSign,
    Settings,
    LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminSidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const adminMenuItems = [
        { name: "Overview", path: "/admindashboard", icon: LayoutDashboard },
        { name: "Property Listings", path: "/admindashboard/properties", icon: Building },
        { name: "User Management", path: "/admindashboard/users", icon: Users },
        { name: "Approvals & KYC", path: "/admindashboard/kyc", icon: FileText },
        { name: "Revenue & Subscriptions", path: "/admindashboard/revenue", icon: DollarSign },
        { name: "Settings", path: "/admindashboard/settings", icon: Settings },
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");

        window.dispatchEvent(new Event("authChange"));
        navigate("/login", { replace: true });
    };

    return (
        <aside className="w-full md:w-64 lg:w-72 bg-[#090b0c] text-white flex flex-col justify-between border-r border-white/10 shrink-0 p-5 md:p-6 h-auto md:h-screen">
            <div>
                {/* Admin Profile Header */}
                <div className="flex items-center gap-3 pb-5 border-b border-white/10">
                    <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                        alt="Admin Avatar"
                        className="h-11 w-11 rounded-full object-cover border-2 border-[#ffd77f]"
                    />
                    <div className="overflow-hidden">
                        <h3 className="font-serif text-sm font-bold text-white truncate">
                            Arman Tai
                        </h3>
                        <p className="text-[11px] text-gray-400 truncate">arman@gmail.com</p>
                    </div>
                </div>

                {/* Brand System Info */}
                <div className="mt-4 flex items-center gap-2.5 px-2 py-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#e5ba73] to-[#ffe59a] text-[#30230c] font-bold text-sm shadow">
                        🛡️
                    </div>
                    <div>
                        <h4 className="font-serif text-xs font-bold text-white">BuyLand Admin</h4>
                        <p className="text-[10px] text-[#ffd77f]">System Control Panel</p>
                    </div>
                </div>

                {/* Navigation Menu */}
                {/* Navigation Menu */}
                <nav className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-1 md:space-y-1">
                    {adminMenuItems.map(({ name, path, icon: Icon }) => {
                        const isActive = location.pathname === path;

                        return (
                            <button
                                key={name}
                                type="button"
                                onClick={() => navigate(path)}
                                className={`flex min-w-0 items-center gap-2 rounded-xl px-3 py-3 text-left text-xs font-medium transition-all sm:text-sm md:py-2.5 ${isActive
                                        ? "bg-gradient-to-r from-[#e5ba73] to-[#ffe59a] text-[#30230c] font-bold shadow-md"
                                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <Icon
                                    className={`h-4 w-4 shrink-0 ${isActive ? "text-[#30230c]" : "text-[#ffd77f]"
                                        }`}
                                />
                                <span className="truncate">{name}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Logout Button */}
            <div className="pt-4 mt-4 border-t border-white/10">
                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
                >
                    <LogOut className="h-4 w-4 text-red-400" />
                    <span>Admin Logout</span>
                </button>
            </div>
        </aside>
    );
}