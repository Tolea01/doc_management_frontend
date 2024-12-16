export interface IUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  role: string;
  photo: string;
  phone_number: string;
  created_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
}

export interface IAuthLoginForm {
  email: string;
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
