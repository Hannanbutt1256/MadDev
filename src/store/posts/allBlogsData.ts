// blogSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllBlogPosts } from "./postThunks";
import { BlogPostInterface } from "../../types/post";
import { DocumentSnapshot } from "firebase/firestore";

interface BlogState {
  posts: BlogPostInterface[];
  status: string;
  error: string | null;
  hasMore: boolean;
  lastVisible: DocumentSnapshot | null;
  isLoadingMore: boolean;
}

const initialState: BlogState = {
  posts: [],
  status: "idle",
  error: null,
  hasMore: true,
  lastVisible: null,
  isLoadingMore: false,
};

const blogSlice = createSlice({
  name: "blogPosts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBlogPosts.pending, (state, action) => {
        if (!action.meta.arg?.lastVisible) {
          state.status = "loading";
        } else {
          state.isLoadingMore = true;
        }
      })
      .addCase(
        fetchAllBlogPosts.fulfilled,
        (
          state,
          action: PayloadAction<{
            posts: BlogPostInterface[];
            lastVisible: DocumentSnapshot | null;
          }>
        ) => {
          state.status = "success";
          state.isLoadingMore = false;

          const newPosts = action.payload.posts.filter(
            (newPost) =>
              !state.posts.some(
                (existingPost) => existingPost.id === newPost.id
              )
          );

          state.posts = [...state.posts, ...newPosts];
          state.lastVisible = action.payload.lastVisible;
          state.hasMore = action.payload.posts.length === 10;
        }
      )
      .addCase(fetchAllBlogPosts.rejected, (state, action) => {
        state.status = "error";
        state.isLoadingMore = false;
        state.error = action.error.message || "Failed to fetch blog posts";
      });
  },
});

export default blogSlice.reducer;
