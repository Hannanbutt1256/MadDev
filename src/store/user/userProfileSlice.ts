import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfileInterface } from "../../types/user";
import {
  fetchUserProfile,
  updateUserProfile,
  fetchAllUsers,
  followUser,
  unfollowUser,
} from "./userThunks";

interface UserState {
  Profileuser: UserProfileInterface | null;
  allUsers: UserProfileInterface[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  Profileuser: null,
  allUsers: [],
  isLoading: false,
  error: null,
};

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.Profileuser = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchUserProfile.fulfilled,
        (state, action: PayloadAction<UserProfileInterface>) => {
          state.isLoading = false;
          state.Profileuser = action.payload;
        }
      )
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(
        updateUserProfile.fulfilled,
        (state, action: PayloadAction<UserProfileInterface>) => {
          state.Profileuser = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchAllUsers.fulfilled,
        (state, action: PayloadAction<UserProfileInterface[]>) => {
          state.isLoading = false;
          state.allUsers = action.payload;
          console.log("Fetched users:", action.payload);
        }
      )
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(followUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(followUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        // Update the following list in allUsers state to reflect the follow action
        state.allUsers = state.allUsers.map((user) =>
          user.id === action.payload ? { ...user, isFollowing: true } : user
        );
      })
      .addCase(followUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(unfollowUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        unfollowUser.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          // Update the following list in allUsers state to reflect the unfollow action
          state.allUsers = state.allUsers.map((user) =>
            user.id === action.payload ? { ...user, isFollowing: false } : user
          );
        }
      )
      .addCase(unfollowUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
export const { clearUser } = userProfileSlice.actions;
export default userProfileSlice.reducer;
