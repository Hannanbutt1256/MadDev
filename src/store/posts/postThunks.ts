import { createAsyncThunk } from "@reduxjs/toolkit";
import { BlogPostInterface } from "../../types/post";
import { db } from "../../utils/firebase";
import { collection, addDoc, getDocs, updateDoc } from "firebase/firestore";

// Async thunk for adding a blog post to Firebase
export const addBlogPost = createAsyncThunk(
  "blogPosts/add",
  async (newPost: BlogPostInterface, { rejectWithValue }) => {
    try {
      // Add the new post to Firestore (without the ID)
      const docRef = await addDoc(collection(db, "blogPosts"), {
        ...newPost, // Here, no ID is included yet
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 0, // Initialize likes to 0
        comments: [], // Initialize comments as an empty array
      });

      // Include the Firestore-generated ID in the returned post object
      return { ...newPost, id: docRef.id }; // Return post with the generated Firestore ID
    } catch (error) {
      console.error("Error adding blog post to Firebase:", error);
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk for fetching all blog posts along with author name
export const fetchAllBlogPosts = createAsyncThunk<
  BlogPostInterface[],
  void,
  { rejectValue: string }
>("blogPosts/fetchAll", async (_, { rejectWithValue }) => {
  try {
    // Fetch all posts from the Firestore 'blogPosts' collection
    const querySnapshot = await getDocs(collection(db, "blogPosts"));
    const blogPosts: BlogPostInterface[] = [];

    // Loop through each blog post document
    for (const docSnapshot of querySnapshot.docs) {
      const data = docSnapshot.data();

      updateDoc(docSnapshot.ref, { id: docSnapshot.id });

      // Push the blog post data along with authorName
      blogPosts.push({
        id: docSnapshot.id,
        authorId: data.authorId, // Include the author's name
        title: data.title,
        content: data.content,
        coverImage: data.coverImage,
        tags: data.tags,
        createdAt: data.createdAt.toDate(), // Assuming createdAt is a Firestore timestamp
        updatedAt: data.updatedAt.toDate(), // Assuming updatedAt is a Firestore timestamp
        likes: data.likes,
        comments: data.comments,
      });
    }

    return blogPosts;
  } catch (error) {
    console.error("Error fetching blog posts from Firebase:", error);
    return rejectWithValue((error as Error).message);
  }
});
