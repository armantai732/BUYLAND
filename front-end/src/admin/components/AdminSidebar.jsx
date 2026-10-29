import React from "react";
import {
  LayoutDashboard,
  Building,
  Users,
  FileText,
  DollarSign,
  Settings,
  LogOut,
  X,
  ShieldCheck,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminSidebar({ isOpen = false, onClose = () => {} }) {
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

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("authChange"));
    onClose();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex h-dvh w-[280px] shrink-0
          flex-col justify-between overflow-y-auto border-r border-white/10
          bg-[#090b0c] p-5 text-white shadow-2xl
          transition-transform duration-300 ease-in-out
          md:sticky md:top-0 md:z-40 md:h-screen md:w-64
          md:translate-x-0 md:shadow-none lg:w-72
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#ffd77f] bg-[#172324] text-[#ffd77f]">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div className="overflow-hidden">
                <h3 className="truncate font-serif text-sm font-bold text-white">
                  Arman Tai
                </h3>
                <p className="truncate text-[11px] text-gray-400">
                  arman@gmail.com
                </p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close admin menu"
              className="rounded-lg p-2 text-gray-300 hover:bg-white/10 hover:text-white md:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Brand */}
          <div className="mt-4 flex items-center gap-2.5 px-2 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#e5ba73] to-[#ffe59a] text-sm font-bold text-[#30230c] shadow">
              🛡️
            </div>
            <div>
              <h4 className="font-serif text-xs font-bold text-white">
                BuyLand Admin
              </h4>
              <p className="text-[10px] text-[#ffd77f]">
                System Control Panel
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-5 flex flex-col gap-1">
            {adminMenuItems.map(({ name, path, icon: Icon }) => {
              const isActive =
                path === "/admindashboard"
                  ? location.pathname === path
                  : location.pathname === path ||
                    location.pathname.startsWith(`${path}/`);

              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => handleNavigation(path)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[#e5ba73] to-[#ffe59a] font-bold text-[#30230c] shadow-md"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 shrink-0 ${
                      isActive ? "text-[#30230c]" : "text-[#ffd77f]"
                    }`}
                  />
                  <span className="truncate">{name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="mt-5 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-red-400 transition-all hover:bg-red-500/10"
          >
            <LogOut className="h-5 w-5" />
            <span>Admin Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}