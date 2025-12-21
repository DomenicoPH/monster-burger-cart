import { db } from "../data/db";
import type { Burger, CartItem } from "../types/types"

export type CartActions =
    { type: 'add-to-cart', payload: {item : Burger} } |
    { type: 'remove-from-cart', payload: {item : Burger['id']} } |
    { type: 'decrease-quantity', payload: {item : Burger['id']} } |
    { type: 'increase-quantity', payload: {item : Burger['id']} } |
    { type: 'clean-cart' }

export type CartState = {
    data: Burger[],
    cart: CartItem[]
};

export const initialState : CartState = {
    data: db,
    cart: []
};

const cartReducer = (
        state : CartState = initialState,
        action : CartActions    
    ) => {
        
        if(action.type === 'add-to-cart'){
            return {
                ...state
            }
        }

        if(action.type === 'remove-from-cart'){
            return {
                ...state
            }
        }

        if(action.type === 'decrease-quantity'){
            return {
                ...state
            }
        }

        if(action.type === 'increase-quantity'){
            return {
                ...state
            }
        }

        if(action.type === 'clean-cart'){
            return {
                ...state
            }
        }
    }