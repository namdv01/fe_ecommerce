import {
	CLOSE_TOAST,
	LOADING_FALSE, LOADING_TRUE, SEARCH_PRODUCT, SHOW_TOAST, SIZE, CHANGE_SEARCH_PRODUCT,
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
	products: [],
	sizeProduct: SIZE,
	pageProduct: 1,
	nameProduct: '',
	minCostProduct: null,
	maxCostProduct: null,
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

		case SEARCH_PRODUCT: {
			if (action.payload.type === 'loadMore') {
				return {
					...state,
					pageProduct: action.payload.page,
					products: [...state.products, ...action.payload.products],
				};
			}
			return {
				...state,
				pageProduct: action.payload.page,
				products: [...action.payload.products],
			};
		}

		case CHANGE_SEARCH_PRODUCT: {
			return {
				...state,
				nameProduct: action.payload.nameProduct,
				minCostProduct: action.payload.minCostProduct,
				maxCostProduct: action.payload.maxCostProduct,
			};
		}

		default:
			return state;
	}
};

export default systemReducer;
