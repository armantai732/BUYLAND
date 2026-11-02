import React, { useState, useEffect } from "react";
import {
    Users,
    Search,
    Eye,
    Edit,
    ShieldCheck,
    UserCheck,
    Building,
    X,
    Phone,
    Mail,
    Calendar,
    Bell,
    ChevronDown,
    Plus,
    Trash2,
    CheckCircle2,
    Clock,
    XCircle,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { getAllUsersAPI, updateUserAPI } from "../../api/api";

export default function AdminUserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("All Roles");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [currentPage, setCurrentPage] = useState(1);



    // Modal States
    const [selectedUser, setSelectedUser] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({ role: "", status: "" });
    const [submitting, setSubmitting] = useState(false);

    // Fetch Users
    const fetchUsersList = async () => {
        try {
            setLoading(true);
            const data = await getAllUsersAPI();
            if (data.success) {
                setUsers(data.users || []);
            } else {
                setUsers([]);
            }
        } catch (error) {
            console.error("Fetch users error:", error);
            setUsers([]);
            alert(error.message || "Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsersList();
    }, []);


    // Filter Users
    const filteredUsers = users.filter((u) => {
        const name = u.name || "";
        const email = u.email || "";
        const phone = u.phone || "";
        const search = searchQuery.toLowerCase();

        const matchesSearch =
            name.toLowerCase().includes(search) ||
            email.toLowerCase().includes(search) ||
            phone.includes(search);

        const matchesRole =
            roleFilter === "All Roles" || (u.role || "").toLowerCase() === roleFilter.toLowerCase();

        const matchesStatus =
            statusFilter === "All Status" || (u.status || "Active").toLowerCase() === statusFilter.toLowerCase();

        return matchesSearch && matchesRole && matchesStatus;
    });

    const usersPerPage = 10;

    const totalUsers = filteredUsers.length;
    const totalPages = Math.ceil(totalUsers / usersPerPage);

    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = Math.min(startIndex + usersPerPage, totalUsers);

    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);


    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, roleFilter, statusFilter]);


    // Edit Role/Status Submit
    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            const data = await updateUserAPI(editingUser._id, {
                role: editForm.role,
                status: editForm.status,
            });

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === editingUser._id
                        ? { ...user, ...data.user }
                        : user
                )
            );

            setEditingUser(null);
            alert("User updated successfully!");
        } catch (error) {
            console.error("Update User Error:", error);
            alert(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    // Stats Calculations
    const totalUsersCount = users.length;

    const activeUsersCount = users.filter(
        (u) => (u.status || "Active").toLowerCase() === "active"
    ).length;

    const pendingCount = users.filter(
        (u) => (u.status || "").toLowerCase() === "pending"
    ).length;

    const blockedCount = users.filter(
        (u) => ["blocked", "suspended"].includes((u.status || "").toLowerCase())
    ).length;

    return (
        <div className="min-h-screen flex-1 bg-[#f8f9fa] p-4 sm:p-6 lg:p-8 text-gray-800 font-sans">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* HERO BANNER CARD */}
                <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100 p-6 sm:p-8">
                    <div className="relative z-10 max-w-lg">
                        <div className="flex items-center gap-3">
                            <span className="p-2.5 rounded-2xl bg-amber-50 text-amber-600 shadow-sm">
                                <Users className="h-7 w-7" />
                            </span>
                            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                                User Management
                            </h1>
                        </div>
                        <p className="mt-2 text-xs sm:text-sm text-gray-500 font-medium">
                            Manage all users, roles and account status
                        </p>
                    </div>

                    {/* Background Banner Image */}
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

                {/* 4 STATS CARDS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Total Users */}
                    <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-500">Total Users</p>
                            <h3 className="text-2xl font-extrabold text-gray-900 mt-1 font-serif">
                                {totalUsersCount.toLocaleString()}
                            </h3>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-amber-400 shadow-sm">
                            <Users className="h-6 w-6" />
                        </div>
                    </div>

                    {/* Active Users */}
                    <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-500">Active Users</p>
                            <h3 className="text-2xl font-extrabold text-gray-900 mt-1 font-serif">
                                {activeUsersCount.toLocaleString()}
                            </h3>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
                            <CheckCircle2 className="h-6 w-6" />
                        </div>
                    </div>

                    {/* Blocked Users */}
                    <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-500">Blocked Users</p>
                            <h3 className="text-2xl font-extrabold text-gray-900 mt-1 font-serif">
                                {blockedCount}
                            </h3>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-600 text-white shadow-sm">
                            <XCircle className="h-6 w-6" />
                        </div>
                    </div>
                </div>

                {/* FILTER & SEARCH BAR */}
                <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-3">
                    {/* Search Input */}
                    <div className="relative flex-1 min-w-[240px]">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email or phone..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-10 pr-4 text-xs sm:text-sm outline-none transition focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
                        />
                    </div>

                    {/* Filter Dropdowns & Add Button */}
                    <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2.5 text-xs font-medium text-gray-600 outline-none cursor-pointer"
                        >
                            <option>All Roles</option>
                            <option>User</option>
                            <option>Agent</option>
                            <option>Owner</option>
                            <option>Builder</option>
                            <option>Investor</option>
                            <option>Admin</option>
                        </select>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2.5 text-xs font-medium text-gray-600 outline-none cursor-pointer"
                        >
                            <option>All Status</option>
                            <option>Active</option>
                            <option>Suspended</option>
                        </select>
                    </div>
                </div>

                {/* USERS DATA TABLE */}
                <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/70 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                    <th className="py-3.5 px-4">User</th>
                                    <th className="py-3.5 px-4">Email</th>
                                    <th className="py-3.5 px-4">Phone</th>
                                    <th className="py-3.5 px-4">Role</th>
                                    <th className="py-3.5 px-4">Status</th>
                                    <th className="py-3.5 px-4">Joined On</th>
                                    <th className="py-3.5 px-4 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
                                {loading ? (
                                    <tr>
                                        <td colSpan="8" className="py-12 text-center text-gray-400 text-sm">
                                            Loading user data...
                                        </td>
                                    </tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="py-12 text-center text-gray-400 text-sm">
                                            No users found matching your criteria.
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedUsers.map((user) => {
                                        const initials = user.name ? user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "US";
                                        const status = user.status || "Active";
                                        const isActive = status === "Active";

                                        return (
                                            <tr key={user._id} className="transition hover:bg-gray-50/60">

                                                {/* User Info Column */}
                                                <td className="py-3.5 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-amber-400 font-bold text-xs shrink-0 shadow-sm uppercase">
                                                            {initials}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-serif text-xs font-bold text-gray-900">
                                                                {user.name}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Email Column */}
                                                <td className="py-3.5 px-4 text-gray-600">
                                                    {user.email}
                                                </td>

                                                {/* Phone Column */}
                                                <td className="py-3.5 px-4 text-gray-600 font-mono text-[11px]">
                                                    {user.phone || "N/A"}
                                                </td>

                                                {/* Role Column */}
                                                <td className="py-3.5 px-4">
                                                    <span className="inline-block rounded-xl bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700 capitalize">
                                                        {user.role || "User"}
                                                    </span>
                                                </td>

                                                {/* Status Column (with toggle pill) */}
                                                <td className="py-3.5 px-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`flex h-2 w-2 rounded-full ${isActive ? "bg-emerald-500" : "bg-rose-500"}`} />
                                                        <span className={`text-xs font-semibold ${isActive ? "text-emerald-700" : "text-rose-700"}`}>
                                                            {status}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Joined On Column */}
                                                <td className="py-3.5 px-4 text-gray-500 text-[11px]">
                                                    {user.joinedOn
                                                        ? new Date(user.joinedOn).toLocaleString("en-IN", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            hour12: true,
                                                        })
                                                        : "N/A"}
                                                </td>

                                                {/* Actions Column */}
                                                <td className="py-3.5 px-4 text-right">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <button
                                                            type="button"
                                                            onClick={() => setSelectedUser(user)}
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:bg-amber-50 hover:border-amber-300 hover:text-amber-600"
                                                            title="View Details"
                                                        >
                                                            <Eye className="h-3.5 w-3.5" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setEditingUser(user);
                                                                setEditForm({ role: user.role || "user", status: user.status || "Active" });
                                                            }}
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600"
                                                            title="Edit User"
                                                        >
                                                            <Edit className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* TABLE PAGINATION FOOTER */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 p-4 text-xs text-gray-500">

                        <p>
                            Showing{" "}
                            <span className="font-semibold text-gray-800">
                                {totalUsers === 0 ? 0 : startIndex + 1} to {endIndex}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-gray-800">
                                {totalUsers}
                            </span>{" "}
                            users
                        </p>

                        <div className="flex items-center gap-1.5">

                            {/* Previous Button */}
                            <button
                                type="button"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1 || totalPages === 0}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>

                            {/* Dynamic Page Numbers */}
                            {Array.from({ length: totalPages }, (_, index) => index + 1)
                                .filter((page) => (
                                    page === 1 ||
                                    page === totalPages ||
                                    Math.abs(page - currentPage) <= 1
                                ))
                                .map((page, index, pages) => (
                                    <React.Fragment key={page}>

                                        {index > 0 && pages[index - 1] !== page - 1 && (
                                            <span className="px-1 text-gray-400">...</span>
                                        )}

                                        <button
                                            type="button"
                                            onClick={() => setCurrentPage(page)}
                                            className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition ${currentPage === page
                                                ? "bg-amber-500 text-white shadow"
                                                : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                                                }`}
                                        >
                                            {page}
                                        </button>

                                    </React.Fragment>
                                ))}

                            {/* Next Button */}
                            <button
                                type="button"
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage >= totalPages || totalPages === 0}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>

                        </div>
                    </div>
                </div>

            </div>

            {/* ================= VIEW USER DETAILS MODAL ================= */}
            {selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-amber-100 font-sans text-gray-900">
                        <button
                            type="button"
                            onClick={() => setSelectedUser(null)}
                            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-red-100 hover:text-red-600"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        <div className="text-center pb-4 border-b border-gray-100">
                            <div className="mx-auto h-16 w-16 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-serif text-xl font-bold uppercase shadow-md mb-2">
                                {selectedUser.name ? selectedUser.name.slice(0, 2) : "US"}
                            </div>
                            <h3 className="font-serif text-lg font-bold text-gray-900">{selectedUser.name}</h3>
                            <span className="text-xs font-semibold text-gray-500">ID: #{selectedUser._id}</span>
                        </div>

                        <div className="mt-4 space-y-3 text-xs">
                            <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                                <Mail className="h-4 w-4 text-amber-500" />
                                <span>Email: <strong>{selectedUser.email}</strong></span>
                            </div>

                            <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                                <Phone className="h-4 w-4 text-amber-500" />
                                <span>Phone: <strong>{selectedUser.phone || "+91 98765 43210"}</strong></span>
                            </div>

                            <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                                <ShieldCheck className="h-4 w-4 text-amber-500" />
                                <span>Role: <strong className="uppercase">{selectedUser.role}</strong></span>
                            </div>

                            <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                                <Calendar className="h-4 w-4 text-amber-500" />
                                <span>Joined On: <strong>{selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : "N/A"}</strong></span>
                            </div>
                        </div>

                        <div className="mt-5 pt-3 border-t border-gray-100 text-right">
                            <button
                                type="button"
                                onClick={() => setSelectedUser(null)}
                                className="rounded-xl bg-gray-800 px-4 py-2 text-xs font-bold text-white shadow hover:bg-black transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ================= EDIT USER ROLE & STATUS MODAL ================= */}
            {editingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-amber-100 font-sans text-gray-900">
                        <button
                            type="button"
                            onClick={() => setEditingUser(null)}
                            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-red-100 hover:text-red-600"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        <div className="border-b border-gray-100 pb-3">
                            <h3 className="font-serif text-lg font-bold text-gray-900">Edit User Role & Status</h3>
                            <p className="text-xs text-gray-500 mt-0.5">{editingUser.name} ({editingUser.email})</p>
                        </div>

                        <form onSubmit={handleUpdateUser} className="mt-4 space-y-4 text-xs">
                            <div>
                                <label className="block font-semibold text-gray-700 mb-1">Select User Role</label>
                                <select
                                    value={editForm.role}
                                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-2.5 text-xs text-gray-800 outline-none focus:border-amber-400 focus:bg-white"
                                >
                                    <option value="user">User</option>
                                    <option value="owner">Owner</option>
                                    <option value="agent">Agent</option>
                                    <option value="builder">Builder</option>
                                    <option value="investor">Investor</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div>
                                <label className="block font-semibold text-gray-700 mb-1">Select Account Status</label>
                                <select
                                    value={editForm.status}
                                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-2.5 text-xs text-gray-800 outline-none focus:border-amber-400 focus:bg-white"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Blocked">Blocked</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>

                            <div className="pt-2 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingUser(null)}
                                    className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-white shadow transition hover:bg-amber-600"
                                >
                                    {submitting ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}