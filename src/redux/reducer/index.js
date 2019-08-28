import { combineReducers } from 'redux';
import activityDataReducer from './activityDataReducer'
import pageReducer from './pageReducer'

const allReducers = combineReducers({
    activityData: activityDataReducer,
    page:pageReducer
  });

export default allReducers;

