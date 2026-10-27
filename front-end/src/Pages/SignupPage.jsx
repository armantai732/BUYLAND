import React, { useState } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { registerData } from "../api/api";
import { signInWithPopup } from "firebase/auth";
import { firebaseAuth, googleProvider } from "../firebase";
import { loginWithGoogleToken } from "../api/googleAuth";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    secretKey: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        role: formData.role || "user",
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        mobileNumber: formData.mobileNumber.trim(),
        password: formData.password,
        ...(formData.role === "admin" && {
          secretKey: formData.secretKey,
        }),
      };

      const response = await registerData(payload);

      // Supports both Axios response and direct API data
      const data = response?.data ?? response;

      if (data?.success) {
        alert(data.message || "Registration successful!");

        setFormData({
          role: "",
          fullName: "",
          email: "",
          mobileNumber: "",
          password: "",
          secretKey: "",
        });

        setShowPassword(false);
        navigate("/login");
      } else {
        alert(data?.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration Error:", error);

      alert(
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed. Please try again."
      );
    }
  };


  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(
        firebaseAuth,
        googleProvider
      );

      const idToken = await result.user.getIdToken();

      // Send Firebase token to backend
      const data = await loginWithGoogleToken(idToken);

      // Save your backend JWT and MongoDB user profile
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.user.role);

      alert(data.message);

      navigate("/");
    } catch (error) {
      console.error("Google Login Error:", error);
      alert(error.message || "Google login failed");
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0d0f12] flex flex-col md:flex-row font-sans m-0 p-0">

      {/* ================= LEFT BANNER SECTION ================= */}
      <div className="relative w-full md:w-5/12 lg:w-5/12 bg-[#090b0c] p-6 sm:p-8 lg:p-10 text-white flex flex-col justify-between overflow-hidden min-h-[160px] md:h-full shrink-0">

        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop"
            alt="Scenic Golden Sunset Land"
            className="h-full w-full object-cover object-[65%_center] brightness-[0.55]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/95 md:bg-gradient-to-r md:from-black/90 md:via-black/70 md:to-black/30" />
        </div>

        {/* Top Logo Bar */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#e5ba73] to-[#ffe59a] text-[#30230c] shadow-md font-bold text-lg">
            🏠
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-white">
            Buy<span className="text-[#ffd77f]">Land</span>
          </span>
        </div>

        {/* Welcome Text */}
        <div className="relative z-10 my-auto py-2 md:py-0">
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight">
            Join BuyLand
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-200 font-light leading-relaxed max-w-xs">
            Start your journey to find the perfect land.
          </p>
        </div>

        {/* Footer info (Desktop) */}
        <div className="relative z-10 text-[11px] text-gray-400 font-medium hidden md:block">
          © {new Date().getFullYear()} BuyLand Inc. All rights reserved.
        </div>

        <div className="hidden md:block absolute -bottom-16 -left-16 w-48 h-48 border-t-2 border-[#ffd77f]/35 rounded-full pointer-events-none" />
      </div>

      {/* ================= RIGHT FORM SECTION (Vertical Stack) ================= */}
      <div className="relative z-20 w-full md:w-7/12 lg:w-7/12 bg-white -mt-6 md:mt-0 rounded-t-3xl md:rounded-none px-6 py-5 sm:px-12 md:px-16 lg:px-24 flex flex-col justify-center text-gray-800 shadow-[0_-15px_30px_rgba(0,0,0,0.4)] md:shadow-none h-full overflow-y-auto">
        <div className="w-full max-w-sm mx-auto my-auto">

          {/* Header */}
          <div className="text-center md:text-left mb-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Create Account
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-500">
              One account. Endless possibilities.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2.5">

            {/* Account Type Field */}
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-700 mb-0.5">
                Account Type
              </label>
              <select
                name="role"
                value={formData.role ?? ""}
                onChange={(e) => {
                  const selectedRole = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    role: selectedRole,
                    secretKey: selectedRole === "admin" ? prev.secretKey : "",
                  }));
                }}
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50/70 px-3.5 py-2 text-xs sm:text-sm text-gray-800 outline-none transition focus:border-[#d8b46a] focus:bg-white focus:ring-1 focus:ring-[#d8b46a]"
              >
                <option value="">--- Select Option ---</option>
                <option value="owner">Owner</option>
                <option value="agent">Agent</option>
                <option value="builder">Builder</option>
                <option value="investor">Investor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Admin Secret Key Field (Appears below when Admin is selected) */}
            {formData.role === "admin" && (
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-red-600 mb-0.5">
                  Admin Secret Key
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-gray-400">
                    <ShieldCheck className="h-4 w-4 text-red-500" />
                  </div>
                  <input
                    type="password"
                    name="secretKey"
                    required
                    autoComplete="new-password"
                    placeholder="Enter admin secret key"
                    value={formData.secretKey ?? ""}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-red-200 bg-red-50/30 pl-10 pr-3.5 py-2 text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-red-400 focus:bg-white"
                  />
                </div>
              </div>
            )}

            {/* Full Name Field */}
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-700 mb-0.5">
                Full Name
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-gray-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your name"
                  value={formData.name ?? ""}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/70 pl-10 pr-3.5 py-2 text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-[#d8b46a] focus:bg-white focus:ring-1 focus:ring-[#d8b46a]"
                />
              </div>
            </div>

            {/* mobileNumber Number Field */}
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-700 mb-0.5">
                mobileNumber Number
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-gray-400">
                  <Phone className="h-4 w-4" />
                </div>
                <input
                  type="tel"
                  name="mobileNumber"
                  required
                  placeholder="Enter mobileNumber number"
                  value={formData.mobileNumber ?? ""}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/70 pl-10 pr-3.5 py-2 text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-[#d8b46a] focus:bg-white focus:ring-1 focus:ring-[#d8b46a]"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-700 mb-0.5">
                Email Address
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-gray-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  value={formData.email ?? ""}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/70 pl-10 pr-3.5 py-2 text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-[#d8b46a] focus:bg-white focus:ring-1 focus:ring-[#d8b46a]"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-700 mb-0.5">
                Password
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-gray-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Create a password"
                  value={formData.password ?? ""}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/70 pl-10 pr-10 py-2 text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-[#d8b46a] focus:bg-white focus:ring-1 focus:ring-[#d8b46a]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-3 w-full rounded-xl bg-gradient-to-r from-[#ffe59a] via-[#f4ca68] to-[#edbb4d] py-2.5 text-xs sm:text-sm font-bold text-[#30230c] shadow-sm transition-all hover:brightness-105 active:scale-[0.98]"
            >
              Register
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-3 flex items-center justify-center">
            <div className="w-full border-t border-gray-200" />
            <span className="absolute bg-white px-3 text-[11px] text-gray-400 font-medium">
              or
            </span>
          </div>

          {/* Social Logins */}
          <div className="space-y-2">
            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-[0.99]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Facebook */}
            <button
              type="button"
              className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-[0.99]"
            >
              <svg className="h-4 w-4 fill-[#1877F2]" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Continue with Facebook</span>
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-4 text-center text-xs text-gray-600">
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