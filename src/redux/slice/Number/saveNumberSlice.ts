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

interface numberState {
  numberData: DocumentData[];
  numberDetails: DocumentData | null;
  serviceNumber: DocumentData | null;
}

const initialState: numberState = {
  numberData: [],
  numberDetails: null,
  serviceNumber: null,
};

export const fetchnumberData = createAsyncThunk(
  "number/fetchnumberData",
  async () => {
    const numberRef = collection(db, "numbers");
    const snapshot = await getDocs(numberRef);
    const numberData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as DocumentData[];
    return numberData;
  }
);

export const fetchnumberDetail = createAsyncThunk(
  "number/fetchnumberDetail",
  async (id: string) => {
    try {
      const numberRef = doc(collection(db, "numbers"), id);
      const numberSnapshot = await getDoc(numberRef);
      if (numberSnapshot.exists()) {
        const data = numberSnapshot.data();
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching number:", error);
      throw error;
    }
  }
);

export const fetchServiceNumberDetail = createAsyncThunk(
  "number/fetchServiceNumberDetail",
  async (id: string) => {
    try {
      const numberRef = doc(collection(db, "numbers"), id);
      const numberSnapshot = await getDoc(numberRef);
      if (numberSnapshot.exists()) {
        const data = numberSnapshot.data();
        const serviceId = data.serviceId;
        const serviceRef = doc(collection(db, "services"), serviceId);
        const serviceSnapshot = await getDoc(serviceRef);
        if (serviceSnapshot.exists()) {
          const serviceData = serviceSnapshot.data();
          return serviceData;
        }
      }
      return null;
    } catch (error) {
      console.error("Error fetching number:", error);
      throw error;
    }
  }
);

const numberSlice = createSlice({
  name: "number",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchnumberData.fulfilled, (state, action) => {
        state.numberData = action.payload;
      })
      .addCase(fetchnumberDetail.fulfilled, (state, action) => {
        state.numberDetails = action.payload;
      })
      .addCase(fetchServiceNumberDetail.fulfilled, (state, action) => {
        state.serviceNumber = action.payload;
      });
  },
});

export default numberSlice.reducer;

export const selectnumberData = (state: RootState) => state.number.numberData;

export const selectnumberDetail = (state: RootState) =>
  state.number.numberDetails;

export const selectServiceNumber = (state: RootState) =>
  state.number.serviceNumber;
