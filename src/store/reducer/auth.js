import {
	LOGIN, LOGOUT, REFRESH, REGISTER, UPDATE_PROFILE,
} from '../../services/constants';
import authActions from '../actions/auth';

const initState = {
	isAuth: false,
	profile: {},
};

// eslint-disable-next-line default-param-last
const authReducer = (state = initState, action) => {
	switch (action.type) {
		case LOGIN:
			return authActions.login(state, action.payload);
		case LOGOUT:
			return authActions.logout(state);
		case REFRESH:
			return state;
		case REGISTER:
			return state;
		case UPDATE_PROFILE:
			return authActions.updateProfile(state, action.payload);
		default:
			return state;
	}
};

export default authReducer;
