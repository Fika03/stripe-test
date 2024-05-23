import { IProduct } from "@/models/IProduct";
import { createContext, Dispatch, SetStateAction } from "react";

interface CartContextType {
  cart: IProduct[];
  setCart: Dispatch<SetStateAction<IProduct[]>>;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
});
