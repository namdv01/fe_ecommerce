import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import CardItem from '../components/Content/CardItem';
import SlideShow from '../components/Content/SlideShow';
import Pagination from './Pagination';
// eslint-disable-next-line no-unused-vars
import { LOADING_FALSE, LOADING_TRUE, SHOW_TOAST } from '../services/constants';
import systemMiddleware from '../store/middleware/system';
import Toast from './Toast';

function Landing() {
	const {
		products, nameProduct, minCostProduct, maxCostProduct,
	} = useSelector((state) => state.systemReducer);
	const listRef = useRef();
	const dispatch = useDispatch();
	const location = useLocation();
	const callApi = async () => {
		dispatch({
			type: LOADING_TRUE,
		});
		const value = {};
		if (nameProduct) value.name = nameProduct;
		if (minCostProduct) value.min = minCostProduct;
		if (maxCostProduct) value.max = maxCostProduct;
		await dispatch(systemMiddleware.searchProduct(value));
		dispatch({
			type: LOADING_FALSE,
		});
	};
	const changePage = (numberPage) => {
		console.log(numberPage);
	};
	useEffect(() => {
		callApi();
		console.log(location);
		if (location.state && location.state.id) {
			console.log(location.state.id);
			console.log('có show ');
			dispatch({
				type: SHOW_TOAST,
				payload: {
					...location.state,
				},
			});
		}
	}, []);

	// const onScroll = () => {
	// 	console.log(123);
	// 	if (listRef.current) {
	// 		const { scrollTop, scrollHeight, clientHeight } = listRef.current;
	// 		if (scrollTop + clientHeight === scrollHeight) {
	// 			console.log('sẽ call thêm api tại đây');
	// 		}
	// 	}
	// };
	useEffect(() => {
	}, [listRef.clientHeight]);

	return (
		<div
			ref={listRef}
			aria-hidden
		>
			<SlideShow />
			{location.state?.id ? <Toast id={location.state?.id} /> : <> </>}
			<div className="flex flex-col">
				{products.length === 0 ? <div>Không có sản phẩm nào</div> : products.map((item) => (
					<div key={item.id}>
						<CardItem item={item} />
					</div>
				))}

			</div>
			{products.length === 0 ? <> </> : (
				<Pagination
					totalPage={products.total}
					numberPage={products.current}
					changePage={changePage}
				/>
			)}
		</div>
	);
}

export default Landing;
