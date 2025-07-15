import { IProperty } from '../../repositories/property.action';

export const SET_PROPERTY_LIST = 'SET_PROPERTY_LIST';

export type PropertyActionType = {
  type: typeof SET_PROPERTY_LIST;
  payload: IProperty[];
};
