import { AxiosError } from 'axios';
import { tcApi } from '../api/server.api';
import { ErrorResponse, LoginResponse } from '../interfaces';

export class AuthService {

  static login = async (props: { userName: string, password: string }): Promise<LoginResponse> => {
    const { data } = await tcApi.post<LoginResponse>('/auth', props);
    return data;
  }

  static checkStatus = async (): Promise<LoginResponse> => {
    try {
      const { data } = await tcApi.get<LoginResponse>('/auth/check');
      return data;
    } catch (error) {
      throw new Error(`${((error as AxiosError).response?.data as ErrorResponse).message}`);
    }
  }

}

