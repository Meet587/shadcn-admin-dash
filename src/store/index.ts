import { combineReducers } from 'redux';
import cityReducer from './city/reducer';
import counterReducer from './counter/reducer';
import developerReducer from './developer/reducer';
import projectReducer from './projects/reducer';
import propertyReducer from './property/reducer';

// Combine Reducers
const rootReducer = combineReducers({
  counter: counterReducer,
  city: cityReducer,
  developer: developerReducer,
  project: projectReducer,
  property: propertyReducer,
  // Add other reducers here if you have more
});

export default rootReducer;
