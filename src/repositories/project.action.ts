import { axiosBase } from '../helpers/fetchApi';
import { IBuilder, ICity } from './builders.action';
import { IProperty } from './property.action';

export interface IProject {
  id: string;
  builder_id: string;
  name: string;
  description?: string;
  area?: string;
  launch_date?: string;
  possession_date?: string;
  project_type: ProjectTypeEnum;
  status: ProjectStatusEnum;
  created_at: Date;
  updated_at: Date;
  builder: IBuilder;
  city: Pick<ICity, 'name' | 'id' | 'state'>;
  properties: IProperty[];
}

export interface IAddProject {
  name: string;
  description?: string;
  area?: string;
  launch_date?: string;
  possession_date?: string;
  project_type: ProjectTypeEnum;
  status: ProjectStatusEnum;
  builder_id: string;
  city_id: string;
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

export default class ProjectRepository {
  static fetchProjectList = async (): Promise<IProject[]> => {
    try {
      const response = await axiosBase.get('/project');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  };

  static addNewProject = async (values: IAddProject): Promise<IProject> => {
    try {
      const response = await axiosBase.post('/project', values);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  };
}
