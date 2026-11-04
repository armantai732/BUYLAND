
import React, { useEffect, useState } from "react";
import {
    User,
    Edit3,
    ShieldCheck,
    Phone,
    Mail,
    MapPin,
    Lock,
    ChevronRight,
    Eye,
    EyeOff,
    X,
    Loader2,
    CheckCircle,
} from "lucide-react";

import {
    changePasswordAPI,
    getMyProfile,
    getMyPropertyProfile,
    updateMyProfileAPI,
} from "../api/api";

export default function Profile() {

    const [profile, setProfile] = useState(null);
    const [propertyProfile, setPropertyProfile] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // EDIT PROFILE STATES
    const [showEditForm, setShowEditForm] = useState(false);

    const [editForm, setEditForm] = useState({
        name: "",
        mobileNumber: "",
        city: "",
        state: "",
    });

    const [editLoading, setEditLoading] = useState(false);
    const [editMessage, setEditMessage] = useState("");
    const [editError, setEditError] = useState("");

    // CHANGE PASSWORD STATES
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // FETCH PROFILE
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                setError("");

                const [profileResponse, propertyResponse] =
                    await Promise.all([
                        getMyProfile(),
                        getMyPropertyProfile(),
                    ]);

                const user =
                    profileResponse?.user ||
                    profileResponse?.data?.user ||
                    profileResponse?.data ||
                    profileResponse;

                setProfile(user);

                setEditForm({
                    name: user?.name || "",
                    mobileNumber: user?.mobileNumber || "",
                    city: user?.city || "",
                    state: user?.state || "",
                });

                setPropertyProfile(
                    propertyResponse?.data || propertyResponse || null
                );

            } catch (err) {
                setError(err.message || "Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // UPDATE PROFILE
    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        setEditMessage("");
        setEditError("");

        if (!editForm.name.trim()) {
            setEditError("Name is required.");
            return;
        }

        if (
            editForm.mobileNumber.trim() &&
            !/^(\+91)?[6-9]\d{9}$/.test(editForm.mobileNumber.trim())
        ) {
            setEditError("Please enter a valid 10-digit mobile number.");
            return;
        }

        try {
            setEditLoading(true);

            const result = await updateMyProfileAPI({
                name: editForm.name.trim(),
                mobileNumber: editForm.mobileNumber.trim(),
                city: editForm.city.trim(),
                state: editForm.state.trim(),
            });

            const updatedUser =
                result?.user ||
                result?.data?.user ||
                result?.data ||
                result;

            setProfile((prev) => ({
                ...prev,
                ...updatedUser,
            }));

            setEditForm({
                name: updatedUser.name || editForm.name,
                mobileNumber:
                    updatedUser.mobileNumber || editForm.mobileNumber,
                city: updatedUser.city || editForm.city,
                state: updatedUser.state || editForm.state,
            });

            setEditMessage(
                result.message || "Profile updated successfully!"
            );

            setShowEditForm(false);

        } catch (err) {
            setEditError(err.message || "Failed to update profile.");
        } finally {
            setEditLoading(false);
        }
    };

    // CHANGE PASSWORD
    const handleChangePassword = async (e) => {
        e.preventDefault();

        setPasswordMessage("");
        setPasswordError("");

        if (!oldPassword || !newPassword || !confirmPassword) {
            setPasswordError("Please fill all password fields.");
            return;
        }

        if (newPassword.length < 6) {
            setPasswordError("New password must be at least 6 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError(
                "New password and confirm password do not match."
            );
            return;
        }

        if (oldPassword === newPassword) {
            setPasswordError(
                "New password must be different from old password."
            );
            return;
        }

        try {
            setPasswordLoading(true);

            const result = await changePasswordAPI({
                oldPassword,
                newPassword,
                confirmPassword,
            });

            setPasswordMessage(
                result.message || "Password changed successfully!"
            );

            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (err) {
            setPasswordError(
                err.message || "Failed to change password."
            );
        } finally {
            setPasswordLoading(false);
        }
    };

    // LOADING
    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-[#f4f7fb]">
                <p className="text-gray-600 font-semibold animate-pulse">
                    Loading profile...
                </p>
            </div>
        );
    }

    // ERROR
    if (error) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center gap-3 bg-[#f4f7fb] p-6">
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

    const userInitial = profile.name
        ? profile.name.charAt(0).toUpperCase()
        : "U";

    return (
        <div className="min-h-[80%] bg-[#f4f7fb] font-sans text-gray-800 antialiased p-4 sm:p-6 lg:p-8">

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
                        onClick={() => {
                            if (showEditForm) {
                                setShowEditForm(false);
                                setEditError("");
                                setEditMessage("");
                            } else {
                                setEditForm({
                                    name: profile.name || "",
                                    mobileNumber: profile.mobileNumber || "",
                                    city: profile.city || "",
                                    state: profile.state || "",
                                });

                                setEditError("");
                                setEditMessage("");
                                setShowEditForm(true);
                            }
                        }}
                        className="self-start sm:self-auto flex items-center gap-1.5 rounded-xl bg-amber-100/70 px-4 py-2 text-xs font-bold text-amber-800 hover:bg-amber-200 transition shadow-sm"
                    >
                        {showEditForm ? (
                            <X className="h-4 w-4" />
                        ) : (
                            <Edit3 className="h-4 w-4" />
                        )}

                        {showEditForm ? "Close Edit" : "Edit Profile"}
                    </button>

                </div>

                {/* PROFILE CARD + ACCOUNT SETTINGS */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                    {/* PROFILE CARD */}
                    <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5">

                        <div className="relative shrink-0">
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#0c2225] text-white font-bold text-3xl shadow-md">
                                {userInitial}
                            </div>
                        </div>

                        <div className="flex-1 text-center sm:text-left space-y-1.5 w-full">

                            <div className="flex items-center justify-center sm:justify-start gap-1.5">

                                <h3 className="font-serif text-lg font-bold text-gray-900">
                                    {profile.name || "N/A"}
                                </h3>

                                <ShieldCheck className="h-4 w-4 text-blue-500 fill-blue-500 shrink-0" />

                            </div>

                            <span className="inline-block rounded-md bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 capitalize">
                                Property {profile.role || "Not Available"}
                            </span>

                            <div className="pt-2 space-y-1 text-xs text-gray-600 font-medium">

                                <div className="flex items-center justify-center sm:justify-start gap-2">
                                    <Phone className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                                    <span>
                                        {profile.mobileNumber || "Not Available"}
                                    </span>
                                </div>

                                <div className="flex items-center justify-center sm:justify-start gap-2">
                                    <Mail className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                                    <span className="break-all">
                                        {profile.email || "Not Available"}
                                    </span>
                                </div>

                                <div className="flex items-center justify-center sm:justify-start gap-2">
                                    <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                                    <span>
                                        {profile.city || "Not Available"},{" "}
                                        {profile.state || "Not Available"}
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* CHANGE PASSWORD */}
                    <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">

                        <h3 className="font-serif text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                            <Lock className="h-5 w-5 text-gray-700" />
                            Account Settings
                        </h3>

                        {!showPasswordForm ? (

                            <button
                                type="button"
                                onClick={() => {
                                    setShowPasswordForm(true);
                                    setPasswordMessage("");
                                    setPasswordError("");
                                }}
                                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100 text-xs sm:text-sm font-semibold text-gray-700"
                            >
                                <div className="flex items-center gap-2.5">
                                    <Lock className="h-4 w-4 text-amber-600" />
                                    <span>Change Password</span>
                                </div>

                                <ChevronRight className="h-4 w-4 text-gray-400" />
                            </button>

                        ) : (

                            <form
                                onSubmit={handleChangePassword}
                                className="space-y-4"
                            >

                                <div>
                                    <h4 className="text-lg font-bold text-gray-900">
                                        Change Your Password
                                    </h4>

                                    <p className="text-xs text-gray-500 mt-1">
                                        Enter your current password and choose a new password.
                                    </p>
                                </div>

                                {/* OLD PASSWORD */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-700">
                                        Old Password
                                    </label>

                                    <div className="relative">
                                        <input
                                            type={showOldPassword ? "text" : "password"}
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            placeholder="Enter old password"
                                            autoComplete="current-password"
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-12 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                                            required
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowOldPassword(!showOldPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        >
                                            {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {/* NEW PASSWORD */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-700">
                                        New Password
                                    </label>

                                    <div className="relative">
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Enter new password"
                                            autoComplete="new-password"
                                            minLength={6}
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-12 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                                            required
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        >
                                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>

                                    <p className="text-[10px] text-gray-400">
                                        Minimum 6 characters.
                                    </p>
                                </div>

                                {/* CONFIRM PASSWORD */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-700">
                                        Confirm New Password
                                    </label>

                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm new password"
                                            autoComplete="new-password"
                                            minLength={6}
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-12 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                                            required
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        >
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {/* SUCCESS */}
                                {passwordMessage && (
                                    <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-700">
                                        <CheckCircle size={18} />
                                        {passwordMessage}
                                    </div>
                                )}

                                {/* ERROR */}
                                {passwordError && (
                                    <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600">
                                        {passwordError}
                                    </div>
                                )}

                                {/* BUTTONS */}
                                <div className="flex flex-col sm:flex-row gap-3 pt-2">

                                    <button
                                        type="submit"
                                        disabled={passwordLoading}
                                        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#0c2225] px-5 py-3 text-sm font-bold text-white hover:bg-black transition disabled:opacity-60"
                                    >
                                        {passwordLoading ? (
                                            <>
                                                <Loader2 size={17} className="animate-spin" />
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <Lock size={16} />
                                                Update Password
                                            </>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        disabled={passwordLoading}
                                        onClick={() => {
                                            setShowPasswordForm(false);
                                            setOldPassword("");
                                            setNewPassword("");
                                            setConfirmPassword("");
                                            setPasswordError("");
                                            setPasswordMessage("");
                                        }}
                                        className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 transition"
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </form>

                        )}

                    </div>

                    {/* EDIT PROFILE FORM */}
                    {showEditForm && (

                        <div className="lg:col-span-12 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">

                            <div className="flex items-center gap-2 border-b border-gray-100 pb-4 mb-5">

                                <Edit3 className="h-5 w-5 text-amber-600" />

                                <div>
                                    <h3 className="font-serif text-lg font-bold text-gray-900">
                                        Edit Profile
                                    </h3>

                                    <p className="text-xs text-gray-500">
                                        Update your personal account details.
                                    </p>
                                </div>

                            </div>

                            <form
                                onSubmit={handleUpdateProfile}
                                className="space-y-5"
                            >

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                                    {/* EMAIL - READ ONLY */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-700">
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            value={profile.email || ""}
                                            disabled
                                            readOnly
                                            className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-500 cursor-not-allowed outline-none"
                                        />

                                        <p className="text-[10px] text-gray-400">
                                            Email address cannot be changed.
                                        </p>
                                    </div>

                                    {/* NAME */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-700">
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            value={editForm.name}
                                            onChange={(e) =>
                                                setEditForm({
                                                    ...editForm,
                                                    name: e.target.value,
                                                })
                                            }
                                            placeholder="Enter your name"
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                                            required
                                        />
                                    </div>

                                    {/* MOBILE */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-700">
                                            Mobile Number
                                        </label>

                                        <input
                                            type="tel"
                                            value={editForm.mobileNumber}
                                            onChange={(e) =>
                                                setEditForm({
                                                    ...editForm,
                                                    mobileNumber: e.target.value,
                                                })
                                            }
                                            placeholder="Enter mobile number"
                                            maxLength={10}
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                                        />
                                    </div>

                                    {/* CITY */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-700">
                                            City
                                        </label>

                                        <input
                                            type="text"
                                            value={editForm.city}
                                            onChange={(e) =>
                                                setEditForm({
                                                    ...editForm,
                                                    city: e.target.value,
                                                })
                                            }
                                            placeholder="Enter city"
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                                        />
                                    </div>

                                    {/* STATE */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-700">
                                            State
                                        </label>

                                        <input
                                            type="text"
                                            value={editForm.state}
                                            onChange={(e) =>
                                                setEditForm({
                                                    ...editForm,
                                                    state: e.target.value,
                                                })
                                            }
                                            placeholder="Enter state"
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                                        />
                                    </div>

                                </div>

                                {/* ERROR */}
                                {editError && (
                                    <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600">
                                        {editError}
                                    </div>
                                )}

                                {/* BUTTONS */}
                                <div className="flex flex-col sm:flex-row gap-3 pt-2">

                                    <button
                                        type="submit"
                                        disabled={editLoading}
                                        className="flex items-center justify-center gap-2 rounded-xl bg-[#0c2225] px-6 py-3 text-sm font-bold text-white hover:bg-black transition disabled:opacity-60"
                                    >
                                        {editLoading ? (
                                            <>
                                                <Loader2 size={17} className="animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle size={17} />
                                                Save Changes
                                            </>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        disabled={editLoading}
                                        onClick={() => {
                                            setShowEditForm(false);
                                            setEditError("");
                                            setEditMessage("");
                                        }}
                                        className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 transition"
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </form>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}
