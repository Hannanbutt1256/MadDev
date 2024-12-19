import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from "./user/userProfileSlice";
import blogPostReducer from "./posts/blogPostSlice";
import blogSliceReducer from "./posts/allBlogsData";
import podcastSliceReducer from "./podcast/podcastSlice";
export const store = configureStore({
  reducer: {
    userProfile: userProfileReducer,
    blogPosts: blogPostReducer,
    allBlogData: blogSliceReducer,
    podcastData: podcastSliceReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
