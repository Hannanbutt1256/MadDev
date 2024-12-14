import { useRef, useState } from "react";
import { MdOutlineImage } from "react-icons/md";
import Modal from "../../Modal";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createImageNode } from "../nodes/ImageNode";
import { $insertNodes } from "lexical";

export default function ImagePlugin() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setURL] = useState("");
  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);

  const [editor] = useLexicalComposerContext();

  const onAddImage = () => {
    let src = "";
    if (url) src = url;
    if (file) src = URL.createObjectURL(file);
    console.log("Adding image with src:", src); // Debug log

    editor.update(() => {
      const node = $createImageNode({ src, altText: "Dummy text" });
      $insertNodes([node]);
    });
    setFile(undefined);
    setURL("");
    setIsOpen(false);
  };

  return (
    <div>
      {/* Icon Button */}
      <button
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        aria-label="Add Image"
        onClick={() => setIsOpen(true)}
      >
        <MdOutlineImage />
      </button>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setFile(file);
          }
          e.target.files = null;
        }}
      />

      {/* Modal */}
      {isOpen && (
        <Modal
          title="Add Image"
          onClose={() => setIsOpen(false)}
          footer={
            <button
              className={`px-4 py-2 text-white rounded ${
                !url && !file ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={!url && !file}
              onClick={onAddImage}
            >
              Add Image
            </button>
          }
        >
          <input
            value={url}
            onChange={(e) => setURL(e.target.value)}
            placeholder="Add Image URL"
            className="w-full p-2 border rounded outline-none focus:ring focus:ring-blue-300 dark:bg-black"
          />
          <button
            className="w-full mt-4 px-4 py-2  text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => inputRef?.current?.click()}
          >
            {file ? file.name : "Upload Image"}
          </button>
        </Modal>
      )}
    </div>
  );
}
