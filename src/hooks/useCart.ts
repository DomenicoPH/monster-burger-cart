import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db.ts"
import type { Burger, CartItem } from "../types/types.ts"

export const useCart = () => {

    const initialCart = () : CartItem[] => {
      const localStorageCart = localStorage.getItem('cart');
      return localStorageCart ? JSON.parse(localStorageCart) : [];
    }

    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);

    const MIN_ITEMS = 1;
    const MAX_ITEMS = 10;

    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    function addToCart(item : Burger){

      const itemExists = cart.findIndex(burger => burger.id === item.id);
      if(itemExists >= 0){
        if(cart[itemExists].quantity >= MAX_ITEMS) return;
        const updatedCart = [...cart];
        updatedCart[itemExists].quantity++;
        setCart(updatedCart);
      } else {
        const newItem : CartItem = {...item, quantity: 1};
        setCart([...cart, newItem])
      }
    };

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
      data,
      cart,
      addToCart,
      removeFromCart,
      decreaseQuantity,
      increaseQuantity,
      clearCart,
      isEmpty,
      cartTotal
    }

}