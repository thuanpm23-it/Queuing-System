import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NumberState {
  autocrement: number;
}

const numberSlice = createSlice({
  name: "number",
  initialState: {
    autocrement: 1,
  },
  reducers: {
    incrementAutocrement(state) {
      state.autocrement = state.autocrement >= 9999 ? 1 : state.autocrement + 1;
    },
  },
});

export const { incrementAutocrement } = numberSlice.actions;

export default numberSlice.reducer;
