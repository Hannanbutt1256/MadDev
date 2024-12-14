import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserProfileInterface } from "../../types/user";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  arrayUnion,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../utils/firebase";

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
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error");
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
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error");
    }
  }
);
export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (currentUserId: string | null, { rejectWithValue }) => {
    try {
      const usersRef = collection(db, "UserProfile");
      const querySnapshot = await getDocs(usersRef);
      const users: UserProfileInterface[] = [];

      for (const doc of querySnapshot.docs) {
        const user = doc.data() as UserProfileInterface;
        if (user.id !== currentUserId) {
          const isFollowing = user.followers.includes(currentUserId || "");
          users.push({ ...user, isFollowing });
        }
      }

      return users;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error");
    }
  }
);

export const followUser = createAsyncThunk(
  "user/followuser",
  async (
    {
      currentUserId,
      targetUserId,
    }: { currentUserId: string; targetUserId: string },
    { rejectWithValue }
  ) => {
    try {
      const currentUserRef = doc(db, "UserProfile", currentUserId);
      const targetUserRef = doc(db, "UserProfile", targetUserId);
      await updateDoc(currentUserRef, { following: arrayUnion(targetUserId) });
      await updateDoc(targetUserRef, { followers: arrayUnion(currentUserId) });
      return targetUserId;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error");
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "user/unfollowuser",
  async (
    {
      currentUserId,
      targetUserId,
    }: { currentUserId: string; targetUserId: string },
    { rejectWithValue }
  ) => {
    try {
      const currentUserRef = doc(db, "UserProfile", currentUserId);
      const targetUserRef = doc(db, "UserProfile", targetUserId);
      await updateDoc(currentUserRef, { following: arrayRemove(targetUserId) });
      await updateDoc(targetUserRef, { followers: arrayRemove(currentUserId) });
      return targetUserId;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error");
    }
  }
);