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
import ImagesFullScreen from '../../Base/ImagesFullScreen';
import Buy from '../../Forms/Buy';

function ItemDetail() {
	const { id_item: idItem } = useParams();
	const authReducer = useSelector((state) => state.authReducer);
	const [idToast, setIdToast] = useState(null);
	const [responsive, setResponsive] = useState({});
	const [number, setNumber] = useState(0);
	const [item, setItem] = useState({
		itemImageData: [],
	});
	const [isBuy, setBuy] = useState(false);
	const [openImages, setOpenImages] = useState(false);
	const turnOpenImages = (value) => {
		setOpenImages(value);
	};
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
		if (number <= 0) {
			const id = Date.now();
			setIdToast(id);
			dispatch({
				type: SHOW_TOAST,
				payload: {
					id,
					content: 'Cần nhập số lượng sản phẩm',
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
	const orderItem = () => {
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
		if (number <= 0) {
			const id = Date.now();
			setIdToast(id);
			dispatch({
				type: SHOW_TOAST,
				payload: {
					id,
					content: 'Cần nhập số lượng sản phẩm',
					type: 'warning',
				},
			});
			return false;
		}
		setBuy(true);
		return true;
	};
	return (
		<div>
			<div className="flex flex-row flex-wrap">
				{
					item.itemImageData.length > 0
						? (
							<Carousel responsive={responsive} showDots infinite className="max-w-[480px] pb-6 w-[90%] mx-auto z-10">
								{
								// eslint-disable-next-line no-unused-vars
									item.itemImageData.map((image) => (
										<img
											src={image.image || notImage}
											onClick={() => setOpenImages(true)}
											className="w-[600px] h-[400px] hover:cursor-pointer"
											key={Math.random() + image.id}
											alt="không có ảnh"
											aria-hidden
										/>
									))
								}
							</Carousel>
						) : (
							<img src={notImage} alt="" className="w-[600px] h-[400px]" />
						)
				}
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
						<button type="button" className="py-3 border-black mx-2 px-1 border bg-slate-300 text-sm w-[175px] hover:bg-slate-200" onClick={orderItem}>Mua hàng</button>
					</div>
				</div>
			</div>
			{loading ? <Loading isFullScreen /> : <> </>}
			{idToast ? <Toast id={idToast} /> : <> </>}
			{openImages ? (
				<ImagesFullScreen
					images={item.itemImageData.map((image) => image.image)}
					turnOpenImages={turnOpenImages}
				/>
			)
				: <> </>}
			{
				isBuy ? <Buy item={{ ...item, number }} setBuy={setBuy} type="landing" /> : <> </>
			}
		</div>
	);
}

export default ItemDetail;
