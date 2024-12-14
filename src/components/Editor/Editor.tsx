// import { $getRoot, $getSelection } from "lexical";
// import { useEffect } from "react";
import { theme } from "./theme";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import Toolbar from "./Toolbar";
import { HeadingNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { ImageNode } from "./nodes/ImageNode";
import { YoutubeNode } from "./nodes/YoutubeNode";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import LoadContent from "./LoadContent";
function onError(error: Error) {
  console.error(error);
}

export default function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme: theme,
    onError,
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
  };

  return (
    <div className="m-8 p-2 h-2/4 rounded-md dark:bg-dark-card overflow-auto ">
      <LexicalComposer initialConfig={initialConfig}>
        <LoadContent />
        <Toolbar />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="h-full text-xs p-2 outline-none " />
          }
          placeholder={
            <div className="absolute text-gray-400 top-2 left-2 text-xs">
              Enter some text...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <LinkPlugin />
        <ListPlugin />
        <HistoryPlugin />
        <AutoFocusPlugin />
      </LexicalComposer>
    </div>
  );
}
