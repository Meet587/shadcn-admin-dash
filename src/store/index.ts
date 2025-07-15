import { combineReducers } from 'redux';
import cityReducer from './city/reducer';
import counterReducer from './counter/reducer';
import developerReducer from './developer/reducer';

// Combine Reducers
const rootReducer = combineReducers({
  counter: counterReducer,
  city: cityReducer,
  developer: developerReducer,
  // Add other reducers here if you have more
});

export default rootReducer;
