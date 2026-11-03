
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Building2,
  Heart,
  MessageSquare,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const sidebarLinks = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, end: true },
  { name: "My Profile", path: "/dashboard/profile", icon: User },
  { name: "My Properties", path: "/dashboard/my-properties", icon: Building2 },
  { name: "Wishlist", path: "/dashboard/wishlist", icon: Heart },
];

function HouseLogo() {
  return (
    <svg
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12 shrink-0"
      aria-label="BuyLand house logo"
    >
      <path d="M5 27L29 4L53 27V52H5V27Z" stroke="#F5D58A" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M12 28L29 12L46 28V46H12V28Z" stroke="#D7B66B" strokeWidth="1.4" />
      <path d="M21 45V32L29 26L37 32V45" stroke="#F5D58A" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M26 45V37H32V45" stroke="#F5D58A" strokeWidth="2" />
    </svg>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChange"));
    onClose?.();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-[60] bg-black/60 md:hidden"
        />
      )}

      <aside
        className={`
    fixed inset-y-0 left-0 z-[70]
    flex flex-col
    w-72 h-screen
    bg-[#07111d] px-6 py-8 text-white
    border-r border-slate-800 shadow-xl
    overflow-y-auto
    transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}
      >
        <div className="space-y-8 shrink-0">

          {/* Logo */}
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute right-0 top-0 p-2 text-slate-400 hover:text-white md:hidden"
              aria-label="Close sidebar"
            >
              <X size={22} />
            </button>

            <div
              onClick={() => {
                navigate("/");
                onClose?.();
              }}
              className="flex flex-col items-center text-center cursor-pointer group"
            >
              <HouseLogo />

              <span className="font-serif text-2xl font-extrabold tracking-tight text-[#F5D58A] mt-2">
                BuyLand
              </span>

              <span className="text-[10px] font-medium tracking-wider text-slate-400">
                Find Your Dream Land
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${isActive
                      ? "bg-gradient-to-r from-[#F5D58A] to-[#e4c372] text-[#07111d] shadow-md font-bold"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon
                          size={20}
                          className={isActive ? "text-[#07111d]" : "text-[#F5D58A]"}
                        />
                        <span>{link.name}</span>
                      </div>

                      {link.badge && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow">
                          {link.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
            >
              <LogOut size={20} className="text-red-400" />
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Bottom Card */}
        <div className="mt-auto pt-6 shrink-0 rounded-2xl border border-amber-400/30 bg-gradient-to-b from-[#0e1d30] to-[#07111d] p-4 text-center shadow-lg relative overflow-hidden">          <div className="flex justify-center mb-2 text-[#F5D58A]">
          <svg
            viewBox="0 0 120 40"
            className="w-28 h-10 fill-current opacity-80"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 40V20h5v20h5V15h6v25h4V10h8v30h6V5h8v35h5V25h6v15h7V18h6v22h8V35h5v5H10z" />
          </svg>
        </div>

          <h4 className="font-serif text-xs font-bold text-[#F5D58A] tracking-wide">
            Your Trusted
          </h4>

          <h3 className="font-serif text-sm font-extrabold text-white tracking-wide mt-0.5">
            Real Estate Partner
          </h3>

          <p className="mt-2 text-[11px] font-medium text-amber-200/80 tracking-wider">
            Buy • Sell • Invest
          </p>
        </div>
      </aside>
    </>
  );
}
