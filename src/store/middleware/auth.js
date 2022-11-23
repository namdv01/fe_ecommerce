/* eslint-disable no-unused-vars */
import api from '../../config/api';
import { LOGIN } from '../../services/constants';

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
};

export default authMiddleware;
