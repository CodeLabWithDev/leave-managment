// Js Dependancies
import { configureStore } from "@reduxjs/toolkit";

// Slices
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
