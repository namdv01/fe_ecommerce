import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import CardItem from '../components/Content/CardItem';
import SlideShow from '../components/Content/SlideShow';
import Pagination from './Pagination';
import api from '../config/api';
import { LOADING_FALSE, LOADING_TRUE } from '../services/constants';

function Landing() {
	const [items, setItems] = useState([]);
	const [page, setPage] = useState({
		total: null,
		current: null,
	});
	const listRef = useRef();
	const dispatch = useDispatch();
	const callApi = async () => {
		dispatch({
			type: LOADING_TRUE,
		});
		const result = await api.get('user/search_product');
		if (result.errCode === 0) {
			setItems(result.payload.products);
			setPage({
				...page,
				total: result.payload.totalPage,
				current: result.payload.page,
			});
		}
		dispatch({
			type: LOADING_FALSE,
		});
	};
	const changePage = (numberPage) => {
		setPage({
			...page,
			current: numberPage,
		});
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
		console.log(listRef);
	}, [listRef.clientHeight]);

	return (
		<div
			ref={listRef}
			onClick={
				(e) => {
					console.log(e);
				}
			}
			aria-hidden
		>
			<SlideShow />
			<div className="flex flex-col">
				{items.map((item) => (
					<div key={item.id}>
						<CardItem item={item} />
					</div>
				))}
			</div>
			<Pagination
				totalPage={page.total}
				numberPage={page.current}
				changePage={changePage}
			/>
		</div>
	);
}

export default Landing;
