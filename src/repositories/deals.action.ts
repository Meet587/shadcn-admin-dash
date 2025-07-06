import type { AddDealReqInterface } from '../enums/deals';
import { axiosBase } from '../helpers/fetchApi';

class DealRepository {
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

export default DealRepository;
