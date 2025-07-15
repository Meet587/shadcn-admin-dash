import { combineReducers } from 'redux';
import cityReducer from './city/reducer';
import counterReducer from './counter/reducer';

// Combine Reducers
const rootReducer = combineReducers({
  counter: counterReducer,
  city: cityReducer,
  // Add other reducers here if you have more
});

export default rootReducer;
