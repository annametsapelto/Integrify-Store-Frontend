import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { CartItemType } from "../../types/CartItemType";
import { ProductType } from "../../types/ProductType";
import { UserReducerType, UserType } from "../../types/UserType";
import { WritableDraft } from "immer/dist/internal";
import { createStore, RootState } from "../../redux/store";
import { authenticateCredentials, fetchAllUsers, loginUser } from "../../redux/reducers/userReducer";
import server from "../shared/server";

let store: ToolkitStore<RootState, AnyAction, [ThunkMiddleware<RootState, AnyAction, undefined>]>
    
beforeAll(() => {
    server.listen();
})

beforeEach(() => {
    store = createStore();
})

afterAll(() => {
    server.close();
})

describe("Test userReducer", () => {
    test("Should return initial state", () => {
        const initialState = store.getState().userReducer;
        expect(initialState.userList.length).toBe(0);
        expect(initialState.currentUser.name).toBe("Guest");
    }),
    test("Should fetch the user list", async() => {
        await store.dispatch(fetchAllUsers());
        const state = store.getState().userReducer;
        expect(state.userList.length).toBe(3)
    }),
    test("Should login user with right credentials", async () => {
        const credentials = {    
            email: "email@email.com",
            password: "word",
        }
        await store.dispatch(authenticateCredentials(credentials));
        const access_token = store.getState().userReducer.access_token as string;
        await store.dispatch(loginUser(access_token))
        const currentUser = store.getState().userReducer.currentUser
        expect(currentUser).toBeDefined();
    })
})