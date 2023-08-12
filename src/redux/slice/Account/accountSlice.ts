import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import { RootState } from "./../../store";

interface AccountState {
  accountData: DocumentData[];
  accountDetails: DocumentData | null;
}

const initialState: AccountState = {
  accountData: [],
  accountDetails: null,
};

export const fetchAccountData = createAsyncThunk(
  "account/fetchAccountData",
  async () => {
    const accountRef = collection(db, "users");
    const snapshot = await getDocs(accountRef);
    const accountData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as DocumentData[];
    return accountData;
  }
);

export const fetchAccountDetail = createAsyncThunk(
  "account/fetchAccountDetail",
  async (id: string) => {
    try {
      const accountRef = doc(collection(db, "users"), id);
      const accountSnapshot = await getDoc(accountRef);
      if (accountSnapshot.exists()) {
        const data = accountSnapshot.data();
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching account:", error);
      throw error;
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountData.fulfilled, (state, action) => {
        state.accountData = action.payload;
      })
      .addCase(fetchAccountDetail.fulfilled, (state, action) => {
        state.accountDetails = action.payload;
      });
  },
});

export default accountSlice.reducer;

// Selector to get account data
export const selectAccountData = (state: RootState) =>
  state.account.accountData;

export const selectAccountDetail = (state: RootState) =>
  state.account.accountDetails;
