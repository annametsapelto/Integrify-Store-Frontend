import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { UserType, CreateUserType, UserReducerType, CredentialsType, ReturnedCredentialsType } from '../../types/UserType';

const initialState: UserReducerType = {
    userList: [],
    currentUser: {
        id: 0,
        name: "Guest",
        role: "customer",
        email: "",
        password: "",
        avatar: ""
    }
}

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
        console.log("We have gotten data ")
        const result = await thunkAPI.dispatch(loginUser(data.access_token));
        console.log(result.payload as UserType)
        return result.payload as UserType;
      } catch (e) {
        const error = e as AxiosError;
        return error
      }
    }
)
export const editUserServer = createAsyncThunk(
    "editUserServer",
    async (user: UserType) => {
        try {
            const response = await axios.put("https://api.escuelajs.co/api/v1/users/" + user.id,
            {
              email: user.email,
              password: user.password,
              name: user.name,
            }
          );
          return response.data;
        } catch (e) {
          throw new Error("Could not edit user");
        }
      }
    );

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


const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
      logoutUser: (state)  => {
        state = initialState;
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
            state.currentUser = action.payload;
        }})
        build.addCase(loginUser.fulfilled, (state, action) => {
          if (action.payload instanceof AxiosError) {
            return state;
        } else {
          console.log("Successfully logged in.")
          state.currentUser = action.payload;
        }
      })
/*        build.addCase(editUserServer.fulfilled, (state, action: PayloadAction<UserType>) => {
            return action.payload;
        }); */
        build.addCase(fetchAllUsers.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                return state;
            } else {
                state.userList = action.payload;
            }
        })
    }
})

export default userSlice.reducer;
export const { } = userSlice.actions;