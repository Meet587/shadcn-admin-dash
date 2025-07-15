import { ProjectActionType, SET_PROJECT_LIST } from './actionType';

const initialState = {
  projects: [],
};

const projectReducer = (state = initialState, action: ProjectActionType) => {
  switch (action.type) {
    case SET_PROJECT_LIST:
      return { ...state, projects: action.payload };
    default:
      return state;
  }
};

export default projectReducer;
