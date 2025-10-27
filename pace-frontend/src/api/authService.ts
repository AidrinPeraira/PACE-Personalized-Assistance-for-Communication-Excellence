import axios from "axios"
import type { LoginPayload, RegisterPayload } from "@/Features/auth/authTypes"


const API_URL = 'http://localhost:3000/api'

export const login = (data: LoginPayload) => axios.post(`${API_URL}/user/login`, data)
export const register = (data: RegisterPayload) => axios.post(`${API_URL}/user/register`,data)