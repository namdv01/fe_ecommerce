import {
	LOADING_FALSE, LOADING_TRUE,
} from '../../services/constants';

const initState = {
	loading: null,
	countLoading: 0,
};

// eslint-disable-next-line default-param-last
const systemReducer = (state = initState, action) => {
	switch (action.type) {
		case LOADING_TRUE: {
			console.log('bắt đầu load');
			const { countLoading } = state;
			return {
				...state,
				loading: true,
				countLoading: countLoading + 1 > 0 ? countLoading + 1 : 0,
			};
		}

		case LOADING_FALSE: {
			console.log('kết thúc load');
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

		default:
			return state;
	}
};

export default systemReducer;
