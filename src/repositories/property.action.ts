import { axiosBase } from '../helpers/fetchApi';
import { IDeal } from './deals.action';
import { ILead } from './lead.action';
import { IProject, PropertySubtypeEnum } from './project.action';

export default class PropertyRepository {
  static fetchPropertyList = async (
    filters: IPropertyListFilters,
  ): Promise<IPaginatedPropertyList> => {
    const params = new URLSearchParams();
    if (filters?.page) {
      params.append('page', filters.page.toString());
    }
    if (filters?.limit) {
      params.append('limit', filters.limit.toString());
    }
    if (filters?.propertyType) {
      params.append('propertyType', filters.propertyType);
    }
    if (filters?.propertySubType) {
      params.append('propertySubType', filters.propertySubType);
    }
    if (filters?.listingFor) {
      params.append('listingFor', filters.listingFor);
    }
    if (filters?.furnishing) {
      params.append('furnishing', filters.furnishing);
    }
    if (filters?.bhk) {
      params.append('bhk', filters.bhk.toString());
    }
    if (filters?.minPrice) {
      params.append('minPrice', filters.minPrice.toString());
    }
    if (filters?.maxPrice) {
      params.append('maxPrice', filters.maxPrice.toString());
    }
    const queryString = params.toString();
    const url = queryString
      ? `/property-management?${queryString}`
      : '/property-management';
    const response = await axiosBase.get(url);
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

  static deleteProperty = async (id: string) => {
    return await axiosBase.delete(`/property-management/${id}`);
  };
}

export enum ListingForEnum {
  RENT = 'rent',
  SALE = 'sale',
  BOTH = 'both',
}

export enum FurnishingEnum {
  UNFURNISHED = 'unfurnished',
  SEMIFURNISHED = 'semifurnished',
  FURNISHED = 'furnished',
  PARTIALLY_FURNISHED = 'partially_furnished',
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

export interface IProperty1 {
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
export interface IProperty {
  id: string;
  title: string;
  listing_for: ListingForEnum;
  property_sub_type: string;
  available_from: string;
  floor_no: number;
  total_floors: number;
  bhk: number;
  furnishing: FurnishingEnum;
  created_at: string;
  pricing: {
    id: string;
    ppu: string;
    total_amount: string;
  };
  locations: {
    id: number;
    name: string;
  }[];
}

export interface IPaginatedPropertyList {
  data: IProperty[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IPropertyListFilters {
  page?: number;
  limit?: number;
  name?: string;
  propertyType?: PropertyTypeEnum;
  listingFor?: ListingForEnum;
  furnishing?: FurnishingEnum;
  bhk?: number;
  minPrice?: number;
  maxPrice?: number;
  propertySubType?: PropertySubtypeEnum;
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
