/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import NumberFormat from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import api from '../config/api';
import notImage from '../assets/image/notImage.png';
import { API_PUBLIC, SHOW_TOAST } from '../services/constants';
import notItemInCart from '../assets/image/notItemInCart.png';
import Buy from '../Forms/Buy';
import Confirm from '../Forms/Confirm';
import authMiddleware from '../store/middleware/auth';
import Toast from './Toast';

function Cart() {
	const dispatch = useDispatch();
	const [cart, setCart] = useState([]);
	const [cookies, setCookie] = useCookies();
	const [totalPrice, setTotalPrice] = useState(0);
	const [listCheck, setListCheck] = useState(false);
	const [isBuy, setBuy] = useState(false);
	const navigate = useNavigate();
	const getNewPrice = (itemInCart) => {
		if (itemInCart.itemData.promotionItemData.length !== 0) {
			return 0.01 * itemInCart.itemData.price
			* (100 - itemInCart.itemData.promotionItemData[0].promotionData.reducePercent);
		}
		return null;
	};
	const [confirmRemove, setConfirmRemove] = useState({
		title: '',
		check: false,
		index: -1,
	});

	const changeCheck = (e, id) => {
		const index = cart.findIndex((c) => c.id === id);
		cart[index].isCheck = e.target.checked;
		setCart([...cart]);
		let newPrice = 0;
		cart.forEach((item) => {
			if (item.isCheck) {
				newPrice += (getNewPrice(item) || item.itemData.price) * item.quantity;
			}
		});
		setTotalPrice(newPrice);
		// eslint-disable-next-line consistent-return
		cart.forEach((item) => {
			if (item.isCheck !== cart[0].isCheck) return false;
		});
		setListCheck(true);
	};

	const changeNumber = (item, number, type = 'button') => {
		const index = cart.findIndex((c) => c.id === item.id);
		const newItem = cart[index].quantity + number;
		if (newItem <= 0) {
			setConfirmRemove({
				...confirmRemove, index, check: true, title: `Xóa ${item.itemData.name} khỏi giỏ`,
			});
		} else {
			cart[index].quantity += number;
			setCart([...cart]);
		}
	};

	const confirmRemoveItemIndex = async () => {
		if (confirmRemove.index >= 0) {
			cart.splice(confirmRemove.index, 1);
			setCart([...cart]);
			await dispatch(authMiddleware.getProfile());
		}
	};

	const changeCheckAll = (e) => {
		const newCart = cart.map((item) => ({
			...item,
			isCheck: e.target.checked,
		}));
		setCart([...newCart]);
	};

	useEffect(() => {
		const getCart = async () => {
			const result = await api.get('user/cart');
			if (result.errCode === 0) {
				const newCart = result.payload.map((item) => ({
					...item,
					isCheck: false,
				}));
				setCart(newCart);
			}
			return result;
		};
		getCart();
	}, []);

	useEffect(() => {
		let newPrice = 0;
		if (cart.length !== 0) {
			cart.forEach((item) => {
				if (item.isCheck) {
					newPrice += (getNewPrice(item) || item.itemData.price) * item.quantity;
				}
			});
			setTotalPrice(newPrice);
			const cookieCart = cart.map((i) => ({
				itemId: i.itemId,
				quantity: i.quantity,
			}));
			setCookie('cart', cookieCart, { path: '/' });
		}
	}, [cart]);

	const navigateToHome = () => {
		navigate('/');
	};
	const [idToast, setIdToast] = useState(null);

	return (
		<div>
			{
				cart.map((itemInCart) => (
					<div className="flex flex-row items-center justify-center" key={itemInCart.itemData.name}>
						<input
							type="checkbox"
							className="scale-150"
							name=""
							id=""
							checked={itemInCart.isCheck}
							onChange={(e) => {
								changeCheck(e, itemInCart.id);
							}}
						/>
						<div className="w-[200px] flex flex-col justify-center p-3 border m-3">
							<h4>{itemInCart.itemData.name}</h4>
							<img
								src={itemInCart.itemData.itemImageData.length > 0
									? API_PUBLIC + itemInCart.itemData.itemImageData[0].image : notImage}
								alt=""
								className="w-50 h-50"
							/>
							<div className="border inline-flex flex-row items-center w-[150px] mx-auto">
								<i
									className="py-2 px-3 text-center w-1/3"
									onClick={(e) => {
										changeNumber(itemInCart, -1);
									}}
									aria-hidden
								>
									<AiOutlineMinus />
								</i>
								<input type="number" className="outline-none w-1/3 border-r border-l p-2 text-sm" value={itemInCart.quantity} min={1} max={itemInCart.itemData.quantity} />
								<i
									className="py-2 px-3 text-center w-1/3"
									onClick={(e) => {
										changeNumber(itemInCart, 1);
									}}
									aria-hidden
								>
									<AiOutlinePlus />
								</i>
							</div>
							<div className="flex flex-col">
								<NumberFormat value={itemInCart.itemData.price} disabled className={getNewPrice(itemInCart) ? 'line-through text-center' : 'text-center'} thousandSeparator />
								{getNewPrice(itemInCart) ? <NumberFormat value={getNewPrice(itemInCart)} disabled thousandSeparator className="outline-none text-center" /> : <> </>}
								<span />
							</div>
							<p>
								Còn
								{` ${itemInCart.itemData.quantity} `}
								sản phẩm
							</p>
						</div>
					</div>
				))
			}
			{
				cart.length > 0
					? (
						<div className="flex flex-row justify-around">
							<div className="min-w-[80px] text-center leading-10 mt-2">
								<input
									type="checkbox"
									className="scale-150 mr-3"
									value={listCheck}
									onChange={(e) => {
										changeCheckAll(e);
									}}
								/>
								<span>Tất cả</span>
							</div>
							<div className="flex items-center flex-row flex-wrap justify-end">
								<span className="mr-1 mt-2">
									Tổng tiền:
									<NumberFormat value={totalPrice} disabled thousandSeparator className="outline-none text-center p-2" />
								</span>
								<input
									type="button"
									value="Đặt hàng"
									onClick={() => {
										if (cart.findIndex((item) => item.isCheck) !== -1) {
											setBuy(true);
										} else {
											const id = Math.random();
											setIdToast(id);
											dispatch({
												type: SHOW_TOAST,
												payload: {
													id,
													type: 'warning',
													content: 'Cần chọn ít nhất một sản phẩm',
												},
											});
										}
									}}
									className="ml-3 mt-2 mr-2 hover:cursor-pointer bg-[#ffcc00] hover:bg-[#ffe680] p-2 outline-none"
								/>
							</div>
						</div>
					)
					: (
						<div className="flex flex-row items-center justify-center" style={{ height: 'calc(100vh - 64px)' }}>
							<div className="text-center">
								Chưa có sản phẩm nào trong giỏ
								<br />
								<span aria-hidden className="hover:cursor-pointer hover:text-[#fe8c1a]" onClick={navigateToHome}>Mua sắm ngay</span>
								<img src={notItemInCart} className="mx-auto w-32 h-32" alt="" />
							</div>
						</div>
					)
			}
			{
				isBuy ? (
					<Buy
						items={cart.map((itemInCart) => ({
							...itemInCart,
							itemData: {
								...itemInCart.itemData,
								price: getNewPrice(itemInCart) || itemInCart.itemData.price,
							},
						}))}
						setBuy={setBuy}
						type="cart"
					/>
				) : <> </>
			}
			{ confirmRemove.check ? (
				<Confirm
					title={confirmRemove.title}
					cancelHandle={setConfirmRemove}
					confirmHandle={confirmRemoveItemIndex}
				/>
			) : <> </>}
			{
				idToast ? <Toast id={idToast} setIdToast={setIdToast} /> : <> </>
			}
		</div>
	);
}

export default Cart;
