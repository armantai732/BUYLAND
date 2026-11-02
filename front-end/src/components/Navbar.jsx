import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  User,
  ChevronDown,
  ArrowRight,
  Building2,
} from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Properties", path: "/properties" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
  { name: "Sale", path: "/sale" },
];

function HouseLogo() {
  return (
    <svg
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 shrink-0 sm:h-12 sm:w-12"
      aria-label="BuyLand house logo"
    >
      <path
        d="M5 27L29 4L53 27V52H5V27Z"
        stroke="#D99B26"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 28L29 12L46 28V46H12V28Z"
        stroke="#C68A1B"
        strokeWidth="1.4"
      />
      <path
        d="M21 45V32L29 26L37 32V45"
        stroke="#D99B26"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M26 45V37H32V45"
        stroke="#D99B26"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => Boolean(localStorage.getItem("token"))
  );
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
    };

    window.addEventListener("storage", checkLogin);
    window.addEventListener("authChange", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
      window.removeEventListener("authChange", checkLogin);
    };
  }, []);

  const handleSaleClick = (e) => {
    const token = localStorage.getItem("token");
    if (!token) {
      e.preventDefault();
      setMenuOpen(false);
      navigate("/login");
      return;
    }
    setMenuOpen(false);
  };

  const handleNavClick = (e, path) => {
    if (path === "/sale") {
      handleSaleClick(e);
    } else {
      setMenuOpen(false);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `relative py-2 text-sm font-semibold transition-colors duration-200 lg:text-base ${
      isActive
        ? "text-[#D99B26] font-bold"
        : "text-[#10223B] hover:text-[#D99B26]"
    }`;

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm font-sans">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo & Brand */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex shrink-0 items-center gap-2.5"
          aria-label="BuyLand home"
        >
          <HouseLogo />
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-extrabold tracking-tight text-[#D99B26] sm:text-[27px]">
              BuyLand
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500 -mt-1">
              Find Your Dream Land
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 md:flex lg:gap-9">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/"}
              onClick={(e) => handleNavClick(e, link.path)}
              className={navLinkClass}
            >
              {link.name === "Properties" ? (
                <span className="flex items-center gap-1">
                  Properties <ChevronDown size={14} />
                </span>
              ) : (
                link.name
              )}
            </NavLink>
          ))}
        </div>

        {/* Right Actions & Auth */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Search Icon */}
          <button
            onClick={() => alert("Search clicked")}
            className="rounded-full p-2 text-[#10223B] transition hover:bg-gray-100 hover:text-[#D99B26]"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          {/* Divider */}
          <div className="h-5 w-[1px] bg-gray-200" />

          {/* Wishlist / Favorites */}
          <button
            onClick={() => navigate("/wishlist")}
            className="relative rounded-full p-2 text-[#10223B] transition hover:bg-gray-100 hover:text-[#D99B26]"
            aria-label="Wishlist"
          >
            <Heart size={20} />
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow">
              2
            </span>
          </button>

          {/* Profile / Login */}
          {isLoggedIn ? (
            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-full p-2 text-[#10223B] transition hover:bg-gray-100 hover:text-[#D99B26]"
              aria-label="Profile"
            >
              <User size={20} />
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-1.5 rounded-xl bg-[#E8B33B] px-5 py-2.5 text-xs font-bold text-[#10223B] shadow-md transition hover:bg-[#d99b26] active:scale-95"
            >
              <span>Login / Signup</span>
              <ArrowRight size={15} strokeWidth={2.5} />
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg border border-gray-200 bg-gray-50 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`h-0.5 w-5 bg-[#10223B] transition-transform ${
              menuOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-[#10223B] transition-opacity ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-[#10223B] transition-transform ${
              menuOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute left-0 top-full w-full border-t border-gray-100 bg-white px-5 py-4 shadow-xl md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/"}
                onClick={(e) => handleNavClick(e, link.path)}
                className="py-2 text-sm font-semibold text-[#10223B] hover:text-[#D99B26]"
              >
                {link.name}
              </NavLink>
            ))}

            <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-4">
              <button
                onClick={() => { navigate("/wishlist"); setMenuOpen(false); }}
                className="flex items-center gap-2 text-sm font-semibold text-[#10223B]"
              >
                <Heart size={18} /> Wishlist (2)
              </button>

              {isLoggedIn ? (
                <button
                  onClick={() => { navigate("/dashboard"); setMenuOpen(false); }}
                  className="flex items-center gap-2 text-sm font-semibold text-[#10223B]"
                >
                  <User size={18} /> Profile
                </button>
              ) : (
                <button
                  onClick={() => { navigate("/login"); setMenuOpen(false); }}
                  className="rounded-xl bg-[#E8B33B] px-5 py-2 text-xs font-bold text-[#10223B]"
                >
                  Login / Signup →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}