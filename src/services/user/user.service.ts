import { axiosWithAuth } from '@api/api.interceptor';
import { AxiosResponse } from 'axios';
import { ICurrentUser, IUserListResponse, IUserUpdate } from '../../types/user.type';

class UserService {
  private BASE_URL = '/api/user';

  async getAll(): Promise<AxiosResponse<IUserListResponse, any>> {
    const response: AxiosResponse<IUserListResponse, any> =
      await axiosWithAuth.get<IUserListResponse>(`${this.BASE_URL}/list`);

    return response;
  }

  async getById(id: string): Promise<AxiosResponse<IUserListResponse, any>> {
    const response: AxiosResponse<IUserListResponse, any> =
      await axiosWithAuth.get<IUserListResponse>(`${this.BASE_URL}/${id}`);

    return response;
  }

  async getCurrent(): Promise<AxiosResponse<ICurrentUser, any>> {
    const response: AxiosResponse<ICurrentUser, any> =
      await axiosWithAuth.get<ICurrentUser>(`${this.BASE_URL}/me`);

    return response;
  }

  async update(id: string, data: IUserUpdate): Promise<AxiosResponse<IUserUpdate, any>> {
    const response: AxiosResponse<IUserUpdate, any> =
      await axiosWithAuth.patch<IUserUpdate>(`${this.BASE_URL}/${id}`, data);

    return response;
  }

  async delete(id: string): Promise<AxiosResponse<any, any>> {
    const response: AxiosResponse<any, any> = await axiosWithAuth.delete(
      `${this.BASE_URL}/${id}`,
    );

    return response;
  }
}

export const userService: UserService = new UserService();
