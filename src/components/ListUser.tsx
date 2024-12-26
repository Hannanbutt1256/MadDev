import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import {
  fetchAllUsers,
  fetchFollowedPosts,
  followUser,
  unfollowUser,
} from "../store/user/userThunks";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
// import { db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

// import { doc, onSnapshot } from "firebase/firestore";

const ListUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allUsers, isLoading, error } = useSelector(
    (state: RootState) => state.userProfile
  );
  const { Profileuser } = useSelector((state: RootState) => state.userProfile);
  const [authUser, authLoading, authError] = useAuthState(auth);
  const [followingIds, setFollowingIds] = useState<string[]>([]);

  // Fetch all users initially
  useEffect(() => {
    if (authUser && allUsers.length === 0) {
      dispatch(fetchAllUsers(authUser.uid));
    }
  }, [authUser, allUsers.length, dispatch]);

  // Listen to real-time updates for the current user's following list
  // useEffect(() => {
  //   if (!authUser) return;

  //   const userRef = doc(db, "UserProfile", authUser.uid);
  //   const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
  //     if (docSnapshot.exists()) {
  //       const userData = docSnapshot.data();
  //       setFollowingIds(userData.following || []);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [authUser]);

  // Update local state when Profileuser changes
  useEffect(() => {
    if (Profileuser?.following) {
      setFollowingIds(Profileuser.following);
    }
  }, [Profileuser?.following]);

  const handleFollowToggle = async (
    userId: string,
    isCurrentlyFollowing: boolean
  ) => {
    if (!authUser) return;

    // Optimistically update UI
    setFollowingIds((prev) =>
      isCurrentlyFollowing
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );

    try {
      if (isCurrentlyFollowing) {
        await dispatch(
          unfollowUser({ currentUserId: authUser.uid, targetUserId: userId })
        ).unwrap();
      } else {
        await dispatch(
          followUser({ currentUserId: authUser.uid, targetUserId: userId })
        ).unwrap();
        await dispatch(fetchFollowedPosts(authUser.uid));
      }
    } catch (error) {
      // Revert optimistic update on error
      setFollowingIds((prev) =>
        isCurrentlyFollowing
          ? [...prev, userId]
          : prev.filter((id) => id !== userId)
      );
      console.error("Error toggling follow state:", error);
    }
  };

  if (authLoading || isLoading) {
    return <div className="h-full m-2 p-2">Loading...</div>;
  }

  if (authError || error) {
    return <div className="h-full m-2 p-2">{authError?.message || error}</div>;
  }

  return (
    <div className="h-full m-2 p-2">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="grid grid-cols-1">
        {allUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm"
          >
            <img
              src={user.profilePicture}
              alt={`${user.username}'s profile`}
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div className="w-96 overflow-hidden">
              <h2 className="text-lg font-semibold">{user.username}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {user.bio || "No bio available"}
              </p>
            </div>
            <button
              onClick={() =>
                handleFollowToggle(user.id, followingIds.includes(user.id))
              }
              className={`m-2 ml-3 border px-4 py-2 rounded transition-colors duration-200
                ${
                  followingIds.includes(user.id)
                    ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    : "border-light-button hover:bg-light-button hover:text-light-background dark:border-dark-button dark:text-dark-button dark:hover:bg-dark-hover2 dark:hover:text-dark-text"
                }`}
            >
              {followingIds.includes(user.id) ? "Unfollow" : "Follow"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListUser;
