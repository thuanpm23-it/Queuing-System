import { createSlice } from "@reduxjs/toolkit";

const forgotSlice = createSlice({
  name: "forgot",
  initialState: {
    email: "",
  },
  reducers: {
    setEmailForgot: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setEmailForgot } = forgotSlice.actions;

export default forgotSlice.reducer;
