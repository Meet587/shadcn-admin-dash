import { ILead } from '../../repositories/lead.action';
import { SET_LEADS_LIST } from './actionType';

export const _setLeadsList = (leads: ILead[]) => {
  return {
    type: SET_LEADS_LIST,
    payload: leads,
  };
};
