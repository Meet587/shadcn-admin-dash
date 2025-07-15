import { axiosBase } from '../helpers/fetchApi';
import { IDeal } from './deals.action';
import { ILead, ILeadActivity } from './lead.action';

export default class UserRepository {
  static fetchUserList = async () => {
    try {
      const response = await axiosBase.get('/users/get-all-users');
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}

export enum UserRoleEnum {
  ADMIN = 'admin',
  RM = 'rm',
  BACK_OFFICE = 'back_office',
  AGENT = 'agent',
}

export interface IUser {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  role: UserRoleEnum;
  is_active: boolean;
  last_login: Date | null;
  created_at: Date;
  updated_at: Date;
  assigned_leads?: ILead[];
  lead_activities?: ILeadActivity[];
  deals?: IDeal[];
}
