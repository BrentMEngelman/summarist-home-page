import {
  initializeApp,
  getApps,
  getApp,
  type FirebaseOptions,
} from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInAnonymously,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID || "",
};

// Initialize Firebase safely for Next.js SSR
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInAnonymously,
};
