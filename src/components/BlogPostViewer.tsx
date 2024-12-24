import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { HeadingNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { ImageNode } from "../components/Editor/nodes/ImageNode";
import { YoutubeNode } from "../components/Editor/nodes/YoutubeNode";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { theme } from "../components/Editor/theme";
import ActionButtons from "./ActionButtons";
import AuthorName from "./AuthorName";

interface BlogPost {
  id: string;
  title: string;
  tags: [];
  content: string;
  coverImage: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  likes: number;
  comments: [];
}

// ContentRenderer Component
const ContentRenderer = ({
  serializedContent,
}: {
  serializedContent: string;
}) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    try {
      const parsedContent = JSON.parse(serializedContent);
      editor.update(() => {
        const editorState = editor.parseEditorState(parsedContent);
        editor.setEditorState(editorState);
      });
    } catch (err) {
      console.error("Failed to parse content:", err);
    }
  }, [editor, serializedContent]);

  return null;
};

interface BlogPostViewerProps {
  postId: string;
}

const BlogPostViewer = ({ postId }: BlogPostViewerProps) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostAndAuthor = async () => {
      try {
        const postRef = doc(db, "blogPosts", postId);
        const postDoc = await getDoc(postRef);

        if (!postDoc.exists()) {
          setError("Post not found");
          setLoading(false);
          return;
        }

        const postData = postDoc.data();
        const blogPost: BlogPost = {
          id: postDoc.id,
          title: postData.title,
          tags: postData.tags,
          content: postData.content,
          coverImage: postData.coverImage || "https://picsum.photos/600/400",
          createdAt: postData.createdAt.toDate(),
          updatedAt: postData.updatedAt.toDate(),
          authorId: postData.authorId,
          likes: postData.likes,
          comments: postData.comments || [],
        };

        setPost(blogPost);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to fetch post data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndAuthor();
  }, [postId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Post not available</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <img
        src={post.coverImage}
        alt={post.title}
        className="w-full h-auto rounded-lg mb-4"
      />
      <h1 className="text-3xl font-bold ">{post.title}</h1>
      <p className="text-gray-600 mb-2">
        By
        <span className="font-semibold">
          {<AuthorName authorId={post.authorId} />}
        </span>
        {post.createdAt.toDateString()}
      </p>

      <div className="flex flex-wrap gap-2 pb-2">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="p-2 bg-light-background2 dark:bg-dark-card ">
        <ActionButtons postId={post.id} targetUserId={post.authorId} />
      </div>
      <LexicalComposer
        initialConfig={{
          namespace: "BlogPostViewer",
          onError: (error) => console.error("Lexical Error:", error),
          theme: theme,
          editable: false,
          nodes: [
            HeadingNode,
            ListNode,
            ListItemNode,
            CodeNode,
            CodeHighlightNode,
            ImageNode,
            YoutubeNode,
            LinkNode,
            AutoLinkNode,
          ],
        }}
      >
        <div className="bg-light-background2 dark:bg-dark-card p-4 rounded-md">
          <RichTextPlugin
            contentEditable={<ContentEditable className="content-editable" />}
            placeholder={null}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <ContentRenderer serializedContent={post.content} />
        </div>
      </LexicalComposer>
    </div>
  );
};

export default BlogPostViewer;
