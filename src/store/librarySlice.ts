import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserLibrary, addLibraryItem, type UserLibrary } from "@/services/libraryService";

export interface LibraryState extends UserLibrary {
  loading: boolean;
  initializedForUser: string | null | undefined;
}

const initialState: LibraryState = {
  savedBooks: [],
  finishedBooks: [],
  loading: false,
  initializedForUser: undefined,
};

export const fetchLibrary = createAsyncThunk(
  "library/fetchLibrary",
  async (userId?: string | null) => {
    const data = await getUserLibrary(userId);
    return { data, userId: userId ?? "guest" };
  }
);

export const toggleSaveBook = createAsyncThunk(
  "library/toggleSaveBook",
  async (item: {
    id: string;
    userId?: string | null;
    bookId: string;
    title: string;
    author: string;
    coverImage: string;
    audioLength: string;
    status: "saved" | "removed" | "finished";
    addedAt: string;
  }) => {
    await addLibraryItem(item);
    return item;
  }
);

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLibrary.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLibrary.fulfilled, (state, action) => {
        state.savedBooks = action.payload.data.savedBooks;
        state.finishedBooks = action.payload.data.finishedBooks;
        state.initializedForUser = action.payload.userId;
        state.loading = false;
      })
      .addCase(fetchLibrary.rejected, (state) => {
        state.loading = false;
      })
      .addCase(toggleSaveBook.fulfilled, (state, action) => {
        const item = action.payload;
        if (item.status === "removed") {
          state.savedBooks = state.savedBooks.filter((b) => b.id !== item.bookId);
          state.finishedBooks = state.finishedBooks.filter((b) => b.id !== item.bookId);
        } else if (item.status === "saved") {
          state.finishedBooks = state.finishedBooks.filter((b) => b.id !== item.bookId);
          if (!state.savedBooks.some((b) => b.id === item.bookId)) {
            state.savedBooks.push({
              id: item.bookId,
              title: item.title,
              author: item.author,
              imageLink: item.coverImage,
              audioLength: item.audioLength,
              averageRating: 4.5,
            });
          }
        } else if (item.status === "finished") {
          // Remove from saved if present, then add to finished
          state.savedBooks = state.savedBooks.filter((b) => b.id !== item.bookId);
          if (!state.finishedBooks.some((b) => b.id === item.bookId)) {
            state.finishedBooks.push({
              id: item.bookId,
              title: item.title,
              author: item.author,
              imageLink: item.coverImage,
              audioLength: item.audioLength,
              averageRating: 4.5,
            });
          }
        }
      });
  },
});

export default librarySlice.reducer;