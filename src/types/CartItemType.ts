import { ProductType } from "./ProductType";
export interface CartItemType {
    amount: number
    product: ProductType
    total: number
}