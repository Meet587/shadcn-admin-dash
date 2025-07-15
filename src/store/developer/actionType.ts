import { IBuilder } from '../../repositories/builders.action';

export const SET_DEVELOPER_LIST = 'SET_DEVELOPER_LIST';

export type DeveloperActionType = {
  type: typeof SET_DEVELOPER_LIST;
  payload: IBuilder[];
};
