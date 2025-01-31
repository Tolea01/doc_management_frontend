import { axiosWithAuth } from '@api/api.interceptor';
import { AxiosResponse } from 'axios';
import { IEntryDocument } from '../../types/document.types';

class EntryDocumentService {
  private BASE_URL: string = '/entry-documents';

  async getAll(
    page: number = 1,
    limit: number = 10,
    filter: any = {},
  ): Promise<AxiosResponse<any>> {
    const response: AxiosResponse<any, any> = await axiosWithAuth.get<IEntryDocument>(
      `${this.BASE_URL}/list`,
      { params: { page, limit, filter } },
    );

    return response;
  }

  async create(data: any) {
    const response: AxiosResponse<any, any> = await axiosWithAuth.post<any>(
      `${this.BASE_URL}/create`,
      data,
    );

    return response;
  }

  async upload(file: File): Promise<AxiosResponse<any>> {
    const formData = new FormData();
    formData.append('files', file);

    return axiosWithAuth.post<any>(
      `${this.BASE_URL}/upload`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );
  }
}

export const entryDocumentService: EntryDocumentService = new EntryDocumentService();
