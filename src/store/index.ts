import { combineReducers } from 'redux';
import cityReducer from './city/reducer';
import counterReducer from './counter/reducer';
import developerReducer from './developer/reducer';
import leadsReducer from './leads/reducer';
import projectReducer from './projects/reducer';
import propertyReducer from './property/reducer';
import userReducer from './users/reducer';

// Combine Reducers
const rootReducer = combineReducers({
  counter: counterReducer,
  city: cityReducer,
  developer: developerReducer,
  project: projectReducer,
  property: propertyReducer,
  user: userReducer,
  leads: leadsReducer,
  // Add other reducers here if you have more
});

export default rootReducer;
