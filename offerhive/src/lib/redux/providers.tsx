"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { initializeUserFromCookie } from "./user/userSlice";

function InitUserFromCookie() {
  useEffect(() => {
    store.dispatch(initializeUserFromCookie());
  }, []);

  return null;
}

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <InitUserFromCookie />
      {children}
    </Provider>
  );
}
