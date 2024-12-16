import Cookies from 'js-cookie';
import { EnumTokens } from '../../enums/tokens.enum';

class AuthTokenService {
  protected tokenOptions = {
    domain: 'localhost',
    sameSite: 'lax' as 'lax',
    expires: 1,
  };

  getAccessToken(): string | null {
    return Cookies.get(EnumTokens.ACCESS_TOKEN) || null;
  }

  saveTokenToStorage(accessToken: string): void {
    Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, this.tokenOptions);
  }

  removeTokenFromStorage(): void {
    Cookies.remove(EnumTokens.ACCESS_TOKEN);
  }
}

export const authTokenService: AuthTokenService = new AuthTokenService();
