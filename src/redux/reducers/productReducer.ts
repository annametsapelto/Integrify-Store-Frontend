import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../../types/ProductType'; 

const initialState: ProductType[]  = []

export const fetchAllProducts = createAsyncThunk(
    "fetchAllProducts",
    async() => {
        try {
            const dataAsJson = await fetch("https://api.escuelajs.co/api/v1/products");
            const data = await dataAsJson.json();
            return data;
        } catch (e: any) {
            throw new Error(e.message);
        }
    }
)

const productSlice = createSlice({ 
    name: "productSlice",
    initialState: initialState,
    reducers: {
        addAll: (state, action) => {}
        },
    extraReducers: (build) => {
        build.addCase(fetchAllProducts.fulfilled, (state, action) => {
            return action.payload;
        } )
    }
})

const productReducer = productSlice.reducer
export default productReducer