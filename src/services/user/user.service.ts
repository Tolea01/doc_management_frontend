import axios from 'axios';
import { axiosWithAuth } from '../../api/api.interceptor';
import { IUserListResponse, IUserUpdate } from '../../types/user.type';

class UserService {
  private BASE_URL = '/api/user';

  async getAll(): Promise<axios.AxiosResponse<IUserListResponse, any>> {
    const response: axios.AxiosResponse<IUserListResponse, any> =
      await axiosWithAuth.get<IUserListResponse>(`${this.BASE_URL}/list`);

    return response;
  }

  async getById(id: string): Promise<axios.AxiosResponse<IUserListResponse, any>> {
    const response: axios.AxiosResponse<IUserListResponse, any> =
      await axiosWithAuth.get<IUserListResponse>(`${this.BASE_URL}/${id}`);

    return response;
  }

  async update(
    id: string,
    data: IUserUpdate,
  ): Promise<axios.AxiosResponse<IUserUpdate, any>> {
    const response: axios.AxiosResponse<IUserUpdate, any> =
      await axiosWithAuth.patch<IUserUpdate>(`${this.BASE_URL}/${id}`, data);

    return response;
  }

  async delete(id: string): Promise<axios.AxiosResponse<any, any>> {
    const response: axios.AxiosResponse<any, any> = await axiosWithAuth.delete(
      `${this.BASE_URL}/${id}`,
    );

    return response;
  }
}

export const userService: UserService = new UserService();
