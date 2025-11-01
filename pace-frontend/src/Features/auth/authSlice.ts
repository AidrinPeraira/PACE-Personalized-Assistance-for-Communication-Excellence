import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, ErrorResponse } from "./authTypes";
import {
  loginUser,
  registerUser,
  logoutUser,
  checkAuthStatusThunk,
} from "./authThunks";

const initialState: AuthState = {
  user: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthStatus: (
      state,
      action: PayloadAction<"idle" | "loading" | "succeeded" | "failed">
    ) => {
      state.status = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // --- Login User Cases ---
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error =
          (action.payload as ErrorResponse)?.message ||
          action.error.message ||
          "Login Failed";
      })

      // --- Register User Cases ---
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error =
          (action.payload as ErrorResponse)?.message ||
          action.error.message ||
          "Signup Failed";
      })

      // --- Logout User Cases ---
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null; // Clear the user
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error =
          (action.payload as ErrorResponse)?.message || "Logout Failed";
      })

      // --- Check Auth Status Cases (for app load) ---
      .addCase(checkAuthStatusThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthStatusThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user; // here setting user from cookie in the backend authenticate middleware
      })
      .addCase(checkAuthStatusThunk.rejected, (state) => {
        state.status = "failed";
        state.user = null;
      });
  },
});

export const { setAuthStatus } = authSlice.actions;
export default authSlice.reducer;
