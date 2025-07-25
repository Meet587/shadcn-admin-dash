import { axiosBase } from '../helpers/fetchApi';
import { ICommission } from './commission.action';
import { ILocation } from './locations.action';
import { IProject } from './project.action';

export interface AddBuilderReqInterface {
  name: string;
  address: string | null;
  city_id: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  commission_rate: number;
}

export interface AddBuilderContactPersonReqInterface {
  name: string;
  email: string;
  phone_number: string;
}

export default class BuilderRepository {
  static fetchBuilderList = async (): Promise<IBuilder[]> => {
    const response = await axiosBase.get('/builder');
    return response.data;
  };

  static addNewBuilder = async (
    data: AddBuilderReqInterface,
  ): Promise<IBuilder> => {
    return await axiosBase.post('/builder', data);
  };

  static fetchBuilderById = async (
    id: string,
    fetchContactPersons: boolean = false,
  ): Promise<IBuilder> => {
    return await axiosBase.get(`/builder/${id}`, {
      params: {
        include_contact_persons: fetchContactPersons,
      },
    });
  };

  static addBuilderContactPerson = async (
    id: string,
    data: AddBuilderContactPersonReqInterface,
  ) => {
    return await axiosBase.post(`/builder/${id}/contact`, data);
  };
}

export enum BuilderStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
export interface IBuilder {
  id: string;
  name: string;
  address: string | null;
  city_id: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  commission_rate: number;
  status: BuilderStatusEnum;
  created_at: Date;
  updated_at: Date;
  city?: ILocation;
  operating_cities?: ILocation[];
  contact_persons?: IBuilderContact[];
  projects?: IProject[];
  commissions?: ICommission[];
}

export interface IBuilderContact {
  id: string;
  builder_id: string;
  name: string;
  designation?: string;
  phone?: string;
  email?: string;
  is_primary: boolean;
  created_at: Date;
  updated_at: Date;
  builder: IBuilder;
}
