import { configureStore } from "@reduxjs/toolkit";
import navSlice from "./slices/navSlice";
import authSlice from "./slices/authSlice";
import postsSlice from "./slices/postsSlice";
import orderSlice from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    nav: navSlice,
    auth: authSlice,
    posts: postsSlice,
    order: orderSlice,
  },
});