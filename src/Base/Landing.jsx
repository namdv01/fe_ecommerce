import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import CardItem from '../components/Content/CardItem';
import SlideShow from '../components/Content/SlideShow';
import Pagination from './Pagination';
// eslint-disable-next-line no-unused-vars
import {
	LOADING_FALSE, LOADING_TRUE, SHOW_TOAST,
} from '../services/constants';
import systemMiddleware from '../store/middleware/system';
import Toast from './Toast';

function Landing() {
	const {
		products, nameProduct, minCostProduct, maxCostProduct, pageProduct, totalPage,
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
		if (location.state && location.state.id) {
			dispatch({
				type: SHOW_TOAST,
				payload: {
					...location.state,
				},
			});
		}
	}, []);

	useEffect(() => {
		const show = async () => {
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight
			&& pageProduct < totalPage) {
				dispatch({
					type: LOADING_TRUE,
				});
				await dispatch(systemMiddleware.searchProduct({ page: pageProduct + 1 }, { type: 'loadMore' }));
				dispatch({
					type: LOADING_FALSE,
				});
			}
		};
		document.addEventListener('scroll', show, true);
		return () => {
			document.removeEventListener('scroll', show, true);
		};
	}, [pageProduct, totalPage]);

	return (
		<div
			aria-hidden
		>
			<SlideShow />
			{location.state?.id ? <Toast id={location.state?.id} /> : <> </>}
			<div
				className="flex flex-row flex-wrap justify-center"
				ref={listRef}
			>
				{products.length === 0 ? <div>Kh??ng c?? s???n ph???m n??o</div> : products.map((item) => (
					<div key={Math.random() + item.id} className="w-1/4 min-w-[320px] max-w-[400px] my-2 mx-auto flex justify-center">
						<CardItem item={item} />
					</div>
				))}

			</div>
			{products.length === 0 ? <> </> : (
				<Pagination
					totalPage={products.total || 0}
					numberPage={products.current}
					changePage={changePage}
				/>
			)}
		</div>
	);
}

export default Landing;
