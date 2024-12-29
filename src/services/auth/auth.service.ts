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
  private BASE_URL = '/auth';

  async login(
    data: IAuthLoginForm,
  ): Promise<axios.AxiosResponse<IAuthLoginResponse, any>> {
    const response: axios.AxiosResponse<IAuthLoginResponse, any> =
      await axiosClassic.post<IAuthLoginResponse>(`${this.BASE_URL}/login`, data);

    if (response.data.accessToken) {
      authTokenService.saveTokenToStorage(response.data.accessToken);
    }

    return response;
  }

  async register(
    data: IAuthRegisterForm,
  ): Promise<axios.AxiosResponse<IAuthRegisterResponse, any>> {
    const response: axios.AxiosResponse<IAuthRegisterResponse, any> =
      await axiosClassic.post<IAuthRegisterResponse>(`${this.BASE_URL}/register`, data);

    return response;
  }

  async getNewTokens(): Promise<void> {
    const response: axios.AxiosResponse<IAuthRefreshTokens, any> =
      await axiosClassic.post<IAuthRefreshTokens>(`${this.BASE_URL}/refresh-tokens`);

    if (response.data.accessToken) {
      authTokenService.saveTokenToStorage(response.data.accessToken);
    }
  }

  async logout(): Promise<axios.AxiosResponse<boolean, any>> {
    const response: axios.AxiosResponse<boolean, any> = await axiosClassic.post<boolean>(
      `${this.BASE_URL}/logout`,
    );

    if (response.data) {
      authTokenService.removeTokenFromStorage();
    }

    return response;
  }
}

export const authService: AuthService = new AuthService();
