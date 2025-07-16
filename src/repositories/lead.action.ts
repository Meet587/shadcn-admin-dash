import { axiosBase } from '../helpers/fetchApi';
import { IDeal } from './deals.action';
import { IProperty } from './property.action';
import { IUser } from './users.action';

export enum LeadStatusEnum {
  NEW = 'new',
  CONTACTED = 'contacted',
  QUALIFIED = 'qualified',
  SITE_VISIT_SCHEDULED = 'site_visit_scheduled',
  SITE_VISIT_DONE = 'site_visit_done',
  NEGOTIATION = 'negotiation',
  PAPERWORK = 'paperwork',
  DEAL_CLOSED = 'deal_closed',
  DEAL_LOST = 'deal_lost',
}

export enum LeadSourceTypeEnum {
  WEBSITE = 'website',
  SOCIAL_MEDIA = 'social_media',
  REFERRAL = 'referral',
  WALK_IN = 'walk_in',
  ADVERTISEMENT = 'advertisement',
}

export enum ActivityTypeEnum {
  CALL = 'call',
  EMAIL = 'email',
  MEETING = 'meeting',
  SITE_VISIT = 'site_visit',
  FOLLOW_UP = 'follow_up',
}

export enum ActivityStatusEnum {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface ILead {
  id: string;
  source_id: string;
  first_name: string;
  last_name?: string;
  phone: string;
  email?: string;
  interested_property_id?: string;
  budget_min?: number;
  budget_max?: number;
  status: LeadStatusEnum;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
  source: ILeadSource;
  interested_property?: IProperty;
  assigned_to_user?: IUser;
  activities: ILeadActivity[];
  deals: IDeal[];
}

export interface ILeadSource {
  id: string;
  name: string;
  type: LeadSourceTypeEnum;
  description?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  leads: ILead[];
}

export interface ILeadActivity {
  id: string;
  lead_id: string;
  activity_type: ActivityTypeEnum;
  description?: string;
  master_comment?: string;
  scheduled_at?: Date;
  completed_at?: Date;
  created_by: string;
  status: ActivityStatusEnum;
  created_at: Date;
  updated_at: Date;
  lead: ILead;
  created_by_user: IUser;
}

export class LeadRepository {
  static async fetchLeadsList() {
    const response = await axiosBase.get('/leads');
    return response.data;
  }
}
