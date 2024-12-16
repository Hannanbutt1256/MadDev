import { useRef, useState } from "react";
import { MdOutlineImage } from "react-icons/md";
import Modal from "../../Modal";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createImageNode } from "../nodes/ImageNode";
import { $insertNodes } from "lexical";

const CloudinaryUrl = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;
const CloudinaryUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET1;

export default function ImagePlugin() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setURL] = useState("");
  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);

  const [editor] = useLexicalComposerContext();

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CloudinaryUploadPreset); // Replace with your Cloudinary upload preset.

    try {
      const response = await fetch(
        CloudinaryUrl, // Replace with your Cloudinary cloud name.
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      return data.secure_url; // URL of the uploaded image.
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };

  const onAddImage = async () => {
    let src = "";

    if (file) {
      try {
        src = await uploadToCloudinary(file); // Upload the file to Cloudinary.
      } catch (error) {
        console.error("Error adding image:", error);
        return;
      }
    } else if (url) {
      src = url;
    }

    console.log("Adding image with src:", src); // Debug log

    editor.update(() => {
      const node = $createImageNode({
        src,
        altText: "Uploaded Image",
        maxWidth: 400,
      });
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
