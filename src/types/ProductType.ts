import { CategoryType } from "./CategoryType"

export interface ProductType {
    id: number
    title: string
    description: string
    price: number
    category: CategoryType
    images: string[]
}

export interface CreatedProductType {
    title: string
    description: string
    price: number
    categoryId: number
    images: File|string
}
