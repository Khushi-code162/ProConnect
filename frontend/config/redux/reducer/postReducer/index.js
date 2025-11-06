import { createSlice } from "@reduxjs/toolkit";
import { getAllPosts } from "../../action/postAction";

const initialState = {
  posts: [],
  isError: false,
  postFetched: false,
  isLoading: false,
  loggedIn: false,
  message: "",
  comments: [],
  postId: "",
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: () => initialState,
    resetPostId: (state) => {
      state.postId = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching all posts...";
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.postFetched = true;
        console.log(action.payload.posts)
        state.posts = action.payload.posts.reverse()
        console.log(`HERE`, state.posts)
        state.message = "Posts fetched successfully!";
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error?.message || "Failed to fetch posts.";
      });
  },
});

export const { reset, resetPostId } = postSlice.actions;
export default postSlice.reducer;
