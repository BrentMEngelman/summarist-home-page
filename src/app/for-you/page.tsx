"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getSelectedBook,
  getRecommendedBooks,
  getSuggestedBooks,
  Book,
} from "@/services/api";
import { AiOutlineSearch, AiFillHome, AiFillAudio } from "react-icons/ai";
import { BsBookmark, BsStarFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { FiSettings, FiHelpCircle, FiLogOut } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import SearchHeader from "@/components/SearchHeader";

export default function ForYouPage() {
  const router = useRouter();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [selected, recommended, suggested] = await Promise.all([
        getSelectedBook(),
        getRecommendedBooks(),
        getSuggestedBooks(),
      ]);
      setSelectedBook(selected);
      setRecommendedBooks(recommended);
      setSuggestedBooks(suggested);
      setLoading(false);
    }
    fetchData();
  }, []);

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
                className="w-[160px]"
              />
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
          {/* Header Search */}
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

          <div className="max-w-267.5 mx-auto p-6 space-y-12">
            {/* 1. Selected Book Section */}
            <div>
              <h2 className="text-2xl font-bold text-brand-dark mb-4">
                Selected just for you
              </h2>
              {loading ? (
                <div className="bg-gray-100 animate-pulse h-50 rounded-lg"></div>
              ) : selectedBook ? (
                <div
                  onClick={() => router.push(`/book/${selectedBook.id}`)}
                  className="bg-[#fbefcs] p-6 rounded-lg flex flex-col md:flex-row gap-6 cursor-pointer hover:shadow-md transition-shadow relative"
                >
                  {selectedBook.subscriptionRequired && (
                    <span className="absolute top-4 right-4 bg-brand-dark text-white text-xs px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">
                      Premium
                    </span>
                  )}
                  <p className="text-sm text-brand-text max-w-xl">
                    {selectedBook.subTitle}
                  </p>
                  <div className="flex gap-6 items-center">
                    <img
                      src={selectedBook.imageLink}
                      alt={selectedBook.title}
                      className="w-35 h-50 object-cover rounded shadow"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-brand-dark">
                        {selectedBook.title}
                      </h3>
                      <p className="text-sm text-brand-muted mb-4">
                        {selectedBook.author}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-brand-dark">
                        <AiFillAudio className="text-lg text-brand-blue-accent" />{" "}
                        3 mins 23 secs
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {/* 2. Recommended Books Section */}
            <div>
              <h2 className="text-xl font-bold text-brand-dark">
                Recommended For You
              </h2>
              <p className="text-sm text-brand-muted mb-4">
                We think you’ll like these
              </p>
              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="bg-gray-200 animate-pulse h-60 rounded"></div>
                      <div className="bg-gray-200 animate-pulse h-5 rounded w-full"></div>
                      <div className="bg-gray-200 animate-pulse h-4 rounded w-[90%]"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {recommendedBooks.map((book) => (
                    <div
                      key={book.id}
                      onClick={() => router.push(`/book/${book.id}`)}
                      className="cursor-pointer group relative space-y-2"
                    >
                      {book.subscriptionRequired && (
                        <span className="absolute top-2 right-2 bg-brand-dark text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold z-10">
                          Premium
                        </span>
                      )}
                      <img
                        src={book.imageLink}
                        alt={book.title}
                        className="w-full h-60 object-cover rounded shadow group-hover:scale-105 transition-transform"
                      />
                      <h4 className="font-bold text-sm text-brand-dark line-clamp-1">
                        {book.title}
                      </h4>
                      <p className="text-xs text-brand-muted">{book.author}</p>
                      <p className="text-xs text-brand-text line-clamp-2">
                        {book.subTitle}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-brand-muted">
                        <BsStarFill className="text-yellow-400 text-xs" />{" "}
                        {book.averageRating}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Suggested Books Section */}
            <div>
              <h2 className="text-xl font-bold text-brand-dark">
                Suggested Books
              </h2>
              <p className="text-sm text-brand-muted mb-4">
                Browse those books
              </p>
              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="bg-gray-200 animate-pulse h-60 rounded"></div>
                      <div className="bg-gray-200 animate-pulse h-5 rounded w-full"></div>
                      <div className="bg-gray-200 animate-pulse h-4 rounded w-[90%]"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {suggestedBooks.map((book) => (
                    <div
                      key={book.id}
                      onClick={() => router.push(`/book/${book.id}`)}
                      className="cursor-pointer group relative space-y-2"
                    >
                      {book.subscriptionRequired && (
                        <span className="absolute top-2 right-2 bg-brand-dark text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold z-10">
                          Premium
                        </span>
                      )}
                      <img
                        src={book.imageLink}
                        alt={book.title}
                        className="w-full h-60 object-cover rounded shadow group-hover:scale-105 transition-transform"
                      />
                      <h4 className="font-bold text-sm text-brand-dark line-clamp-1">
                        {book.title}
                      </h4>
                      <p className="text-xs text-brand-muted">{book.author}</p>
                      <p className="text-xs text-brand-text line-clamp-2">
                        {book.subTitle}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-brand-muted">
                        <BsStarFill className="text-yellow-400 text-xs" />{" "}
                        {book.averageRating}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </main>
  );
}
