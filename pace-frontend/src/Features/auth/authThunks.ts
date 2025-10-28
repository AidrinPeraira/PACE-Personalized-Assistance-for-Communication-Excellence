import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register, logout, checkAuthStatus } from "@/api/authService";
import type { LoginPayload, RegisterPayload, AuthResponse, ErrorResponse } from "./authTypes";


export const loginUser = createAsyncThunk<
    AuthResponse, 
    LoginPayload,  
    { rejectValue: ErrorResponse } 
>(
    'auth/loginUser',
    async (payload: LoginPayload, { rejectWithValue }) => {
        try {
            const response = await login(payload);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const registerUser = createAsyncThunk<
    AuthResponse,
    RegisterPayload,
    { rejectValue: ErrorResponse }
>(
    'auth/registerUser',
    async (payload: RegisterPayload, { rejectWithValue }) => {
        try {
            const response = await register(payload);
            return response.data; 
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await logout();
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const checkAuthStatusThunk = createAsyncThunk<
    AuthResponse, 
    void,
    { rejectValue: ErrorResponse } 
>(
    "auth/checkAuthStatus",
    async (_, { rejectWithValue }) => {
        try {
            const response = await checkAuthStatus();
            return response.data; 
        } catch (error: any) {
            
            return rejectWithValue(error.response.data);
        }
    }
);

