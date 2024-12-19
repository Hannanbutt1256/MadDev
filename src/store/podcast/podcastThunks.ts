import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { PodcastInterface } from "../../types/podcast";
import { db } from "../../utils/firebase";

// Fetch podcasts from Firebase Firestore
export const fetchPodcasts = createAsyncThunk<
  PodcastInterface[],
  void,
  { rejectValue: string }
>("podcast/fetchPodcasts", async (_, { rejectWithValue }) => {
  try {
    const querySnapshot = await getDocs(collection(db, "podcasts"));
    const podcasts: PodcastInterface[] = [];
    querySnapshot.forEach((docSnapshot) => {
      podcasts.push({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      } as PodcastInterface);
    });
    return podcasts;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Unknown error");
  }
});

// Add a new podcast to Firebase Firestore
export const addPodcast = createAsyncThunk<
  PodcastInterface,
  PodcastInterface,
  { rejectValue: string }
>("podcast/addPodcast", async (newPodcast, { rejectWithValue }) => {
  try {
    const user = getAuth().currentUser;
    if (!user) {
      return rejectWithValue("User not authenticated");
    }

    // Add the podcast to Firestore
    const docRef = await addDoc(collection(db, "podcasts"), {
      ...newPodcast,
      authorId: user.uid, // Include authorId from the authenticated user
      createdAt: new Date(),
    });

    return { ...newPodcast, id: docRef.id }; // Return the new podcast with the generated ID
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Unknown error");
  }
});
