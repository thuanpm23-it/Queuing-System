import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { RootState } from "./../../store";

interface RoleState {
  roleData: DocumentData[];
  userCounts: UserCountsData;
}

interface UserCountsData {
  [role: string]: number;
}

const initialState: RoleState = {
  roleData: [],
  userCounts: {},
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
      });
  },
});

export default roleSlice.reducer;

export const selectRoleData = (state: RootState) => state.role.roleData;
export const selectUserCounts = (state: RootState) => state.role.userCounts;
