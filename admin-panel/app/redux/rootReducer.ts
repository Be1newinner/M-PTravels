import { combineReducers } from 'redux';
import auth from './reducers/authReducer';

export const rootReducer = combineReducers({
  auth,
})
