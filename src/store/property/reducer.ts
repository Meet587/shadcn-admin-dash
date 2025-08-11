import { PropertyActionType, SET_PROPERTY_LIST } from './actionType';

const initialState = {
  properties: {
    data: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  },
};

const propertyReducer = (state = initialState, action: PropertyActionType) => {
  switch (action.type) {
    case SET_PROPERTY_LIST:
      return { ...state, properties: action.payload };
    default:
      return state;
  }
};

export default propertyReducer;
