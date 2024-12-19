import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllBlogPosts } from "./postThunks"; // Adjust path if necessary
import { BlogPostInterface } from "../../types/post";

interface BlogState {
  posts: BlogPostInterface[];
  status: string; // loading, success, or error
  error: string | null;
  hasMore: boolean;
}

const initialState: BlogState = {
  posts: [],
  status: "idle",
  error: null,
  hasMore: true,
};

const blogSlice = createSlice({
  name: "blogPosts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBlogPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchAllBlogPosts.fulfilled,
        (state, action: PayloadAction<BlogPostInterface[]>) => {
          state.status = "success";
          const newPosts = action.payload.filter(
            (newPost) =>
              !state.posts.some(
                (existingPost) => existingPost.id === newPost.id
              )
          );
          state.posts = [...state.posts, ...newPosts];
        }
      )
      .addCase(fetchAllBlogPosts.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message || "Failed to fetch blog posts";
      });
  },
});

export default blogSlice.reducer;
