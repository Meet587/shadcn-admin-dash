import type { AddDealReqInterface } from '../enums/deals';
import { axiosBase } from '../helpers/fetchApi';
import { ICommission } from './commission.action';
import { ILead } from './lead.action';
import { IProperty } from './property.action';
import { IUser } from './users.action';

export default class DealRepository {
  static fetchDealsList = async () => {
    return await axiosBase.get('/deal');
  };

  static fetchDealById = async (id: string) => {
    return await axiosBase.get(`/deal/${id}`);
  };

  static addNewDeal = async (data: AddDealReqInterface) => {
    return await axiosBase.post('/deal', data);
  };

  static updateDeal = async (id: string, data: AddDealReqInterface) => {
    return await axiosBase.put(`/deal/${id}`, data);
  };

  static deleteDeal = async (id: string) => {
    return await axiosBase.delete(`/deal/${id}`);
  };
}

export enum DealStatusEnum {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}

export interface IDeal {
  id: string;
  lead_id: string;
  property_id: string;
  client_name: string | null;
  client_phone: string | null;
  client_email: string | null;
  deal_amount: number;
  commission_amount: number | null;
  commission_percentage: number | null;
  deal_date: Date;
  possession_date: Date | null;
  status: DealStatusEnum;
  rm_id: string;
  created_at: Date;
  updated_at: Date;
  lead?: ILead;
  property?: IProperty;
  rm?: IUser;
  commissions?: ICommission[];
}
