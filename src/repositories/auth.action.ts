import type { LoginReqInterface, RegisterReqInterface } from '../enums/auth';
import { axiosBase } from '../helpers/fetchApi';

export default class AuthRepository {
  static login = async (data: LoginReqInterface) => {
    return await axiosBase.post('/auth/login', data);
  };

  static register = async (data: RegisterReqInterface) => {
    return await axiosBase.post('/auth/register', data);
  };

  static refreshToken = async (refreshToken: string) => {
    return await axiosBase.post('/auth/refresh', {
      refreshToken,
    });
  };
}
