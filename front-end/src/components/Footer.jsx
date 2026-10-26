import React from "react";
import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { FaFacebookF, FaInstagram , FaYoutube , FaLinkedinIn  } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-[#090b0c] text-white font-sans border-t border-[#d8b46a]/20">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Column 1: Brand & Socials (Width: 2 cols on lg) */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-[#e5ba73] to-[#ffe59a] text-[#30230c] shadow-md font-bold text-2xl">
                  🏠
                </div>
                <span className="font-serif text-3xl font-bold tracking-tight text-white">
                  Buy<span className="text-[#ffd77f]">Land</span>
                </span>
              </div>

              {/* Tagline */}
              <p className="mt-4 text-sm text-gray-300 font-light tracking-wide">
                Invest Today. Grow Tomorrow.
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="mt-6 flex items-center gap-3">
              {[
                { Icon: FaFacebookF, href: "#" },
                { Icon: FaInstagram, href: "#" },
                { Icon: FaYoutube, href: "#" },
                { Icon: FaLinkedinIn, href: "#" },
              ].map(({ Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d8b46a]/30 bg-[#121519] text-[#ffd77f] transition-all hover:border-[#ffd77f] hover:bg-[#d8b46a]/20 hover:scale-105 shadow-sm"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white tracking-wide">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-gray-400 font-light">
              {["Home", "Properties", "About", "Services", "Contact"].map((item, idx) => (
                <li key={idx}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="transition-colors hover:text-[#ffd77f]"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white tracking-wide">
              Our Services
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-gray-400 font-light">
              {["Buy Land", "Sell Land", "Land Valuation", "Legal Support", "Investment Guide"].map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#services"
                    className="transition-colors hover:text-[#ffd77f]"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white tracking-wide">
              Contact Us
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-400 font-light">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#ffd77f]" />
                <span className="text-gray-300">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[#ffd77f]" />
                <span className="text-gray-300">info@buyland.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-[#ffd77f]" />
                <span className="text-gray-300">Ahmedabad, Gujarat</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Golden City Skyline Silhouette Graphic Divider */}
        <div className="my-10 w-full overflow-hidden opacity-70">
          <svg
            className="w-full h-16 sm:h-24 text-[#d8b46a]"
            viewBox="0 0 1200 120"
            fill="currentColor"
            preserveAspectRatio="none"
          >
            <path d="M0,120 L1200,120 L1200,115 L1185,115 L1185,85 L1180,85 L1180,70 L1175,70 L1175,115 L1150,115 L1150,45 L1145,45 L1145,35 L1140,35 L1140,45 L1135,45 L1135,115 L1110,115 L1110,90 L1105,90 L1105,115 L1070,115 L1070,55 L1065,55 L1065,40 L1060,40 L1060,55 L1055,55 L1055,115 L1020,115 L1020,65 L1015,65 L1015,115 L980,115 L980,50 L975,50 L975,35 L970,35 L970,50 L965,50 L965,115 L930,115 L930,80 L925,80 L925,115 L890,115 L890,25 L885,25 L885,15 L880,15 L880,25 L875,25 L875,115 L840,115 L840,60 L835,60 L835,115 L800,115 L800,75 L795,75 L795,115 L760,115 L760,40 L755,40 L755,25 L750,25 L750,40 L745,40 L745,115 L710,115 L710,85 L705,85 L705,115 L670,115 L670,50 L665,50 L665,35 L660,35 L660,50 L655,50 L655,115 L620,115 L620,70 L615,70 L615,115 L580,115 L580,30 L575,30 L575,20 L570,20 L570,30 L565,30 L565,115 L530,115 L530,60 L525,60 L525,115 L490,115 L490,45 L485,45 L485,30 L480,30 L480,45 L475,45 L475,115 L440,115 L440,75 L435,75 L435,115 L400,115 L400,35 L395,35 L395,20 L390,20 L390,35 L385,35 L385,115 L350,115 L350,80 L345,80 L345,115 L310,115 L310,55 L305,55 L305,40 L300,40 L300,55 L295,55 L295,115 L260,115 L260,65 L255,65 L255,115 L220,115 L220,20 L215,20 L215,10 L210,10 L210,20 L205,20 L205,115 L170,115 L170,50 L165,50 L165,115 L130,115 L130,70 L125,70 L125,115 L90,115 L90,85 L85,85 L85,115 L50,115 L50,60 L45,60 L45,115 L10,115 L10,90 L5,90 L5,115 L0,115 Z" />
          </svg>
        </div>

        {/* Bottom Copyright & Privacy Links Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-gray-400 font-light">
          <p>© {new Date().getFullYear()} BuyLand. All Rights Reserved.[cite: 9]</p>

          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-[#ffd77f] transition-colors">
              Privacy Policy[cite: 9]
            </a>
            <span className="text-gray-600">|</span>
            <a href="#terms" className="hover:text-[#ffd77f] transition-colors">
              Terms &amp; Conditions[cite: 9]
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}