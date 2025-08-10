import { axiosBase } from '../helpers/fetchApi';
import { IBuilder } from './builders.action';
import { ILocation } from './locations.action';
import { IProperty } from './property.action';

export enum PropertyTypeEnum {
  RESIDENTIAL = 'RESIDENTIAL',
  COMMERCIAL = 'COMMERCIAL',
  LAND = 'LAND',
}

export enum PropertySubtypeEnum {
  // Residential subtypes
  APARTMENT_FLAT = 'APARTMENT_FLAT',
  BUNGALOW_VILLA = 'BUNGALOW_VILLA',
  ROW_HOUSE = 'ROW_HOUSE',

  // Commercial subtypes
  SHOP_SHOWROOM = 'SHOP_SHOWROOM',
  OFFICE_SPACE = 'OFFICE_SPACE',
  INDUSTRIAL_SHED = 'INDUSTRIAL_SHED',
  WAREHOUSE = 'WAREHOUSE',

  // Land subtypes
  LAND_PLOT = 'LAND_PLOT',
}

export interface IProject1 {
  id: string;
  builder_id: string;
  name: string;
  description?: string;
  area?: string;
  launch_date?: string;
  city_id: string;
  possession_date?: string;
  created_at: Date;
  updated_at: Date;
  builder: IBuilder;
  city: Pick<ILocation, 'name' | 'id' | 'state'>;
  properties: IProperty[];
}

export interface IProjectList {
  id: string | number;
  name: string;
  possession_month: number | null;
  possession_year: number;
  property_types: PropertySubtypeEnum[] | null;
  builder: {
    id: number;
    name: string;
  };
  cities: {
    id: number;
    name: string;
  }[];
}

export interface IProject {
  id: string;
  builder_id: number;
  name: string;
  description: string;
  construction_type: string;
  property_types: any[] | null;
  property_subtypes: any[] | null;
  construction_year: number | null;
  possession_month: number | null;
  possession_year: number;
  is_ready_possession: boolean;
  city_id: string[];
  amenities_ids: string[];
  brochure_url: string | null;
  website_url: string | null;
  main_image_url: string | null;
  address_line1: string | null;
  address_line2: string | null;
  rera_number: string;
  gst_number: string;
  created_at: Date;
  updated_at: Date;
  builder: {
    address: {
      city_id: number;
      address_line_1: string;
      address_line_2: string;
    };
    created_at: Date;
    email: string;
    id: 15;
    name: string;
    phone: string;
    status: string;
    updated_at: Date;
    website: string;
  };
}

export interface IAddProject {
  name: string;
  description?: string;
  construction_type: string;
  property_types: string[];
  property_subtypes: string[];
  construction_year: number | null;
  possession_month: number | null;
  possession_year: number | null;
  is_ready_possession: boolean;
  city_id: string[];
  amenities_ids: string[];
  brochure_url: string | null;
  website_url: string | null;
  main_image_url: string | null;
  address_line1: string | null;
  address_line2: string | null;
  rera_number: string;
  gst_number: string;
  builder_id: number;
}

export interface IAmenity {
  id: number;
  name: string;
}

export interface IProjectListFilters {
  page?: number;
  limit?: number;
  name?: string;
  is_ready_possession?: boolean;
}

export interface IPaginatedProjectList {
  data: IProjectList[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default class ProjectRepository {
  static fetchProjectList = async (
    filters?: IProjectListFilters,
  ): Promise<IPaginatedProjectList> => {
    const params = new URLSearchParams();

    if (filters?.page) {
      params.append('page', filters.page.toString());
    }
    if (filters?.limit) {
      params.append('limit', filters.limit.toString());
    }
    if (filters?.name) {
      params.append('name', filters.name);
    }
    if (filters?.is_ready_possession !== undefined) {
      params.append(
        'is_ready_possession',
        filters.is_ready_possession.toString(),
      );
    }

    const queryString = params.toString();
    const url = queryString ? `/project?${queryString}` : '/project';

    const response = await axiosBase.get(url);
    return response.data;
  };

  static addNewProject = async (values: IAddProject): Promise<IProject> => {
    const response = await axiosBase.post('/project', values);
    return response.data;
  };

  static updateProject = async (
    id: string,
    values: IAddProject,
  ): Promise<IProject> => {
    const response = await axiosBase.put(`/project/${id}`, values);
    return response.data;
  };

  static fetchProjectById = async (id: string): Promise<IProject> => {
    const response = await axiosBase.get(`/project/${id}`);
    return response.data;
  };

  static fetchAmenities = async (): Promise<IAmenity[]> => {
    const response = await axiosBase.get('/project/amenities/list');
    return response.data;
  };

  static deleteProject = async (id: string): Promise<void> => {
    await axiosBase.delete(`/project/${id}`);
  };
}
