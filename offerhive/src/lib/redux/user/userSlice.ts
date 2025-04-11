import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface userState {
  user_id: string;
  email: string;
  profile_image: string;
  is_shop_owner:boolean,
  joined_groups: string[]; 
  subscribed_groups: string[];
}

const initialState: userState = {
  user_id: "",
  email: "",
  profile_image: "/profile_placeholder.png",
  is_shop_owner:false,
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
    setIsShopOwner:(state,action: PayloadAction<boolean>)=>{
      state.is_shop_owner=action.payload;
    },
    setUser(state, action: PayloadAction<userState>) {
      const { user_id, email, profile_image } = action.payload;

      state.user_id = user_id || "";
      state.email = email || "";
      state.profile_image = profile_image || "";
      state.is_shop_owner = action.payload.is_shop_owner || false; 
      state.joined_groups = action.payload.joined_groups || [];
      state.subscribed_groups = action.payload.subscribed_groups || [];

    },
  },
});

export const { setProfileImage,setUser ,setIsShopOwner} = userSlice.actions;

export default userSlice.reducer;
