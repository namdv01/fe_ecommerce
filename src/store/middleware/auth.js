/* eslint-disable no-unused-vars */
import api from '../../config/api';
import { LOGIN, LOGOUT } from '../../services/constants';

const authMiddleware = {
	login(value) {
		return async (dispatch, getState) => {
			const result = await api.post('user/login', value);
			if (result.errCode === 0) {
				dispatch({ type: LOGIN, payload: result });
			} else {
				return result;
			}
			return true;
		};
	},
	getProfile() {
		console.log('call profile');
		return async (dispatch, getState) => {
			const result = await api.get('user/profile');
			if (result.errCode === 0) {
				dispatch({ type: LOGIN, payload: result });
			} else {
				return result;
			}
			return true;
		};
	},
	logout() {
		return async (dispatch, getState) => {
			const result = await api.get('user/logout');
			if (result.errCode === 0) {
				dispatch(({ type: LOGOUT }));
				return true;
			}
			dispatch(({ type: LOGOUT }));
			return result;
		};
	},
};

export default authMiddleware;
