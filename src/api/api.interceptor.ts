import { authTokenService } from '@services/auth/auth-token.service';
import { authService } from '@services/auth/auth.service';
import axios, { CreateAxiosDefaults } from 'axios';
import { getContentType } from './api.helper';

const options: CreateAxiosDefaults = {
  baseURL: process.env.API_url,
  headers: {
    ...getContentType(),
    language: 'ro',
  },
  withCredentials: true,
};

const axiosClassic: axios.AxiosInstance = axios.create(options);
const axiosWithAuth: axios.AxiosInstance = axios.create(options);

axiosWithAuth.interceptors.request.use((config: axios.InternalAxiosRequestConfig) => {
  const accessToken: string | null = authTokenService.getAccessToken();

  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosWithAuth.interceptors.response.use(
  (response: any) => response,
  async (error: any) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      try {
        const accessToken: string | null = await authService.getNewAccessToken();
        if (accessToken) {
          authTokenService.saveTokenToStorage(accessToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        return axiosWithAuth(originalRequest);
      } catch (error: any) {
        authTokenService.removeTokenFromStorage();
        throw error;
      }
    }
    throw error;
  },
);

export { axiosClassic, axiosWithAuth };
