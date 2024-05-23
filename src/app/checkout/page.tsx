"use client";
import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkoutform from "@/components/Checkoutform";
import { CartContext } from "@/context/cartContext";
import { IProduct } from "@/models/IProduct";

const stripePromise = loadStripe(
  "pk_test_51PJVpKP6tQZA3rOxbjeakMIwsDUS0JcPuoiu3ReCDrgwuZIUxGSCYdTnu1mWWvPS9xkgfPaARNO1e0In7eaFzR8z009ld66fb2"
);

const Checkout = ({ searchParams }: any) => {
  const { cart } = useContext(CartContext); // Destructure cart from context
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const fetchClientSecret = async () => {
      const response = await fetch("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cart),
      });

      const data = await response.json();
      setClientSecret(data.clientSecret);
      console.log(data); // Log the response data
    };

    fetchClientSecret();
  }, [cart]); // Include cart in the dependency array to refetch if cart changes

  return (
    <div className="App">
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <Checkoutform />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
