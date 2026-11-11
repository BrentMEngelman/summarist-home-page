"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getBookById, Book } from "@/services/api";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setAuthModalOpen } from "@/store/authSlice";
import {
  AiOutlineSearch,
  AiFillHome,
  AiFillAudio,
  AiFillFileText,
  AiFillStar,
} from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { BiEdit, BiTime } from "react-icons/bi";
import { FiSettings, FiHelpCircle, FiLogOut } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";

export default function BookDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  // Subscription status state (mocked or tied to user profile; defaults to false/unsubscribed)
  const isSubscribed = false;

  useEffect(() => {
    if (!id) return;
    async function fetchBook() {
      setLoading(true);
      const data = await getBookById(id);
      setBook(data);
      setLoading(false);
    }
    fetchBook();
  }, [id]);

  const handleProtectedAction = (actionType: "read" | "listen" | "save") => {
    if (!user) {
      dispatch(setAuthModalOpen(true));
      return;
    }

    if (actionType === "save") {
      setIsSaved(!isSaved);
      return;
    }

    // If it's a premium book and user is not subscribed, redirect to choose-plan
    if (book?.subscriptionRequired && !isSubscribed) {
      router.push("/choose-plan");
      return;
    }

    // Otherwise, redirect to the book player
    router.push(`/player/${book?.id}`);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-[200px] border-r border-gray-200 flex flex-col justify-between p-4 min-h-screen fixed top-0 left-0 bg-white z-20 max-md:hidden">
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
      <main className="flex-1 md:ml-[200px]">
        {/* Header Search */}
        <header className="border-b border-gray-200 p-4 flex justify-between items-center max-w-[1070px] mx-auto sticky top-0 bg-white z-10">
          <div className="relative max-w-[400px] w-full">
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

        <div className="max-w-[1070px] mx-auto p-6">
          {loading ? (
            /* Skeleton Loading State */
            <div className="grid md:grid-cols-3 gap-8 py-10">
              <div className="space-y-4">
                <div className="bg-gray-200 animate-pulse h-[350px] w-full rounded"></div>
              </div>
              <div className="md:col-span-2 space-y-4">
                <div className="bg-gray-200 animate-pulse h-8 w-3/4 rounded"></div>
                <div className="bg-gray-200 animate-pulse h-6 w-1/2 rounded"></div>
                <div className="bg-gray-200 animate-pulse h-20 w-full rounded"></div>
                <div className="bg-gray-200 animate-pulse h-12 w-1/3 rounded"></div>
              </div>
            </div>
          ) : book ? (
            <div className="py-8 space-y-12">
              {/* Top Book Overview */}
              <div className="flex flex-col md:flex-row gap-8 border-b border-gray-200 pb-12">
                <div className="w-full md:w-1/3 flex justify-center">
                  <img
                    src={book.imageLink}
                    alt={book.title}
                    className="w-[220px] h-[330px] object-cover rounded shadow-lg"
                  />
                </div>
                <div className="w-full md:w-2/3 space-y-4">
                  <h1 className="text-3xl font-bold text-brand-dark">
                    {book.title}
                  </h1>
                  <p className="text-lg text-brand-muted">{book.author}</p>
                  <p className="text-brand-text leading-relaxed">
                    {book.subTitle}
                  </p>

                  <div className="flex items-center gap-6 text-sm text-brand-muted pt-2">
                    <div className="flex items-center gap-1">
                      <AiFillStar className="text-yellow-400 text-lg" />
                      <span className="font-semibold text-brand-dark">
                        {book.averageRating}
                      </span>{" "}
                      ({book.totalRating} ratings)
                    </div>
                    <div className="flex items-center gap-1">
                      <AiFillAudio className="text-lg text-brand-blue-accent" />
                      <span>{book.keyIdeas} Key ideas</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BiTime className="text-lg text-brand-blue-accent" />
                      <span>{book.type}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 pt-4">
                    <button
                      onClick={() => handleProtectedAction("read")}
                      className="bg-brand-dark hover:bg-opacity-90 text-white px-8 py-3 rounded font-medium flex items-center gap-2 transition-colors"
                    >
                      <AiFillFileText className="text-lg" /> Read
                    </button>
                    <button
                      onClick={() => handleProtectedAction("listen")}
                      className="bg-brand-dark hover:bg-opacity-90 text-white px-8 py-3 rounded font-medium flex items-center gap-2 transition-colors"
                    >
                      <AiFillAudio className="text-lg" /> Listen
                    </button>
                    <button
                      onClick={() => handleProtectedAction("save")}
                      className="border border-brand-dark hover:bg-gray-50 text-brand-dark px-6 py-3 rounded font-medium flex items-center gap-2 transition-colors"
                    >
                      {isSaved ? (
                        <BsBookmarkFill className="text-brand-primary" />
                      ) : (
                        <BsBookmark />
                      )}
                      {isSaved ? "Saved in Library" : "Add to My Library"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Book Description & Author Info */}
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-brand-dark">
                    About this book
                  </h3>
                  <p className="text-brand-text leading-relaxed whitespace-pre-line">
                    {book.bookDescription}
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-brand-dark">
                    About the author
                  </h3>
                  <p className="text-brand-text leading-relaxed whitespace-pre-line">
                    {book.authorDescription}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-brand-muted">
              Book not found.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
