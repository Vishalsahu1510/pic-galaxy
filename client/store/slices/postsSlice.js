import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    allPosts: [],
    myPosts: [],
    favouritePosts :[],
  },
  reducers: {
    setAllPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    setMyPosts: (state, action) => {
      state.myPosts = action.payload;
    },
    setFavouritePosts: (state, action) => {
      state.favouritePosts = action.payload;
    },
  },
});

export const { setAllPosts, setMyPosts, setFavouritePosts } = postsSlice.actions;
export default postsSlice.reducer;