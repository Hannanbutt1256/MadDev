import { useEffect, useState } from "react";
import { db } from "../utils/firebase"; // Import your Firebase configuration
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { BlogPostInterface } from "../types/post";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router";
import ActionButtons from "../components/ActionButtons";
import AuthorName from "../components/AuthorName";

const SavePostPage = () => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState<BlogPostInterface[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, authLoading] = useAuthState(auth); // Destructure `authLoading`

  useEffect(() => {
    const fetchBookmarkedPosts = async () => {
      if (authLoading) return; // Wait until the authentication state is resolved

      try {
        const userId = user?.uid;
        if (!userId) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        // Fetch user document to get bookmarkedPost array
        const userDocRef = doc(db, "UserProfile", userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          const bookmarkedPostIds: string[] = userData.bookmarkedPosts || [];

          if (bookmarkedPostIds.length === 0) {
            setBookmarkedPosts([]);
            setLoading(false);
            return;
          }

          // Fetch each post based on the IDs in bookmarkedPost
          const postPromises = bookmarkedPostIds.map(async (postId) => {
            const postDocRef = doc(db, "blogPosts", postId);
            const postSnapshot = await getDoc(postDocRef);
            if (postSnapshot.exists()) {
              const postData = postSnapshot.data();

              return {
                id: postSnapshot.id,
                ...postData,
                createdAt: postData?.createdAt
                  ? new Date(postData.createdAt.seconds * 1000) // Convert Firestore timestamp to Date
                  : null,
              } as BlogPostInterface;
            } else {
              console.warn(`Post with ID ${postId} not found.`);
              return null;
            }
          });

          const posts = (await Promise.all(postPromises)).filter(
            (post): post is BlogPostInterface => post !== null
          );

          setBookmarkedPosts(posts);
        } else {
          setError("User data not found");
        }
      } catch (err) {
        setError(
          `Failed to fetch bookmarked posts: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedPosts();
  }, [user, authLoading]); // Depend on `user` and `authLoading`

  if (authLoading || loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!loading && bookmarkedPosts.length === 0) {
    return <div>No bookmarked posts</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center md:block">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 m-2">
        {bookmarkedPosts.map((post) => (
          <div key={post.id} className="border p-4 rounded-lg shadow-sm">
            <Link to={`/post/${post.id}`}>
              <BlogCard
                title={post.title}
                author={<AuthorName authorId={post.authorId} />} // Adjust based on your actual field name
                createdAt={
                  post.createdAt instanceof Date
                    ? post.createdAt.toISOString()
                    : "Unknown Date"
                }
                tags={post.tags || []} // If you have tags in your blog post, adjust accordingly
                coverImage={post.coverImage || "https://picsum.photos/200/300"} // Fallback image
              />
            </Link>

            <ActionButtons postId={post.id} targetUserId={post.authorId} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavePostPage;
