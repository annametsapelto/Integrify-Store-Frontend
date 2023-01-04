export interface CreateUserType {
    email: string
    password: string
    name: string
    avatar: string
}

export interface UserType {
    id: number,
    name: string,
    role: "admin" | "customer",
    email: string,
    password: string,
    avatar: string 
}