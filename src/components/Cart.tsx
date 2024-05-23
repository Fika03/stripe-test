"use client";

import { CartContext } from "@/context/cartContext";
import { IProduct } from "@/models/IProduct";
import React, { useContext } from "react";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  return (
    <>
      <h3 className="mt-[150px] text-xl">Total: {getTotalPrice()} kr.</h3>
      <div className="overflow-scroll max-h-[500px] mt-8">
        {cart.map((product: IProduct, index: number) => (
          <div key={index} className="border-t border-gray-600 w-[500px] py-6">
            <p>{product.name}</p>
            <p>{product.price} kr.</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cart;
