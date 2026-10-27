import React from "react";
import {
  LayoutDashboard,
  User,
  Heart,
  CalendarCheck,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "My Profile", icon: User },
    { name: "My Wishlist", icon: Heart },
    { name: "Messages", icon: MessageSquare },
    { name: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 lg:w-72 bg-[#090b0c] text-white flex flex-col justify-between border-r border-white/10 shrink-0 h-full p-6">
      <div>
        {/* User Profile Card Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-white/10">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
            alt="User Avatar"
            className="h-12 w-12 rounded-full object-cover border-2 border-[#ffd77f]"
          />
          <div className="overflow-hidden">
            <h3 className="font-serif text-sm font-bold text-white truncate">
              Arman Tai
            </h3>
            <p className="text-xs text-gray-400 truncate">
              arman@gmail.com
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6 space-y-1.5">
          {menuItems.map(({ name, icon: Icon }) => {
            const isActive = activeTab === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => setActiveTab(name)}
                className={`flex w-full items-center gap-3.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[#e5ba73] to-[#ffe59a] text-[#30230c] font-bold shadow-md"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-[#30230c]" : "text-[#ffd77f]"}`} />
                <span>{name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div>
        <button
          type="button"
          onClick={() => alert("Logged out successfully!")}
          className="flex w-full items-center gap-3.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="h-4 w-4 text-red-400" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}