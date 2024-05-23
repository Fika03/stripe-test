"use client";

import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkoutform from "@/components/Checkoutform";
import { CartContext } from "@/context/cartContext";

const stripePromise = loadStripe(
  "pk_test_51PJVpKP6tQZA3rOxbjeakMIwsDUS0JcPuoiu3ReCDrgwuZIUxGSCYdTnu1mWWvPS9xkgfPaARNO1e0In7eaFzR8z009ld66fb2"
);

const Checkout = () => {
  const { cart } = useContext(CartContext); // Destructure cart from context
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart }),
        });

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    if (cart.length > 0) {
      fetchClientSecret();
    }
  }, [cart]);

  return (
    <div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <Checkoutform />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
