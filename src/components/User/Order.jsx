/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function Order() {
	const { stateOrder } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const [states, setState] = useState([]);
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
		if (states.length > 0 && stateOrder && states.findIndex((st) => st.check === true) < 0) {
			console.log(stateOrder);
			console.log(states);
			// navigate('/not_found');
		}
	}, [states]);

	return (
		<div className="flex flex-col w-[70%] mx-[5%]">
			<div className="relative flex-row flex justify-between mb-12">
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
							<div className={`w-12 h-12 leading-[48px] text-center rounded-[50%] border bg-white z-10 relative hover:bg-[#e4e440] ${item.check ? 'bg-[#e4e440]' : ''}`}>
								{item.id}
								<span className="absolute top-full right-[50%] w-[120px] translate-x-1/2">{item.title}</span>
							</div>
						</div>
					))
				}
			</div>
			<div>
				{
					items.map((item) => (
						<div className="flex flex-row p-2 border rounded-2xl">
							<div className="flex flex-col">
								<span>
									<b className="text-sm">Mã đơn hàng:</b>
									{item.idOrder}
								</span>
								<span>
									<b className="text-sm">Khách hàng:</b>
									{item.customer}
								</span>
								<span>
									<b className="text-sm">Số điện thoại:</b>
									{item.phoneNumber}
								</span>
								<span>
									<b className="text-sm">Địa chỉ:</b>
									{item.address}
								</span>
								<span>
									<b className="text-sm">Phương thức thanh toán:</b>
									{item.methodPayment}
								</span>
								<span>
									<b className="text-sm">Thời gian đặt hàng:</b>
									{item.time}
								</span>
							</div>
							<div className="flex flex-col">
								{item.items.map((detail) => (
									<span>
										{detail.name}
										{': '}
										{detail.quantity}
										{' x '}
										{detail.price}
									</span>
								))}
							</div>
							<div className="flex flex-col-reverse">
								<span>
									Tổng tiền thanh toán:
									{' '}
									{item.items.reduce((total, itemA) => total + itemA.price * itemA.quantity, 0)}
								</span>
								<span>{item.statePayment ? 'Đã thanh toán' : 'Chưa thanh toán'}</span>
							</div>
						</div>
					))
				}
			</div>
		</div>
	);
}

export default Order;
