import { ICity } from '../../repositories/builders.action';

export const SET_CITIES_LIST = 'SET_CITIES_LIST';

export type CitiesActionType = {
  type: typeof SET_CITIES_LIST;
  payload: ICity[];
};
