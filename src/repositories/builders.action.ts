import type {
  AddBuilderContactPersonReqInterface,
  AddBuilderReqInterface,
} from '../enums/builders';
import { axiosBase } from '../helpers/fetchApi';

class BuilderRepository {
  static fetchBuilderList = async () => {
    try {
      return await axiosBase.get('/builder');
    } catch (error: any) {
      throw error;
    }
  };

  static addNewBuilder = async (data: AddBuilderReqInterface) => {
    try {
      return await axiosBase.post('/builder', data);
    } catch (error: any) {
      throw error;
    }
  };

  static fetchBuilderById = async (
    id: string,
    fetchContactPersons: boolean = false,
  ) => {
    try {
      return await axiosBase.get(`/builder/${id}`, {
        params: {
          include_contact_persons: fetchContactPersons,
        },
      });
    } catch (error: any) {
      throw error;
    }
  };

  static addBuilderContactPerson = async (
    id: string,
    data: AddBuilderContactPersonReqInterface,
  ) => {
    try {
      return await axiosBase.post(`/builder/${id}/contact`, data);
    } catch (error: any) {
      throw error;
    }
  };
}

export default BuilderRepository;
