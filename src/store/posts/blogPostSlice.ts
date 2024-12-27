import { createSlice } from "@reduxjs/toolkit";
import { BlogPostInterface } from "../../types/post";
import { addBlogPost } from "./postThunks";

// Load posts from localStorage initially
const loadFromLocalStorage = (): BlogPostInterface[] => {
  const savedPosts = localStorage.getItem("blogPosts");
  try {
    return savedPosts ? JSON.parse(savedPosts) : [];
  } catch {
    console.error("Error parsing localStorage data");
    return [];
  }
};

// Initial state
const initialState = {
  posts: loadFromLocalStorage(),
  status: "idle",
  error: null as string | null,
};

const blogPostSlice = createSlice({
  name: "blogPosts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBlogPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addBlogPost.fulfilled, (state, action) => {
        if (!Array.isArray(state.posts)) {
          state.posts = []; // Ensure posts is an array
        }
        state.status = "succeeded";
        state.posts.push(action.payload);
        localStorage.setItem("blogPosts", JSON.stringify(state.posts));
      })
      .addCase(addBlogPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default blogPostSlice.reducer;
