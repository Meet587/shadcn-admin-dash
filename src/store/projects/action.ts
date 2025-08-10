import { IAmenity, IPaginatedProjectList } from '../../repositories/project.action';
import { SET_AMENITIES, SET_PROJECT_LIST } from './actionType';

export const _setProjectList = (projects: IPaginatedProjectList) => {
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
