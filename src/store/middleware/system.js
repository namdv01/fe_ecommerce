/* eslint-disable no-unused-vars */
import api from '../../config/api';
import { SEARCH_PRODUCT } from '../../services/constants';

const systemMiddleware = {
	searchProduct(value, type = null) {
		return async (dispatch, getState) => {
			const result = await api.get('user/search_product', {
				params: value,
			});
			if (result.errCode === 0) {
				dispatch({
					type: SEARCH_PRODUCT,
					payload: {
						products: result.payload.products,
						...type,
						page: result.payload.page,
						totalPage: result.payload.totalPage,
					},
				});
			}
		};
	},
};

export default systemMiddleware;
