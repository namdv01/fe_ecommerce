import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import { useParams } from 'react-router-dom';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import Loading from '../../Base/Loading';
import api from '../../config/api';
import { LOADING_FALSE, LOADING_TRUE, SHOW_TOAST } from '../../services/constants';
import notImage from '../../assets/image/notImage.png';
import Toast from '../../Base/Toast';

function ItemDetail() {
	const { id_item: idItem } = useParams();
	const authReducer = useSelector((state) => state.authReducer);
	const [idToast, setIdToast] = useState(null);
	const [responsive, setResponsive] = useState({});
	const [number, setNumber] = useState(0);
	const [item, setItem] = useState({
		itemImageData: [],
	});
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.systemReducer.loading);
	const changeNumber = (value) => {
		const newNumber = number + value;
		if (newNumber < 0) setNumber(0);
		else setNumber(newNumber);
	};
	const addItemToCart = async () => {
		if (!authReducer.isAuth) {
			const id = Date.now();
			setIdToast(id);
			dispatch({
				type: SHOW_TOAST,
				payload: {
					id,
					content: 'Cần đăng nhập',
					type: 'warning',
				},
			});
			return false;
		}
		dispatch({
			type: LOADING_TRUE,
		});
		const result = await api.post('user/addNewItemToCart', {
			// eslint-disable-next-line radix
			id: parseInt(idItem),
			quantity: number,
		});
		dispatch({
			type: LOADING_FALSE,
		});
		if (result.errCode === 0) {
			const id = Date.now();
			setIdToast(id);
			dispatch({
				type: SHOW_TOAST,
				payload: {
					id,
					content: result.mes,
					type: 'success',
				},
			});
		} else {
			const id = Date.now();
			setIdToast(id);
			dispatch({
				type: SHOW_TOAST,
				payload: {
					id,
					content: result.mes,
					type: 'error',
				},
			});
		}
		return true;
	};
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
			<div className="flex flex-row flex-wrap">
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
					<div className="flex flex-row mb-2">
						<span className="mr-3">Số lượng: </span>
						<div className="flex flex-row items-center">
							<AiFillMinusCircle
								size={20}
								color="red"
								onClick={() => {
									changeNumber(-1);
								}}
								className="hover:cursor-pointer rounded-[50%]"
							/>
							<input
								type="number"
								min={0}
								value={number}
								onChange={(e) => {
									changeNumber(e.target.value);
								}}
								className="outline-none border px-1 text-center w-12 mx-2"
							/>
							<AiFillPlusCircle
								size={20}
								color="red"
								onClick={() => {
									changeNumber(1);
								}}
								className="hover:cursor-pointer rounded-[50%]"
							/>
						</div>
					</div>
					<div>
						<button type="button" className="py-3 border-black mx-2 px-1 border bg-slate-300 text-sm w-[175px] hover:bg-slate-200" onClick={addItemToCart}>Thêm sản phẩm vào giỏ</button>
						<button type="button" className="py-3 border-black mx-2 px-1 border bg-slate-300 text-sm w-[175px] hover:bg-slate-200">Mua hàng</button>
					</div>
				</div>
			</div>
			{loading ? <Loading isFullScreen /> : <> </>}
			{idToast ? <Toast id={idToast} /> : <> </>}
		</div>
	);
}

export default ItemDetail;
