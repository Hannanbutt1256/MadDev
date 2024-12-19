import { useParams } from "react-router-dom";
import BlogPostViewer from "../components/BlogPostViewer";

const PostPage = () => {
  const { id } = useParams();

  return (
    <div>
      {id ? <BlogPostViewer postId={id} /> : <div>No post ID provided.</div>}
    </div>
  );
};

export default PostPage;
