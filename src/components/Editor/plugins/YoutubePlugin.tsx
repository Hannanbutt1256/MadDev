import { useState } from "react";
import { PiYoutubeLogoFill } from "react-icons/pi";
import Modal from "../../Modal";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertNodes } from "lexical";
import { $createYoutubeNode } from "../nodes/YoutubeNode";

export default function YoutubePlugin() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setURL] = useState("");

  const [editor] = useLexicalComposerContext();

  const onEmbed = () => {
    if (!url) return;
    const match =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/.exec(url);

    const id = match && match?.[2]?.length === 11 ? match?.[2] : null;
    if (!id) return;

    editor.update(() => {
      const node = $createYoutubeNode({ id });
      $insertNodes([node]);
    });

    setURL("");
    setIsOpen(false);
  };

  return (
    <div>
      {/* Icon Button */}
      <button
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        aria-label="Embed Youtube Video"
        onClick={() => setIsOpen(true)}
      >
        <PiYoutubeLogoFill className=" text-red-500" />
      </button>

      {/* Modal */}
      {isOpen && (
        <Modal
          title="Embed Youtube Video"
          onClose={() => setIsOpen(false)}
          footer={
            <button
              className={`px-4 py-2 text-white rounded ${
                !url ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
              }`}
              disabled={!url}
              onClick={onEmbed}
            >
              Embed
            </button>
          }
        >
          <input
            value={url}
            onChange={(e) => setURL(e.target.value)}
            placeholder="Add Youtube URL"
            className="w-full p-2 border rounded outline-none focus:ring focus:ring-red-300 dark:bg-black"
          />
        </Modal>
      )}
    </div>
  );
}
