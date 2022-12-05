import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardItem from '../components/Content/CardItem';
import SlideShow from '../components/Content/SlideShow';
import Loading from './Loading';
import Pagination from './Pagination';
import api from '../config/api';
import { LOADING_FALSE, LOADING_TRUE } from '../services/constants';

function Landing() {
	const [items, setItems] = useState([]);
	const [page, setPage] = useState({
		total: null,
		current: null,
	});
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.systemReducer.loading);
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

	useEffect(() => {});
	return (
		<>
			<SlideShow />
			<div className="flex flex-row flex-wrap">
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
			{loading ? <Loading isFullScreen /> : <> </>}
		</>
	);
}

export default Landing;
