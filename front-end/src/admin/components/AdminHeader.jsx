import React from "react";
import { ShieldCheck, Menu } from "lucide-react";

export default function AdminHeader({ activeTab, onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-amber-100 bg-white px-4 shadow-sm sm:px-8">

      {/* Left Side */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-800 transition hover:bg-gray-100 md:hidden"
          aria-label="Open admin menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div>
          <h2 className="font-serif text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
            {activeTab}
          </h2>
          <p className="hidden text-xs font-medium text-gray-400 sm:block">
            BuyLand Real Estate Management Console
          </p>
        </div>
      </div>

      {/* Right Side: Admin Profile */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 border-l border-gray-200 pl-3 sm:pl-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#061517] font-bold text-[#ffd77f] shadow-sm">
            <ShieldCheck className="h-4 w-4" />
          </div>

          <div className="hidden text-left sm:block">
            <span className="block text-xs font-bold leading-tight text-gray-900">
              Arman Tai
            </span>
            <span className="block text-[10px] font-semibold text-emerald-600">
              Super Admin
            </span>
          </div>
        </div>
      </div>

    </header>
  );
}