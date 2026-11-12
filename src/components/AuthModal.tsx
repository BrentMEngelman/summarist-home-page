"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  setAuthModalOpen,
  setViewMode,
  setUser,
  type UserData,
} from "../store/authSlice";
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInAnonymously,
} from "../firebase/firebase";
import { FaUser } from "react-icons/fa";

export default function AuthModal() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthModalOpen, viewMode, user } = useAppSelector(
    (state) => state.auth,
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  if (!isAuthModalOpen) return null;

  const handleSuccessLogin = (userPayload: UserData) => {
    dispatch(setUser(userPayload));
    dispatch(setAuthModalOpen(false));
    router.push("/for-you");
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      if (viewMode === "REGISTER") {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        handleSuccessLogin({
          uid: res.user.uid,
          email: res.user.email,
          displayName: res.user.displayName,
          subscriptionStatus: "basic",
        });
      } else {
        const res = await signInWithEmailAndPassword(auth, email, password);
        handleSuccessLogin({
          uid: res.user.uid,
          email: res.user.email,
          displayName: res.user.displayName,
          subscriptionStatus: "basic",
        });
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const res = await signInWithPopup(auth, googleProvider);
      handleSuccessLogin({
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName,
        subscriptionStatus: "basic",
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGuestLogin = async () => {
    setError("");
    try {
      const res = await signInAnonymously(auth);
      handleSuccessLogin({
        uid: res.user.uid,
        email: "Guest User",
        displayName: "Guest",
        subscriptionStatus: "premium-plus", // Change to "premium" here to default guest logins to premium
        //(property) UserData.subscriptionStatus?: "basic" | "premium" | "premium-plus"
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent to your email!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(setUser(null));
    dispatch(setAuthModalOpen(false));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="auth bg-white w-full max-w-md rounded-xl p-8 relative shadow-2xl flex flex-col items-center">
        <div
          className="auth__close--btn absolute top-4 right-4 cursor-pointer text-brand-muted hover:text-brand-dark text-xl"
          onClick={() => dispatch(setAuthModalOpen(false))}
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>

        <div className="auth__content w-full">
          {user ? (
            <div className="text-center py-6">
              <div className="auth__title text-2xl font-bold text-brand-dark mb-2">
                Welcome, {user.email || "Guest"}
              </div>
              <p className="text-brand-muted mb-6">You are logged in.</p>
              <button
                onClick={handleLogout}
                className="btn bg-red-500 hover:bg-red-600 text-white w-full h-10 rounded-sm font-medium flex items-center justify-center transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <div className="auth__title text-2xl font-bold text-brand-dark text-center mb-6">
                {viewMode === "LOGIN" && "Log in to Summarist"}
                {viewMode === "REGISTER" && "Create an Account"}
                {viewMode === "FORGOT" && "Reset Password"}
              </div>

              {error && (
                <p className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
                  {error}
                </p>
              )}
              {message && (
                <p className="bg-green-100 text-green-600 p-3 rounded mb-4 text-sm">
                  {message}
                </p>
              )}

              {viewMode !== "FORGOT" && (
                <>
                  <button
                    onClick={handleGuestLogin}
                    className="btn guest__btn--wrapper bg-[#3a579d] hover:bg-[#324b87] text-white w-full h-10 rounded-sm text-4 flex items-center justify-center gap-3 mb-4 transition-colors"
                  >
                    <figure className="google__icon--mask guest__icon--mask flex items-center">
                      <FaUser />
                    </figure>
                    <div>Login as a Guest</div>
                  </button>

                  <div className="auth__separator relative my-4 text-center border-b border-gray-200">
                    <span className="auth__separator--text bg-white px-3 text-sm text-brand-muted relative top-3">
                      or
                    </span>
                  </div>

                  <button
                    onClick={handleGoogleLogin}
                    className="btn google__btn--wrapper bg-[#4285f4] hover:bg-[#357ae8] text-white w-full h-10 rounded-sm text-4 flex items-center justify-center gap-3 mb-6 transition-colors"
                  >
                    <figure className="google__icon--mask flex items-center">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 448 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                      </svg>
                    </figure>
                    <div>Login with Google</div>
                  </button>

                  <div className="auth__separator relative my-4 text-center border-b border-gray-200">
                    <span className="auth__separator--text bg-white px-3 text-sm text-brand-muted relative top-3">
                      or
                    </span>
                  </div>
                </>
              )}

              {viewMode !== "FORGOT" ? (
                <form
                  onSubmit={handleEmailAuth}
                  className="auth__main--form space-y-4 mt-6"
                >
                  <input
                    className="auth__main--input w-full border border-gray-300 p-3 rounded-sm text-sm focus:outline-none focus:border-brand-primary"
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    className="auth__main--input w-full border border-gray-300 p-3 rounded-sm text-sm focus:outline-none focus:border-brand-primary"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button className="btn bg-brand-primary hover:bg-brand-primary-hover text-brand-dark w-full h-10 rounded-sm text-4 font-semibold flex items-center justify-center transition-colors">
                    <span>{viewMode === "LOGIN" ? "Login" : "Register"}</span>
                  </button>
                </form>
              ) : (
                <form
                  onSubmit={handleForgotPassword}
                  className="space-y-4 mt-6"
                >
                  <input
                    className="w-full border border-gray-300 p-3 rounded-sm text-sm focus:outline-none focus:border-brand-primary"
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button className="btn bg-brand-primary hover:bg-brand-primary-hover text-brand-dark w-full h-10 rounded-sm text-4 font-semibold flex items-center justify-center transition-colors">
                    <span>Send Reset Link</span>
                  </button>
                </form>
              )}

              {viewMode === "LOGIN" && (
                <div
                  className="auth__forgot--password text-center text-sm text-brand-blue-accent mt-4 cursor-pointer hover:underline"
                  onClick={() => dispatch(setViewMode("FORGOT"))}
                >
                  Forgot your password?
                </div>
              )}

              {viewMode === "FORGOT" ? (
                <div
                  className="auth__switch--btn text-center text-sm text-brand-muted mt-4 cursor-pointer hover:underline w-full"
                  onClick={() => dispatch(setViewMode("LOGIN"))}
                >
                  Back to Login
                </div>
              ) : (
                <button
                  className="auth__switch--btn text-center text-sm text-brand-dark font-medium mt-4 cursor-pointer hover:underline w-full"
                  onClick={() =>
                    dispatch(
                      setViewMode(viewMode === "LOGIN" ? "REGISTER" : "LOGIN"),
                    )
                  }
                >
                  {viewMode === "LOGIN"
                    ? "Don't have an account?"
                    : "Already have an account? Login"}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
