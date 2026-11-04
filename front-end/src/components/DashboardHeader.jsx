
import React from "react";
import {
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  Menu,
} from "lucide-react";

export default function DashboardHeader({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between shadow-sm">

      {/* Left Side */}
      <div className="flex items-center gap-3 w-full max-w-xl">
        <button
          onClick={onMenuClick}
          className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 md:hidden shrink-0"
          aria-label="Open Menu"
        >
          <Menu size={22} />
        </button>

        {/* Search Bar */}
        {/* <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search properties..."
            className="w-full rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 py-2 text-xs sm:text-sm text-gray-800 outline-none focus:border-amber-400 focus:bg-white"
          />
        </div> */}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">


        {/* Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-gray-200 cursor-pointer">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0c2225] text-white font-bold text-sm shadow">
            A
          </div>

        </div>
      </div>
    </header>
  );
}
