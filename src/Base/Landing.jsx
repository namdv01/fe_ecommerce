import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardItem from '../components/Content/CardItem';
import SlideShow from '../components/Content/SlideShow';
import Pagination from './Pagination';
import { LOADING_FALSE, LOADING_TRUE } from '../services/constants';
import systemMiddleware from '../store/middleware/system';

function Landing() {
	const {
		products, nameProduct, minCostProduct, maxCostProduct,
	} = useSelector((state) => state.systemReducer);
	const listRef = useRef();
	const dispatch = useDispatch();
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
