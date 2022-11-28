import { combineReducers } from 'redux';
import authReducer from './reducer/auth';
import systemReducer from './reducer/system';

const root = combineReducers({
	authReducer,
	systemReducer,
});

export default root;
