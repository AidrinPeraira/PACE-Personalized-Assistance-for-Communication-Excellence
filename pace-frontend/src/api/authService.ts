import axios from "axios";
import type { LoginPayload, RegisterPayload } from "@/Features/auth/authTypes";
import { API } from '@/api/api'



export const login = (data: LoginPayload) =>
    axios.post(`${API}/user/login`, data, { withCredentials: true });

export const register = (data: RegisterPayload) =>
    axios.post(`${API}/user/register`, data, { withCredentials: true });

export const logout = () =>
    axios.post(`${API}/user/logout`, {}, { withCredentials: true });


export const checkAuthStatus = () => {
    return axios.get(`${API}/user/status`,{withCredentials: true});
}