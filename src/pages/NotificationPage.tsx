import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../store/notification/notificationSlice";
import { RootState, AppDispatch } from "../store/store";
import { auth } from "../utils/firebase";

const Notifications = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { notifications, loading } = useSelector(
    (state: RootState) => state.notifications
  );
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      console.log("Dispatching fetchNotifications for user:", user.uid);
      dispatch(fetchNotifications(user.uid));
    }
  }, [dispatch, user]);

  useEffect(() => {
    console.log("Notifications:", notifications);
  }, [notifications]);

  if (loading) return <p>Loading notifications...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {notifications.map((notif) => (
            <li key={notif.likedBy} className="border p-2 rounded-md">
              <p>{notif.message}</p>
              <small className="text-gray-500">
                {new Date(notif.timestamp).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
