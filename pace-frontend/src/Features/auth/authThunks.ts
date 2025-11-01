import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register, logout, checkAuthStatus } from "@/api/authService";
import type {
  LoginPayload,
  RegisterPayload,
  AuthResponse,
  ErrorResponse,
} from "./authTypes";
import { toast } from "sonner";

export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: ErrorResponse }
>("auth/loginUser", async (payload: LoginPayload, { rejectWithValue }) => {
  try {
    const response = await login(payload);
    toast.success("Welcome back!");
    return response.data;
  } catch (error: any) {
    toast.error("Error logging in. Try again or contact an admin.");
    return rejectWithValue(error.response.data);
  }
});

export const registerUser = createAsyncThunk<
  void,
  RegisterPayload,
  { rejectValue: ErrorResponse }
>(
  "auth/registerUser",
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await register(payload);
      console.log(response.data, "reg payload");
      if (response) toast.success(response.data.message);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
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
>("auth/checkAuthStatus", async (_, { rejectWithValue }) => {
  try {
    const response = await checkAuthStatus();
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
