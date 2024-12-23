// components/AuthorName.tsx

import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";

interface AuthorNameProps {
  authorId: string | undefined;
}

const AuthorName = ({ authorId }: AuthorNameProps) => {
  const [authorName, setAuthorName] = useState<string>("Unknown Author");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAuthorName = async () => {
      if (!authorId) {
        setLoading(false);
        return;
      }

      try {
        const authorDocRef = doc(db, "UserProfile", authorId);
        const authorDocSnapshot = await getDoc(authorDocRef);

        if (authorDocSnapshot.exists()) {
          const authorData = authorDocSnapshot.data();
          setAuthorName(authorData?.username || "Unknown Author");
        }
      } catch (error) {
        console.error("Error fetching author name:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorName();
  }, [authorId]);

  if (loading) return <span>Loading author...</span>;

  return <span>{authorName}</span>;
};

export default AuthorName;
