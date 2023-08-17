import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import { RootState } from "./../../store";

interface serviceState {
  serviceData: DocumentData[];
  serviceDetails: DocumentData | null;
  numbersList: DocumentData[];
}

const initialState: serviceState = {
  serviceData: [],
  serviceDetails: {},
  numbersList: [],
};

export const fetchserviceData = createAsyncThunk(
  "service/fetchserviceData",
  async () => {
    const serviceRef = collection(db, "services");
    const snapshot = await getDocs(serviceRef);
    const serviceData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as DocumentData[];
    return serviceData;
  }
);

export const fetchserviceDetail = createAsyncThunk(
  "service/fetchserviceDetail",
  async (id: string) => {
    try {
      const serviceRef = doc(collection(db, "services"), id);
      const serviceSnapshot = await getDoc(serviceRef);
      if (serviceSnapshot.exists()) {
        const data = serviceSnapshot.data();
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching service:", error);
      throw error;
    }
  }
);

export const fetchNumbersList = createAsyncThunk(
  "service/fetchNumbersList",
  async (id: string) => {
    try {
      const serviceRef = doc(collection(db, "services"), id);
      const serviceSnapshot = await getDoc(serviceRef);
      const serviceData = serviceSnapshot.data();
      if (serviceData) {
        const numbersQuerySnapshot = await getDocs(
          query(collection(db, "numbers"), where("serviceId", "==", id))
        );
        const numbersList = numbersQuerySnapshot.docs.map((doc) =>
          doc.data()
        ) as DocumentData[];
        return numbersList;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error fetching numbers list:", error);
      throw error;
    }
  }
);

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchserviceData.fulfilled, (state, action) => {
        state.serviceData = action.payload;
      })
      .addCase(fetchserviceDetail.fulfilled, (state, action) => {
        state.serviceDetails = action.payload;
      })
      .addCase(fetchNumbersList.fulfilled, (state, action) => {
        state.numbersList = action.payload;
      });
  },
});

export default serviceSlice.reducer;

export const selectserviceData = (state: RootState) =>
  state.service.serviceData;

export const selectserviceDetail = (state: RootState) =>
  state.service.serviceDetails;

export const selectNumbersList = (state: RootState) =>
  state.service.numbersList;
