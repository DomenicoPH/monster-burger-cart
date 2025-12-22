import { useState, useEffect } from "react"
import type { CartItem } from "../types/types.ts"

export const useCart = () => {

    const initialCart = () : CartItem[] => {
      const localStorageCart = localStorage.getItem('cart');
      return localStorageCart ? JSON.parse(localStorageCart) : [];
    }

    const [cart, setCart] = useState(initialCart);

    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    function clearCart(){
      setCart([]);
    };

    // return
    return {
      cart,
      clearCart,
    }

}