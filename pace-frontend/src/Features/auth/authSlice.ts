import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from './authThunks'
import type { AuthState } from "./authTypes";

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            localStorage.removeItem('token')
        },
    },
    extraReducers: (builder) => {
        builder
        //login
        .addCase(loginUser.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false
            state.user = action.payload.user
            state.token = action.payload.token
            localStorage.setItem('token',action.payload.token)
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message||'Login Failed'
        })

        //signup
        .addCase(registerUser.pending,(state)=>{
            state.loading = true
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading = false
            state.user = action.payload.user
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message||'Signup Failed'
        })
    },
})


export const {logout} = authSlice.actions
export default authSlice.reducer