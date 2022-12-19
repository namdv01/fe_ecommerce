/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import NumberFormat from 'react-number-format';
import api from '../../config/api';
import { LOADING_FALSE, LOADING_TRUE } from '../../services/constants';
import formatDay from '../../services/formatDay';

function Order() {
	const { stateOrder } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const [states, setState] = useState([]);
	const dispatch = useDispatch();
	const [items, setItems] = useState([
		{
			idOrder: 1,
			address: 'Hà Nội',
			phoneNumber: '03351467514',
			customer: 'Nguyễn Văn A',
			methodPayment: 'paypal',
			statePayment: true,
			stateHandle: 'watting', // confirm,delivering,done,cancel,
			time: '21:50 Thứ 7 ngày 10/12/2022',
			items: [
				{
					name: 'Bánh kẹo',
					quantity: 2,
					price: 120000,
				},
				{
					name: 'Quần áo',
					quantity: 3,
					price: 990000,
				},
			],
		},
		{
			idOrder: 1,
			address: 'Hà Nội',
			phoneNumber: '03351467514',
			customer: 'Nguyễn Văn A',
			methodPayment: 'paypal',
			statePayment: true,
			stateHandle: 'watting', // confirm,delivering,done,cancel,
			time: '21:50 Thứ 7 ngày 10/12/2022',
			items: [
				{
					name: 'Bánh kẹo',
					quantity: 2,
					price: 120000,
				},
				{
					name: 'Quần áo',
					quantity: 3,
					price: 990000,
				},
			],
		},
		{
			idOrder: 1,
			address: 'Hà Nội',
			phoneNumber: '03351467514',
			customer: 'Nguyễn Văn A',
			methodPayment: 'paypal',
			statePayment: true,
			stateHandle: 'watting', // confirm,delivering,done,cancel,
			time: '21:50 Thứ 7 ngày 10/12/2022',
			items: [
				{
					name: 'Bánh kẹo',
					quantity: 2,
					price: 120000,
				},
				{
					name: 'Quần áo',
					quantity: 3,
					price: 990000,
				},
				{
					name: 'Bánh kẹo',
					quantity: 2,
					price: 120000,
				},
				{
					name: 'Quần áo',
					quantity: 3,
					price: 990000,
				},
				{
					name: 'Bánh kẹo',
					quantity: 2,
					price: 120000,
				},
				{
					name: 'Quần áo',
					quantity: 3,
					price: 990000,
				},
				{
					name: 'Bánh kẹo',
					quantity: 2,
					price: 120000,
				},
				{
					name: 'Quần áo',
					quantity: 3,
					price: 990000,
				},

				{
					name: 'Bánh kẹo',
					quantity: 2,
					price: 120000,
				},
				{
					name: 'Quần áo',
					quantity: 3,
					price: 990000,
				},
			],
		},
	]);

	// useEffect(() => {
	// 	console.log(location);
	// }, []);

	useEffect(() => {
		const newState = [
			{
				title: 'Đợi xác nhận',
				state: 'watting',
				check: stateOrder === 'watting',
				id: 1,
			},
			{
				title: 'Đã xác nhận',
				state: 'confirm',
				check: stateOrder === 'confirm',
				id: 2,
			},
			{
				title: 'Đang giao hàng',
				state: 'delivering',
				check: stateOrder === 'delivering',
				id: 3,
			},
			{
				title: 'Đã giao hàng',
				state: 'done',
				check: stateOrder === 'done',
				id: 4,
			},
			{
				title: 'Hủy',
				state: 'cancel',
				check: stateOrder === 'cancel',
				id: 5,
			},
		];
		setState([...newState]);
		if (!stateOrder && location.pathname.includes('orders')) {
			navigate('watting');
		} else if (!stateOrder && !location.pathname.includes('orders')) {
			navigate('orders/watting');
		}
	}, [stateOrder]);

	useEffect(() => {
		console.log(123);
		console.log(states);
		console.log(stateOrder);
		if (states.length > 0 && stateOrder && states.findIndex((st) => st.check === true) < 0) {
			console.log(stateOrder);
			console.log(states);
			const newS = states.map((s) => {
				if (s.state === stateOrder) {
					return {
						...s,
						check: true,
					};
				}
				return s;
			});
			setState([...newS]);
			// navigate('/not_found');
		}
	}, [states]);

	const convertMethodPayment = (value) => {
		switch (value) {
			case 'afterReveice':
				return 'Thanh toán khi nhận hàng';
			case 'paypal':
				return 'Tài khoản Paypal';
			default:
				return value;
		}
	};

	useEffect(() => {
		const callOrder = async () => {
			dispatch({
				type: LOADING_TRUE,
			});

			const result = await api.get('user/list_orders', { params: { status: stateOrder === 'watting' ? 'none' : stateOrder } });
			if (result.errCode === 0) {
				setItems([...result.payload.orders]);
			}
			dispatch({
				type: LOADING_FALSE,
			});
		};
		if (stateOrder) callOrder();
	}, [stateOrder]);

	return (
		<div className="flex flex-col w-[90%] mx-[auto]">
			<div className="relative flex-row flex justify-between sm:mt-0 mt-4 sm:mb-12 mb-4">
				<div className="absolute h-1 bg-[#5fdf5f] w-full top-[50%] z-[1] translate-y-1/2" />
				{
					states.map((item) => (
						<div
							className="hover: cursor-pointer"
							onClick={() => {
								navigate(`/buyer/orders/${item.state}`);
							}}
							aria-hidden
						>
							<div title={item.title} className={`w-12 h-12 leading-[48px] text-center rounded-[50%] border bg-white z-10 relative hover:bg-[#e4e440] ${item.check ? 'bg-[#e4e440]' : ''}`}>
								{item.id}
								<span className="absolute top-full right-[50%] w-[120px] translate-x-1/2 sm:block hidden">{item.title}</span>
							</div>
						</div>
					))
				}
			</div>
			<div>
				{
					items.map((item) => (
						<div className="flex md:flex-row flex-col p-2 border rounded-2xl my-2">
							<div className="flex flex-col">
								<span>
									<b className="text-sm">Mã đơn hàng:</b>
									{item.id}
								</span>
								<span>
									<b className="text-sm">Khách hàng:</b>
									{item.userData?.fullname}
								</span>
								<span>
									<b className="text-sm">Số điện thoại:</b>
									{item.phoneContact}
								</span>
								<span>
									<b className="text-sm">Địa chỉ nhận hàng:</b>
									{item.addressReceive}
								</span>
								<span>
									<b className="text-sm">Phương thức thanh toán:</b>
									{convertMethodPayment(item.methodPayment)}
								</span>
								<span>
									<b className="text-sm">Thời gian đặt hàng:</b>
									{formatDay.TDMY(item.timeOrder)}
								</span>
							</div>
							<div className="flex flex-col">
								{item.orderItemData?.map((detail) => (
									<span>
										{detail.itemData?.name}
										{': '}
										{detail.quantity}
										{' x '}
										<NumberFormat value={detail.price} disabled thousandSeparator className="bg-white" />
									</span>
								))}
							</div>
							<div className="flex flex-col-reverse">
								<span>
									Tổng tiền thanh toán:
									{' '}
									<NumberFormat
										value={item.orderItemData?.reduce(
											(total, itemA) => total + itemA.price * itemA.quantity,
											0,
										)}
										disabled
										thousandSeparator
										className="bg-white"
									/>

								</span>
								<span className="flex flex-row flex-row-wrap items-center">
									{item.isPayment ? (
										<>
											Đã thanh toán
											{' '}
											<AiFillCheckCircle color="green" />
										</>
									) : (
										<>
											Chưa thanh toán
											<AiFillCloseCircle color="red" />
										</>
									)}
								</span>
							</div>
						</div>
					))
				}
			</div>
		</div>
	);
}

export default Order;
