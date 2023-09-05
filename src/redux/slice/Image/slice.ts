import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DocumentData, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { RootState } from "../../store";

interface ImageState {
  data: DocumentData | null;
}

const initialState: ImageState = {
  data: null,
};

export const fetchImageData = createAsyncThunk(
  "image/fetchImageData",
  async () => {
    try {
      const dataDocRef = doc(collection(db, "images"), "nCTQNktBkq7BHe0ou9a2");
      const dataDocSnapshot = await getDoc(dataDocRef);

      if (dataDocSnapshot.exists()) {
        const data = dataDocSnapshot.data();
        return data;
      } else {
        throw new Error("Document does not exist.");
      }
    } catch (error) {
      throw error;
    }
  }
);

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchImageData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default imageSlice.reducer;

export const selectImgData = (state: RootState) => state.image.data;
