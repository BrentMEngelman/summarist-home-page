import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface AuthState {
  user: UserData | null;
  isAuthModalOpen: boolean;
  viewMode: "LOGIN" | "REGISTER" | "FORGOT";
}

const initialState: AuthState = {
  user: null,
  isAuthModalOpen: false,
  viewMode: "LOGIN",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData | null>) => {
      state.user = action.payload;
    },
    setAuthModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAuthModalOpen = action.payload;
    },
    setViewMode: (state, action: PayloadAction<"LOGIN" | "REGISTER" | "FORGOT">) => {
      state.viewMode = action.payload;
    },
  },
});

export const { setUser, setAuthModalOpen, setViewMode } = authSlice.actions;
export default authSlice.reducer;