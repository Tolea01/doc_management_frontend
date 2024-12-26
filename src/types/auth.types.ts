import { IUser } from './user.type'

export interface IAuthLoginForm {
  email_address: string;
  password: string;
}

export type IAuthRegisterForm = Partial<IUser>;

export interface IAuthLoginResponse {
  user: Partial<IUser>;
  accessToken: string;
}

export interface IAuthRegisterResponse extends IUser {}

export interface IAuthRefreshTokens {
  accessToken: string;
}
