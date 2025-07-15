import type {
  AddPropertyReqInterface,
  PropertyInterface,
} from '../enums/property';
import { axiosBase } from '../helpers/fetchApi';
import { IDeal } from './deals.action';
import { ILead } from './lead.action';
import { IProject } from './project.action';

export type PropertyListResType = {
  url: string;
  property: PropertyInterface[];
};

export default class PropertyRepository {
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

export interface IProperty {
  id: string;
  project_id: string;
  property_number?: string;
  property_type: PropertyTypeEnum;
  size?: number;
  size_unit: SizeUnitEnum;
  bedrooms?: number;
  bathrooms?: number;
  floor_number?: number;
  price?: number;
  status: PropertyStatusEnum;
  created_at: Date;
  updated_at: Date;
  project: IProject;
  leads: ILead[];
  deals: IDeal[];
}

export enum PropertyTypeEnum {
  FLAT = 'flat',
  VILLA = 'villa',
  SHOP = 'shop',
  LAND = 'land',
  OFFICE = 'office',
}

export enum SizeUnitEnum {
  SQFT = 'sqft',
  SQM = 'sqm',
  ACRE = 'acre',
}

export enum PropertyStatusEnum {
  AVAILABLE = 'available',
  SOLD = 'sold',
  BLOCKED = 'blocked',
  HOLD = 'hold',
}
