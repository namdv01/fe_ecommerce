/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import api from '../../config/api';
import { LOADING_FALSE, LOADING_TRUE } from '../../services/constants';
import formatDay from '../../services/formatDay';
import OrderDetail from './OrderDetail';

function Order() {
	const { stateOrder } = useParams();
	const location = useLocation();
	const [states, setState] = useState([]);
	const [detail, setDetail] = useState(null);
	// eslint-disable-next-line no-unused-vars
	const [orders, setOrder] = useState([
		{
			id: 123,
			customer: 'Nguyễn Văn A',
			timeOrder: '20:00 9/12/2022',
			shop: 'An Cường',
			detail: [
				{
					id: 1,
					name: 'Bánh',
					quantity: 20,
					images: [1, 2, 3],
					price: 1000,
				},
			],
			status: 'done',
		},
		{
			id: 123,
			customer: 'Nguyễn Văn A',
			timeOrder: '20:00 9/12/2022',
			shop: 'An Cường',
			detail: [
				{
					id: 1,
					name: 'Bánh',
					quantity: 20,
					images: [1, 2, 3],
					price: 1000,
				},
			],
			status: 'done',
		},
		{
			id: 123,
			customer: 'Nguyễn Văn A',
			shop: 'An Cường',
			timeOrder: '20:00 9/12/2022',
			detail: [
				{
					id: 1,
					name: 'Bánh',
					quantity: 20,
					images: [1, 2, 3],
					price: 1000,
				},
			],
			status: 'done',
		},
		{
			id: 123,
			customer: 'Nguyễn Văn A',
			shop: 'An Cường',
			timeOrder: '20:00 9/12/2022',
			detail: [
				{
					id: 1,
					name: 'Bánh',
					quantity: 20,
					images: [1, 2, 3],
					price: 1000,
				},
			],
			status: 'done',
		},
		{
			id: 123,
			customer: 'Nguyễn Văn A',
			shop: 'An Cường',
			timeOrder: '20:00 9/12/2022',
			detail: [
				{
					id: 1,
					name: 'Bánh',
					quantity: 20,
					images: [1, 2, 3],
					price: 1000,
				},
			],
			status: 'done',
		},
	]);
	const navigate = useNavigate();
	useEffect(() => {
		console.log(stateOrder);
	}, []);
	const convertStatus = (status) => {
		switch (status) {
			case 'done':
				return 'Hoàn thành';
			case 'watting':
				return 'Chờ xác nhận';
			case 'delivering':
				return 'Đang giao';
			case 'cancel':
				return 'Hủy';
			default:
				return status;
		}
	};

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
		// if (!stateOrder && location.pathname.includes('orders')) {
		// 	navigate('watting');
		// } else if (!stateOrder && !location.pathname.includes('orders')) {
		// 	navigate('orders');
		// }
	}, [stateOrder]);
	useEffect(() => {
		if (states.length > 0 && stateOrder && states.findIndex((st) => st.check === true) < 0) {
			// navigate('/not_found');
		}
	}, [states]);

	const chooseDetail = (order) => {
		setDetail(order);
	};
	const dispatch = useDispatch();

	useEffect(() => {
		const callListOrder = async () => {
			dispatch({
				type: LOADING_TRUE,
			});
			const result = await api.get('admin/list_order');
			if (result.errCode === 0) {
				setOrder(result.payload.order);
			}
			dispatch({
				type: LOADING_FALSE,
			});
		};
		callListOrder();
	}, []);
	const getListShop = (value) => {
		if (!value) return null;
		const arrShop = [];
		value.forEach((i) => {
			arrShop.push(i.itemData.shopData.shopName);
		});
		arrShop.sort();
		if (arrShop.length >= 2) {
			for (let i = 0; i < arrShop.length - 1; i += 1) {
				if (arrShop[i] === arrShop[i + 1]) {
					arrShop.shift();
				}
			}
		}
		return arrShop.toString();
	};
	return (
		<>
			<div className="w-full">
				<table className="w-full">
					<thead className="border border-black border-r-0 bg-[green]">
						<tr>
							<th className="p-2 border-r border-black py-2 px-3 w-[60px] text-center">STT</th>
							<th className="p-2 border-r border-black py-2 px-3 w-[130px]">Mã đơn hàng</th>
							<th className="p-2 border-r border-black py-2 px-3">Người đặt</th>
							<th className="p-2 border-r border-black py-2 px-3">Gian hàng</th>
							<th className="p-2 border-r border-black py-2 px-3 w-[160px]">Thời gian đặt</th>
							<th className="p-2 border-r border-black py-2 px-3 w-[140px]">
								Thông tin đơn
							</th>
							<th className="p-2 border-r border-black py-2 px-3 w-[140px]">Trạng thái đơn</th>
							<th className="p-2 border-r border-black py-2 px-3 w-[120px]">Cập nhật</th>
						</tr>
					</thead>
					<tbody className="border-l border-black">
						{orders.map((order, index) => (
							<tr key={Math.random()}>
								<td className="border-b border-r border-black py-2 px-3 text-center">{index + 1}</td>
								<td className="border-b border-r border-black py-2 px-3 text-center">{order.id}</td>
								<td className="border-b border-r border-black py-2 px-3">{order.userData?.fullname}</td>
								<td className="border-b border-r border-black py-2 px-3">{getListShop(order.orderItemData)}</td>
								<td className="border-b border-r border-black py-2 px-3">{formatDay.TDMY(order.timeOrder)}</td>
								<td className="border-b border-r border-black py-2 px-3">
									<input
										type="button"
										value="Chi tiết"
										onClick={() => {
											chooseDetail(order);
										}}
										className="py-1 px-2 outline-none border bg-blue-300 hover:bg-blue-400"
									/>
								</td>
								<td className="border-b border-r border-black py-2 px-3">{convertStatus(order.status)}</td>
								<td className="border-b border-r border-black py-2 px-3">
									<input type="button" value="Thay đổi" className="py-1 px-2 outline-none border bg-blue-300 hover:bg-blue-400" />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{detail ? (
				<OrderDetail
					detail={detail}
					setDetail={setDetail}
				/>
			) : <> </>}
		</>
	);
}

export default Order;
