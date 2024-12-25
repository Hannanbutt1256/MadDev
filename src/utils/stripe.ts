import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const initiateCheckout = async (sessionId: string) => {
  const stripe = await stripePromise;
  if (stripe) {
    await stripe.redirectToCheckout({ sessionId });
  } else {
    console.error("Stripe.js has not loaded.");
  }
};
