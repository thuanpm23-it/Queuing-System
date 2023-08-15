import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import { RootState } from "./../../store";

interface deviceState {
  deviceData: DocumentData[];
  deviceDetails: DocumentData | null;
}

const initialState: deviceState = {
  deviceData: [],
  deviceDetails: null,
};

export const fetchdeviceData = createAsyncThunk(
  "device/fetchdeviceData",
  async () => {
    const deviceRef = collection(db, "devices");
    const snapshot = await getDocs(deviceRef);
    const deviceData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as DocumentData[];
    return deviceData;
  }
);

export const fetchdeviceDetail = createAsyncThunk(
  "device/fetcheviceDetail",
  async (id: string) => {
    try {
      const deviceRef = doc(collection(db, "devices"), id);
      const deviceSnapshot = await getDoc(deviceRef);
      if (deviceSnapshot.exists()) {
        const data = deviceSnapshot.data();
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching device:", error);
      throw error;
    }
  }
);

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchdeviceData.fulfilled, (state, action) => {
        state.deviceData = action.payload;
      })
      .addCase(fetchdeviceDetail.fulfilled, (state, action) => {
        state.deviceDetails = action.payload;
      });
  },
});

export default deviceSlice.reducer;

export const selectdeviceData = (state: RootState) => state.device.deviceData;

export const selectdeviceDetail = (state: RootState) =>
  state.device.deviceDetails;
