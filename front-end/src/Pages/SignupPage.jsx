import React, { useState } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data Submitted:", formData);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0d0f12] flex flex-col md:flex-row font-sans m-0 p-0">
      
      {/* ================= LEFT BANNER SECTION (Desktop Left / Mobile Header) ================= */}
      <div className="relative w-full md:w-5/12 lg:w-1/2 bg-[#090b0c] p-6 sm:p-8 lg:p-14 text-white flex flex-col justify-between overflow-hidden min-h-[220px] sm:min-h-[260px] md:h-full">
        
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop"
            alt="Scenic Golden Sunset Land"
            className="h-full w-full object-cover object-[65%_center] brightness-[0.55]"
          />
          {/* Dark Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/95 md:bg-gradient-to-r md:from-black/90 md:via-black/70 md:to-black/30" />
        </div>

        {/* Top Logo Bar */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#e5ba73] to-[#ffe59a] text-[#30230c] shadow-lg font-bold text-xl sm:text-2xl">
            🏠
          </div>
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Buy<span className="text-[#ffd77f]">Land</span>
          </span>
        </div>

        {/* Welcome Text */}
        <div className="relative z-10 my-auto py-2 md:py-0">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight">
            Join BuyLand
          </h1>
          <p className="mt-2 sm:mt-4 text-xs sm:text-base text-gray-200 font-light leading-relaxed max-w-sm">
            Start your journey to find the perfect land.
          </p>
        </div>

        {/* Footer info (Desktop) */}
        <div className="relative z-10 text-xs text-gray-400 font-medium hidden md:block">
          © {new Date().getFullYear()} BuyLand Inc. All rights reserved.
        </div>

        {/* Golden Curved Accent Line (Desktop Only) */}
        <div className="hidden md:block absolute -bottom-16 -left-16 w-56 h-56 border-t-2 border-[#ffd77f]/35 rounded-full pointer-events-none" />
      </div>

      {/* ================= RIGHT FORM SECTION (Desktop Right / Mobile Scrollable Form) ================= */}
      <div className="relative z-20 w-full md:w-7/12 lg:w-1/2 bg-white -mt-8 md:mt-0 rounded-t-3xl md:rounded-none px-6 py-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 flex flex-col justify-center text-gray-800 shadow-[0_-15px_30px_rgba(0,0,0,0.4)] md:shadow-none h-full overflow-y-auto">
        <div className="w-full max-w-md mx-auto my-auto">
          
          {/* Header */}
          <div className="text-center md:text-left">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Create Account
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              One account. Endless possibilities.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-5 sm:mt-6 space-y-3.5 sm:space-y-4">
            
            {/* Full Name Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-gray-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="Enter your name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/70 pl-11 pr-4 py-3 text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-[#d8b46a] focus:bg-white focus:ring-1 focus:ring-[#d8b46a]"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-gray-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/70 pl-11 pr-4 py-3 text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-[#d8b46a] focus:bg-white focus:ring-1 focus:ring-[#d8b46a]"
                />
              </div>
            </div>

            {/* Mobile Number Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Mobile Number
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-gray-400">
                  <Phone className="h-4 w-4" />
                </div>
                <input
                  type="tel"
                  name="mobile"
                  required
                  placeholder="Enter mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/70 pl-11 pr-4 py-3 text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-[#d8b46a] focus:bg-white focus:ring-1 focus:ring-[#d8b46a]"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Password
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-gray-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/70 pl-11 pr-11 py-3 text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-[#d8b46a] focus:bg-white focus:ring-1 focus:ring-[#d8b46a]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Register/Signup Button */}
            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-[#ffe59a] via-[#f4ca68] to-[#edbb4d] py-3.5 text-sm font-bold text-[#30230c] shadow-md transition-all hover:brightness-105 active:scale-[0.98]"
            >
              Register
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-4 sm:my-5 flex items-center justify-center">
            <div className="w-full border-t border-gray-200" />
            <span className="absolute bg-white px-3 text-xs text-gray-400 font-medium">
              or
            </span>
          </div>

          {/* Social Logins */}
          <div className="space-y-2.5 sm:space-y-3">
            {/* Google */}
            <button
              type="button"
              className="flex h-11 sm:h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-[0.99]"
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Facebook */}
            <button
              type="button"
              className="flex h-11 sm:h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-[0.99]"
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5 fill-[#1877F2]" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Continue with Facebook</span>
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-5 sm:mt-6 text-center text-xs sm:text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-bold text-gray-900 hover:text-[#b88c3a] transition-colors"
            >
              Login
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}