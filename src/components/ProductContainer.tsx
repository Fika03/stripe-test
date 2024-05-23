import { IProduct } from "@/models/IProduct";
import React from "react";
import ProductCard from "./ProductCard";

const products: IProduct[] = [
  {
    id: 1,
    name: "Tröja",
    image: "/tshirt.avif",
    price: 199,
  },
  {
    id: 2,
    name: "Brallor",
    image: "/jeans.jpg",
    price: 399,
  },
  {
    id: 3,
    name: "Fillingar",
    image: "/boxers.jpg",
    price: 79,
  },
];

const ProductContainer = () => {
  return (
    <section className="h-11/12 flex flex-col w-full justify-center">
      <h2 className="text-3xl">Products</h2>
      <article className="grid grid-cols-3 justify-center w-full">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </article>
    </section>
  );
};

export default ProductContainer;
