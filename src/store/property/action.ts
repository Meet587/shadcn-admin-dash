import { IPaginatedPropertyList } from '../../repositories/property.action';
import { SET_PROPERTY_LIST } from './actionType';

export const _setPropertyList = (properties: IPaginatedPropertyList) => {
  return {
    type: SET_PROPERTY_LIST,
    payload: properties,
  };
};
