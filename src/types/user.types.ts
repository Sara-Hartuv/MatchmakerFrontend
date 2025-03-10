export type UserType = {
    email: string,
    password: string
}

export type AuthUser = {
    user: UserType,
    token: string
}