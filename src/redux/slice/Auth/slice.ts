import { createSlice } from "@reduxjs/toolkit";

export interface UserData {
  email: string;
  fullName: string;
  password: string;
  phoneNumber: string;
  role: string;
  status: string;
  userImg: string;
  username: string;
}

export interface AuthState {
  user: UserData | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
