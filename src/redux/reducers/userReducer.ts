import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserType } from '../../types/UserType';

const initialState: UserType[] = [];

const userSlice = createSlice({
    name: "userSlice",
    initialState: initialState,
    reducers: {}
})

const userReducer = userSlice.reducer;
export default userReducer;