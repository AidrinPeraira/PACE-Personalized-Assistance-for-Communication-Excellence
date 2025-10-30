import type { LoginPayload, RegisterPayload } from "@/Features/auth/authTypes";
import API from '@/api/api'



export const login = (data: LoginPayload) => API.post('/user/login', data);

export const register = (data: RegisterPayload) => API.post('/user/register', data);

export const logout = () => API.post('/user/logout');

export const checkAuthStatus = () => {
    return API.get('/user/status');
}