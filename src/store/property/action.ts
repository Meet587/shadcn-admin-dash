import { IProperty } from '../../repositories/property.action';
import { SET_PROPERTY_LIST } from './actionType';

export const _setPropertyList = (properties: IProperty[]) => {
  return {
    type: SET_PROPERTY_LIST,
    payload: properties,
  };
};
