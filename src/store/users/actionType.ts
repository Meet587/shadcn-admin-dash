import { IUser } from '../../repositories/users.action';

export const SET_USER_LIST = 'SET_USER_LIST';

export type UserActionType = {
  type: typeof SET_USER_LIST;
  payload: IUser[];
};
