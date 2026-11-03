
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
import AdminLayout from "./admin/AdminLayout";
import AdminOverview from "./admin/pages/AdminOverview";
import AdminPropertyListings from "./admin/pages/AdminPropertyListings";
import AdminUserManagement from "./admin/pages/AdminUserManagement";
import AdminSettings from "./admin/pages/AdminSettings";
import Profile from "./Pages/Profile";
import UserDashboard from "./Pages/UserDashboard";
import Dashboard from "./components/DashboardContent";
import MyProperties from "./Pages/MyProperties";
import Wishlist from "./Pages/Wishlist";

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
    location.pathname.startsWith("/admindashboard") ||
    location.pathname.startsWith("/dashboard")


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
          {/* USER DASHBOARD */}
          <Route path="/dashboard" element={<UserDashboard />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="my-properties" element={<MyProperties />} />
            <Route path="wishlist" element={<Wishlist />} />
          </Route>

          <Route path="/admindashboard" element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="properties" element={<AdminPropertyListings />} />
            <Route path="users" element={<AdminUserManagement />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </main>

      {!hide && <Footer />}
    </div>
  );
}
