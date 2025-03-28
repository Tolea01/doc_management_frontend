import { axiosWithAuth } from '@api/api.interceptor';
import { AxiosResponse } from 'axios';
import { IUserListResponse, IUserUpdate } from '../../types/user.type';

class UserService {
  private BASE_URL = '/user';

  async getAll(
    page: number = 1,
    limit: number = 25,
    filter: any = {},
  ): Promise<AxiosResponse<any>> {
    const response: AxiosResponse<any, any> = await axiosWithAuth.get<IUserListResponse>(
      `${this.BASE_URL}/list`,
      { params: { page, limit, filter } },
    );

    return response;
  }

  async getById(id): Promise<AxiosResponse<IUserListResponse, any>> {
    const response: AxiosResponse<IUserListResponse, any> =
      await axiosWithAuth.get<IUserListResponse>(`${this.BASE_URL}/${id}`);

    return response;
  }

  async update(id, data: IUserUpdate): Promise<AxiosResponse<IUserUpdate, any>> {
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
