import type {
  AddCommissionReqInterface,
  UpdateCommissionReqInterface,
} from '../enums/commissions';
import { axiosBase } from '../helpers/fetchApi';
import { IBuilder } from './builders.action';
import { IDeal } from './deals.action';

export default class CommissionRepository {
  static fetchCommissionList = async () => {
    return await axiosBase.get('/commission');
  };

  static fetchCommissionById = async (id: string) => {
    return await axiosBase.get(`/commission/${id}`);
  };

  static addNewCommission = async (data: AddCommissionReqInterface) => {
    return await axiosBase.post('/commission', data);
  };

  static updateCommission = async (
    id: string,
    data: UpdateCommissionReqInterface,
  ) => {
    return await axiosBase.put(`/commission/${id}`, data);
  };

  static deleteCommission = async (id: string) => {
    return await axiosBase.delete(`/commission/${id}`);
  };
}

export enum CommissionStatusEnum {
  PENDING = 'pending',
  RECEIVED = 'received',
  CANCELLED = 'cancelled',
}

export interface ICommission {
  id: string;
  deal_id: string;
  builder_id: string;
  amount: number;
  percentage: number | null;
  status: CommissionStatusEnum;
  expected_date: Date | null;
  received_date: Date | null;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
  deal?: IDeal;
  builder?: IBuilder;
}
