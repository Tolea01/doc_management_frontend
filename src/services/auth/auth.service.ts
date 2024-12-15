import { axiosClassic } from '../../api/api.interceptor';
import { authTokenService } from './auth-token.service';

class AuthService {
  async main(type: 'login' | 'register', data: IAuthForm) {
    const response = await axiosClassic.post<IAuthResponse>(`auth/${type}`, data);

    if (response.data.accessToken) {
      authTokenService.saveTokenStorage(response.data.accessToken);
    }
  }

  async getNewTokens() {
    const response = await axiosClassic.post<IAuthResponse>('/auth/refresh-tokens');

    if (response.data.accessToken) {
      authTokenService.saveTokenStorage(response.data.accessToken);
    }
  }

  async logout() {}
}

export const authService: AuthService = new AuthService();
