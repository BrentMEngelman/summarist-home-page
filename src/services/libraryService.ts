import { connectorConfig } from "@dataconnect/generated";
import {
  getUserLibrary as dcGetUserLibrary,
  addBookToLibrary,
} from "@dataconnect/generated";
import { getDataConnect } from "firebase/data-connect";

export interface Book {
  id: string;
  title: string;
  author: string;
  imageLink: string;
  audioLength: string;
  averageRating?: number;
}

export interface UserLibrary {
  savedBooks: Book[];
  finishedBooks: Book[];
}

export function getOrCreateGuestId(): string {
  if (typeof window === "undefined") return "server-guest";

  let guestId = localStorage.getItem("summarist_guest_uuid");
  if (!guestId) {
    guestId = `guest_${crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15) + Date.now().toString(36)}`;
    localStorage.setItem("summarist_guest_uuid", guestId);
  }
  return guestId;
}

function getClientDataConnect() {
  return getDataConnect(connectorConfig);
}

export const libraryService = {
  async getLibrary(userId?: string | null): Promise<UserLibrary> {
    try {
      const activeUserId = userId || getOrCreateGuestId();

      // Force network fetch if supported, otherwise executes query
      const response = await dcGetUserLibrary(getClientDataConnect(), {
        userId: activeUserId,
      });
      const rawItems = response.data.libraryItems || [];

      const sortedItems = [...rawItems].sort((a: any, b: any) => {
        const timeA = a.addedAt ? new Date(a.addedAt).getTime() : 0;
        const timeB = b.addedAt ? new Date(b.addedAt).getTime() : 0;
        return timeA - timeB;
      });

      const itemMap = new Map();
      sortedItems.forEach((item: any) => {
        const bId = item.bookId || item.id;
        itemMap.set(bId, item);
      });

      const items = Array.from(itemMap.values());

      const savedBooks: Book[] = items
        .filter(
          (item: any) =>
            item.status === "saved" ||
            (!item.status && item.status !== "removed"),
        )
        .filter((item: any) => item.status !== "removed")
        .map((item: any) => ({
          id: item.bookId || item.id,
          title: item.title,
          author: item.author,
          imageLink: item.coverImage,
          audioLength: item.audioLength,
          averageRating: 4.5,
        }));

      const finishedBooks: Book[] = items
        .filter((item: any) => item.status === "finished")
        .map((item: any) => ({
          id: item.bookId || item.id,
          title: item.title,
          author: item.author,
          imageLink: item.coverImage,
          audioLength: item.audioLength,
          averageRating: 4.5,
        }));

      return { savedBooks, finishedBooks };
    } catch (error) {
      console.error("Failed to fetch library from Cloud SQL:", error);
      return { savedBooks: [], finishedBooks: [] };
    }
  },

  async addBook(item: {
    id: string;
    userId?: string | null;
    bookId: string;
    title: string;
    author: string;
    coverImage: string;
    audioLength: string;
    status: string;
    addedAt: string;
  }) {
    try {
      const activeUserId = item.userId || getOrCreateGuestId();

      const payload = {
        ...item,
        id: crypto.randomUUID(),
        userId: activeUserId,
        addedAt: item.addedAt || new Date().toISOString(),
      };

      const response = await addBookToLibrary(getClientDataConnect(), payload);

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("library-updated"));
      }
      return response.data;
    } catch (error) {
      console.error("Failed to insert library item into Cloud SQL:", error);
      throw error;
    }
  },
};

export async function getUserLibrary(
  userId?: string | null,
): Promise<UserLibrary> {
  return libraryService.getLibrary(userId);
}

export async function addLibraryItem(item: {
  id: string;
  userId?: string | null;
  bookId: string;
  title: string;
  author: string;
  coverImage: string;
  audioLength: string;
  status: string;
  addedAt: string;
}) {
  return libraryService.addBook(item);
}

export async function markBookAsFinished(item: {
  id: string;
  userId?: string | null;
  bookId: string;
  title: string;
  author: string;
  coverImage: string;
  audioLength: string;
  addedAt: string;
}) {
  return libraryService.addBook({
    ...item,
    status: "finished",
  });
}
