import { axiosWithAuth } from '@api/api.interceptor';
import { AxiosResponse } from 'axios';
import { IUserListResponse } from '../../types/user.type';

class ChatService {
  private BASE_URL = '/messages';

  async getMessages(): Promise<AxiosResponse<any, any>> {
    const response: AxiosResponse<any, any> = await axiosWithAuth.get<any>(
      `${this.BASE_URL}/recent`,
    );

    return response;
  }
}

export const chatService: ChatService = new ChatService();
