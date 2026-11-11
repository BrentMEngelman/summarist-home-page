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

export default function SettingsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const subscriptionStatus = user?.subscriptionStatus || "basic";

  return (
    <main className="flex-1 md:ml-50">
      <SearchHeader />
      <div className="flex min-h-screen bg-white">
        {/* Sidebar */}
        <aside className="w-50 border-r border-gray-200 flex flex-col justify-between p-4 min-h-screen fixed top-0 left-0 bg-white z-20 max-md:hidden">
          <div>
            <div className="mb-8 px-2">
              <img
                src="/assets/logo.png"
                alt="Summarist Logo"
                className="w-40"
              />
            </div>
            <nav className="space-y-2">
              <a
                href="/for-you"
                className="flex items-center gap-3 px-3 py-2 text-brand-text hover:bg-gray-50 rounded font-medium"
              >
                <AiFillHome className="text-xl" /> For you
              </a>
              <a
                href="/library"
                className="flex items-center gap-3 px-3 py-2 text-brand-text hover:bg-gray-50 rounded font-medium"
              >
                <BsBookmark className="text-xl" /> My Library
              </a>
              <div className="flex items-center gap-3 px-3 py-2 text-gray-400 cursor-not-allowed font-medium">
                <BiEdit className="text-xl" /> Highlights
              </div>
              <div className="flex items-center gap-3 px-3 py-2 text-gray-400 cursor-not-allowed font-medium">
                <AiOutlineSearch className="text-xl" /> Search
              </div>
            </nav>
          </div>

          <div className="space-y-2">
            <a
              href="/settings"
              className="flex items-center gap-3 px-3 py-2 text-brand-dark bg-brand-gray-light rounded font-medium"
            >
              <FiSettings className="text-xl text-brand-primary" /> Settings
            </a>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-400 cursor-not-allowed font-medium">
              <FiHelpCircle className="text-xl" /> Help & Support
            </div>
            <a
              href="/"
              className="flex items-center gap-3 px-3 py-2 text-brand-text hover:bg-gray-50 rounded font-medium cursor-pointer"
            >
              <FiLogOut className="text-xl" /> Logout
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-50">
          <header className="border-b border-gray-200 p-4 flex justify-between items-center max-w-267.5 mx-auto sticky top-0 bg-white z-10">
            <div className="relative max-w-100 w-full">
              <input
                type="text"
                placeholder="Search for books"
                className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-brand-primary"
              />
              <AiOutlineSearch className="absolute right-3 top-2.5 text-xl text-gray-400" />
            </div>
            <button className="md:hidden text-2xl text-brand-dark">
              <RxHamburgerMenu />
            </button>
          </header>

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
    </main>
  );
}
