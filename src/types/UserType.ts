export interface CreateUserType {
    email: string
    password: string
    password2: string
    name: string
    avatar: string
}

export interface UserType {
    id: number,    
    email: string,    
    password: string,
    name: string,
    role: Role,
    avatar: string 
}

export interface EditUserType {
    email: string
    password: string
    name: string
}

export interface UserReducerType {
    avatar: string,
    creationAt: string,
    email: string,
    id: number
    name: string,
    password: string,
    role: string,
    updatedAt: string,
}

export interface CredentialsType {
    email: string
    password: string
}

export interface ReturnedCredentialsType {
    access_token: string
    refresh_token: string
}


export type Role = "admin" | "customer"