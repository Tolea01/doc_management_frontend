import axios, { CreateAxiosDefaults } from 'axios';
import { authTokenService } from '../services/auth/auth-token.service';
import { errorCatch, getContentType } from './api.helper';

const options: CreateAxiosDefaults = {
  baseURL: process.env.API_url,
  headers: getContentType(),
  withCredentials: true,
};

const axiosClassic: axios.AxiosInstance = axios.create(options);
const axiosWithAuth: axios.AxiosInstance = axios.create(options);

axiosWithAuth.interceptors.request.use((config: axios.InternalAxiosRequestConfig) => {
  const accesToken: string | null = authTokenService.getAccessToken();

  if (config?.headers && accesToken) {
    config.headers.Authorization = `Bearer ${accesToken}`;
  }

  return config;
});

axiosWithAuth.interceptors.request.use(
  (config: axios.InternalAxiosRequestConfig) => config,
  async (error: any) => {
    const originalRequest = error.config;
    if (
      error?.response?.status === 401 ||
      (errorCatch(error) === 'Acces neaurotizat' &&
        error.config &&
        !error.config._isRetry)
    ) {
      originalRequest._isRetry = true;
      try {
        await authService.getNewTokens();
        return axiosWithAuth(originalRequest);
      } catch (error) {
        if (errorCatch(error) === 'Acces neautorizat') {
          authTokenService.removeFromStorage();
        }
      }
    }
    throw error;
  },
);

export { axiosClassic, axiosWithAuth };
