import { LeadsActionType, SET_LEADS_LIST } from './actionType';

const initialState = {
  leads: [],
};

const leadsReducer = (state = initialState, action: LeadsActionType) => {
  switch (action.type) {
    case SET_LEADS_LIST:
      return { ...state, leads: action.payload };
    default:
      return state;
  }
};

export default leadsReducer;
