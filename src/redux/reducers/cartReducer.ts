import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemType } from '../../types/CartItemType';

const initialState: CartItemType[] = [];

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<CartItemType>) => {
            let itemFoundInCart = false;
            let amountInCart = 0;
            state.forEach(item => {
                if (item.product.id === action.payload.product.id) {
                    itemFoundInCart = true;
                    amountInCart = item.amount;
                }
            })
            let newItem: CartItemType = {
                amount: amountInCart +1,
                product: action.payload.product
            }
            if (itemFoundInCart) {
                return state.map(item => item.product.id === action.payload.product.id ? newItem : item);
            } else {
                return [...state, newItem]
            }
        },
        removeItemFromCart: (state, action: PayloadAction<CartItemType>) => {
            let amountInCart = 0;
            state.forEach(item => {
                if (item.product.id !== action.payload.product.id) {
                    amountInCart = item.amount;
                }
            })
            if (amountInCart === 1) {
                return state.filter(item => item.product.id !== action.payload.product.id);
            } else {
                let newItem: CartItemType = {
                    product: action.payload.product,
                    amount: amountInCart -1
                }
                return state.map(item => item.product.id === action.payload.product.id ? newItem : item)
            }
        },
        removeAllItems: (state) => {
            state.length = 0;
        },
    }
})

export default cartSlice.reducer;
export const { addItemToCart, removeAllItems, removeItemFromCart } = cartSlice.actions;
