import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CartItemType } from '../../types/CartItemType';

const initialState: CartItemType[] = [];

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: initialState,
    reducers: {
        addItemToCart: (state, action) => {
            let itemFoundInCart = false;
            let amountInCart = 0;
            state.forEach(item => {
                if (item.product.id === action.payload.id) {
                    itemFoundInCart = true;
                    amountInCart = item.amount;
                }
            })
            let newItem: CartItemType = {
                product: action.payload,
                amount: amountInCart +1
            }
            if (itemFoundInCart) {
                return state.map(item => item.product.id === action.payload.id ? newItem : item);
            } else {
                return [...state, newItem]
            }
        },
        removeItemFromCart: (state, action) => {
            let amountInCart = 0;
            state.forEach(item => {
                if (item.product.id !== action.payload.id) {
                    amountInCart = item.amount;
                }
            })
            if (amountInCart === 1) {
                return state.filter(item => item.product.id !== action.payload.id);
            } else {
                let newItem: CartItemType = {
                    product: action.payload,
                    amount: amountInCart -1
                }
                return state.map(item => item.product.id === action.payload.id ? newItem : item)
            }
        },
        removeAllItems: (state) => {
            state.length = 0;
        },
    }
})

export default cartSlice.reducer;
export const { addItemToCart, removeAllItems, removeItemFromCart } = cartSlice.actions;
