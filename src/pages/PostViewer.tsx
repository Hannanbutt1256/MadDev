import { useEffect, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { theme } from "../components/Editor/theme";
import { HeadingNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { ImageNode } from "../components/Editor/nodes/ImageNode";
import { YoutubeNode } from "../components/Editor/nodes/YoutubeNode";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

const PostViewer = () => {
  const [postContent, setPostContent] = useState<string | null>(null);

  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      setPostContent(savedContent);
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Post Preview</h1>
      {postContent ? (
        <LexicalComposer
          initialConfig={{
            namespace: "PostViewer",
            onError: (error) => console.error(error),
            theme: theme,
            editable: false,
            nodes: [
              HeadingNode,
              ListNode,
              ListItemNode,
              CodeHighlightNode,
              CodeNode,
              ImageNode,
              YoutubeNode,
              LinkNode,
              AutoLinkNode,
            ],
          }}
        >
          <ContentRenderer serializedContent={postContent} />
        </LexicalComposer>
      ) : (
        "No content available to display."
      )}
    </div>
  );
};

const ContentRenderer = ({
  serializedContent,
}: {
  serializedContent: string;
}) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const parsedContent = JSON.parse(serializedContent);
    console.log("Parsed Content:", parsedContent);

    // Schedule editor updates safely
    Promise.resolve().then(() => {
      editor.update(() => {
        const editorState = editor.parseEditorState(parsedContent);
        editor.setEditorState(editorState);

        // Call transformNodes after setting editor state
        // transformNodes(editor);
      });
    });
  }, [editor, serializedContent]);
  const savedData = JSON.parse(localStorage.getItem("editPageData") || "{}");

  return (
    <div className="bg-light-background2 dark:bg-dark-card u p-4 rounded-md">
      <img src={savedData.coverImage} className="w-full h-96" alt="" />
      <h1 className="text-5xl font-bold mb-4">{savedData.title}</h1>
      <p className="text-lg mb-4 rounded-md space-x-2 ">
        {savedData.tags?.map((tag: string, index: number) => {
          return (
            <span
              key={index}
              className="px-3 py-1  bg-light-button text-light-background dark:bg-dark-button dark:text-dark-text rounded-full"
            >
              {tag}
            </span>
          );
        })}
      </p>
      <RichTextPlugin
        contentEditable={<ContentEditable className="content-editable" />}
        placeholder={null}
        ErrorBoundary={LexicalErrorBoundary}
      />
    </div>
  );
};

// function transformNodes(editor: LexicalEditor) {
//   editor.update(() => {
//     const root = $getRoot();
//     console.log("Root Node:", root);

//     root.getChildren().forEach((node) => {
//       console.log("Child Node Type:", node.getType());

//       if ($isParagraphNode(node)) {
//         node.getChildren().forEach((child) => {
//           console.log("Paragraph Child Node Type:", child.getType());

//           if (child.getType() === "youtube") {
//             console.log("YouTube node found:", child);
//           }
//         });
//       }
//     });
//   });
// }

// Transform function to move youtube nodes out of paragraph nodes

export default PostViewer;
