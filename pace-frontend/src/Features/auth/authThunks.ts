import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginPayload, RegisterPayload} from "./authTypes";
import { login, register } from "@/api/authService";


export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (payload :LoginPayload) => {
        const response = await login(payload)
        return response.data
    }
)


export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (payload: RegisterPayload) => {
        const response = await register(payload)
        return response.data
    }
)