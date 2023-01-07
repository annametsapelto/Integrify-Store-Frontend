import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType, CreatedProductType } from '../../types/ProductType';  
import axios, { AxiosResponse } from 'axios';

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

export const createProduct = createAsyncThunk (
    "createProduct",
    async (product: CreatedProductType) => {
        try {
            const response: AxiosResponse<ProductType, any>= await axios.post("https://api.escuelajs.co/api/v1/products", product);
            return response.data;
        } catch (e: any){
            throw new Error(e.message)
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
        },
        deleteItem: (state, action: PayloadAction<number>) => {
            return state.filter(item => item.id !== action.payload)
        },
        modifyProduct: (state, action: PayloadAction<ProductType>) => {
            const foundItem = state.find(item => item.id === action.payload.id);
            if (foundItem) {
                return state.map(item => {
                    if (item.id === action.payload.id) {
                        item = action.payload;
                    }
                    return item
                })
            } else {
                throw new Error("Item not found.");
            }
        },
        getOneProduct: (state, action: PayloadAction<number>) => {
            return state.filter(item => item.id === action.payload)
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
        build.addCase(createProduct.fulfilled, (state, action) => {
            if (action.payload) {
                state.push(action.payload);
            } else {
                return state;
            }
            
        })
    }
})

const productReducer = productSlice.reducer
export const { sortByNameAsc, sortByNameDesc, sortByPriceAsc, sortByPriceDesc, deleteItem, modifyProduct, getOneProduct } = productSlice.actions;
export default productReducer