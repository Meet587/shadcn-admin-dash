import { IUser } from '../../repositories/users.action';
import { SET_USER_LIST } from './actionType';

export const _setUserList = (users: IUser[]) => {
  return {
    type: SET_USER_LIST,
    payload: users,
  };
};
