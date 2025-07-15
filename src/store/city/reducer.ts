import { CitiesActionType, SET_CITIES_LIST } from './actionType';

const initialState = {
  cities: [],
};

const cityReducer = (state = initialState, action: CitiesActionType) => {
  switch (action.type) {
    case SET_CITIES_LIST:
      return { ...state, cities: action.payload };
    default:
      return state;
  }
};

export default cityReducer;
