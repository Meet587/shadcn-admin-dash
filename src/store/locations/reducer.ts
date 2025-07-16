import { LocationsActionType, SET_LOCATIONS_LIST } from './actionType';

const initialState = {
  locations: [],
};

const locationsReducer = (state = initialState, action: LocationsActionType) => {
  switch (action.type) {
    case SET_LOCATIONS_LIST:
      return { ...state, locations: action.payload };
    default:
      return state;
  }
};

export default locationsReducer;
