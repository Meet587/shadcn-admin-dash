import { IProject } from '../../repositories/project.action';
import { SET_PROJECT_LIST } from './actionType';

export const _setProjectList = (projects: IProject[]) => {
  return {
    type: SET_PROJECT_LIST,
    payload: projects,
  };
};
