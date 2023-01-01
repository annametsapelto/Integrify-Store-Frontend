import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CartItemType } from '../../types/CartItemType';

const initialState: CartItemType[] = [];

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const itemInCart = state.find((item) => item.product.id === action.payload.product.id);
            if (itemInCart) {
                const itemAmount = action.payload.amount;
                itemInCart.amount = itemInCart.amount + itemAmount;
            }
            else {
                state.push(action.payload);
            }
        },
        incrementAmount: (state, action) => {
            const item = state.find((item) => item.product.id === action.payload.product.id);
            if (item) {
                item.amount++;
            } else {
                return;
            }
        },
        decrementAmount: (state, action) => {
            const item = state.find((item) => item.product.id === action.payload.product.id);
            if (item) {
                item.amount--;
            }
        },
        removeItemFromCart: (state, action) => {
            const remove = state.filter(item => item.product.id !== action.payload);
            state = remove;
        },
        removeAllItems: (state) => {
            state.length = 0;
        },
    },
    extraReducers: {}
})

const CartReducer = cartSlice.reducer;
export const { addItemToCart, removeAllItems, incrementAmount, decrementAmount, removeItemFromCart } = cartSlice.actions;
export default CartReducer;