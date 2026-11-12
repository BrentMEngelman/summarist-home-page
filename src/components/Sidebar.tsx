"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setAuthModalOpen, setUser } from "@/store/authSlice";
import { auth, signOut } from "@/firebase/firebase";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { FiSettings, FiHelpCircle, FiLogOut, FiLogIn } from "react-icons/fi";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleAuthAction = async () => {
    if (user) {
      await signOut(auth);
      dispatch(setUser(null));
      router.push("/");
    } else {
      dispatch(setAuthModalOpen(true));
    }
  };

  return (
    <aside className="w-50 border-r border-gray-200 flex flex-col justify-between p-4 min-h-screen fixed top-0 left-0 bg-white z-20 max-md:w-16 max-md:items-center">
      <div>
        <div className="mb-8 px-2 max-md:hidden">
          <img src="/assets/logo.png" alt="Summarist Logo" className="w-40" />
        </div>
        <div className="mb-8 px-2 hidden max-md:block">
          <img src="/assets/logo.png" alt="Logo" className="w-8 object-contain" />
        </div>

        <nav className="space-y-2">
          {/* 1. For You */}
          <button
            onClick={() => router.push("/for-you")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded font-medium transition-colors ${
              pathname === "/for-you" ? "text-brand-dark bg-brand-gray-light font-semibold" : "text-brand-text hover:bg-gray-50"
            }`}
          >
            <AiFillHome className={`text-xl ${pathname === "/for-you" ? "text-brand-primary" : ""}`} />
            <span className="max-md:hidden">For you</span>
          </button>

          {/* 2. My Library */}
          <button
            onClick={() => router.push("/library")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded font-medium transition-colors ${
              pathname === "/library" ? "text-brand-dark bg-brand-gray-light font-semibold" : "text-brand-text hover:bg-gray-50"
            }`}
          >
            <BsBookmark className={`text-xl ${pathname === "/library" ? "text-brand-primary" : ""}`} />
            <span className="max-md:hidden">My Library</span>
          </button>

          {/* 3. Highlights (Not Allowed) */}
          <div className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 cursor-not-allowed font-medium">
            <BiEdit className="text-xl" />
            <span className="max-md:hidden">Highlights</span>
          </div>

          {/* 4. Search (Not Allowed / Handled in Header) */}
          <div className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 cursor-not-allowed font-medium">
            <AiOutlineSearch className="text-xl" />
            <span className="max-md:hidden">Search</span>
          </div>
        </nav>
      </div>

      <div className="space-y-2 w-full">
        {/* 5. Settings */}
        <button
          onClick={() => router.push("/settings")}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded font-medium transition-colors ${
            pathname === "/settings" ? "text-brand-dark bg-brand-gray-light font-semibold" : "text-brand-text hover:bg-gray-50"
          }`}
        >
          <FiSettings className={`text-xl ${pathname === "/settings" ? "text-brand-primary" : ""}`} />
          <span className="max-md:hidden">Settings</span>
        </button>

        {/* 6. Help & Support (Not Allowed) */}
        <div className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 cursor-not-allowed font-medium">
          <FiHelpCircle className="text-xl" />
          <span className="max-md:hidden">Help & Support</span>
        </div>

        {/* 7. Login / Logout */}
        <button
          onClick={handleAuthAction}
          className="w-full flex items-center gap-3 px-3 py-2 text-brand-text hover:bg-gray-50 rounded font-medium transition-colors"
        >
          {user ? <FiLogOut className="text-xl" /> : <FiLogIn className="text-xl" />}
          <span className="max-md:hidden">{user ? "Logout" : "Login"}</span>
        </button>
      </div>
    </aside>
  );
}