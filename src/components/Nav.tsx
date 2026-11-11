"use client";
import { useAppDispatch } from "../store/hooks";
import { setAuthModalOpen, setViewMode } from "../store/authSlice";

export default function Nav() {
  const dispatch = useAppDispatch();

  return (
    <nav className="h-20">
      <div className="flex justify-between items-center max-w-267.5 w-full h-full mx-auto px-6">
        <figure className="max-w-50">
          <img className="w-full h-full" src="/assets/logo.png" alt="logo" />
        </figure>
        <ul className="flex gap-6">
          <li
            onClick={() => {
              dispatch(setViewMode("LOGIN"));
              dispatch(setAuthModalOpen(true));
            }}
            className="cursor-pointer text-brand-dark hover:text-brand-primary transition-colors duration-100 font-medium"
          >
            Login
          </li>
          <li className="cursor-not-allowed text-brand-dark transition-colors duration-100 max-[576px]:hidden">
            About
          </li>
          <li className="cursor-not-allowed text-brand-dark transition-colors duration-100 max-[576px]:hidden">
            Contact
          </li>
          <li className="cursor-not-allowed text-brand-dark transition-colors duration-100 max-[576px]:hidden">
            Help
          </li>
        </ul>
      </div>
    </nav>
  );
}
