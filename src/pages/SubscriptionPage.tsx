import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const SubscriptionPage = () => {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-background dark:bg-black text-light-text dark:text-dark-text">
      <div className="bg-light-card dark:bg-dark-card p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Subscription Page</h1>
        {isSubscribed ? (
          <p className="text-lg mb-6">You are already subscribed!</p>
        ) : (
          <>
            <p className="text-lg mb-2">Get lifetime access to MadDev++!</p>
            <p className="text-lg mb-6">
              With MadDev++, you will have lifetime access to our exclusive
              podcast feature.
            </p>
            <button
              onClick={() => navigate("/payment")}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              Subscribe Now
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;
