import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { createProduct, deleteItem, fetchAllProducts, sortByNameDesc, sortByPriceAsc } from "../../redux/reducers/productReducer";
import {createStore, RootState} from "../../redux/store";
import { CreatedProductType, ProductType } from "../../types/ProductType";
import { UserReducerType, UserType } from "../../types/UserType";
import server from "../shared/server";
import { WritableDraft } from "immer/dist/internal";
import { CartItemType } from "../../types/CartItemType";

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

describe("Test all actions", () => {
    test("Should return initial state which is empty", () => {
        expect(store.getState().productReducer.length).toBe(0)
    })
    test("Should fetch all products", async () => {
        await store.dispatch(fetchAllProducts())
        expect(store.getState().productReducer.length).toBe(3)
    })
    test("Should add a new product and make the list of products longer.", async () => {
        const testProduct: CreatedProductType = {title: "Huge monitor", price: 445, description: "A huge monitor.", categoryId: 2, images: []};
        await store.dispatch(createProduct(testProduct));
        expect(store.getState().productReducer.length).toBe(1);
        expect(store.getState().productReducer[0].title).toBe("Huge monitor");
    })
    test("Should delete a product from the list and return a shorter list.", async () => {
        await store.dispatch(fetchAllProducts())
        store.dispatch(deleteItem(2));
        expect(store.getState().productReducer.length).toBe(2);
    })
   /* test("Should sort by price asc", () => {
        store.dispatch(sortByNameDesc);
        console.log("sorted: " + store.getState().productReducer[0])
        expect(store.getState().productReducer[0].title).toBe("Carving");
    }) */
})