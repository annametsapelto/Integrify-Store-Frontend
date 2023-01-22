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
        expect(initialState).toBe(null)
})})