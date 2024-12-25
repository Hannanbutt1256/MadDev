import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../utils/firebase";

const useNotificationListener = (userId: string) => {
  interface Notification {
    id: string;
    title: string;
    message: string;
    timestamp: Date;
    // Add other fields as necessary
  }

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", userId),
      orderBy("timestamp", "desc")
    );
    console.log("Query:", q);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newNotifications = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          message: data.message,
          timestamp: data.timestamp.toDate(), // assuming timestamp is a Firestore Timestamp
        };
      });
      console.log("New Notifications:", newNotifications);
      setNotifications(newNotifications);
    });

    return () => unsubscribe();
  }, [userId]);

  return notifications;
};

export default useNotificationListener;
