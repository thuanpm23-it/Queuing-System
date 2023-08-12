import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { RootState } from "./../../store";

interface RoleState {
  roleData: DocumentData[];
}

const initialState: RoleState = {
  roleData: [],
};

export const fetchRoleData = createAsyncThunk(
  "role/fetchRoleData",
  async () => {
    const rolesCollectionRef = collection(db, "roles");
    const rolesSnapshot = await getDocs(rolesCollectionRef);
    const rolesList = rolesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as DocumentData[];
    return rolesList;
  }
);

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRoleData.fulfilled, (state, action) => {
      state.roleData = action.payload;
    });
  },
});

export default roleSlice.reducer;

export const selectRoleData = (state: RootState) => state.role.roleData;
