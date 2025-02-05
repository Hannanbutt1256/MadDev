import { createAsyncThunk } from "@reduxjs/toolkit";
import { BlogPostInterface } from "../../types/post";
import { db } from "../../utils/firebase";
// import { collection, addDoc, getDocs, updateDoc } from "firebase/firestore";
import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

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
      toast.success("Post added successfully"); // Show a success toast

      // Include the Firestore-generated ID in the returned post object
      const postWithId = { ...newPost, id: docRef.id };
      // console.log("Added post with ID:", postWithId); // Log the post with ID for debugging
      return postWithId; // Return post with the generated Firestore ID
    } catch (error) {
      console.error("Error adding blog post to Firebase:", error);
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk for fetching all blog posts along with author name
interface FetchParams {
  lastVisible?: DocumentSnapshot | null;
}

export const fetchAllBlogPosts = createAsyncThunk<
  { posts: BlogPostInterface[]; lastVisible: DocumentSnapshot | null },
  FetchParams | void,
  { rejectValue: string }
>("blogPosts/fetchAll", async (params, { rejectWithValue }) => {
  try {
    const postsRef = collection(db, "blogPosts");
    let q = query(postsRef, orderBy("createdAt", "desc"), limit(10));

    if (params?.lastVisible) {
      q = query(
        postsRef,
        orderBy("createdAt", "desc"),
        startAfter(params.lastVisible),
        limit(10)
      );
    }

    const querySnapshot = await getDocs(q);
    const blogPosts: BlogPostInterface[] = [];
    const lastVisible =
      querySnapshot.docs[querySnapshot.docs.length - 1] || null;

    querySnapshot.docs.forEach((docSnapshot: QueryDocumentSnapshot) => {
      const data = docSnapshot.data();
      const postWithId = {
        id: docSnapshot.id,
        authorId: data.authorId,
        title: data.title,
        content: data.content,
        coverImage: data.coverImage,
        tags: data.tags,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        likes: data.likes || 0,
        comments: data.comments || [],
      };
      updateDoc(docSnapshot.ref, { id: docSnapshot.id });
      blogPosts.push(postWithId);
    });

    return { posts: blogPosts, lastVisible };
  } catch (error) {
    console.error("Error fetching blog posts from Firebase:", error);
    return rejectWithValue((error as Error).message);
  }
});
