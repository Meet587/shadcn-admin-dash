import { PropertyActionType, SET_PROPERTY_LIST } from './actionType';

const initialState = {
  properties: [],
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
