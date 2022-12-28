import { createProduct, deleteItem, fetchAllProducts, sortByNameDesc, sortByPriceAsc } from "../../redux/reducers/productReducer";
import {store} from "../../redux/store";
import { CreatedProductType } from "../../types/ProductType";
import server from "../shared/server";

server.listen()

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
        expect(store.getState().productReducer.length).toBe(4);
        expect(store.getState().productReducer[3].title).toBe("Huge monitor");
    })
    test("Should delete a product from the list and return a shorter list.", () => {
        store.dispatch(deleteItem(3));
        expect(store.getState().productReducer.length).toBe(3);
    })
   /* test("Should sort by price asc", () => {
        store.dispatch(sortByNameDesc);
        console.log("sorted: " + store.getState().productReducer[0])
        expect(store.getState().productReducer[0].title).toBe("Carving");
    }) */
})