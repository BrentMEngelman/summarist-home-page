import { db } from "@/firebase/firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { Book } from "./api";

export interface UserLibrary {
  savedBooks: Book[];
  finishedBooks: Book[];
}

// Abstracted database methods (easily switchable to SQL or another provider later)
export async function getUserLibrary(uid: string): Promise<UserLibrary> {
  try {
    const docRef = doc(db, "libraries", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserLibrary;
    }
    return { savedBooks: [], finishedBooks: [] };
  } catch (error) {
    console.error("Error fetching library:", error);
    return { savedBooks: [], finishedBooks: [] };
  }
}

export async function saveBookToLibrary(uid: string, book: Book): Promise<void> {
  const docRef = doc(db, "libraries", uid);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    await setDoc(docRef, { savedBooks: [book], finishedBooks: [] });
  } else {
    await updateDoc(docRef, {
      savedBooks: arrayUnion(book),
    });
  }
}

export async function removeBookFromLibrary(uid: string, book: Book): Promise<void> {
  const docRef = doc(db, "libraries", uid);
  await updateDoc(docRef, {
    savedBooks: arrayRemove(book),
  });
}

export async function markBookAsFinished(uid: string, book: Book): Promise<void> {
  const docRef = doc(db, "libraries", uid);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    await setDoc(docRef, { savedBooks: [], finishedBooks: [book] });
  } else {
    await updateDoc(docRef, {
      finishedBooks: arrayUnion(book),
    });
  }
}