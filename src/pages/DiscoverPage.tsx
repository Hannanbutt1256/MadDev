// DiscoverPage.tsx
import { useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlogPosts } from "../store/posts/postThunks";
import BlogCard from "../components/BlogCard";
import ActionButtons from "../components/ActionButtons";
import { RootState, AppDispatch } from "../store/store";
import { Link } from "react-router-dom";
import AuthorName from "../components/AuthorName";

const DiscoverPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loader = useRef<HTMLDivElement>(null);

  const { posts, error, hasMore, lastVisible, status, isLoadingMore } =
    useSelector((state: RootState) => state.allBlogData);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllBlogPosts());
    }
  }, [dispatch, status]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoadingMore) {
        dispatch(fetchAllBlogPosts({ lastVisible }));
      }
    },
    [dispatch, hasMore, isLoadingMore, lastVisible]
  );

  useEffect(() => {
    const currentLoader = loader.current;
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [handleObserver]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (status === "loading" && posts.length === 0) {
    return <div>Loading...</div>;
  }

  const formatDate = (date: Date | string) => {
    if (typeof date === "string") {
      return date;
    }
    return date.toISOString();
  };

  return (
    <div className="min-h-screen flex flex-col items-center md:block">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 m-2">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded-lg shadow-sm">
            <Link to={`post/${post.id}`}>
              <BlogCard
                title={post.title}
                author={<AuthorName authorId={post.authorId} />}
                createdAt={formatDate(post.createdAt)}
                tags={post.tags}
                coverImage={post.coverImage || "https://picsum.photos/200/300"}
              />
            </Link>
            <ActionButtons postId={post.id} targetUserId={post.authorId} />
          </div>
        ))}
      </div>

      <div ref={loader} className="w-full py-4 text-center">
        {isLoadingMore && <div>Loading more posts...</div>}
        {!hasMore && posts.length > 0 && <div>No more posts to load</div>}
      </div>
    </div>
  );
};

export default DiscoverPage;
