import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { UserType, CreateUserType, UserReducerType, CredentialsType, ReturnedCredentialsType } from '../../types/UserType';

const initialState: UserType = null as unknown as UserType;

export const fetchAllUsers = createAsyncThunk(
    "fetchAllUsers",
    async () => {
        try {
            const response = await axios.get("https://api.escuelajs.co/api/v1/users/")
            const data: UserType[] = response.data;
            return data;
        }
         catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)

export const authenticateCredentials = createAsyncThunk(
    "authenticateCredentials",
    async ({email, password}: CredentialsType, thunkAPI) => {
      try {
        const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", {email, password})
        const data: ReturnedCredentialsType = response.data;
        localStorage.setItem("access_token", JSON.stringify(data.access_token));
        const result = await thunkAPI.dispatch(loginUser(data.access_token));
        return result.payload as UserType;
      } catch (e: any) {
        const error = e as AxiosError;
        return error;
      }
    }
)
      export const loginUser = createAsyncThunk(
        "loginUser",
        async (access_token: string) => {
          try {
            const response = await axios.get(
              "https://api.escuelajs.co/api/v1/auth/profile", {
                headers: {
                  "Authorization": `Bearer ${access_token}`
                }
              }
            );
            const data: UserType = await response.data;
              return data;
          } catch (e) {
            throw new Error("Login failed");
          }
        }
      )

    export const createUser = createAsyncThunk(
        "createUser",
        async (user: CreateUserType) => {
          try {
            const newUser = {...user, avatar: "https://assets.website-files.com/61a3c3005e14bffd1c77eea9/62f663daea0370913f60c76e_profile-photo-hero.webp"}
            const response = await axios.post(
              "https://api.escuelajs.co/api/v1/users/", newUser);
            return response.data;
          } catch (e) {
            throw new Error("Cannot add new user");
          }
        }
      );
      
const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
      logoutUser: (state)  => {
        state = initialState;
        localStorage.removeItem("access_token");
        localStorage.removeItem('user');
      }
    },
     extraReducers: (build) => {
        build.addCase(createUser.fulfilled, (state, action) => {
          return state;
        })
        build.addCase(authenticateCredentials.fulfilled, (state, action) => {
          if (action.payload instanceof AxiosError) {
            return state;
        } else {
            localStorage.setItem('user', JSON.stringify(action.payload));
            console.log("We have a user")
        }})
        build.addCase(authenticateCredentials.rejected, (state, action) => {
          console.log("Error fetching data")
          return state
      })
        build.addCase(loginUser.fulfilled, (state, action) => {
          if (action.payload instanceof AxiosError) {
            return state;
        }
      })
        build.addCase(fetchAllUsers.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                return state;
            } else {
            }
        })
    }
})

export default userSlice.reducer;
export const { logoutUser} = userSlice.actions;