import type {
  AddPropertyReqInterface,
  PropertyInterface,
} from '../enums/property';
import { axiosBase } from '../helpers/fetchApi';

export type PropertyListResType = {
  url: string;
  property: PropertyInterface[];
};

class PropertyRepository {
  static fetchPropertyList = async () => {
    try {
      return await axiosBase.get('/property-management');
    } catch (error) {
      throw error;
    }
  };

  static fetchPropertyById = async (id: string) => {
    try {
      return await axiosBase.get(`/property-management/${id}`);
    } catch (error) {
      throw error;
    }
  };

  static addNewProperty = async (data: AddPropertyReqInterface) => {
    try {
      return await axiosBase.post('/property-management', data);
    } catch (error) {
      throw error;
    }
  };

  static updateProperty = async (id: string, data: AddPropertyReqInterface) => {
    try {
      return await axiosBase.put(`/property-management/${id}`, data);
    } catch (error) {
      throw error;
    }
  };
}
export default PropertyRepository;
