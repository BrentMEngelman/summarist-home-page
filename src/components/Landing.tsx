"use client";
import { setAuthModalOpen, setViewMode } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { BsStarFill } from "react-icons/bs";

export default function Landing() {
  const dispatch = useAppDispatch(); // Initialize dispatch here
  return (
    <section id="landing" className="py-10 w-full">
      <div className="max-w-267.5 w-full mx-auto px-6">
        <div>
          <div className="flex max-md:flex-col max-md:items-center max-md:text-center max-md:max-w-135 max-md:mx-auto">
            <div className="w-full">
              <div className="text-brand-dark text-10 max-md:text-[24px] font-bold mb-6">
                Gain more knowledge <br className="max-md:hidden" />
                in less time
              </div>
              <div className="text-brand-text text-5 font-light mb-6 leading-normal">
                Great summaries for busy people,
                <br className="max-md:hidden" />
                individuals who barely have time to read,
                <br className="max-md:hidden" />
                and even people who don’t like to read.
              </div>
              <button
                className="bg-brand-primary hover:bg-brand-primary-hover active:translate-y-pxtext-brand-dark w-full h-10 rounded-sm text-4 transition-colors duration-200 flex items-center justify-center min-w-45 max-w-75 max-md:mx-auto"
                onClick={() => {
                  dispatch(setViewMode("LOGIN"));
                  dispatch(setAuthModalOpen(true));
                }}
              >
                Login
              </button>
            </div>
            <figure className="w-full flex justify-end max-md:hidden">
              <img
                src="/assets/landing.png"
                alt="landing"
                className="w-full h-full max-w-100"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
