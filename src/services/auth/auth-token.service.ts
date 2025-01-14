import { EnumTokens } from '@enums/tokens.enum';
import Cookies from 'js-cookie';

class AuthTokenService {
  protected tokenOptions = {
    domain: 'localhost',
    sameSite: 'strict' as 'strict',
    expires: 1 / (24 * 60),
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
