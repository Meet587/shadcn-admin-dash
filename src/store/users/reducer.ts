import { UserActionType, SET_USER_LIST } from './actionType';

const initialState = {
  users: [],
};

const userReducer = (state = initialState, action: UserActionType) => {
  switch (action.type) {
    case SET_USER_LIST:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

export default userReducer;
