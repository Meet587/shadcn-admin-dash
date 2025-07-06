import type { AgentInterface } from './user';

export interface AddPropertyReqInterface {
  property_type: PropertyTypeEnum;
  address: string;
  assignTo: number | null;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  year_built: number;
  status: PropertyStatusEnum;
  price: number;
}

export interface PropertyInterface {
  id: number;
  property_type: PropertyTypeEnum;
  address: string;
  assignTo: number | null;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  year_built: number;
  status: PropertyStatusEnum;
  price: number;
  location_id: number;
  location?: LocationList;
  area_id: number;
  area?: AreaList;
  thumbnail_url: string | null;
  images: [
    {
      id: number;
      secure_url: string;
    },
  ];
  description: string;
  createdAt: string;
  updatedAt: string;
  agent: AgentInterface | null;
}

export type LocationList = {
  id: number;
  name: string;
};

export type AreaList = {
  location_id: number;
} & LocationList;

export enum PropertyForEnum {
  rent = 'rent',
  sale = 'sale',
}

export enum PropertyTypeEnum {
  house = 'house',
  flat = 'flat',
  commercial = 'commercial',
}

export enum PropertyStatusEnum {
  AVAILABLE_FOR_SALE = 'AVAILABLE_FOR_SALE',
  SOLD = 'SOLD',
  AVAILABLE_FOR_RENT = 'AVAILABLE_FOR_RENT',
  RENTED = 'RENTED',
  UNDER_MAINTENANCE = 'UNDER_MAINTENANCE',
  INACTIVE = 'INACTIVE',
}
