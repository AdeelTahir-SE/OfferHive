import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";

export interface userState {
  user_id: string;
  email: string;
  profile_image: string;
  is_shop_owner: boolean;
  joined_groups: string[];
  subscribed_groups: string[];
}

const initialState: userState = {
  user_id: "",
  email: "",
  profile_image: "/profile_placeholder.png",
  is_shop_owner: false,
  joined_groups: [],
  subscribed_groups: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfileImage: (state, action: PayloadAction<string>) => {
      state.profile_image = action.payload;
    },
    setIsShopOwner: (state, action: PayloadAction<boolean>) => {
      state.is_shop_owner = action.payload;
      const oneHourFromNow = new Date(
          Date.now() + 60 * 60 * 1000
        ).toUTCString();
      document.cookie = `offerhive_user=${encodeURIComponent(
        JSON.stringify(state)
      )}; path=/; expires=${oneHourFromNow}`;
    },
    setUser(state, action: PayloadAction<userState>) {
      Object.assign(state, action.payload);

      if (typeof window !== "undefined") {
        const oneHourFromNow = new Date(
          Date.now() + 60 * 60 * 1000
        ).toUTCString();

        document.cookie = `offerhive_user=${encodeURIComponent(
          JSON.stringify(action.payload)
        )}; path=/; expires=${oneHourFromNow}`;
      }
    },
    initializeUserFromCookie: (state) => {
      if (typeof window !== "undefined") {
        const cookie = getCookie("offerhive_user");

        if (cookie) {
          try {
            const parsed =
              typeof cookie === "string" ? JSON.parse(cookie) : cookie;

            state.user_id = parsed.user_id || "";
            state.email = parsed.email || "";
            state.profile_image =
              parsed.profile_image || "/profile_placeholder.png";
            state.is_shop_owner = parsed.is_shop_owner || false;
            state.joined_groups = parsed.joined_groups || [];
            state.subscribed_groups = parsed.subscribed_groups || [];
          } catch (e) {
            console.error("Failed to parse cookie:", e);
          }
        }
      }
    },
  },
});

export const {
  setProfileImage,
  setUser,
  setIsShopOwner,
  initializeUserFromCookie,
} = userSlice.actions;
export default userSlice.reducer;
