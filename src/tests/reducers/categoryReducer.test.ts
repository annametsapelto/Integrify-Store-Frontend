import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { fetchAllCategories } from "../../redux/reducers/categoryReducer";
import {createStore, RootState} from "../../redux/store";
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

 describe("Test all actions", () => 
    test("Should return 0 as the initial state length", () => {
        expect(store.getState().categoryReducer.length).toBe(0);
    })),
    test("Should return three as the categories length", async () => {
        await store.dispatch(fetchAllCategories());
        expect(store.getState().categoryReducer.length).toBe(3)
    })