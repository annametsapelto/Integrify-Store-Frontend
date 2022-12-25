import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../../types/ProductType'; 

const initialState: ProductType[]  = []

export const fetchAllProducts = createAsyncThunk(
    "fetchAllProducts",
    async() => {
        try {
            const dataAsJson = await fetch("https://api.escuelajs.co/api/v1/products");
            const data: ProductType[] | Error = await dataAsJson.json();
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
        sortByNameAsc: (state) => {
            state.sort((a, b) => a.title.localeCompare(b.title))
        },
        sortByNameDesc: (state) => {
            state.sort((a, b) => b.title.localeCompare(a.title))
        },
        sortByPriceAsc: (state) => {
            state.sort((a, b) => a.price - b.price)
        },
        sortByPriceDesc: (state) => {
            state.sort((a, b) => b.price - a.price)
        }
        },
    extraReducers: (build) => {
        build.addCase(fetchAllProducts.fulfilled, (state, action) => {
            if (action.payload && "message" in action.payload) {
                return state; 
            } else if (!action.payload) {
                return state;
            } else {                
                return action.payload;
            }
        } )
        build.addCase(fetchAllProducts.rejected, (state, action) => {
            console.log("There is an error in fetching the data.");
            return state;
        })
    }
})

const productReducer = productSlice.reducer
export const { sortByNameAsc, sortByNameDesc, sortByPriceAsc, sortByPriceDesc } = productSlice.actions;
export default productReducer