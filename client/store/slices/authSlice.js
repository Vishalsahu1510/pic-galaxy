import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    role: localStorage.getItem("role") || null,
    author: localStorage.getItem("author") || null,
    isAuthenticated: !!localStorage.getItem("accessToken"),
  },
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.role = action.payload.user.accountType;
      state.author = action.payload.user.username;
      state.isAuthenticated = true;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("role", action.payload.user.accountType);
      localStorage.setItem("author", action.payload.user.username);
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;