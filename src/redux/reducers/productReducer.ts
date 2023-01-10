import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType, CreatedProductType, UpdateProductType } from '../../types/ProductType';  
import axios, { AxiosError, AxiosResponse } from 'axios';

const initialState: ProductType[]  = []

export const fetchAllProducts = createAsyncThunk(
    "fetchAllProducts",
    async() => {
        try {
            const response = await axios.get("https://api.escuelajs.co/api/v1/products");
            const data: ProductType[] | Error = response.data;
            return data;
        } catch (e: any) {
            throw new Error(e.message);
        }
    }
)

export const modifyProduct = createAsyncThunk(
    "modifyproduct",
    async ({id, update}: UpdateProductType) => {
        try {
        const response: AxiosResponse<ProductType, any> = await axios.put(`https://api.escuelajs.co/api/v1/products${id}`, update);
        const data = response.data;
        return data;
    } catch (error: any) {
        throw new Error(error.message)
    }
}
)
export const createProduct = createAsyncThunk (
    "createProduct",
    async (product: CreatedProductType) => {
        console.log("Trying to create a product")
        try {
            const productImages = ["https://api.lorem.space/image?w=150&h=180",
            "https://api.lorem.space/image?w=150&h=180",
            "https://api.lorem.space/image?w=150&h=180"];
            product = {
                title: product.title, 
                price: product.price, 
                description:product.description, 
                categoryId: product.categoryId, 
                images: 
                productImages}
            const response: AxiosResponse<ProductType, any>= await axios.post("https://api.escuelajs.co/api/v1/products", product);
            console.log("We created product");
            return response.data;
        } catch (e: any){
            throw new Error(e.message)
        }
    }
)
export const deleteItem = createAsyncThunk(
    "deleteItem",
    async (id: number) => {
      try {
        const response = await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`);
        const data = await response.data;
        return data;
      } catch (error: any) {
        console.log(error.response.status, error.response.statusText);
      }
    }
  );

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
        getOneProduct: (state, action: PayloadAction<number>) => {
            return state.filter(item => item.id === action.payload)
        }
        },
    extraReducers: (build) => {
        build.addCase(deleteItem.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                return state;
            } else {
                return state.filter(item => item.id !== action.payload)
            }
        })
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
        build.addCase(modifyProduct.fulfilled, (state,action) => {
            if (action.payload instanceof AxiosError) {
                return state;
            } else {
                return state.map((product) => {
                    if (product.id === action.payload?.id) {
                        return action.payload;
                    }
                    return product;
                })
            }
        })
    }
})

const productReducer = productSlice.reducer
export const { sortByNameAsc, sortByNameDesc, sortByPriceAsc, sortByPriceDesc, getOneProduct } = productSlice.actions;
export default productReducer