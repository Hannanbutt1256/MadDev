import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import {
  fetchAllUsers,
  followUser,
  unfollowUser,
} from "../store/user/userThunks";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ListUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allUsers, isLoading, error } = useSelector(
    (state: RootState) => state.userProfile
  );
  const [authUser, authLoading, authError] = useAuthState(auth);

  useEffect(() => {
    if (authUser) {
      dispatch(fetchAllUsers(authUser.uid));
    }
  }, [authUser, dispatch]);

  const handleFollowToggle = (
    userId: string,
    isCurrentlyFollowing: boolean
  ) => {
    if (!authUser) return;

    if (isCurrentlyFollowing) {
      dispatch(
        unfollowUser({ currentUserId: authUser.uid, targetUserId: userId })
      );
    } else {
      dispatch(
        followUser({ currentUserId: authUser.uid, targetUserId: userId })
      );
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
              src={user.profilePicture || "/default-avatar.png"}
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
              onClick={() => handleFollowToggle(user.id, !!user.isFollowing)}
              className={`m-2 ml-3 border px-4 py-2 rounded transition-colors duration-200
                ${
                  user.isFollowing
                    ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    : "border-light-button hover:bg-light-button hover:text-light-background dark:border-dark-button dark:text-dark-button dark:hover:bg-dark-hover2 dark:hover:text-dark-text"
                }`}
            >
              {user.isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListUser;
