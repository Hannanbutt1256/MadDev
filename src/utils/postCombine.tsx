import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { BlogPostInterface } from "../types/post";

export const useGetPostDataFromLocalStorage = (): BlogPostInterface | null => {
  const [user] = useAuthState(auth);
  const editorContent = localStorage.getItem("editorContent");
  const editPageDataString = localStorage.getItem("editPageData");

  if (!editorContent || !editPageDataString) {
    console.error("Missing data in localStorage.");
    return null;
  }

  try {
    const editPageData = JSON.parse(editPageDataString);
    const newPost: BlogPostInterface = {
      id: "",
      title: editPageData.title,
      authorId: user?.uid || "",
      content: editorContent,
      tags: editPageData.tags,
      coverImage: editPageData.coverImage || "",
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: [],
      comments: [],
    };
    localStorage.setItem("blogPosts", JSON.stringify(newPost));

    return newPost;
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
    return null;
  }
};
