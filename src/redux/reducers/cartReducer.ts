import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../../types/ProductType';

const initialState: ProductType[] = [];

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: initialState,
    reducers: {
        addItemToCart: (state, action) => {
            if (action.payload) {
                state.push(action.payload);
            }
            else {
                return state;
            }
        },
        removeItemFromCart: (state, action) => {
            return state.filter(item => item.id !== action.payload)
        },
        removeAllItems: (state) => {
            state.length = 0;
        },
    },
    extraReducers: {}
})

const CartReducer = cartSlice.reducer;
export const { addItemToCart, removeAllItems, removeItemFromCart } = cartSlice.actions;
export default CartReducer;