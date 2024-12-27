import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useState, useCallback } from "react";
import { MdLink } from "react-icons/md";
import Modal from "../../Modal"; // Import your Modal component
import { toast } from "react-toastify";

const LinkPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLinkUrl(event.target.value);
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const insertLink = useCallback(() => {
    if (linkUrl && isValidUrl(linkUrl)) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
        url: linkUrl.trim(),
        target: "_blank",
      });
      closeModal();
      setLinkUrl("");
    } else {
      toast.error("Please enter a valid URL.");
    }
  }, [editor, linkUrl]);

  return (
    <>
      <button onClick={openModal} className="rounded-md p-2">
        <MdLink />
      </button>

      {isModalOpen && (
        <Modal title="Insert Link" onClose={closeModal}>
          <div>
            <label
              htmlFor="linkUrl"
              className="block text-sm font-semibold dark:text-white"
            >
              URL
            </label>
            <input
              type="url"
              id="linkUrl"
              value={linkUrl}
              onChange={handleUrlChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md dark:bg-dark-card dark:text-white"
              placeholder="Enter the URL"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={insertLink}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Insert Link
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default LinkPlugin;
