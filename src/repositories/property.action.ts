import { axiosBase } from '../helpers/fetchApi';
import { PropertySubtypeEnum } from './project.action';

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

  static fetchPropertyById = async (id: string): Promise<IPropertyDetails> => {
    const res = await axiosBase.get(`/property-management/${id}`);
    return res.data as IPropertyDetails;
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

export enum PropertyFacingEnum {
  NORTH = 'north',
  SOUTH = 'south',
  EAST = 'east',
  WEST = 'west',
  NORTH_EAST = 'north_east',
  NORTH_WEST = 'north_west',
  SOUTH_EAST = 'south_east',
  SOUTH_WEST = 'south_west',
}

export enum PropertyOwnerShipEnum {
  FREEHOLD = 'freehold',
  LEASEHOLD = 'leasehold',
}

export enum ReadyStatusEnum {
  READY_TO_MOVE = 'ready_to_move',
  UNDER_CONSTRUCTION = 'under_construction',
  OTHER = 'other',
}

export enum OtherRoomsTypeEnum {
  POOJA_ROOM = 'pooja_room',
  STUDY = 'study',
  STORE = 'store',
  GUEST_ROOM = 'guest_room',
  SERVANT_ROOM = 'servant_room',
  OTHERS = 'others',
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

export interface IPropertyDetails {
  id: string;
  code: string;
  title: string;
  listing_for: ListingForEnum;
  property_type: PropertyTypeEnum;
  property_sub_type: PropertySubtypeEnum;
  key_status?: string;
  key_info?: string;
  ready_status: ReadyStatusEnum;
  available_from: string;
  address_line1: string;
  address_line2: string;
  landmark: string;
  country: string;
  state: string;
  city: string;
  zip_code: string;
  tower: string;
  unit_no: string;
  floor_no: number;
  total_floors: number;
  bhk: number;
  bathrooms: number;
  balconies: number;
  other_rooms: OtherRoomsTypeEnum[];
  furnishing: FurnishingEnum;
  ready_to_build_furniture: boolean;
  pet_allowed: boolean;
  non_veg_allowed: boolean;
  reserved_parkings: boolean;
  covered_parking_count: number;
  open_parking_count: number;
  ownership: PropertyOwnerShipEnum;
  facing: PropertyFacingEnum;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  assign_to: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    status: boolean;
  };
  project: {
    id: string;
    name: string;
    construction_type: string;
    gst_number: string;
  };
  builder: {
    id: string;
    name: string;
  };
  pricing: {
    area: string;
    area_unit: string;
    carpet_area: string;
    super_build_up_area: string;
    basic_amount: string;
    total_amount: string;
    currency: string;
    ppu: string;
    extra_charges: IExtraCharge[];
  };
  uploads: Array<{
    id: string;
    file_path: string;
    file_type: string;
    caption: string;
  }>;
  amenities: Array<{
    id: number;
    name: string;
  }>;
  furnitures: Array<{
    id: string;
    item_name: string;
    quantity: number;
  }>;
  locations: Array<{
    id: number;
    name: string;
  }>;
}

export interface IExtraCharge {
  id: string;
  charge_type: string;
  percentage: string;
  per_unit: string;
  amount: string;
  description: string;
  enabled: boolean;
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
