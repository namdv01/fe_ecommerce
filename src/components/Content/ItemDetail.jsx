import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../../Base/Loading';
import api from '../../config/api';
import { LOADING_FALSE, LOADING_TRUE } from '../../services/constants';

function ItemDetail() {
	const { id_item: idItem } = useParams();
	const [item, setItem] = useState({});
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.systemReducer.loading);
	useEffect(() => {
		const callItemDetail = async () => {
			dispatch({
				type: LOADING_TRUE,
			});
			const result = await api.get(`user/detail_item/${idItem}`);
			if (result.errCode === 0) {
				setItem({ ...item, ...result.payload });
			} else {
				setItem('Sản phẩm không tồn tại');
			}
			dispatch({
				type: LOADING_FALSE,
			});
		};
		callItemDetail();
	}, []);
	return (
		<div>
			ItemDetail
			<span>{idItem}</span>
			{loading ? <Loading isFullScreen /> : <> </>}
		</div>
	);
}

export default ItemDetail;
