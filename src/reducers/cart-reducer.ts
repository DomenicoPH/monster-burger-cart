import { db } from "../data/db";
import type { Burger, CartItem } from "../types/types"

export type CartActions =
    { type: 'add-to-cart', payload: {item : Burger} } |
    { type: 'remove-from-cart', payload: {id : Burger['id']} } |
    { type: 'decrease-quantity', payload: {id : Burger['id']} } |
    { type: 'increase-quantity', payload: {id : Burger['id']} } |
    { type: 'clear-cart' }

export type CartState = {
    data: Burger[],
    cart: CartItem[]
};

const initialCart = () : CartItem[] => {
  const localStorageCart = localStorage.getItem('cart');
  return localStorageCart ? JSON.parse(localStorageCart) : [];
}

export const initialState : CartState = {
    data: db,
    cart: initialCart()
};

const MIN_ITEMS = 1;
const MAX_ITEMS = 10;

export const cartReducer = (
        state : CartState = initialState,
        action : CartActions    
    ) => {
        
        if(action.type === 'add-to-cart'){
            
            const itemExists = state.cart.find(burger => burger.id === action.payload.item.id);
            
            let updatedCart : CartItem[] = [];

            if(itemExists){
              updatedCart = state.cart.map(item => {
                if(item.id === action.payload.item.id){
                    if(item.quantity < MAX_ITEMS){
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                } else {
                    return item
                }
              })
            } else {
              const newItem : CartItem = {...action.payload.item, quantity: 1};
              updatedCart = [...state.cart, newItem]
            }

            return {
                ...state,
                cart: updatedCart
            }
        }

        if(action.type === 'remove-from-cart'){
            const updatedCart = state.cart.filter(item => item.id !== action.payload.id);
            return {
                ...state,
                cart: updatedCart
            }
        }

        if(action.type === 'decrease-quantity'){

            const updatedCart = state.cart.map(item => {
              if(item.id === action.payload.id && item.quantity > MIN_ITEMS){
                return {
                  ...item,
                  quantity: item.quantity - 1
                }
              }
              return item;
            })

            return {
                ...state,
                cart: updatedCart
            }
        }

        if(action.type === 'increase-quantity'){

            const updatedCart = state.cart.map(item => {
              if(item.id === action.payload.id && item.quantity < MAX_ITEMS){
                return {
                  ...item,
                  quantity: item.quantity + 1
                }
              }
              return item;
            })

            return {
                ...state,
                cart: updatedCart
            }
        }

        if(action.type === 'clear-cart'){
            return {
                ...state,
                cart: []
            }
        }

        return state;
    }