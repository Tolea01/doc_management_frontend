import axios from 'axios';
import { axiosClassic } from '../../api/api.interceptor';
import {
  IAuthLoginForm,
  IAuthLoginResponse,
  IAuthRefreshTokens,
  IAuthRegisterForm,
  IAuthRegisterResponse,
} from '../../types/auth.types';
import { authTokenService } from './auth-token.service';

class AuthService {
  async login(data: IAuthLoginForm): Promise<void> {
    const response: axios.AxiosResponse<IAuthLoginResponse, any> =
      await axiosClassic.post<IAuthLoginResponse>('auth/login', data);

    if (response.data.accessToken) {
      authTokenService.saveTokenToStorage(response.data.accessToken);
    }
  }

  async register(data: IAuthRegisterForm): Promise<void> {
    const response: axios.AxiosResponse<IAuthRegisterResponse> =
      await axiosClassic.post<IAuthRegisterResponse>('auth/register', data);
  }

  async getNewTokens(): Promise<void> {
    const response = await axiosClassic.post<IAuthRefreshTokens>('/auth/refresh-tokens');

    if (response.data.accessToken) {
      authTokenService.saveTokenToStorage(response.data.accessToken);
    }
  }

  async logout(): Promise<axios.AxiosResponse<boolean, any>> {
    const response = await axiosClassic.post<boolean>('auth/logout');

    if (response.data) {
      authTokenService.removeTokenFromStorage();
    }

    return response;
  }
}

export const authService: AuthService = new AuthService();
