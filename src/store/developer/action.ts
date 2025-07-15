import { IBuilder } from '../../repositories/builders.action';
import { SET_DEVELOPER_LIST } from './actionType';

export const _setDeveloperList = (developers: IBuilder[]) => {
  return {
    type: SET_DEVELOPER_LIST,
    payload: developers,
  };
};
