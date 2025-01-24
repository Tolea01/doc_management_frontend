import { axiosWithAuth } from '@api/api.interceptor';
import { IEntryDocument } from '../../types/document.types';
import { AxiosResponse } from 'axios';

class EntryDocumentService {
  private BASE_URL: string = '/entry-documents';

  async getAll(): Promise<AxiosResponse<any>> {
    const response: AxiosResponse<any, any> = await axiosWithAuth.get<IEntryDocument>(
      `${this.BASE_URL}/list`,
    );

    return response;
  }
}

export const entryDocumentService: EntryDocumentService = new EntryDocumentService();
