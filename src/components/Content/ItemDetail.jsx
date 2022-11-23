import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../Base/Loading';
import api from '../../config/api';

function ItemDetail() {
	const { id_item: idItem } = useParams();
	const [item, setItem] = useState({});
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const callItemDetail = async () => {
			setLoading(true);
			const result = await api.get(`user/detail_item/${idItem}`);
			setLoading(false);
			console.log(result);
			if (result.errCode === 0) {
				setItem({ ...item, ...result.payload });
			} else {
				setItem('Sản phẩm không tồn tại');
			}
		};
		callItemDetail();
	}, []);
	return (
		<div>
			ItemDetail
			<span>{idItem}</span>
			{loading ? <Loading isFullScreen loading={loading} /> : <> </>}
		</div>
	);
}

export default ItemDetail;
