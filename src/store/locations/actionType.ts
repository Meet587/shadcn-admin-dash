import { ILocation } from '../../repositories/locations.action';

export const SET_LOCATIONS_LIST = 'SET_LOCATIONS_LIST';

export type LocationsActionType = {
  type: typeof SET_LOCATIONS_LIST;
  payload: ILocation[];
};
