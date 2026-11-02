import React from "react";
import {
  LayoutDashboard,
  Building,
  Users,
  DollarSign,
  Settings,
  LogOut,
  X,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminSidebar({ isOpen = false, onClose = () => {} }) {
  const navigate = useNavigate();
  const location = useLocation();

  const adminMenuItems = [
    { name: "Overview", path: "/admindashboard", icon: LayoutDashboard },
    { name: "Property Listings", path: "/admindashboard/properties", icon: Building },
    { name: "User Management", path: "/admindashboard/users", icon: Users },
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
          flex-col justify-between overflow-y-auto border-r border-gray-200
          bg-white p-5 text-gray-900 shadow-2xl
          transition-transform duration-300 ease-in-out
          md:sticky md:top-0 md:z-40 md:h-screen md:w-64
          md:translate-x-0 md:shadow-none lg:w-72
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div>
          {/* Top Brand / Logo Header */}
          <div className="flex flex-col items-center border-b border-gray-100 pb-5 text-center">
            {/* Mobile Close Button */}
            <div className="flex w-full justify-end md:hidden">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close admin menu"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Logo Graphic Placeholder / Icon */}
            <div className="mb-2 flex items-center justify-center gap-1.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 font-bold text-white shadow">
                🏢
              </div>
              <div className="flex h-10 w-8 items-end justify-center rounded bg-amber-600 font-bold text-white shadow">
                🏢
              </div>
              <div className="flex h-6 w-7 items-center justify-center rounded-lg bg-gray-700 font-bold text-white shadow">
                🏠
              </div>
            </div>

            <h1 className="font-serif text-xl font-extrabold tracking-tight text-gray-900">
              BuyLand
            </h1>
            <p className="text-xs font-medium tracking-wide text-gray-500 uppercase">
              Real Estate
            </p>
          </div>

          {/* Navigation */}
          <nav className="mt-5 flex flex-col gap-1.5">
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
                  className={`flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-gray-900 to-[#1a2327] font-semibold text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`h-5 w-5 shrink-0 ${
                        isActive ? "text-amber-400" : "text-gray-600"
                      }`}
                    />
                    <span className="truncate">{name}</span>
                  </div>
                  {isActive && <ChevronRight className="h-4 w-4 text-amber-400 shrink-0" />}
                </button>
              );
            })}
          </nav>

          {/* Promo Banner Card */}
          <div className="relative mt-6 overflow-hidden rounded-2xl bg-gray-900 p-4 text-white shadow-md">
            <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
                alt="Property background"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            
            <div className="relative z-10 flex flex-col items-start">
              <h4 className="font-serif text-base font-bold leading-tight text-white">
                Build Better <br /> Invest Smarter
              </h4>
              <p className="mt-1 text-[11px] text-gray-300">
                With BuyLand
              </p>
              <button
                type="button"
                onClick={() => window.open("/", "_blank")}
                className="mt-3 flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#e5ba73] to-[#ffe59a] px-3.5 py-2 text-xs font-bold text-gray-900 shadow transition-transform hover:scale-105"
              >
                <span>View Website</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* User Profile & Logout */}
        <div className="mt-5 border-t border-gray-100 pt-4 flex flex-col gap-2">
          <div className="flex items-center justify-between rounded-xl px-2 py-2 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold overflow-hidden shadow-inner">
                👤
              </div>
              <div className="overflow-hidden">
                <h4 className="truncate text-sm font-bold text-gray-900">
                  Admin
                </h4>
                <p className="truncate text-xs text-gray-500">
                  Super Admin
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400 rotate-90 shrink-0" />
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-red-600 transition-all hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}