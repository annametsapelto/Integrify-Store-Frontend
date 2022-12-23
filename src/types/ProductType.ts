import { CategoryType } from "./CategoryType"

export interface ProductType {
    id: number
    title: string
    description: string
    price: number
    category: CategoryType
    images: string[]
}