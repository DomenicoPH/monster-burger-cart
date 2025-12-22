import { useState, useEffect, useMemo } from "react"
import type { Burger, CartItem } from "../types/types.ts"

export const useCart = () => {

    const initialCart = () : CartItem[] => {
      const localStorageCart = localStorage.getItem('cart');
      return localStorageCart ? JSON.parse(localStorageCart) : [];
    }

    const [cart, setCart] = useState(initialCart);

    const MIN_ITEMS = 1;
    const MAX_ITEMS = 10;

    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    function removeFromCart(id: Burger['id']){
      setCart(prevCart => prevCart.filter(burger => burger.id !== id));
    };

    function decreaseQuantity(id: Burger['id']){
      const updatedCart = cart.map(item => {
        if(item.id === id && item.quantity > MIN_ITEMS){
          return {
            ...item,
            quantity: item.quantity - 1
          }
        }
        return item;
      })
      setCart(updatedCart);
    };

    function increaseQuantity(id: Burger['id']){
      const updatedCart = cart.map(item => {
        if(item.id === id && item.quantity < MAX_ITEMS){
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }
        return item;
      })
      setCart(updatedCart);
    };

    function clearCart(){
      setCart([]);
    };

    // State derivado
    const isEmpty = cart.length === 0;
    const cartTotal = useMemo(() => cart.reduce( (total, item) => total + (item.price * item.quantity), 0 ), [cart]);

    // return
    return {
      cart,
      removeFromCart,
      decreaseQuantity,
      increaseQuantity,
      clearCart,
      isEmpty,
      cartTotal
    }

}