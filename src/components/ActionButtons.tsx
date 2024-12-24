import { useState, useEffect, useCallback } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { RiUserUnfollowLine, RiUserFollowLine } from "react-icons/ri";
import { removePostById } from "../store/user/userProfileSlice";

import { db } from "../utils/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { followUser, unfollowUser } from "../store/user/userThunks";
interface ActionButtonsProps {
  postId: string;
  initialBookmarked?: boolean;
  targetUserId?: string;
}

const ActionButtons = ({
  postId,
  initialBookmarked = false,
  targetUserId,
}: ActionButtonsProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  const profileuser = useSelector(
    (state: RootState) => state.userProfile.Profileuser
  );
  useEffect(() => {
    const fetchLikesAndBookmarks = async () => {
      if (!user || !postId) return; // Ensure postId is provided

      const postRef = doc(db, "blogPosts", postId);

      const userRef = doc(db, "UserProfile", user.uid);

      try {
        const [postSnap, userSnap] = await Promise.all([
          getDoc(postRef),
          getDoc(userRef),
        ]);

        if (postSnap.exists()) {
          const likes = postSnap.data().likes || [];
          setLikesCount(likes.length);
          setLiked(likes.includes(user.uid));
        }

        if (userSnap.exists()) {
          const userBookmarks = userSnap.data().bookmarkedPosts || [];
          setBookmarked(userBookmarks.includes(postId));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLikesAndBookmarks();
  }, [postId, user]);

  // Debounced Like Button Handler
  const debouncedLikeHandler = useCallback(
    debounce(async (likedState: boolean) => {
      if (!user) return;

      const postRef = doc(db, "blogPosts", postId);

      setLoading(true);
      try {
        if (!likedState) {
          await updateDoc(postRef, {
            likes: arrayUnion(user.uid),
          });
          await setLikesCount((prev) => prev + 1);
        } else {
          await updateDoc(postRef, {
            likes: arrayRemove(user.uid),
          });
          setLikesCount((prev) => prev - 1);
        }
        setLiked(!likedState);
      } catch (error) {
        console.error("Error updating likes:", error);
      } finally {
        setLoading(false);
      }
    }, 500),
    [postId, user]
  );

  const handleLike = () => {
    if (!user) {
      alert("You must be logged in to like posts.");
      return;
    }
    debouncedLikeHandler(liked);
  };

  // Debounced Bookmark Button Handler
  const debouncedBookmarkHandler = useCallback(
    debounce(async (bookmarkedState: boolean) => {
      if (!user) return;

      const userRef = doc(db, "UserProfile", user.uid);

      setLoading(true);
      try {
        if (!bookmarkedState) {
          await updateDoc(userRef, {
            bookmarkedPosts: arrayUnion(postId),
          });
        } else {
          await updateDoc(userRef, {
            bookmarkedPosts: arrayRemove(postId),
          });
        }
        setBookmarked(!bookmarkedState);
      } catch (error) {
        console.error("Error updating bookmarks:", error);
      } finally {
        setLoading(false);
      }
    }, 500),
    [postId, user]
  );

  const handleBookmark = () => {
    if (!user) {
      alert("You must be logged in to bookmark posts.");
      return;
    }
    debouncedBookmarkHandler(bookmarked);
  };

  const handleFollowToggle = () => {
    if (!user) {
      alert("You must be logged in to follow users.");
      return;
    }
    if (user.uid === targetUserId) {
      return;
    }
    if (!profileuser?.following?.includes(targetUserId!)) {
      dispatch(
        followUser({
          currentUserId: user.uid,
          targetUserId: targetUserId || "",
        })
      );
    } else {
      dispatch(
        unfollowUser({
          currentUserId: user.uid,
          targetUserId: targetUserId || "",
        })
      ).then(() => {
        dispatch(removePostById(targetUserId!));
      });
    }
  };

  return (
    <div className="mt-4 flex items-center justify-between">
      {/* Like Button */}
      <button
        onClick={handleLike}
        disabled={loading}
        className="flex items-center text-gray-600 dark:text-dark-text hover:text-red-500 transition"
      >
        {liked ? (
          <AiFillHeart className="w-5 h-5 text-red-500" />
        ) : (
          <AiOutlineHeart className="w-5 h-5" />
        )}
        <span className="ml-1 text-sm">{likesCount}</span>
      </button>

      {/* Comments Button */}
      <button className="flex items-center text-gray-600 dark:text-dark-text hover:text-blue-500 transition">
        <FaRegCommentDots className="w-5 h-5" />
      </button>

      {/* Bookmark Button */}
      <button
        onClick={handleBookmark}
        disabled={loading}
        className="flex items-center text-gray-600 dark:text-dark-text hover:text-yellow-500 transition"
      >
        {bookmarked ? (
          <BsBookmarkFill className="w-5 h-5 text-yellow-500" />
        ) : (
          <BsBookmark className="w-5 h-5" />
        )}
      </button>
      <button onClick={handleFollowToggle}>
        {profileuser?.following?.includes(targetUserId || "") ? (
          <RiUserUnfollowLine className="w-5 h-5" />
        ) : (
          <RiUserFollowLine className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default ActionButtons;
