import { ReactNode, useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";

interface ProtectedProps {
  children: ReactNode;
}

const Protected = ({ children }: ProtectedProps) => {
  const [user, loading] = useAuthState(auth);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      if (user) {
        try {
          const userDoc = doc(db, "UserProfile", user.uid); // Adjust collection name if different
          const docSnapshot = await getDoc(userDoc);

          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            const verified = userData.isVerified;
            setIsVerified(verified);

            if (!verified) {
              navigate("/profile"); // Redirect to profile if not verified
            }
          } else {
            console.error("User document not found in Firestore.");
            navigate("/profile"); // Redirect if no document found
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          navigate("/profile"); // Redirect on error
        }
      }
    };

    if (!loading && user) {
      fetchVerificationStatus();
    } else if (!loading && !user) {
      navigate("/auth/login"); // Redirect to login if not authenticated
    }
  }, [user, loading, navigate]);

  if (loading || isVerified === null) {
    return <p>Loading...</p>; // Optional: Add a loading indicator
  }

  if (!user || isVerified === false) {
    return null; // Prevent rendering of children while navigating
  }

  return <>{children}</>;
};

export default Protected;
