import React from "react";

export default function DashboardContent() {
  const recentActivities = [
    {
      title: "Viewed Residential Plot",
      location: "Ahmedabad, Gujarat",
      price: "₹ 45,00,000",
      date: "25 Oct 2025",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=300&auto=format&fit=crop",
    },
    {
      title: "Added to Wishlist",
      location: "Mehsana, Gujarat",
      price: "₹ 28,00,000",
      date: "22 Oct 2025",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=300&auto=format&fit=crop",
    },
  ];

  return (
    <main className="flex-1 bg-[#fbf9f5] h-full overflow-y-auto p-6 sm:p-8 lg:p-10 text-gray-900">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Dashboard Header */}
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-600 font-medium flex items-center gap-1.5">
            <span>Welcome back, Arman Tai</span>
            <span>👋</span>
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Properties", value: "5" },
            { label: "Saved Properties", value: "3" },
            { label: "Messages", value: "2" },
            { label: "Profile Views", value: "48" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white p-5 shadow-sm border border-amber-100 flex flex-col justify-between"
            >
              <span className="text-xs font-semibold text-gray-500">
                {stat.label}
              </span>
              <span className="mt-3 font-serif text-2xl sm:text-3xl font-extrabold text-gray-900">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="space-y-4">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900">
            Recent Activity
          </h2>

          <div className="space-y-3">
            {recentActivities.map((activity, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm border border-amber-100 transition hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="h-14 w-16 sm:h-16 sm:w-20 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <h4 className="font-serif text-xs sm:text-sm font-bold text-gray-900">
                      {activity.title}
                    </h4>
                    <p className="mt-0.5 text-[11px] sm:text-xs text-gray-500">
                      {activity.location}
                    </p>
                    <p className="mt-1 font-bold text-xs sm:text-sm text-[#b88c3a]">
                      {activity.price}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] sm:text-xs text-gray-400 font-medium">
                    {activity.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}