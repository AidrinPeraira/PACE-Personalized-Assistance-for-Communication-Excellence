import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser } from './authThunks'
import type { AuthState } from "./authTypes";

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

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
        .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null; // Clear the user
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state) => {
                state.loading = false;
                // Even if logout fails, log the user out on the client
                state.user = null; 
            })
    },
})


export default authSlice.reducer