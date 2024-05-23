"use client";

import React, { useState, useEffect, useContext } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkoutform from "@/components/Checkoutform";
import { CartContext } from "@/context/cartContext";

const stripePromise = loadStripe(
  "pk_test_51PJVpKP6tQZA3rOxbjeakMIwsDUS0JcPuoiu3ReCDrgwuZIUxGSCYdTnu1mWWvPS9xkgfPaARNO1e0In7eaFzR8z009ld66fb2"
);

const Checkout = () => {
  const { cart } = useContext(CartContext); // Destructure cart from context
  const [clientSecret, setClientSecret] = useState("");
  const [total, setTotal] = useState(0);

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
        setTotal(data.totalAmount / 100);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    if (cart.length > 0) {
      fetchClientSecret();
    }
  }, [cart]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "night",
    },
  };

  return (
    <div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <Checkoutform />
          Total: {total} kr.
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
