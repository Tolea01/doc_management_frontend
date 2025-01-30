import { axiosWithAuth } from '@api/api.interceptor';
import { AxiosResponse } from 'axios';
import { IEntryDocument } from '../../types/document.types';

class PersonService {
  private BASE_URL: string = '/person';

  async getAll(
    page?: number,
    limit?: number,
    filter: any = {},
  ): Promise<AxiosResponse<any>> {
    const response: AxiosResponse<any, any> = await axiosWithAuth.get<IEntryDocument>(
      `${this.BASE_URL}/list`,
      { params: { page, limit, filter } },
    );

    return response;
  }
}

export const personService: PersonService = new PersonService();
