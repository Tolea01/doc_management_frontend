import { AxiosResponse } from 'axios';
import { axiosClassic, axiosWithAuth } from '../../api/api.interceptor';
import {
  IAuthLoginForm,
  IAuthLoginResponse,
  IAuthRefreshTokens,
  IAuthRegisterForm,
  IAuthRegisterResponse,
} from '../../types/auth.types';
import { ICurrentUser } from '../../types/user.type';
import { authTokenService } from './auth-token.service';

class AuthService {
  private BASE_URL = '/auth';

  async login(data: IAuthLoginForm): Promise<AxiosResponse<IAuthLoginResponse, any>> {
    const response: AxiosResponse<IAuthLoginResponse, any> =
      await axiosClassic.post<IAuthLoginResponse>(`${this.BASE_URL}/login`, data);

    if (response.data.accessToken) {
      authTokenService.saveTokenToStorage(response.data.accessToken);
    }

    return response;
  }

  async register(
    data: IAuthRegisterForm,
  ): Promise<AxiosResponse<IAuthRegisterResponse, any>> {
    const response: AxiosResponse<IAuthRegisterResponse, any> =
      await axiosClassic.post<IAuthRegisterResponse>(`${this.BASE_URL}/register`, data);

    return response;
  }

  async getCurrent(): Promise<AxiosResponse<ICurrentUser, any>> {
    const response: AxiosResponse<ICurrentUser, any> =
      await axiosWithAuth.get<ICurrentUser>(`${this.BASE_URL}/me`);

    return response;
  }

  async getNewAccessToken(): Promise<string | null> {
    const response: AxiosResponse<IAuthRefreshTokens, any> =
      await axiosClassic.post<IAuthRefreshTokens>(`${this.BASE_URL}/refresh-tokens`);

    return response.data.accessToken;
  }

  async logout(): Promise<AxiosResponse<boolean, any>> {
    const response: AxiosResponse<boolean, any> = await axiosWithAuth.post<boolean>(
      `${this.BASE_URL}/logout`,
    );

    if (response.data) {
      authTokenService.removeTokenFromStorage();
    }

    return response;
  }
}

export const authService: AuthService = new AuthService();
