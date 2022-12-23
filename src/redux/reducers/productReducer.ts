import { createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../../types/ProductType'; 

const initialState: ProductType[]  = []

const productSlice = createSlice({ 
    name: "productSlice",
    initialState: initialState,
    reducers: {

    }
})

const productReducer = productSlice.reducer
export default productReducer