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
  apiKey: process.env.NEXT_FIREBASE_AK || "",
  authDomain: process.env.NEXT_FIREBASE_AD || "",
  projectId: process.env.NEXT_FIREBASE_PI || "",
  storageBucket: process.env.NEXT_FIREBASE_SB || "",
  messagingSenderId: process.env.NEXT_FIREBASE_MSI || "",
  appId: process.env.NEXT_FIREBASE_AI || "",
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
