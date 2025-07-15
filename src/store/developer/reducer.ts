import { DeveloperActionType, SET_DEVELOPER_LIST } from './actionType';

const initialState = {
  developers: [],
};

const developerReducer = (
  state = initialState,
  action: DeveloperActionType,
) => {
  switch (action.type) {
    case SET_DEVELOPER_LIST:
      return { ...state, developers: action.payload };
    default:
      return state;
  }
};

export default developerReducer;
