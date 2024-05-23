import Cart from "@/components/Cart";
import ProductContainer from "@/components/ProductContainer";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-5xl text-gray-500">Stripe webshop</h1>
      <div className="z-10 w-full max-w-5xl items-center font-mono text-sm lg:flex flex-col justify-between">
        <ProductContainer />
        <Link href={"checkout"}>
          <button className="mt-10 bg-gray-600 p-2 rounded">Checkout</button>
        </Link>
        <Cart />
      </div>
    </main>
  );
}
