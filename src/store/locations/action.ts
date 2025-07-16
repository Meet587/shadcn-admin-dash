import { ILocation } from '../../repositories/locations.action';
import { SET_LOCATIONS_LIST } from './actionType';

export const _setLocationsList = (locations: ILocation[]) => {
  return {
    type: SET_LOCATIONS_LIST,
    payload: locations,
  };
};
