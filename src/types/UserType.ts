export interface CreateUserType {
    id: number
    email: string
    password: string
    name: string
    role: "admin" | "customer"
}

export interface UserType {
    id: number,
    name: string,
    role: "admin" | "customer",
    email: string,
    password: string,
    avatar: string 
}