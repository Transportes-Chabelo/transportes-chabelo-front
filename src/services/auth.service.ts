import { AxiosError } from 'axios';
import { monwebApi } from '../api/monweb.api';
import { ErrorResponse, LoginResponse } from '../interfaces';

export class AuthService {

  static login = async (props: { userName: string, password: string }): Promise<LoginResponse> => {
    const { data } = await monwebApi.post<LoginResponse>('/auth', props);
    return data;
  }

  static checkStatus = async (): Promise<LoginResponse> => {
    try {
      const { data } = await monwebApi.get<LoginResponse>('/auth/check');
      return data;
    } catch (error) {
      throw new Error(`${((error as AxiosError).response?.data as ErrorResponse).message}`);
    }
  }

}

