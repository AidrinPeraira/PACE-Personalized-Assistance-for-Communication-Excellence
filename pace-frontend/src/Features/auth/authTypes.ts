export interface User{
    id:string
    name:string
    email:string
}

export interface AuthState{
    user:User|null
    token:string|null
    loading:boolean
    error:string|null
}


export interface LoginPayload{
    email:string
    password:string
}


export interface RegisterPayload {
    username:string
    email:string
    password:string
    batch : string
}


export interface RegisterResponse {
        username : string,
        email : string,
        batch : string,
        role : string
}
