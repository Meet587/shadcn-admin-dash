import { combineReducers } from 'redux';
import developerReducer from './developer/reducer';
import leadsReducer from './leads/reducer';
import locationsReducer from './locations/reducer';
import projectReducer from './projects/reducer';
import propertyReducer from './property/reducer';
import userReducer from './users/reducer';

// Combine Reducers
const rootReducer = combineReducers({
  locations: locationsReducer,
  developer: developerReducer,
  project: projectReducer,
  property: propertyReducer,
  user: userReducer,
  leads: leadsReducer,
  // Add other reducers here if you have more
});

export default rootReducer;
