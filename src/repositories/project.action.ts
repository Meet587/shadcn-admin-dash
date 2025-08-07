import { axiosBase } from '../helpers/fetchApi';
import { IBuilder } from './builders.action';
import { ILocation } from './locations.action';
import { IProperty } from './property.action';

export interface IProject1 {
  id: string;
  builder_id: string;
  name: string;
  description?: string;
  area?: string;
  launch_date?: string;
  city_id: string;
  possession_date?: string;
  project_type: ProjectTypeEnum;
  status: ProjectStatusEnum;
  created_at: Date;
  updated_at: Date;
  builder: IBuilder;
  city: Pick<ILocation, 'name' | 'id' | 'state'>;
  properties: IProperty[];
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

export enum ProjectTypeEnum {
  RESIDENTIAL = 'residential',
  COMMERCIAL = 'commercial',
  MIXED = 'mixed',
}

export enum ProjectStatusEnum {
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
}

export interface IAmenity {
  id: number;
  name: string;
}

export default class ProjectRepository {
  static fetchProjectList = async (): Promise<IProject[]> => {
    const response = await axiosBase.get('/project');
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
