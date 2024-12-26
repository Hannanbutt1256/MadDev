import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../utils/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

interface Notification {
  id: string;
  message: string;
  timestamp: string;
  postId: string;
  likedBy: string;
}

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
};

// Async thunk to fetch notifications
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (userId: string) => {
    try {
      // console.log("Fetching notifications for user:", userId);
      const notificationsRef = collection(db, "notifications");
      const q = query(
        notificationsRef,
        where("userId", "==", userId),
        orderBy("timestamp", "desc")
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        // console.log("No notifications found for user:", userId);
      } else {
        // console.log("Number of notifications fetched:", querySnapshot.size);
      }

      return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          message: data.message,
          timestamp: data.timestamp.toDate(),
          postId: data.postId,
          likedBy: data.likedBy,
        };
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loading = false;
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default notificationSlice.reducer;
