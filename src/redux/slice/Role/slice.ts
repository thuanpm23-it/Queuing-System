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

interface RoleState {
  roleData: DocumentData[];
  userCounts: UserCountsData;
  roleDetails: DocumentData | null;
}

interface UserCountsData {
  [role: string]: number;
}

const initialState: RoleState = {
  roleData: [],
  userCounts: {},
  roleDetails: null,
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

export const fetchUserCounts = createAsyncThunk(
  "role/fetchUserCounts",
  async () => {
    const usersCollectionRef = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollectionRef);

    const userCountsData: UserCountsData = {};
    usersSnapshot.forEach((doc) => {
      const userData = doc.data();
      const role = userData.role;

      if (userCountsData[role]) {
        userCountsData[role]++;
      } else {
        userCountsData[role] = 1;
      }
    });

    return userCountsData;
  }
);
export const fetchRoleDetail = createAsyncThunk(
  "role/fetchRoleDetail",
  async (id: string) => {
    try {
      const roleRef = doc(collection(db, "roles"), id);
      const roleSnapshot = await getDoc(roleRef);
      if (roleSnapshot.exists()) {
        const data = roleSnapshot.data();
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching role:", error);
      throw error;
    }
  }
);

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoleData.fulfilled, (state, action) => {
        state.roleData = action.payload;
      })
      .addCase(fetchUserCounts.fulfilled, (state, action) => {
        state.userCounts = action.payload;
      })
      .addCase(fetchRoleDetail.fulfilled, (state, action) => {
        state.roleDetails = action.payload;
      });
  },
});

export default roleSlice.reducer;

export const selectRoleData = (state: RootState) => state.role.roleData;
export const selectUserCounts = (state: RootState) => state.role.userCounts;
export const selectRoleDetail = (state: RootState) => state.role.roleDetails;
