"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { searchBooks, Book } from "@/services/api";
import { AiOutlineSearch, AiOutlineClose, AiFillAudio } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiTime } from "react-icons/bi";

export default function SearchHeader() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Debounce API calls by 300ms
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    setIsOpen(true);

    const handler = setTimeout(async () => {
      const data = await searchBooks(query.trim());
      setResults(data);
      setLoading(false);
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectBook = (id: string) => {
    setQuery("");
    setIsOpen(false);
    router.push(`/book/${id}`);
  };

  return (
    <header className="border-b border-gray-200 p-4 flex justify-between items-center max-w-267.5 mx-auto sticky top-0 bg-white z-30">
      <div className="relative max-w-100 w-full" ref={dropdownRef}>
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search for books by title or author..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim() && setIsOpen(true)}
            className="w-full border border-gray-300 rounded px-4 py-2 pr-10 text-sm focus:outline-none focus:border-brand-primary"
          />
          {query ? (
            <AiOutlineClose
              onClick={() => {
                setQuery("");
                setResults([]);
                setIsOpen(false);
              }}
              className="absolute right-3 text-lg text-gray-400 cursor-pointer hover:text-brand-dark"
            />
          ) : (
            <AiOutlineSearch className="absolute right-3 text-xl text-gray-400 pointer-events-none" />
          )}
        </div>

        {/* Debounced Search Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-xl mt-1 max-h-95 overflow-y-auto z-40 divide-y divide-gray-100">
            {loading ? (
              <div className="p-4 space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex gap-3 animate-pulse items-center">
                    <div className="w-10 h-14 bg-gray-200 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : results.length > 0 ? (
              results.map((book) => (
                <div
                  key={book.id}
                  onClick={() => handleSelectBook(book.id)}
                  className="p-3 flex items-center gap-3 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <img
                    src={book.imageLink}
                    alt={book.title}
                    className="w-10 h-14 object-cover rounded shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-brand-dark truncate">{book.title}</h4>
                    <p className="text-xs text-brand-muted truncate">{book.author}</p>
                    <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <AiFillAudio className="text-brand-blue-accent" /> {book.keyIdeas} key ideas
                      </span>
                      <span className="flex items-center gap-1">
                        <BiTime className="text-brand-blue-accent" /> {book.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-sm text-brand-muted">
                No books found matching &quot;{query}&quot;
              </div>
            )}
          </div>
        )}
      </div>

      <button className="md:hidden text-2xl text-brand-dark">
        <RxHamburgerMenu />
      </button>
    </header>
  );
}