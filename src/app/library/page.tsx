"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchLibrary } from "@/store/librarySlice";
import type { Book } from "@/services/libraryService";

import Sidebar from "@/components/Sidebar";
import SearchHeader from "@/components/SearchHeader";
import { BsBookmark, BsStarFill } from "react-icons/bs";
import { AiFillAudio } from "react-icons/ai";

export default function LibraryPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { savedBooks, finishedBooks, loading, initializedForUser } =
    useAppSelector((state) => state.library);

  const currentUserKey = user?.uid ?? "guest";

  useEffect(() => {
    // Only hit Data Connect if Redux hasn't been hydrated for this user/guest yet
    if (initializedForUser !== currentUserKey) {
      dispatch(fetchLibrary(user?.uid || null));
    }
  }, [user, currentUserKey, initializedForUser, dispatch]);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 md:ml-50">
        <SearchHeader />
        <div className="max-w-267.5 mx-auto p-6 md:p-12 space-y-12">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-brand-dark">My Library</h1>
            {!user && (
              <span className="text-xs bg-gray-100 text-brand-muted px-3 py-1 rounded-full">
                Guest Mode (Saved Locally)
              </span>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-3 animate-pulse">
                  <div className="bg-gray-200 h-60 rounded"></div>
                  <div className="bg-gray-200 h-4 w-full rounded"></div>
                  <div className="bg-gray-200 h-3 w-3/4 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-12">
              {/* Saved Books Section */}
              <div>
                <h2 className="text-xl font-bold text-brand-dark mb-4 flex items-center gap-2">
                  <BsBookmark className="text-brand-primary" /> Saved Books (
                  {savedBooks.length})
                </h2>
                {savedBooks.length === 0 ? (
                  <p className="text-sm text-brand-muted">
                    No saved books yet. Browse titles and click "Add to My
                    Library".
                  </p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {savedBooks.map((book: Book) => (
                      <div
                        key={book.id}
                        onClick={() => router.push(`/book/${book.id}`)}
                        className="cursor-pointer group space-y-2 relative"
                      >
                        <img
                          src={book.imageLink}
                          alt={book.title}
                          className="w-full h-60 object-cover rounded shadow group-hover:scale-105 transition-transform"
                        />
                        <h4 className="font-bold text-sm text-brand-dark line-clamp-1">
                          {book.title}
                        </h4>
                        <p className="text-xs text-brand-muted">
                          {book.author}
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

              {/* Finished Books Section */}
              <div>
                <h2 className="text-xl font-bold text-brand-dark mb-4 flex items-center gap-2">
                  <AiFillAudio className="text-brand-blue-accent" /> Finished
                  Books ({finishedBooks.length})
                </h2>
                {finishedBooks.length === 0 ? (
                  <p className="text-sm text-brand-muted">
                    No finished books yet. Complete an audio summary to see it
                    here.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {finishedBooks.map((book: Book) => (
                      <div
                        key={book.id}
                        onClick={() => router.push(`/book/${book.id}`)}
                        className="cursor-pointer group space-y-2 relative"
                      >
                        <img
                          src={book.imageLink}
                          alt={book.title}
                          className="w-full h-60 object-cover rounded shadow group-hover:scale-105 transition-transform"
                        />
                        <h4 className="font-bold text-sm text-brand-dark line-clamp-1">
                          {book.title}
                        </h4>
                        <p className="text-xs text-brand-muted">
                          {book.author}
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
          )}
        </div>
      </main>
    </div>
  );
}
