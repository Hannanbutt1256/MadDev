import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const CheckoutForm: React.FC = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const totalAmount = 50; // Example amount in USD

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:3000/stripe/create-payment-intent",
          {
            amount: totalAmount * 100, // Convert to cents
            currency: "usd",
          }
        );
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    fetchClientSecret();
  }, [totalAmount]);

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe is not loaded!");
      return;
    }

    if (!clientSecret) {
      toast.error("Client secret not found!");
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (result.error) {
      console.error(result.error.message);
      toast.error(`Payment failed: ${result.error.message}`);
    } else if (result.paymentIntent?.status === "succeeded") {
      toast.success("Payment successful!");
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const db = getFirestore();
          const userRef = doc(db, "UserProfile", user.uid);
          await updateDoc(userRef, {
            isSubscribed: true,
          });
        }
        navigate("/success");
      } catch (error) {
        console.error("Error updating subscription status:", error);
      }
    }
  };

  return (
    <div className=" mt-5 px-16 py-10 bg-light-background dark:bg-black ">
      <h2 className="text-2xl font-bold text-center mb-4">Checkout</h2>
      <p className="text-lg font-semibold text-gray-700 text-center">
        Total Amount:
        <span className="text-green-600">${totalAmount.toFixed(2)}</span>
      </p>
      <form onSubmit={handlePayment} className="mt-6">
        <div className="p-4 bg-white border rounded-lg shadow-sm">
          <CardElement
            className="text-gray-700 w-96"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#495057",
                  fontFamily: "'Inter', sans-serif",
                  "::placeholder": {
                    color: "#ced4da",
                  },
                },
                invalid: {
                  color: "#e3342f",
                },
              },
            }}
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition duration-300"
          disabled={!stripe}
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
