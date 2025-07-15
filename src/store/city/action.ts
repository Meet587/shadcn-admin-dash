import { ICity } from '../../repositories/builders.action';
import { SET_CITIES_LIST } from './actionType';

export const _setCitiesList = (cities: ICity[]) => {
  return {
    type: SET_CITIES_LIST,
    payload: cities,
  };
};
