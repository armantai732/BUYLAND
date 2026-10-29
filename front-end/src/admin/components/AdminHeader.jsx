import React from "react";
import { ShieldCheck } from "lucide-react";

export default function AdminHeader({ activeTab }) {
    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-amber-100 bg-white px-4 sm:px-8 shadow-sm">

            {/* Current Active Tab Title */}
            <div>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                    {activeTab}
                </h2>
                <p className="text-[10px] sm:text-xs text-gray-400 font-medium hidden sm:block">
                    BuyLand Real Estate Management Console
                </p>
            </div>

            {/* Right Side: Search, Notifications & Profile Badge */}
            <div className="flex items-center gap-4">

                {/* Admin Verified Badge / Mini Profile */}
                <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#061517] text-[#ffd77f] font-bold shadow-sm">
                        <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div className="hidden sm:block text-left">
                        <span className="block text-xs font-bold text-gray-900 leading-tight">
                            Arman Tai
                        </span>
                        <span className="block text-[10px] text-emerald-600 font-semibold">
                            Super Admin
                        </span>
                    </div>
                </div>

            </div>

        </header>
    );
}