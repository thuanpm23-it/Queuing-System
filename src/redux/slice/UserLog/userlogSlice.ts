import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { RootState } from "./../../store";

interface UserLogState {
  userlogData: DocumentData[];
  userIP: string;
}

const initialState: UserLogState = {
  userlogData: [],
  userIP: "",
};

export const fetchUserLogData = createAsyncThunk(
  "userlog/fetchUserLogData",
  async () => {
    const userlogRef = collection(db, "userlogs");
    const snapshot = await getDocs(userlogRef);
    const userlogData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as DocumentData[];
    return userlogData;
  }
);

export const fetchUserIPAsync = createAsyncThunk(
  "userLog/fetchUserIPAsync",
  async () => {
    try {
      const response = await fetch("https://api64.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Lỗi khi lấy địa chỉ IP của người dùng:", error);
      throw error;
    }
  }
);

const userlogSlice = createSlice({
  name: "userlog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLogData.fulfilled, (state, action) => {
        state.userlogData = action.payload;
      })
      .addCase(fetchUserIPAsync.fulfilled, (state, action) => {
        state.userIP = action.payload;
      });
  },
});

export default userlogSlice.reducer;

export const selectUserLogData = (state: RootState) =>
  state.userlog.userlogData;

export const selectUserIP = (state: RootState) => state.userlog.userIP;
