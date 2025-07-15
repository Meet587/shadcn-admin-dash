import type { AddDealReqInterface } from '../enums/deals';
import { axiosBase } from '../helpers/fetchApi';
import { ICommission } from './commission.action';
import { ILead } from './lead.action';
import { IProperty } from './property.action';
import { IUser } from './users.action';

export default class DealRepository {
  static fetchDealsList = async () => {
    try {
      return await axiosBase.get('/deal');
    } catch (error: any) {
      throw error;
    }
  };

  static fetchDealById = async (id: string) => {
    try {
      return await axiosBase.get(`/deal/${id}`);
    } catch (error: any) {
      throw error;
    }
  };

  static addNewDeal = async (data: AddDealReqInterface) => {
    try {
      return await axiosBase.post('/deal', data);
    } catch (error: any) {
      throw error;
    }
  };

  static updateDeal = async (id: string, data: AddDealReqInterface) => {
    try {
      return await axiosBase.put(`/deal/${id}`, data);
    } catch (error: any) {
      throw error;
    }
  };

  static deleteDeal = async (id: string) => {
    try {
      return await axiosBase.delete(`/deal/${id}`);
    } catch (error: any) {
      throw error;
    }
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
