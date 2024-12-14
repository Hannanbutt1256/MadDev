import {
  MdFormatBold,
  MdFormatItalic,
  MdOutlineStrikethroughS,
  MdFormatUnderlined,
  MdUndo,
  MdRedo,
  MdOutlineFormatListBulleted,
  MdOutlineFormatListNumbered,
  MdCode,
} from "react-icons/md";
import { BsTypeH1, BsTypeH2, BsTypeH3 } from "react-icons/bs";
import { mergeRegister } from "@lexical/utils";
import { useCallback, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { $setBlocksType, $wrapNodes } from "@lexical/selection";
import { $createHeadingNode } from "@lexical/rich-text";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { registerCodeHighlighting, $createCodeNode } from "@lexical/code";
import ImagePlugin from "./plugins/ImagePlugin";
import YoutubePlugin from "./plugins/YoutubePlugin";
import LinkPlugin from "./plugins/LinkPlugin";

const Toolbar = () => {
  const [editor] = useLexicalComposerContext();
  //State of toolbar buttons
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [canUndo, setCanUndo] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsUnderline(selection.hasFormat("underline"));
    }
  }, []);

  const handleHeading = (value: "h1" | "h2" | "h3") => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(value));
      }
    });
  };
  const handleSave = (content: string) => {
    localStorage.setItem("editorContent", content);
    console.log(content);
  };

  useEffect(() => {
    registerCodeHighlighting(editor);
  }, [editor]);
  const onAddCodeBlock = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => $createCodeNode());
      }
    });
  };

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
        handleSave(JSON.stringify(editorState));
      }),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        1
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        1
      )
    );
  }, [editor, updateToolbar]);

  return (
    <div className="space-x-3 flex flex-col md:flex-row sticky top-0 bg-light-background2 dark:bg-black p-2 rounded-md">
      <div className="space-x-3">
        <button
          disabled={!canUndo}
          onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
          className="toolbar-item spaced disabled:text-gray-500"
        >
          <MdUndo />
        </button>
        <button
          disabled={!canRedo}
          onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
          className="toolbar-item spaced disabled:text-gray-500"
        >
          <MdRedo />
        </button>
        <button
          className={`rounded-md p-2 ${
            isBold ? "bg-gray-200 dark:bg-gray-700" : ""
          }`}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
          }}
        >
          <MdFormatBold />
        </button>
        <button
          className={`rounded-md p-2 ${
            isItalic ? "bg-gray-200 dark:bg-gray-700" : ""
          }`}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
          }}
        >
          <MdFormatItalic />
        </button>
        <button
          className={`rounded-md p-2 ${
            isStrikethrough ? "bg-gray-200 dark:bg-gray-700" : ""
          }`}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
          }}
        >
          <MdOutlineStrikethroughS />
        </button>
        <button
          className={`rounded-md p-2 ${
            isUnderline ? "bg-gray-200 dark:bg-gray-700" : ""
          }`}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
          }}
        >
          <MdFormatUnderlined />
        </button>
      </div>
      <div className="space-x-3">
        <button
          className={"rounded-md p-2"}
          onClick={() => handleHeading("h1")}
        >
          <BsTypeH1 />
        </button>
        <button
          className={"rounded-md p-2"}
          onClick={() => handleHeading("h2")}
        >
          <BsTypeH2 />
        </button>
        <button
          className={"rounded-md p-2"}
          onClick={() => handleHeading("h3")}
        >
          <BsTypeH3 />
        </button>
        <button
          className={"rounded-md p-2"}
          onClick={() =>
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
          }
        >
          <MdOutlineFormatListBulleted />
        </button>
        <button
          className={"rounded-md p-2"}
          onClick={() =>
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
          }
        >
          <MdOutlineFormatListNumbered />
        </button>
        <LinkPlugin />
        <button className={"rounded-md p-2"} onClick={onAddCodeBlock}>
          <MdCode />
        </button>
      </div>
      <div className="flex">
        <ImagePlugin />
        <YoutubePlugin />
      </div>
    </div>
  );
};

export default Toolbar;
