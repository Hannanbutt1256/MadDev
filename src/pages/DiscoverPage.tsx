// src/pages/DiscoverPage.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlogPosts } from "../store/posts/postThunks"; // Adjust import path
import BlogCard from "../components/BlogCard";
import ActionButtons from "../components/ActionButtons";
import { RootState, AppDispatch } from "../store/store"; // Adjust path if needed
import { Link } from "react-router-dom";

const DiscoverPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Access blog posts from Redux store
  const { posts, error } = useSelector(
    (state: RootState) => state.allBlogData // Adjusted to the correct slice
  );

  useEffect(() => {
    // Dispatch action to fetch blog posts when the component mounts
    dispatch(fetchAllBlogPosts());
  }, [dispatch]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center md:block">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 m-2">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded-lg shadow-sm">
            <Link to={`post/${post.id}`}>
              <BlogCard
                title={post.title}
                author={post.authorId} // Adjust based on your actual field name
                createdAt={post.createdAt.toISOString()} // Convert Date to ISO string
                tags={post.tags} // If you have tags in your blog post, adjust accordingly
                coverImage={post.coverImage || "https://picsum.photos/200/300"} // Fallback image
              />
            </Link>

            {/* Action Buttons */}
            <ActionButtons postId={post.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverPage;
