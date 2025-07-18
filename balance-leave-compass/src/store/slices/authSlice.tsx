import { authInitialState } from "@/types/global.models";
import { createSlice } from "@reduxjs/toolkit";

const initialState: authInitialState = {
  status: false,
  userData: null,
  userRole: null,
  token: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.user;
      state.userRole = action.payload.user.role;
      state.token = action.payload.token;
      state.loading = false;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.userRole = null;
      state.token = null;
      state.loading = false;
      localStorage.removeItem("token");
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { login, logout, setLoading } = authSlice.actions;

export default authSlice.reducer;
