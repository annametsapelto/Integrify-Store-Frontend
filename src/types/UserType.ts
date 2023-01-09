export interface CreateUserType {
    email: string
    password: string
    password2: string
    name: string
    avatar: string
}

export interface UserType {
    id: number,
    name: string,
    role: Role,
    email: string,
    password: string,
    avatar: string 
}

export interface EditUserType {
    email: string
    password: string
    name: string
}

export interface UserReducerType {
    userList: UserType[]
    currentUser: UserType
    access_token?: string
}

export interface CredentialsType {
    email: string
    password: string
}

export interface ReturnedCredentialsType {
    access_token: string
}


export type Role = "admin" | "customer"