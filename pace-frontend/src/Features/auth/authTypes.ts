export interface User {
    id: string
    name: string
    email: string
    role: string
}

export interface AuthState {
    user: User | null
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}


export interface LoginPayload {
    email: string
    password: string
}


export interface RegisterPayload {
    username: string
    email: string
    password: string
    batch: string
}


export interface RegisterResponse {
    username: string,
    email: string,
    batch: string,
    role: string
}

export interface AuthResponse {
    user: User
}

export interface ErrorResponse {
    message: string
}