"use client";

import { IProduct } from "@/models/IProduct";
import React, { useContext } from "react";
import Image from "next/image";
import { CartContext } from "@/context/cartContext";

interface IProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProductCardProps) => {
  const { cart, setCart } = useContext(CartContext);

  const addToCart = (product: IProduct) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    console.log(`${product.name} has been added to the cart.`);
  };

  return (
    <article
      className="flex flex-col justify-center items-center cursor-pointer"
      onClick={() => addToCart(product)}
    >
      <span>{product.name}</span>
      <Image height={50} width={100} src={product.image} alt={product.name} />
      <span>{product.price} kr.</span>
    </article>
  );
};

export default ProductCard;
