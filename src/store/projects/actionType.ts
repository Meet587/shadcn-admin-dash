import { IProject } from '../../repositories/project.action';

export const SET_PROJECT_LIST = 'SET_PROJECT_LIST';

export type ProjectActionType = {
  type: typeof SET_PROJECT_LIST;
  payload: IProject[];
};
