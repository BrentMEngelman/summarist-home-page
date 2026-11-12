"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getBookById, type Book } from "@/services/api";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setAuthModalOpen } from "@/store/authSlice";
import { fetchLibrary, toggleSaveBook } from "@/store/librarySlice";
import { AiFillAudio, AiFillFileText, AiFillStar } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { BiTime } from "react-icons/bi";
import SearchHeader from "@/components/SearchHeader";
import Sidebar from "@/components/Sidebar";
export default function BookDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { savedBooks, initializedForUser } = useAppSelector(
    (state) => state.library,
  );

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  const currentUserKey = user?.uid ?? "guest";
  const isSaved = savedBooks.some((savedBook) => savedBook.id === id);

  const isSubscribed =
    user?.subscriptionStatus === "premium" ||
    user?.subscriptionStatus === "premium-plus";

  useEffect(() => {
    if (!id) return;
    async function loadData() {
      setLoading(true);
      try {
        const bookData = await getBookById(id);
        setBook(bookData);

        if (initializedForUser !== currentUserKey) {
          await dispatch(fetchLibrary(user?.uid || null));
        }
      } catch (error) {
        console.error("Failed to load book or library status:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id, user, currentUserKey, initializedForUser, dispatch]);

  const handleProtectedAction = async (
    actionType: "read" | "listen" | "save",
  ) => {
    if (actionType === "save") {
      if (!book) return;
      try {
        await dispatch(
          toggleSaveBook({
            id: crypto.randomUUID(),
            userId: user?.uid || null,
            bookId: book.id,
            title: book.title,
            author: book.author,
            coverImage: book.imageLink,
            audioLength: book.audioLength || "5m",
            status: isSaved ? "removed" : "saved",
            addedAt: new Date().toISOString(),
          }),
        ).unwrap();
      } catch (error) {
        console.error("Failed to update library item:", error);
      }
      return;
    }

    if (!user) {
      dispatch(setAuthModalOpen(true));
      return;
    }

    if (book?.subscriptionRequired && !isSubscribed) {
      router.push("/choose-plan");
      return;
    }

    if (book?.id) {
      router.push(`/player/${book.id}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 md:ml-50">
        <SearchHeader />

        <div className="max-w-267.5 mx-auto p-6">
          {loading ? (
            <div className="grid md:grid-cols-3 gap-8 py-10">
              <div className="space-y-4">
                <div className="bg-gray-200 animate-pulse h-87.5 w-full rounded"></div>
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
              <div className="flex flex-col md:flex-row gap-8 border-b border-gray-200 pb-12">
                <div className="w-full md:w-1/3 flex justify-center">
                  <img
                    src={book.imageLink}
                    alt={book.title}
                    className="w-55 h-82.5 object-cover rounded shadow-lg"
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

                  <div className="flex items-center gap-6 text-sm text-brand-muted pt-2 flex-wrap">
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
                      <span>{book.audioLength || "3m 23s"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <AiFillFileText className="text-lg text-brand-blue-accent" />
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

              <div className="flex flex-wrap gap-4 me-4">
                {book.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-amber-50 px-4 h-12 flex items-center cursor-pointer font-medium rounded-sm"
                  >
                    {tag}
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-brand-dark">
                    What's it about?
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
