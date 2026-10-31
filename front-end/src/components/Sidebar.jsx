
import React, { useEffect, useState } from "react";
import {
    LayoutDashboard,
    User,
    Heart,
    MessageSquare,
    Settings,
    LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getMyProfile } from "../api/api";

export default function Sidebar({ activeTab, setActiveTab }) {
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        name: "",
        email: "",
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const loadProfile = async () => {
            try {
                setLoading(true);

                // Profile directly from MongoDB through backend
                const data = await getMyProfile();

                if (!cancelled && data.success && data.user) {
                    setProfile({
                        name: data.user.name || "",
                        email: data.user.email || "",
                    });
                }
            } catch (error) {
                console.error("Profile fetch failed:", error.message);
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadProfile();

        return () => {
            cancelled = true;
        };
    }, []);

    const menuItems = [
        { name: "Dashboard", icon: LayoutDashboard },
        { name: "My Wishlist", icon: Heart },
        { name: "Messages", icon: MessageSquare },
        { name: "Settings", icon: Settings },
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");

        window.dispatchEvent(new Event("authChange"));
        navigate("/login", { replace: true });
    };

    return (
        <aside className="w-full bg-[#090b0c] p-4 text-white sm:p-6 md:min-h-screen md:border-r md:border-white/10">
            {/* Database User Profile */}
            <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#ffd77f] bg-white/10 text-lg font-bold text-[#ffd77f]">
                    {profile.name
                        ? profile.name.charAt(0).toUpperCase()
                        : "U"}
                </div>

                <div className="min-w-0">
                    <h3 className="truncate font-serif text-sm font-bold text-white">
                        {loading
                            ? "Loading..."
                            : profile.name || "User not found"}
                    </h3>

                    <p className="truncate text-xs text-gray-400">
                        {profile.email || "User not found"}
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="grid grid-cols-2 gap-4 md:flex md:flex-col">
                {menuItems.map(({ name, icon: Icon }) => {
                    const isActive = activeTab === name;

                    return (
                        <button
                            key={name}
                            type="button"
                            onClick={() => setActiveTab(name)}
                            aria-current={isActive ? "page" : undefined}
                            className={`flex min-w-0 items-center gap-2 rounded-xl px-3 py-3 text-left text-xs transition-all sm:gap-3 sm:px-4 sm:text-sm ${isActive
                                    ? "bg-gradient-to-r from-[#e5ba73] to-[#ffe59a] font-bold text-[#30230c] shadow-md"
                                    : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            <Icon
                                className={`h-4 w-4 shrink-0 sm:h-5 sm:w-5 ${isActive
                                        ? "text-[#30230c]"
                                        : "text-[#ffd77f]"
                                    }`}
                            />
                            <span className="truncate">{name}</span>
                        </button>
                    );
                })}

                {/* Logout */}
                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex min-w-0 items-center gap-2 rounded-xl bg-red-500/10 px-3 py-3 text-left text-xs text-red-400 transition hover:bg-red-500/20 sm:gap-3 sm:px-4 sm:text-sm md:mt-4"
                >
                    <LogOut className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
                    <span>Logout</span>
                </button>
            </nav>
        </aside>
    );
}
