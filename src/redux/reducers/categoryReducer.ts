import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CategoryType } from "../../types/CategoryType";

const initialState: CategoryType[] = [];

export const fetchAllCategories = createAsyncThunk(
  "fetchAllCategories",
  async () => {
    try {
      const response = await axios.get("https://api.escuelajs.co/api/v1/categories");
      const data: CategoryType[] | Error = await response.data;
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "categorySlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchAllCategories.fulfilled, (state, action) => {
      if ("message" in action.payload && action.payload) {
        return state;
      } else if (!action.payload) {
        return state;
      } else {
        return action.payload;
      }
    });
  },
});

const categoryReducer = categorySlice.reducer;
export default categoryReducer;