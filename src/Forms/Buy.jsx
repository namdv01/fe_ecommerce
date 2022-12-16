/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useRef } from 'react';
import { useCookies } from 'react-cookie';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import notImage from '../assets/image/notImage.png';
import { API_PUBLIC, LOADING_TRUE } from '../services/constants';

function Buy({ ...props }) {
	/**
   * props: {
   *  items: [
   *    {
   *     id: 1,
   *     name: 'bánh kẹo',
   *     quantity: 20,
   *     price: 1111111,
   *     image: 'abc.jpg',
   *    }
   *  ],
   *  type: cart || home
   * }
   */
	const dispatch = useDispatch();
	const [form, setForm] = useState({
		fullname: '',
		address: '',
		phoneNumber: '',
		methodPayment: 'afterReceive',
	});
	const authReducer = useSelector((state) => state.authReducer);
	// eslint-disable-next-line no-unused-vars
	const [cookie, setCookie] = useCookies();
	useEffect(() => {
		const { profile } = authReducer;
		form.addressReceive = profile.address;
		form.phoneContact = profile.phoneNumber;
		form.fullname = profile.fullname;
		setForm({
			...form,
		});
	}, []);

	const changeValue = (e, key) => {
		form[key] = e.target.value;
		setForm({
			...form,
		});
	};
	const myRef = useRef();
	useEffect(() => {
		const clickOutSide = (e) => {
			if (myRef.current && !myRef.current.contains(e.target)) {
				props.setBuy(false);
			}
		};
		document.addEventListener('click', clickOutSide, true);
		return () => {
			document.removeEventListener('click', clickOutSide, true);
		};
	}, []);
	return (
		<>
			<div className="fixed top-0 bottom-0 right-0 left-0 z-20 bg-[#00000027] opacity-80" />
			<div className="bg-white p-2 shadow-lg fixed top-[50%] left-[50%] z-[21] translate-x-[-50%] translate-y-[-50%]" ref={myRef}>
				<div className="flex flex-col">
					<h4>Thông tin nhận hàng:</h4>
					<div className="flex flex-row flex-wrap items-center">
						<label htmlFor="fullname" className="w-[50%]">Người nhận:</label>
						<input
							type="text"
							id="fullname"
							className="w-[50%] outline-none border p-1"
							value={form.fullname}
							onChange={(e) => {
								changeValue(e, 'fullname');
							}}
						/>
					</div>
					<div className="flex flex-row flex-wrap items-center">
						<label htmlFor="address" className="w-[100px]">Địa chỉ:</label>
						<textarea
							name=""
							id="address"
							className="w-[300px] max-h-[120px] outline-none border p-1"
							value={form.addressReceive}
							onChange={(e) => {
								changeValue(e, 'addressReceive');
							}}
						/>
					</div>
					<div className="flex flex-row flex-wrap my-1">
						<label htmlFor="phoneNumber" className="w-[50%]">SĐT:</label>
						<input
							type="text"
							pattern="[0-9.]+"
							name=""
							id="phoneNumber"
							className="w-[50%] border p-1 outline-none"
							value={form.phoneContact}
							onChange={(e) => {
								changeValue(e, 'phoneContact');
							}}
						/>
					</div>
					<div className="flex flex-row flex-wrap">
						<label htmlFor="methodPayment" className="w-[200px]">Thanh toán:</label>
						<select
							id="methodPayment"
							className="w-[100%] outline-none border"
							value={form.methodPayment}
							onChange={(e) => {
								changeValue(e, 'methodPayment');
							}}
						>
							<option value="afterReceive">Thanh toán khi nhận hàng</option>
							<option value="paypal">Thanh toán qua Paypal</option>
						</select>
					</div>
				</div>
				<h4 className="my-1">Sản phẩm:</h4>
				{props.type === 'cart' ? (
					<>
						{props.items.map((item) => (
							<div key={Math.random()} className="flex flex-row">
								<img src={item.itemData.itemImageData[0] ? API_PUBLIC + item.itemData.itemImageData[0].image : notImage} className="w-18 h-24" alt="" />
								<div className="flex flex-col">
									<span>
										{item.itemData.name}
										:
									</span>
									<span>
										<NumberFormat value={item.itemData.price} thousandSeparator className="w-[120px]" />
										{' '}
										x
										{' '}
										{item.quantity}
									</span>
								</div>
							</div>
						))}
						<div className="flex flex-col my-1">
							<span className="text-right">
								Tổng tiền:
								<NumberFormat
									className="max-w-[100px]"
									value={props.items.reduce((total, item) => {
										console.log(props.items);
										return total + item.quantity * item.itemData.price;
									}, 0)}
									thousandSeparator
								/>
							</span>
							{/* <span>{convertMethodPayment(props.methodPayment)}</span> */}
						</div>
					</>
				) : (
					<>
						<div>
							<img src={props.item.itemImageData[0] ? props.item.itemImageData[0].image : notImage} className="w-18 h-24" alt="" />
							<div className="flex flex-col">
								<span>
									{props.item.name}
									:
								</span>
								<span>
									<NumberFormat value={props.item.price} thousandSeparator className="w-[120px]" />
									{' '}
									x
									{' '}
									{props.item.number}
								</span>
							</div>
							<div>
								<label htmlFor="number">Số lượng</label>
								<input type="number" name="" id="number" />
							</div>
							<div className="flex flex-col my-1">
								<span className="text-right">
									Tổng tiền:
									<NumberFormat
										className="max-w-[100px]"
										value={props.item.number * props.item.price}
										thousandSeparator
									/>
								</span>
								{/* <span>{convertMethodPayment(props.methodPayment)}</span> */}
							</div>
						</div>
						<div />
					</>
				)}
				<div className="flex flex-row justify-between">
					<a href={`http://localhost:6789/user/payment?fullname=${form.fullname}&address=${form.addressReceive}&phoneContact=${form.phoneContact}`}>
						<input
							type="button"
							value="Đặt hàng"
							className="px-2 py-1 border outline-none hover:cursor-pointer bg-[#4adfea] hover:bg-[#4ae5f0]"
							onClick={() => {
								const order = [];
								dispatch({
									type: LOADING_TRUE,
								});
								if (props.item) {
									order.push({
										itemId: props.item.id,
										quantity: props.item.number,
										name: props.item.name,
									});
								} else if (props.items) {
									props.items.forEach((i) => {
										order.push({
											itemId: i.itemId,
											name: i.name,
											quantity: i.quantity,
										});
									});
								}
								setCookie('order', order, { path: '/' });
							}}
						/>
					</a>
					<input
						type="button"
						value="Đóng"
						onClick={() => {
							props.setBuy(false);
						}}
						className="px-2 py-1 border outline-none hover:cursor-pointer bg-[#ef6174] hover:bg-[#ef4b4b]"
					/>
				</div>
			</div>
		</>
	);
}

export default Buy;
