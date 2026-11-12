"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { getBookById, Book } from "@/services/api";
import { AiFillHome, AiFillAudio } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import {
  FiSettings,
  FiHelpCircle,
  FiLogOut,
  FiPlay,
  FiPause,
  FiRotateCcw,
  FiRotateCw,
} from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import SearchHeader from "@/components/SearchHeader";
import Sidebar from "@/components/Sidebar";
import { markBookAsFinished } from "@/services/libraryService";

export default function BookPlayerPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  // Audio player handlers
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const skipTime = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <main className="flex-1 md:ml-50">
      <SearchHeader />
      <div className="flex min-h-screen bg-white pb-32">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Reader Content */}
        <main className="flex-1 md:ml-50 max-w-200 mx-auto p-6 md:p-12">
          {loading ? (
            <div className="space-y-6 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          ) : book ? (
            <div className="space-y-8">
              <h1 className="text-3xl font-bold text-brand-dark">
                {book.title} - Summary
              </h1>
              <div className="text-brand-text leading-relaxed whitespace-pre-line text-lg">
                {book.summary}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-brand-muted">
              Book summary not found.
            </div>
          )}
        </main>

        {/* Bottom Audio Player Bar */}
        {book && (
          <div className="fixed bottom-0 left-0 md:left-50 right-0 bg-[#042330] text-white p-4 flex flex-col md:flex-row items-center justify-between shadow-2xl z-30 gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <img
                src={book.imageLink}
                alt={book.title}
                className="w-12 h-16 object-cover rounded shadow"
              />
              <div>
                <h4 className="font-bold text-sm line-clamp-1">{book.title}</h4>
                <p className="text-xs text-gray-400">{book.author}</p>
              </div>
            </div>

            <div className="flex flex-col items-center w-full max-w-md gap-2">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => skipTime(-10)}
                  className="text-gray-300 hover:text-white text-lg"
                >
                  <FiRotateCcw />
                </button>
                <button
                  onClick={togglePlay}
                  className="bg-white text-[#042330] p-3 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {isPlaying ? (
                    <FiPause className="text-xl" />
                  ) : (
                    <FiPlay className="text-xl ml-0.5" />
                  )}
                </button>
                <button
                  onClick={() => skipTime(10)}
                  className="text-gray-300 hover:text-white text-lg"
                >
                  <FiRotateCw />
                </button>
              </div>

              <div className="flex items-center gap-3 w-full text-xs text-gray-300">
                <span>{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full accent-white cursor-pointer h-1 bg-gray-600 rounded"
                />
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <audio
              ref={audioRef}
              src={book?.audioLink}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={async () => {
                setIsPlaying(false);
                if (user && book) {
                  await markBookAsFinished(user.uid, book);
                }
              }}
            />

            <div className="hidden md:block w-37.5"></div>
          </div>
        )}
      </div>
    </main>
  );
}
