import { IAmenity, IProject } from '../../repositories/project.action';

export const SET_PROJECT_LIST = 'SET_PROJECT_LIST';
export const SET_AMENITIES = 'SET_AMENITIES';

export type ProjectActionType = {
  type: typeof SET_PROJECT_LIST;
  payload: IProject[];
};

export type AmenitiesActionType = {
  type: typeof SET_AMENITIES;
  payload: IAmenity[];
};