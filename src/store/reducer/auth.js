import {
	LOGIN, LOGOUT, REFRESH, REGISTER,
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
			return state;
		case REFRESH:
			return state;
		case REGISTER:
			return state;
		default:
			return state;
	}
};

export default authReducer;
