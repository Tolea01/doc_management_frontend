import { axiosWithAuth } from '@api/api.interceptor';
import { AxiosResponse } from 'axios';

class PersonService {
  private BASE_URL: string = '/person';

  async getAll(
    page?: number,
    limit?: number,
    filter: any = {},
  ): Promise<AxiosResponse<any>> {
    const response: AxiosResponse<any, any> = await axiosWithAuth.get<any>(
      `${this.BASE_URL}/list`,
      { params: { page, limit, filter } },
    );

    return response;
  }

  async getById(id) {
    const response: AxiosResponse<any, any> = await axiosWithAuth.get<any>(
      `${this.BASE_URL}/${id}`,
    );

    return response;
  }

  async update(id: string, data: any): Promise<AxiosResponse<any, any>> {
    const response: AxiosResponse<any, any> = await axiosWithAuth.patch<any>(
      `${this.BASE_URL}/${id}`,
      data,
    );

    return response;
  }

  async delete(id: string): Promise<AxiosResponse<any, any>> {
    const response: AxiosResponse<any, any> = await axiosWithAuth.delete(
      `${this.BASE_URL}/${id}`,
    );

    return response;
  }

  async create(data: any) {
    const response: AxiosResponse<any, any> = await axiosWithAuth.post<any>(
      `${this.BASE_URL}/register`,
      data,
    );

    return response;
  }
}

export const personService: PersonService = new PersonService();
