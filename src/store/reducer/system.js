import {
	LOADING_FALSE, LOADING_TRUE,
} from '../../services/constants';

const initState = {
	loading: null,
};

// eslint-disable-next-line default-param-last
const systemReducer = (state = initState, action) => {
	switch (action.type) {
		case LOADING_TRUE:
			console.log(123);
			return {
				...state,
				loading: true,
			};
		case LOADING_FALSE:
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
};

export default systemReducer;
