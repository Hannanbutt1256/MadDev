// src/pages/DiscoverPage.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlogPosts } from "../store/posts/postThunks";
import BlogCard from "../components/BlogCard";
import ActionButtons from "../components/ActionButtons";
import { RootState, AppDispatch } from "../store/store";
import { Link } from "react-router-dom";
import AuthorName from "../components/AuthorName";

const DiscoverPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Access blog posts from Redux store
  const { posts, error } = useSelector((state: RootState) => state.allBlogData);

  useEffect(() => {
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
                author={<AuthorName authorId={post.authorId} />}
                createdAt={post.createdAt.toISOString()}
                tags={post.tags}
                coverImage={post.coverImage || "https://picsum.photos/200/300"}
              />
            </Link>
            <ActionButtons postId={post.id} targetUserId={post.authorId} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverPage;
