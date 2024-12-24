import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfileInterface } from "../../types/user";
import {
  fetchUserProfile,
  updateUserProfile,
  fetchAllUsers,
  followUser,
  unfollowUser,
  fetchFollowedPosts,
} from "./userThunks";

interface UserState {
  Profileuser: UserProfileInterface | null;
  allUsers: UserProfileInterface[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  followedPosts: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  Profileuser: null,
  allUsers: [],
  followedPosts: [],
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
    removePostById: (state, action: PayloadAction<string>) => {
      state.followedPosts = state.followedPosts.filter(
        (post) => post.authorId !== action.payload
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFollowedPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFollowedPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.followedPosts = action.payload;
      })
      .addCase(fetchFollowedPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
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
        console.log("Fetched users:", action.payload);

        state.isLoading = false;
        // Update the following list in allUsers state to reflect the follow action
        state.allUsers = state.allUsers.map((user) =>
          user.id === action.payload ? { ...user, isFollowing: true } : user
        );
        if (state.Profileuser) {
          state.Profileuser = {
            ...state.Profileuser,
            following: state.Profileuser.following
              ? [...state.Profileuser.following, action.payload]
              : [action.payload],
          };
        }
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
          if (state.Profileuser) {
            state.Profileuser = {
              ...state.Profileuser,
              following: state.Profileuser.following
                ? state.Profileuser.following.filter(
                    (followingId) => followingId !== action.payload
                  )
                : [],
            };
          }
          // state.allUsers = state.allUsers.filter(
          //   (user) => user.id !== action.payload
          // );
        }
      )
      .addCase(unfollowUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
export const { clearUser, removePostById } = userProfileSlice.actions;
export default userProfileSlice.reducer;
