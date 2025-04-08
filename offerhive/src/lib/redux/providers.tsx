"use client"
import { store } from "./store";
import { Provider } from "react-redux";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Provider store={store}>{children}</Provider>;
}