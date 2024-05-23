"use client";

import { useEffect, useState, useMemo, ReactNode } from "react";
import { CartContext } from "../context/cartContext";
import { IProduct } from "@/models/IProduct";

interface ContextWrapperProps {
  children: ReactNode;
}

export default function ContextWrapper({ children }: ContextWrapperProps) {
  const [cart, setCart] = useState<IProduct[]>(() => {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const cartData = useMemo(() => ({ cart, setCart }), [cart, setCart]);

  return (
    <CartContext.Provider value={cartData}>{children}</CartContext.Provider>
  );
}
