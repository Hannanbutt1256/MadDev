import { createSlice } from "@reduxjs/toolkit";
import { fetchPodcasts, addPodcast } from "./podcastThunks"; // Import thunks
import { PodcastInterface } from "../../types/podcast";

interface PodcastState {
  podcasts: PodcastInterface[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PodcastState = {
  podcasts: null,
  isLoading: false,
  error: null,
};

export const podcastSlice = createSlice({
  name: "podcast",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPodcasts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPodcasts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.podcasts = action.payload;
      })
      .addCase(fetchPodcasts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addPodcast.fulfilled, (state, action) => {
        if (state.podcasts) {
          state.podcasts.push(action.payload);
        }
      })
      .addCase(addPodcast.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(addPodcast.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export default podcastSlice.reducer;
