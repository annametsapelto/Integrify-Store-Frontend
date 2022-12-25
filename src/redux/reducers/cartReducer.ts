import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../../types/ProductType';

const initialState: ProductType[] = [];

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: {}
})

const CartReducer = cartSlice.reducer;
export default CartReducer;