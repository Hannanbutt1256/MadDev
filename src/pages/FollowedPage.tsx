import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollowedPosts } from "../store/user/userThunks"; // Import the thunk
import BlogCard from "../components/BlogCard";
import ActionButtons from "../components/ActionButtons";
import { RootState, AppDispatch } from "../store/store";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { format } from "date-fns";
import AuthorName from "../components/AuthorName";
import ListUser from "../components/ListUser"; // Import the ListUser component

const FollowedPostsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [user] = useAuthState(auth);

  const { followedPosts, error, isLoading } = useSelector(
    (state: RootState) => state.userProfile
  );

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchFollowedPosts(user.uid));
    }
  }, [dispatch, user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-medium">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  const renderPosts = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 m-2">
      {followedPosts.map((post) => (
        <div key={post.id} className="border p-4 rounded-lg shadow-sm">
          <Link to={`post/${post.id}`}>
            <BlogCard
              title={post.title}
              author={<AuthorName authorId={post.authorId} />}
              createdAt={
                post.createdAt
                  ? format(
                      new Date(post.createdAt.seconds * 1000),
                      "yyyy-MM-dd HH:mm:ss"
                    )
                  : "Invalid Date"
              }
              tags={post.tags}
              coverImage={post.coverImage || "https://picsum.photos/200/300"}
            />
          </Link>
          <ActionButtons postId={post.id} targetUserId={post.authorId} />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center md:block">
      {followedPosts.length === 0 ? <ListUser /> : renderPosts()}
    </div>
  );
};

export default FollowedPostsPage;
