import type {
  AddCommissionReqInterface,
  UpdateCommissionReqInterface,
} from '../enums/commissions';
import { axiosBase } from '../helpers/fetchApi';

class CommissionRepository {
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

export default CommissionRepository;
