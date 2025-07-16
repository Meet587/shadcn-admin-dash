import { ILead } from '../../repositories/lead.action';

export const SET_LEADS_LIST = 'SET_LEADS_LIST';

export type LeadsActionType = {
  type: typeof SET_LEADS_LIST;
  payload: ILead[];
};
