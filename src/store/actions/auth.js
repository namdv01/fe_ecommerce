const authActions = {
	// eslint-disable-next-line no-unused-vars
	login(state, payload) {
		return {
			...state,
			isAuth: true,
			profile: { ...payload.payload },
		};
	},
	refresh(state, payload) {
		return {
			...state,
			profile: {
				...state.profile,
				...payload,
			},
		};
	},
	updateProfile(state, payload) {
		return {
			...state,
			profile: {
				...state.profile,
				...payload,
			},
		};
	},
	logout(state) {
		return {
			...state,
			isAuth: false,
			profile: null,
		};
	},
};

export default authActions;
