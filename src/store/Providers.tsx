"use client";
import { Provider as Provide } from "react-redux";
import { store } from "./store";
export function Providers({ children }: { children: React.ReactNode }) {
  return <Provide store={store}>{children}</Provide>;
}