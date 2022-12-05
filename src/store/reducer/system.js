import {
	CLOSE_TOAST,
	LOADING_FALSE, LOADING_TRUE, SHOW_TOAST,
} from '../../services/constants';

const initState = {
	loading: null,
	countLoading: 0,
	// isShowToast: false,
	// type: null,
	// content: null,
	// time: 2000,
	// id: 1,
	toastes: [],
};

// eslint-disable-next-line default-param-last
const systemReducer = (state = initState, action) => {
	switch (action.type) {
		case LOADING_TRUE: {
			const { countLoading } = state;
			return {
				...state,
				loading: true,
				countLoading: countLoading + 1 > 0 ? countLoading + 1 : 0,
			};
		}

		case LOADING_FALSE: {
			const { countLoading } = state;
			if (countLoading > 1) {
				return {
					...state,
					loading: true,
					countLoading: countLoading - 1,
				};
			}
			return {
				...state,
				loading: false,
				countLoading: 0,
			};
		}

		case SHOW_TOAST: {
			return {
				...state,
				toastes: [
					...state.toastes,
					{
						isShowToast: true,
						type: action.payload?.type || 'default',
						content: action.payload?.content || 'Không có thông báo',
						time: 2000,
						id: action.payload.id,
					},
				],
			};
		}

		case CLOSE_TOAST: {
			state.toastes.splice(action.payload.index, 1);
			return {
				...state,
			};
		}

		default:
			return state;
	}
};

export default systemReducer;
