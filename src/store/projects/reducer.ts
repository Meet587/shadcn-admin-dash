import {
  AmenitiesActionType,
  ProjectActionType,
  SET_AMENITIES,
  SET_PROJECT_LIST,
} from './actionType';

const initialState = {
  projects: {
    data: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  },
  amenities: [],
};

const projectReducer = (
  state = initialState,
  action: ProjectActionType | AmenitiesActionType,
) => {
  switch (action.type) {
    case SET_PROJECT_LIST:
      return { ...state, projects: action.payload };
    case SET_AMENITIES:
      return { ...state, amenities: action.payload };
    default:
      return state;
  }
};

export default projectReducer;
