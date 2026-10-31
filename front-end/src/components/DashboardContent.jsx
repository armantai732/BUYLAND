import React, { useEffect, useState } from "react";
import {
  Building2,
  Heart,
  MessageSquare,
  Eye,
  Activity,
  User,
  Settings,
  ShieldCheck,
} from "lucide-react";
import {
  getDashboardStats,
  getRecentActivities,
} from "../api/api.js";

export default function DashboardContent({
  activeTab = "Dashboard",
}) {
  const [stats, setStats] = useState({
    totalProperties: 0,
    savedProperties: 0,
    messages: 0,
    profileViews: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [statsRes, activitiesRes] = await Promise.all([
          getDashboardStats(),
          getRecentActivities(),
        ]);

        if (cancelled) return;

        const statsData =
          statsRes?.stats ??
          statsRes?.data?.stats ??
          statsRes?.data ??
          statsRes ??
          {};

        const activitiesData =
          activitiesRes?.activities ??
          activitiesRes?.data?.activities ??
          activitiesRes?.data ??
          [];

        setStats({
          totalProperties: statsData.totalProperties ?? 0,
          savedProperties: statsData.savedProperties ?? 0,
          messages: statsData.messages ?? 0,
          profileViews: statsData.profileViews ?? 0,
        });

        setRecentActivities(
          Array.isArray(activitiesData)
            ? activitiesData
            : []
        );
      } catch (err) {
        if (!cancelled) {
          console.error("Dashboard fetch error:", err);
          setError(
            err.message ||
            "Dashboard data load nahi hua."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  const statCards = [
    {
      label: "Total Properties",
      value: stats.totalProperties,
      icon: Building2,
    },
    {
      label: "Saved Properties",
      value: stats.savedProperties,
      icon: Heart,
    },
    {
      label: "Messages",
      value: stats.messages,
      icon: MessageSquare,
    },
    {
      label: "Profile Views",
      value: stats.profileViews,
      icon: Eye,
    },
  ];

  const formatPrice = (price) => {
    if (price == null || price === "") {
      return "Price not available";
    }

    const amount = Number(price);

    return Number.isFinite(amount)
      ? `₹ ${amount.toLocaleString("en-IN")}`
      : String(price);
  };

  const formatDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return String(date);
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const pageDescriptions = {
    Dashboard: "Welcome back! Here's your property overview.",
    "My Profile": "View and manage your profile information.",
    KYC: "Complete your identity and document verification.",
    "My Wishlist": "Your saved properties will appear here.",
    Messages: "View your property-related conversations.",
    Settings: "Manage your account preferences.",
  };

  const getTabIcon = () => {
    switch (activeTab) {
      case "My Profile":
        return User;
      case "KYC":
        return ShieldCheck;
      case "Messages":
        return MessageSquare;
      case "Settings":
        return Settings;
      default:
        return Activity;
    }
  };

  const TabIcon = getTabIcon();

  return (
    <main className="w-full bg-[#fbf9f5] p-4 text-gray-900 sm:p-6 lg:p-8 font-sans">

      <div className="mx-auto w-full max-w-7xl space-y-6 sm:space-y-8">

        {/* Header */}
        <div>
          <div className="flex items-center gap-3">
            {activeTab !== "Dashboard" && (
              <div className="rounded-xl bg-amber-100 p-2">
                <TabIcon className="h-5 w-5 text-amber-800" />
              </div>
            )}

            <h1 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">
              {activeTab}
            </h1>
          </div>

          <p className="mt-2 text-sm font-medium text-gray-600">
            {pageDescriptions[activeTab] ||
              "Manage your BuyLand account."}
          </p>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "Dashboard" && (
          <>
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
              {statCards.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-gray-500">
                        {stat.label}
                      </span>

                      <div className="rounded-xl bg-amber-50 p-2.5">
                        <Icon className="h-5 w-5 text-[#b88c3a]" />
                      </div>
                    </div>

                    <p className="mt-4 font-serif text-3xl font-extrabold text-gray-900">
                      {loading ? "..." : stat.value}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Recent Activity with Scrollable Container */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#b88c3a]" />
                <h2 className="font-serif text-xl font-bold">
                  Recent Activity
                </h2>
              </div>

              {loading ? (
                <div className="rounded-2xl border border-amber-100 bg-white p-6 text-sm text-gray-500">
                  Loading activities...
                </div>
              ) : recentActivities.length === 0 ? (
                <div className="rounded-2xl border border-amber-100 bg-white p-6 text-sm text-gray-500">
                  Abhi koi recent activity nahi hai.
                </div>
              ) : (
                /* Scrollable box added here */
                <div className="md:max-h-[380px]  overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                  {recentActivities.map((activity, idx) => (
                    <div
                      key={
                        activity._id ||
                        activity.id ||
                        idx
                      }
                      className="flex flex-col gap-3 rounded-2xl border border-amber-100 bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                        {activity.image && (
                          <img
                            src={activity.image}
                            alt={
                              activity.title ||
                              "Property"
                            }
                            className="h-14 w-16 shrink-0 rounded-xl object-cover sm:h-16 sm:w-20"
                          />
                        )}

                        <div className="min-w-0">
                          <h3 className="break-words font-serif text-sm font-bold">
                            {activity.title ||
                              activity.type ||
                              "Activity"}
                          </h3>

                          <p className="mt-1 break-words text-xs text-gray-500">
                            {activity.location ||
                              activity.address ||
                              ""}
                          </p>

                          {activity.price != null && (
                            <p className="mt-1 text-sm font-bold text-[#b88c3a]">
                              {formatPrice(
                                activity.price
                              )}
                            </p>
                          )}
                        </div>
                      </div>

                      <span className="shrink-0 text-xs font-medium text-gray-400">
                        {formatDate(
                          activity.date ||
                          activity.createdAt
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}


        {activeTab === "My Wishlist" && (
          <section className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
            <Heart className="mb-3 h-7 w-7 text-[#b88c3a]" />
            <h2 className="font-serif text-lg font-bold">
              My Wishlist
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Saved properties dikhane ke liye wishlist API connect karni hogi.
            </p>
          </section>
        )}

        {activeTab === "Messages" && (
          <section className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
            <MessageSquare className="mb-3 h-7 w-7 text-[#b88c3a]" />
            <h2 className="font-serif text-lg font-bold">
              Messages
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Messages dikhane ke liye messaging API connect karni hogi.
            </p>
          </section>
        )}

        {activeTab === "Settings" && (
          <section className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
            <Settings className="mb-3 h-7 w-7 text-[#b88c3a]" />
            <h2 className="font-serif text-lg font-bold">
              Settings
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Account settings aur preferences yahan add kar sakte hain.
            </p>
          </section>
        )}

      </div>
    </main>
  );
}