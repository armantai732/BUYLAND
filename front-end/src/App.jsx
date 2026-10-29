
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";

import Home from "./Pages/Home";
import LandListingPage from "./Pages/LandListingPage";
import AboutBuyLand from "./Pages/AboutBuyLand";
import ContactSection from "./Pages/ContactSection";
import ServicesSection from "./Pages/ServicesSection";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import Footer from "./components/Footer";
import PropertyDetail from "./Pages/PropertyDetail";
import { useEffect } from "react";
import SellProperty from "./Pages/SellProperty";
import UserDashboard from "./Pages/UserDashboard";
import AdminLayout from "./admin/AdminLayout";
import AdminApprovalsKYC from "./admin/pages/AdminApprovalsKYC";
import AdminOverview from "./admin/pages/AdminOverview";
import AdminPropertyListings from "./admin/pages/AdminPropertyListings";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [location.pathname]);

  const hide =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname.startsWith("/admindashboard")


  return (
    <div className="min-h-screen overflow-x-hidden bg-[#101112]">
      {!hide && <Navbar />}

      <main className={!hide ? "pt-20" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<LandListingPage />} />
          <Route path="/propertiesDetails" element={<PropertyDetail />} />
          <Route path="/about" element={<AboutBuyLand />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route path="/services" element={<ServicesSection />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/sale" element={<SellProperty />} />
          <Route path="/profile" element={<UserDashboard />}></Route>

          <Route path="/admindashboard" element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="kyc" element={<AdminApprovalsKYC />} />
            <Route path="properties" element={<AdminPropertyListings />} />
            <Route path="users" element={<div className="p-8 font-serif text-xl">User Management Page</div>} />
            <Route path="revenue" element={<div className="p-8 font-serif text-xl">Revenue Page</div>} />
            <Route path="settings" element={<div className="p-8 font-serif text-xl">Settings Page</div>} />
          </Route>
        </Routes>
      </main>

      {!hide && <Footer />}
    </div>
  );
}
