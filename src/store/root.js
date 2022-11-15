import { combineReducers } from 'redux';
import authReducer from './reducer/auth';

const root = combineReducers({
  authReducer,
});

export default root;
