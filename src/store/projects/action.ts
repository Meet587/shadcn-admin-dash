import { IAmenity, IProject } from '../../repositories/project.action';
import { SET_AMENITIES, SET_PROJECT_LIST } from './actionType';

export const _setProjectList = (projects: IProject[]) => {
  return {
    type: SET_PROJECT_LIST,
    payload: projects,
  };
};

export const _setAmenities = (amenities: IAmenity[]) => {
  return {
    type: SET_AMENITIES,
    payload: amenities,
  };
};
