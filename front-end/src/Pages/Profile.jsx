import React, { useEffect, useState } from "react";
import {
    User,
    Edit3,
    Home,
    Heart,
    MessageSquare,
    ShieldCheck,
    Phone,
    Mail,
    MapPin,
    Lock,
    Trash2,
    ChevronRight,
    FileCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getMyProfile, getMyPropertyProfile } from "../api/api";

export default function Profile() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [propertyProfile, setPropertyProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                setError("");

                const [profileResponse, propertyResponse] = await Promise.all([
                    getMyProfile(),
                    getMyPropertyProfile()
                ]);

                const user =
                    profileResponse?.user ||
                    profileResponse?.data?.user ||
                    profileResponse?.data ||
                    profileResponse;

                setProfile(user);

                setPropertyProfile(propertyResponse?.data || null);

            } catch (err) {
                setError(err.message || "Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f4f7fb]">
                <p className="text-gray-600 font-semibold animate-pulse">
                    Loading profile...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-[#f4f7fb] p-6">
                <p className="text-red-600 font-semibold">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="rounded-xl bg-[#0c2225] px-5 py-2 text-white text-sm"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (!profile) return null;

    return (
        <div className="min-h-screen bg-[#f4f7fb] font-sans text-gray-800 antialiased p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* TOP HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div>
                        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                            My Profile
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                            Manage your account details and preferences
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/edit-profile")}
                        className="self-start sm:self-auto flex items-center gap-1.5 rounded-xl bg-amber-100/70 px-4 py-2 text-xs font-bold text-amber-800 hover:bg-amber-200 transition shadow-sm"
                    >
                        <Edit3 className="h-4 w-4" /> Edit Profile
                    </button>
                </div>

                {/* TOP PROFILE BANNER & ACCOUNT OVERVIEW */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

                    {/* Left Profile Info Card (Col 6) */}
                    <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5">
                        <div className="relative shrink-0">
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#0c2225] text-white font-bold text-3xl shadow-md">
                                A
                            </div>
                            <div className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-700 shadow border border-gray-200 cursor-pointer hover:bg-gray-50">
                                📷
                            </div>
                        </div>

                        <div className="flex-1 text-center sm:text-left space-y-1.5 w-full">
                            <div className="flex items-center justify-center sm:justify-start gap-1.5">
                                <h3 className="font-serif text-lg font-bold text-gray-900">{profile.name}</h3>
                                <ShieldCheck className="h-4 w-4 text-blue-500 fill-blue-500 shrink-0" />
                            </div>
                            <span className="inline-block rounded-md bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
                                Property   {profile.role || "Not Available"}
                            </span>

                            <div className="pt-2 space-y-1 text-xs text-gray-600 font-medium">
                                <div className="flex items-center justify-center sm:justify-start gap-2">
                                    <Phone className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                                    <span>{profile.mobileNumber}</span>
                                </div>
                                <div className="flex items-center justify-center sm:justify-start gap-2">
                                    <Mail className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                                    <span>{profile.email}</span>
                                </div>
                                <div className="flex items-center justify-center sm:justify-start gap-2">
                                    <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                                    <span>{propertyProfile.city}, {propertyProfile.state} </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Left: Personal Information (Col 6) */}
                    <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                        <h3 className="font-serif text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                            <User className="h-5 w-5 text-amber-600" /> Personal Information
                        </h3>

                        <div className="space-y-3 text-xs sm:text-sm">
                            <div className="flex justify-between py-2 border-b border-gray-50">
                                <span className="text-gray-500 font-medium">Full Name</span>
                                <span className="font-bold text-gray-900">{profile.name}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-50">
                                <span className="text-gray-500 font-medium">Email Address</span>
                                <span className="font-bold text-gray-900">{profile.email}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-50">
                                <span className="text-gray-500 font-medium">Mobile Number</span>
                                <span className="font-bold text-gray-900">{profile.mobileNumber}</span>
                            </div>
                        </div>
                    </div>

                </div>



                {/* PREFERENCES & ACCOUNT SETTINGS SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">


                    {/* Right: Account Settings (Col 6) */}
                    <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                        <h3 className="font-serif text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                            <Lock className="h-5 w-5 text-gray-700" /> Account Settings
                        </h3>

                        <div className="space-y-2 text-xs sm:text-sm font-semibold text-gray-700">
                            <div
                                onClick={() => navigate("/change-password")}
                                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition border border-transparent hover:border-gray-100"
                            >
                                <div className="flex items-center gap-2.5">
                                    <Lock className="h-4 w-4 text-amber-600" />
                                    <span>Change Password[cite: 11]</span>
                                </div>
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}