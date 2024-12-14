import Editor from "../components/Editor/Editor";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen">
      <Editor />
      <button
        onClick={() => {
          navigate("/preview");
        }}
      >
        Preview
      </button>
    </div>
  );
};

export default CreatePostPage;
