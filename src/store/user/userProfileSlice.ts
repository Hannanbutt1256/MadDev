/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfileInterface } from "../../types/user";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

interface UserState {
  Profileuser: UserProfileInterface | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  Profileuser: null,
  isLoading: false,
  error: null,
};
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (userId: string, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "UserProfile", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as UserProfileInterface;
      } else {
        throw new Error("User not found");
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (user: UserProfileInterface, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "UserProfile", user.id);
      await setDoc(docRef, user);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

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
      });
  },
});
export const { clearUser } = userProfileSlice.actions;
export default userProfileSlice.reducer;
