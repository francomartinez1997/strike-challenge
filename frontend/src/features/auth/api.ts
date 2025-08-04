import AxiosService from '../../services/axios';
import { LoginPayload, LoginResponse, RegisterPayload } from '../../types/allTypes';
import { useAuthStore } from './store';

export async function login(payload: LoginPayload) {
  try {
    const res = await AxiosService.post<LoginResponse>('/auth/login', payload);
    const { access_token, user } = res.data;

    useAuthStore.getState().login(user, access_token);
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Login Error';
    throw new Error(message);
  }
}

export async function register(payload: RegisterPayload) {
  try {
    const res = await AxiosService.post<LoginResponse>('/users', payload);
    return res.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Register Error';
    throw new Error(message);
  }
}