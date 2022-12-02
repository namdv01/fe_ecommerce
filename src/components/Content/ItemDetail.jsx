import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import { useParams } from 'react-router-dom';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import Loading from '../../Base/Loading';
import api from '../../config/api';
import { LOADING_FALSE, LOADING_TRUE } from '../../services/constants';
import notImage from '../../assets/image/notImage.png';

function ItemDetail() {
	const { id_item: idItem } = useParams();
	const [responsive, setResponsive] = useState({});
	const [item, setItem] = useState({
		itemImageData: [],
	});
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.systemReducer.loading);
	useEffect(() => {
		const callItemDetail = async () => {
			dispatch({
				type: LOADING_TRUE,
			});
			const result = await api.get(`user/detail_item/${idItem}`);
			if (result.errCode === 0) {
				console.log('có thay đổi');
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
	useEffect(() => {
		const newResponsive = {
			desktop: {
				breakpoint: {
					min: 0,
					max: 1920,
				},
				items: 1,
				slidesToSlide: 1,
			},
		};
		setResponsive({ ...responsive, ...newResponsive });
	}, []);
	return (
		<div>
			ItemDetail
			<span>{idItem}</span>
			<div className="flex flex-row">
				<Carousel responsive={responsive} showDots infinite className="w-[600px]">
					{
						// eslint-disable-next-line no-unused-vars
						item.itemImageData.map((image) => (
							<img src={image.image || notImage} className="w-[600px] h-[400px]" key={Math.random() + image.id} alt="không có ảnh" />
						))
					}
				</Carousel>
				<div>
					<h4 className="font-bold">{item.name}</h4>
					<h3>{item.description}</h3>
					<NumberFormat value={item.price} thousandSeparator />
					<div className="flex flex-row">
						<span>Số lượng: </span>
						<div>
							<AiFillPlusCircle />
							<input type="number" min={0} />
							<AiFillMinusCircle />
						</div>
					</div>
					<div>
						<button type="button">Thêm sản phẩm vào giỏ</button>
						<button type="button">Mua hàng</button>
					</div>
				</div>
			</div>
			{loading ? <Loading isFullScreen /> : <> </>}
		</div>
	);
}

export default ItemDetail;
