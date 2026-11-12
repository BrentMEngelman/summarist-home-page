"use client";

import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setAuthModalOpen, setSubscriptionStatus } from "@/store/authSlice";
import { AiOutlineSearch, AiFillHome } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { FiSettings, FiHelpCircle, FiLogOut } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import SearchHeader from "@/components/SearchHeader";
import Sidebar from "@/components/Sidebar";

export default function SettingsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const subscriptionStatus = user?.subscriptionStatus || "basic";

  return (

      
      <div className="flex min-h-screen bg-white">
        {/* Sidebar */}
        <Sidebar/>

        {/* Main Content */}
        <main className="flex-1 md:ml-50">
          <SearchHeader />

          <div className="max-w-267.5 mx-auto p-6 md:p-12">
            <h1 className="text-3xl font-bold text-brand-dark border-b border-gray-200 pb-4 mb-8">
              Settings
            </h1>

            {!user ? (
              <div className="flex flex-col items-center justify-center text-center py-12 space-y-6">
                <img
                  src="/assets/login.png"
                  alt="Log in to view settings"
                  className="w-75 max-w-full object-contain"
                />
                <h2 className="text-2xl font-bold text-brand-dark">
                  Log in to your account to see your details.
                </h2>
                <button
                  onClick={() => dispatch(setAuthModalOpen(true))}
                  className="bg-brand-primary hover:bg-brand-primary-hover text-brand-dark font-semibold px-8 py-3 rounded-lg transition-colors shadow"
                >
                  Login
                </button>
              </div>
            ) : (
              <div className="space-y-8 max-w-xl">
                {/* Subscription Status Display */}
                <div className="border-b border-gray-200 pb-6 space-y-2">
                  <h3 className="text-sm font-semibold uppercase text-brand-muted tracking-wider">
                    Your Subscription Plan
                  </h3>
                  <div className="flex items-center justify-between pt-2">
                    <div className="capitalize font-bold text-xl text-brand-dark">
                      {subscriptionStatus}
                    </div>
                    {subscriptionStatus === "basic" && (
                      <button
                        onClick={() => router.push("/choose-plan")}
                        className="bg-brand-primary hover:bg-brand-primary-hover text-brand-dark font-semibold px-5 py-2 rounded transition-colors text-sm"
                      >
                        Upgrade to Premium
                      </button>
                    )}
                  </div>
                </div>

                {/* User Email Display */}
                <div className="border-b border-gray-200 pb-6 space-y-2">
                  <h3 className="text-sm font-semibold uppercase text-brand-muted tracking-wider">
                    Email Address
                  </h3>
                  <p className="text-lg text-brand-dark font-medium">
                    {user.email || "Guest User"}
                  </p>
                </div>

                {/* Developer Testing Control */}
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg space-y-2">
                  <h4 className="text-xs font-bold uppercase text-yellow-800 tracking-wider">
                    🛠️ Dev Testing: Switch Plan Tier
                  </h4>
                  <select
                    value={subscriptionStatus}
                    onChange={(e) =>
                      dispatch(setSubscriptionStatus(e.target.value as any))
                    }
                    className="w-full p-2 border border-yellow-300 rounded text-sm bg-white font-medium focus:outline-none"
                  >
                    <option value="basic">Basic (Free)</option>
                    <option value="premium">Premium</option>
                    <option value="premium-plus">Premium-Plus</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

  );
}
