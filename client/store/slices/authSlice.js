import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    role: localStorage.getItem("role") || null,
    author: localStorage.getItem("author") || null,
    avatar: localStorage.getItem("avatar") || null,
    isAuthenticated: !!localStorage.getItem("accessToken"),
  },
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.role = action.payload.user.accountType;
      state.author = action.payload.user.username;
      state.avatar = action.payload.user.avatar;
      state.isAuthenticated = true;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("role", action.payload.user.accountType);
      localStorage.setItem("author", action.payload.user.username);
      localStorage.setItem("avatar",action.payload.user.avatar);
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.role = null;
      state.isAuthenticated = null;
      state.author = null;
      state.avatar = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");
      localStorage.removeItem("author");
      localStorage.removeItem("avatar");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;