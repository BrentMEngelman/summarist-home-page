import { AiOutlineSearch } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiFillHome } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { FiSettings, FiHelpCircle, FiLogOut } from "react-icons/fi";

export default function ForYou() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-50 border-r border-gray-200 flex flex-col justify-between p-4 min-h-screen">
        <div>
          <div className="mb-8 px-2">
            <img src="/assets/logo.png" alt="Summarist Logo" className="w-40" />
          </div>
          <nav className="space-y-2">
            <a
              href="/for-you"
              className="flex items-center gap-3 px-3 py-2 text-brand-dark bg-brand-gray-light rounded font-medium"
            >
              <AiFillHome className="text-xl text-brand-primary" /> For you
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
            className="flex items-center gap-3 px-3 py-2 text-brand-text hover:bg-gray-50 rounded font-medium"
          >
            <FiSettings className="text-xl" /> Settings
          </a>
          <div className="flex items-center gap-3 px-3 py-2 text-gray-400 cursor-not-allowed font-medium">
            <FiHelpCircle className="text-xl" /> Help & Support
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-brand-text hover:bg-gray-50 rounded font-medium cursor-pointer">
            <FiLogOut className="text-xl" /> Logout
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Search Header */}
        <header className="border-b border-gray-200 p-4 flex justify-between items-center max-w-267.5 mx-auto">
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

        {/* Content Body */}
        <div className="max-w-267.5 mx-auto p-6 space-y-10">
          <div>
            <h1 className="text-2xl font-bold text-brand-dark mb-4">
              Selected just for you
            </h1>
            <div className="bg-gray-100 animate-pulse h-50 rounded-lg"></div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-dark">
              Recommended For You
            </h2>
            <p className="text-sm text-brand-muted mb-4">
              We think you’ll like these
            </p>
            <div className="grid grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="bg-gray-200 animate-pulse h-60 rounded"></div>
                  <div className="bg-gray-200 animate-pulse h-5 rounded w-full"></div>
                  <div className="bg-gray-200 animate-pulse h-4 rounded w-[90%]"></div>
                  <div className="bg-gray-200 animate-pulse h-8 rounded w-[80%]"></div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-dark">
              Suggested Books
            </h2>
            <p className="text-sm text-brand-muted mb-4">Browse those books</p>
            <div className="grid grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="bg-gray-200 animate-pulse h-60 rounded"></div>
                  <div className="bg-gray-200 animate-pulse h-5 rounded w-full"></div>
                  <div className="bg-gray-200 animate-pulse h-4 rounded w-[90%]"></div>
                  <div className="bg-gray-200 animate-pulse h-8 rounded w-[80%]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
