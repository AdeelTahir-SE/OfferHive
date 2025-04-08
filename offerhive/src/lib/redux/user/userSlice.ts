import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface userState {
  user_id: string;
  email: string;
  profile_image: string;
}

const initialState: userState = {
  user_id: "",
  email: "",
  profile_image: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfileImage: (state, action: PayloadAction<string>) => {
      state.profile_image = action.payload;
    },
    setUser(state, action: PayloadAction<userState>) {
      const { user_id, email, profile_image } = action.payload;

      state.user_id = user_id || "";
      state.email = email || "";
      state.profile_image = profile_image || "";
    },
  },
});

export const { setProfileImage,setUser } = userSlice.actions;

export default userSlice.reducer;
