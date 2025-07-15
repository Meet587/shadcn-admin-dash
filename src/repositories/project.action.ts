import { IBuilder, ICity } from './builders.action';
import { IProperty } from './property.action';

export interface IProject {
  id: string;
  builder_id: string;
  name: string;
  description?: string;
  area?: string;
  city_id?: string;
  launch_date?: Date;
  possession_date?: Date;
  project_type: ProjectTypeEnum;
  status: ProjectStatusEnum;
  created_at: Date;
  updated_at: Date;
  builder: IBuilder;
  city?: ICity;
  properties: IProperty[];
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
