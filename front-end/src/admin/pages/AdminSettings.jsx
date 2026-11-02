import React, { useState } from "react";
import {
    Settings as SettingsIcon,
    Globe,
    Mail,
    CreditCard,
    Shield,
    Bell,
    TrendingUp,
    Database,
    Search,
    ChevronDown,
    Upload,
    Lock,
    Key,
    Smartphone,
    History,
    Check,
    Save,
    Server,
    RefreshCw,
    Send,
    Sparkles,
} from "lucide-react";

export default function AdminSettings() {
    const [activeTab, setActiveTab] = useState("General Settings");

    // State Management for Forms
    const [generalForm, setGeneralForm] = useState({
        websiteName: "BuyLand",
        tagline: "Find Your Dream Property",
        contactEmail: "info@buyland.com",
        contactPhone: "+91 98765 43210",
        address: "Ahmedabad, Gujarat, India",
        timezone: "Asia/Kolkata",
    });

    const [brandingForm, setBrandingForm] = useState({
        primaryColor: "#D4AF37",
        secondaryColor: "#090B0C",
        fontFamily: "Playfair Display & Inter",
        faviconUrl: "/favicon.ico",
    });

    const [emailForm, setEmailForm] = useState({
        smtpHost: "smtp.gmail.com",
        smtpPort: "587",
        smtpUser: "no-reply@buyland.com",
        smtpPass: "••••••••••••",
        senderName: "BuyLand Real Estate",
    });

    const [paymentForm, setPaymentForm] = useState({
        currency: "INR (₹)",
        razorpayKey: "rzp_live_xxxxxxxxxxxx",
        razorpaySecret: "••••••••••••••••",
        enableRazorpay: true,
        enableStripe: false,
    });

    const [securityForm, setSecurityForm] = useState({
        enable2FA: false,
        sessionTimeout: "30 mins",
        maxLoginAttempts: "5",
    });

    const [notificationForm, setNotificationForm] = useState({
        emailAlerts: true,
        smsAlerts: false,
        propertyApprovalNotify: true,
        userRegistrationNotify: true,
    });

    const [seoForm, setSeoForm] = useState({
        metaTitle: "BuyLand - Premium Real Estate & Property Marketplace",
        metaKeywords: "property in ahmedabad, land for sale, commercial plot, luxury villa",
        metaDescription: "Find and buy the best commercial, residential, and agricultural land with verified titles.",
        googleAnalyticsId: "G-XXXXXXXXXX",
    });

    const [appearanceForm, setAppearanceForm] = useState({
        themeMode: "Light Mode",
        enableDarkMode: true,
    });

    const settingsTabs = [
        { name: "General Settings", icon: Globe },
        { name: "Security Settings", icon: Shield },
        { name: "Notification Settings", icon: Bell },
    ];

    const handleSave = (tabName) => {
        alert(`${tabName} updated and saved successfully!`);
    };

    return (
        <div className="min-h-screen flex-1 bg-[#f8f9fa] p-4 sm:p-6 lg:p-8 text-gray-800 font-sans">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* HERO BANNER CARD */}
                <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100 p-6 sm:p-8">
                    <div className="relative z-10 max-w-lg">
                        <div className="flex items-center gap-3">
                            <span className="p-2.5 rounded-2xl bg-amber-50 text-amber-600 shadow-sm">
                                <SettingsIcon className="h-7 w-7" />
                            </span>
                            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                                Settings
                            </h1>
                        </div>
                        <p className="mt-2 text-xs sm:text-sm text-gray-500 font-medium">
                            Manage your website settings and preferences
                        </p>
                    </div>

                    <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block opacity-30">
                        <img
                            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop"
                            alt="City skyline"
                            className="h-full w-full object-cover"
                            style={{
                                maskImage: "linear-gradient(to right, transparent, black 50%)",
                                WebkitMaskImage: "linear-gradient(to right, transparent, black 50%)",
                            }}
                        />
                    </div>
                </div>

                {/* MAIN SETTINGS LAYOUT (SIDEBAR + DYNAMIC CONTENT) */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* LEFT VERTICAL TAB NAVIGATION */}
                    <div className="lg:col-span-1 rounded-2xl bg-white p-4 shadow-sm border border-gray-100 space-y-1.5 h-fit">
                        {settingsTabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.name;
                            return (
                                <button
                                    key={tab.name}
                                    type="button"
                                    onClick={() => setActiveTab(tab.name)}
                                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-xs sm:text-sm font-semibold transition ${isActive
                                        ? "bg-gradient-to-r from-amber-500 to-amber-400 text-white shadow-md"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-amber-500"}`} />
                                    <span>{tab.name}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* RIGHT DYNAMIC TAB CONTENT AREA */}
                    <div className="lg:col-span-3 space-y-6">

                        {/* TAB 1: GENERAL SETTINGS */}
                        {activeTab === "General Settings" && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                                    {/* General Settings Form */}
                                    <div className="xl:col-span-2 rounded-2xl bg-white p-6 shadow-sm border border-gray-100 space-y-4">
                                        <div className="border-b border-gray-100 pb-3">
                                            <h3 className="font-serif text-base font-bold text-gray-900 flex items-center gap-2">
                                                <Globe className="h-4 w-4 text-amber-500" /> General Settings
                                            </h3>
                                            <p className="text-[11px] text-gray-400">Basic information about your website</p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                                            <div>
                                                <label className="block font-semibold text-gray-700 mb-1">Website Name *</label>
                                                <input
                                                    type="text"
                                                    value={generalForm.websiteName}
                                                    onChange={(e) => setGeneralForm({ ...generalForm, websiteName: e.target.value })}
                                                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 outline-none focus:border-amber-400 focus:bg-white"
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-semibold text-gray-700 mb-1">Tagline *</label>
                                                <input
                                                    type="text"
                                                    value={generalForm.tagline}
                                                    onChange={(e) => setGeneralForm({ ...generalForm, tagline: e.target.value })}
                                                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 outline-none focus:border-amber-400 focus:bg-white"
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-semibold text-gray-700 mb-1">Contact Email *</label>
                                                <input
                                                    type="email"
                                                    value={generalForm.contactEmail}
                                                    onChange={(e) => setGeneralForm({ ...generalForm, contactEmail: e.target.value })}
                                                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 outline-none focus:border-amber-400 focus:bg-white"
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-semibold text-gray-700 mb-1">Contact Phone *</label>
                                                <input
                                                    type="text"
                                                    value={generalForm.contactPhone}
                                                    onChange={(e) => setGeneralForm({ ...generalForm, contactPhone: e.target.value })}
                                                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 outline-none focus:border-amber-400 focus:bg-white"
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-semibold text-gray-700 mb-1">Address</label>
                                                <input
                                                    type="text"
                                                    value={generalForm.address}
                                                    onChange={(e) => setGeneralForm({ ...generalForm, address: e.target.value })}
                                                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 outline-none focus:border-amber-400 focus:bg-white"
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-semibold text-gray-700 mb-1">Timezone</label>
                                                <select
                                                    value={generalForm.timezone}
                                                    onChange={(e) => setGeneralForm({ ...generalForm, timezone: e.target.value })}
                                                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 outline-none focus:border-amber-400 focus:bg-white cursor-pointer"
                                                >
                                                    <option>Asia/Kolkata</option>
                                                    <option>UTC</option>
                                                    <option>America/New_York</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <label className="block text-xs font-semibold text-gray-700 mb-2">Website Logo</label>
                                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-dashed border-gray-300 p-4 bg-gray-50/50">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-12 w-24 items-center justify-center rounded-lg bg-white border border-gray-200 shadow-sm p-1">
                                                        <span className="font-serif text-sm font-extrabold text-gray-900">Buy<span className="text-amber-600">Land</span></span>
                                                    </div>
                                                    <span className="text-[11px] text-gray-400">Recommended size: 200x60px</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-bold text-gray-700 shadow-sm hover:bg-amber-50 hover:border-amber-300 hover:text-amber-600 transition"
                                                >
                                                    <Upload className="h-3.5 w-3.5" />
                                                    <span>Change Logo</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="pt-3 flex justify-end">
                                            <button
                                                type="button"
                                                onClick={() => handleSave("General Settings")}
                                                className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 px-5 py-2.5 text-xs font-bold text-white shadow transition hover:scale-105 active:scale-95"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>

                                    {/* Admin Profile Sidebar Box */}
                                    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 space-y-4 flex flex-col justify-between">
                                        <div>
                                            <div className="border-b border-gray-100 pb-3">
                                                <h3 className="font-serif text-base font-bold text-gray-900">Admin Profile</h3>
                                                <p className="text-[11px] text-gray-400">Your account information</p>
                                            </div>

                                            <div className="flex flex-col items-center mt-6">
                                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 text-amber-400 font-serif text-2xl font-bold shadow-md">
                                                    A
                                                </div>
                                            </div>

                                            <div className="mt-6 space-y-3 text-xs">
                                                <div>
                                                    <span className="block text-gray-400 text-[10px] font-semibold uppercase">Name</span>
                                                    <input
                                                        type="text"
                                                        defaultValue="Admin"
                                                        className="w-full mt-1 rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 outline-none font-semibold text-gray-800"
                                                    />
                                                </div>

                                                <div>
                                                    <span className="block text-gray-400 text-[10px] font-semibold uppercase">Email</span>
                                                    <input
                                                        type="email"
                                                        defaultValue="admin@buyland.com"
                                                        className="w-full mt-1 rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 outline-none font-semibold text-gray-800"
                                                    />
                                                </div>

                                                <div>
                                                    <span className="block text-gray-400 text-[10px] font-semibold uppercase">Role</span>
                                                    <div className="mt-1">
                                                        <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold text-amber-700">
                                                            Super Admin
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-gray-100">
                                            <button
                                                type="button"
                                                onClick={() => handleSave("Admin Profile")}
                                                className="w-full rounded-xl border border-amber-300 bg-amber-50/50 py-2.5 text-xs font-bold text-amber-700 shadow-sm hover:bg-amber-100 transition"
                                            >
                                                Update Profile
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Row: Appearance & Security Preview */}
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                    {/* Appearance Box */}
                                    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 space-y-4">
                                        <div className="border-b border-gray-100 pb-3">
                                            <h3 className="font-serif text-base font-bold text-gray-900">Website Appearance</h3>
                                            <p className="text-[11px] text-gray-400">Customize the look and feel</p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                                            <div>
                                                <label className="block font-semibold text-gray-700 mb-2">Theme Mode *</label>
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input type="radio" name="theme" defaultChecked className="text-amber-600 focus:ring-amber-400" />
                                                        <span className="font-medium text-gray-700">Light Mode</span>
                                                    </label>
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input type="radio" name="theme" className="text-amber-600 focus:ring-amber-400" />
                                                        <span className="font-medium text-gray-700">Dark Mode</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Security Box */}
                                    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 space-y-4">
                                        <div className="border-b border-gray-100 pb-3">
                                            <h3 className="font-serif text-base font-bold text-gray-900">Security Settings</h3>
                                            <p className="text-[11px] text-gray-400">Keep your account and website secure</p>
                                        </div>

                                        <div className="space-y-3 text-xs">
                                            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50/60 border border-gray-100">
                                                <div>
                                                    <h4 className="font-bold text-gray-900">Change Password</h4>
                                                    <p className="text-[11px] text-gray-400">Update your account password</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setActiveTab("Security Settings")}
                                                    className="rounded-xl border border-gray-300 bg-white px-3.5 py-1.5 text-xs font-bold text-gray-700 shadow-sm hover:bg-amber-50 hover:text-amber-600"
                                                >
                                                    Change
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}


                        {/* TAB 2: SECURITY SETTINGS */}
                        {activeTab === "Security Settings" && (
                            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 space-y-5">
                                <div className="border-b border-gray-100 pb-3">
                                    <h3 className="font-serif text-base font-bold text-gray-900 flex items-center gap-2">
                                        <Shield className="h-4 w-4 text-amber-500" /> Security & Account Protection
                                    </h3>
                                    <p className="text-[11px] text-gray-400">Keep your account and website secure with strict authentication rules</p>
                                </div>

                                <div className="space-y-4 text-xs">
                                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50/60 border border-gray-100">
                                        <div>
                                            <h4 className="font-bold text-gray-900">Change Admin Password</h4>
                                            <p className="text-[11px] text-gray-400">Update your current account password</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => alert("Password update popup modal triggered")}
                                            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-bold text-gray-700 shadow-sm hover:bg-amber-50 hover:border-amber-300 hover:text-amber-600 transition"
                                        >
                                            Change Password
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-3 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => handleSave("Security Settings")}
                                        className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 px-5 py-2.5 text-xs font-bold text-white shadow hover:scale-105 transition"
                                    >
                                        Save Security Rules
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* TAB 3: NOTIFICATION SETTINGS */}
                        {activeTab === "Notification Settings" && (
                            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 space-y-5">
                                <div className="border-b border-gray-100 pb-3">
                                    <h3 className="font-serif text-base font-bold text-gray-900 flex items-center gap-2">
                                        <Bell className="h-4 w-4 text-amber-500" /> Admin Notification Triggers
                                    </h3>
                                    <p className="text-[11px] text-gray-400">Select when system alerts and email updates should be sent</p>
                                </div>

                                <div className="space-y-3 text-xs">
                                    <label className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50/60 border border-gray-100 cursor-pointer">
                                        <div>
                                            <h4 className="font-bold text-gray-900">New User Registration Alerts</h4>
                                            <p className="text-[11px] text-gray-400">Receive email notification on new buyer/seller signup</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={notificationForm.userRegistrationNotify}
                                            onChange={(e) => setNotificationForm({ ...notificationForm, userRegistrationNotify: e.target.checked })}
                                            className="h-5 w-5 rounded border-gray-300 text-amber-600 focus:ring-amber-400 cursor-pointer"
                                        />
                                    </label>

                                    <label className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50/60 border border-gray-100 cursor-pointer">
                                        <div>
                                            <h4 className="font-bold text-gray-900">Pending Property Approval Alerts</h4>
                                            <p className="text-[11px] text-gray-400">Notify admin when new listing is submitted for verification</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={notificationForm.propertyApprovalNotify}
                                            onChange={(e) => setNotificationForm({ ...notificationForm, propertyApprovalNotify: e.target.checked })}
                                            className="h-5 w-5 rounded border-gray-300 text-amber-600 focus:ring-amber-400 cursor-pointer"
                                        />
                                    </label>
                                </div>

                                <div className="pt-3 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => handleSave("Notification Settings")}
                                        className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 px-5 py-2.5 text-xs font-bold text-white shadow hover:scale-105 transition"
                                    >
                                        Save Notifications
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>

                </div>

            </div>
        </div>
    );
}