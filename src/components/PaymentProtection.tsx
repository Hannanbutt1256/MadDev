import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const PaymentProtection: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const db = getFirestore();
        const userRef = doc(db, "UserProfile", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setIsSubscribed(userDoc.data().isSubscribed);
        }
      }
      setIsLoading(false);
    };

    checkSubscription();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isSubscribed) {
    navigate("/subscription");
    return null;
  }

  return <>{children}</>;
};

export default PaymentProtection;
