import { axiosBase } from '../helpers/fetchApi';
import { IDeal } from './deals.action';
import { ILead } from './lead.action';
import { IProject } from './project.action';

export default class PropertyRepository {
  static fetchPropertyList = async (): Promise<IProperty[]> => {
    const response = await axiosBase.get('/property-management');
    return response.data;
  };

  static fetchPropertyById = async (id: string) => {
    return await axiosBase.get(`/property-management/${id}`);
  };

  static addNewProperty = async (data: ICreateProperty) => {
    return await axiosBase.post('/property-management', data);
  };

  static updateProperty = async (id: string, data: ICreateProperty) => {
    return await axiosBase.put(`/property-management/${id}`, data);
  };
}

export interface ICreateProperty {
  project_id: string;
  property_number?: string;
  size?: number;
  size_unit?: SizeUnitEnum;
  bedrooms?: number;
  bathrooms?: number;
  floor_number?: number;
  price: number;
  status: PropertyStatusEnum;
  property_type: PropertyTypeEnum;
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
