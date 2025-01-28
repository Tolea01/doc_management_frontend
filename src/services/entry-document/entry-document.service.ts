import { axiosWithAuth } from '@api/api.interceptor';
import { IEntryDocument } from '../../types/document.types';
import { AxiosResponse } from 'axios';

class EntryDocumentService {
  private BASE_URL: string = '/entry-documents';

  async getAll(
    page: number = 1,
    limit: number = 10,
    filter: Record<string, any> = {},
  ): Promise<AxiosResponse<any>> {
    const sanitizedFilter = Object.keys(filter)
      .filter((key) => filter[key] !== undefined && filter[key] !== null)
      .reduce(
        (acc, key) => {
          acc[key] = filter[key];
          return acc;
        },
        {} as Record<string, any>,
      );

    const filterQuery = Object.keys(sanitizedFilter)
      .map((key) => `filter[${key}]=${encodeURIComponent(sanitizedFilter[key])}`)
      .join('&');

    const url = `${this.BASE_URL}/list?page=${page}&limit=${limit}${filterQuery ? `&${filterQuery}` : ''}`;

    const response = await axiosWithAuth.get<IEntryDocument>(url);
    return response;
  }
}

export const entryDocumentService: EntryDocumentService = new EntryDocumentService();
