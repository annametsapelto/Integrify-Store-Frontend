import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import {createStore} from "../../redux/store";
import { CreatedProductType, ProductType } from "../../types/ProductType";
import { CartItemType } from "../../types/CartItemType";
import { WritableDraft } from "immer/dist/internal";
import { UserType } from "../../types/UserType";
import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { addItemToCart, removeAllItems, removeItemFromCart } from "../../redux/reducers/cartReducer";

let store: ToolkitStore<{
    productReducer: WritableDraft<ProductType>[];
    userReducer: UserType;
    cartReducer: CartItemType[];
}, AnyAction, [ThunkMiddleware]>

beforeEach(() => {
    store = createStore(); 
 })

 describe("Test all actions", () => {
    test("Should return initial state which is empty", () => {
        expect(store.getState().cartReducer.length).toBe(0);
    }),
    test("Should add an item in the cart and make array length 1", () => {
        const testProduct: CreatedProductType = {title: "Huge monitor", price: 445, description: "A huge monitor.", categoryId: 2, images: []};
        store.dispatch(addItemToCart(testProduct));
        expect(store.getState().cartReducer.length).toBe(1);
    }),
    test("Should remove one item from the cart and give length of 0", () => {
        const testProduct: CartItemType = {
            amount: 2,
            product: {
            id: 1,
            title: "Apple",
            price: 33,
            description: "A description",
            images: [],
            category: {
                id: 3,
                name: "Furniture",
                image: ""
            }} 

        };
        store.dispatch(addItemToCart(testProduct));
        store.dispatch(removeItemFromCart(1));
        expect(store.getState().cartReducer.length).toBe(0);
    }),
    test("Should remove all items from the cart and give length of 0", () => {
        const testProduct1: CartItemType = {
            amount: 1,
            product: {
            id: 1,
            title: "Apple",
            price: 33,
            description: "A description",
            images: [],
            category: {
                id: 3,
                name: "Furniture",
                image: ""
            }}

        };
        const testProduct2: CartItemType = {
            amount: 3,
            product: {
            id: 2,
            title: "Carving",
            price: 55,
            description: "A description",
            images: [],
            category: {
                id: 3,
                name: "Furniture",
                image: ""
            }}

        }
        store.dispatch(addItemToCart(testProduct1));
        store.dispatch(addItemToCart(testProduct2));
        store.dispatch(removeAllItems());
        expect(store.getState().cartReducer.length).toBe(0);
    })
})