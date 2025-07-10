import { createSlice } from "@reduxjs/toolkit";

type TUser = {
  _id: string;
  name: string;
  email: string;
  role: "ADMIN" | "SUPER_ADMIN";
  image: string;
  status: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type TInitialState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TInitialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
