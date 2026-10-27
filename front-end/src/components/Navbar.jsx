
import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

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
            className="h-12 w-12 shrink-0 sm:h-14 sm:w-14"
            aria-label="BuyLand house logo"
        >
            <path
                d="M5 27L29 4L53 27V52H5V27Z"
                stroke="#F5D58A"
                strokeWidth="3.5"
                strokeLinejoin="round"
            />
            <path
                d="M12 28L29 12L46 28V46H12V28Z"
                stroke="#D7B66B"
                strokeWidth="1.4"
            />
            <path
                d="M21 45V32L29 26L37 32V45"
                stroke="#F5D58A"
                strokeWidth="2.5"
                strokeLinejoin="round"
            />
            <path
                d="M26 45V37H32V45"
                stroke="#F5D58A"
                strokeWidth="2"
            />
        </svg>
    );
}

function ProfileIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <circle cx="12" cy="8" r="4" />
            <path d="M5 21a7 7 0 0 1 14 0" />
        </svg>
    );
}

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(
        () => Boolean(localStorage.getItem("token"))
    );

    const navigate = useNavigate();

    // Update login status when token changes
    useEffect(() => {
        const checkLogin = () => {
            setIsLoggedIn(Boolean(localStorage.getItem("token")));
        };

        window.addEventListener("storage", checkLogin);

        // Custom event for same-tab login/logout
        window.addEventListener("authChange", checkLogin);

        return () => {
            window.removeEventListener("storage", checkLogin);
            window.removeEventListener("authChange", checkLogin);
        };
    }, []);

    // Sale page requires login
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

    // Close mobile menu after navigation
    const handleNavClick = (e, path) => {
        if (path === "/sale") {
            handleSaleClick(e);
        } else {
            setMenuOpen(false);
        }
    };

    const navLinkClass = ({ isActive }) =>
        `relative py-2 text-[13px] font-medium transition-colors duration-200 lg:text-sm
        after:absolute after:-bottom-1 after:left-0 after:h-[2px]
        after:bg-[#F5D58A] after:transition-all after:duration-300
        after:ease-in-out after:content-['']
        ${
            isActive
                ? "text-[#F5D58A] after:w-full"
                : "text-white/90 after:w-0 hover:text-[#F5D58A] hover:after:w-full"
        }`;

    return (
        <header className="fixed z-50 w-full border-b border-white/[0.06] bg-gradient-to-r from-[#101114] via-[#22232b] to-[#15151a] text-white shadow-lg">
            <nav className="mx-auto flex min-h-[76px] max-w-[1600px] items-center justify-between px-5 sm:min-h-[88px] sm:px-8 lg:px-10">

                {/* Logo */}
                <Link
                    to="/"
                    onClick={() => setMenuOpen(false)}
                    className="flex shrink-0 items-center gap-2"
                    aria-label="BuyLand home"
                >
                    <HouseLogo />

                    <span className="font-serif text-[25px] font-bold tracking-tight text-[#F5D58A] sm:text-[29px]">
                        BuyLand
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-6 md:flex lg:gap-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            end={link.path === "/"}
                            onClick={(e) => handleNavClick(e, link.path)}
                            className={navLinkClass}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                {/* Desktop Authentication / Profile */}
                <div className="hidden items-center gap-3 sm:flex">
                    {isLoggedIn ? (
                        <Link
                            to="/profile"
                            className="flex items-center gap-2 rounded-full border border-[#F5D58A]/40 bg-[#202127] px-5 py-[10px] text-sm font-semibold text-[#F5D58A] transition duration-200 hover:bg-[#2b2c33]"
                        >
                            <ProfileIcon />
                            Profile
                        </Link>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="rounded-full border border-white/[0.04] bg-[#202127] px-6 py-[10px] text-sm font-semibold text-white shadow-inner transition duration-200 hover:border-[#F5D58A]/40 hover:text-[#F5D58A]"
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                className="rounded-full border border-[#FFE6A5] bg-gradient-to-b from-[#FFE5A0] to-[#EBC76D] px-6 py-[10px] text-sm font-bold text-[#30230C] shadow-[0_0_12px_rgba(245,213,138,0.12)] transition duration-200 hover:brightness-110"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg border border-white/10 bg-white/5 md:hidden"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                >
                    <span
                        className={`h-0.5 w-5 bg-[#F5D58A] transition-transform ${
                            menuOpen ? "translate-y-[7px] rotate-45" : ""
                        }`}
                    />
                    <span
                        className={`h-0.5 w-5 bg-[#F5D58A] transition-opacity ${
                            menuOpen ? "opacity-0" : ""
                        }`}
                    />
                    <span
                        className={`h-0.5 w-5 bg-[#F5D58A] transition-transform ${
                            menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                        }`}
                    />
                </button>
            </nav>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="absolute left-0 top-full w-full border-t border-white/10 bg-[#15161b] px-5 py-5 shadow-2xl md:hidden">
                    <div className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                end={link.path === "/"}
                                onClick={(e) => handleNavClick(e, link.path)}
                                className={navLinkClass}
                            >
                                {link.name}
                            </NavLink>
                        ))}

                        {/* Mobile Authentication / Profile */}
                        <div className="mt-3 flex gap-3 border-t border-white/10 pt-4">
                            {isLoggedIn ? (
                                <Link
                                    to="/profile"
                                    onClick={() => setMenuOpen(false)}
                                    className="flex w-full items-center justify-center gap-2 rounded-full border border-[#F5D58A]/40 bg-[#202127] py-3 text-sm font-semibold text-[#F5D58A]"
                                >
                                    <ProfileIcon />
                                    My Profile
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => setMenuOpen(false)}
                                        className="flex-1 rounded-full border border-white/10 bg-[#202127] py-3 text-center text-sm font-semibold text-white"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        to="/signup"
                                        onClick={() => setMenuOpen(false)}
                                        className="flex-1 rounded-full bg-gradient-to-b from-[#FFE5A0] to-[#EBC76D] py-3 text-center text-sm font-bold text-[#30230C]"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
