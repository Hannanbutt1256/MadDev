import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const LoadContent = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Fetch serialized content from local storage
    const savedContent = localStorage.getItem("editorContent");

    if (savedContent) {
      try {
        // Parse the JSON and load it into Lexical editor state
        const editorState = editor.parseEditorState(savedContent);

        // Schedule the editor update in a microtask
        Promise.resolve().then(() => {
          editor.update(() => {
            editor.setEditorState(editorState);
          });
        });
      } catch (error) {
        console.error("Error loading editor content:", error);
      }
    }
  }, [editor]);

  return null; // This component doesn't render any UI; it handles loading only
};

export default LoadContent;
