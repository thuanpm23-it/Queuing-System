import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import accountReducer from "./slice/Account/accountSlice";
import forgotReducer from "./slice/ForgotPassword/forgotSlice";
import roleReducer from "./slice/Role/slice";
import numberReducer from "./slice/Number/saveNumberSlice";
import deviceReducer from "./slice/Device/deviceSlice";

const store = configureStore({
  reducer: {
    forgot: forgotReducer,
    account: accountReducer,
    role: roleReducer,
    number: numberReducer,
    device: deviceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
