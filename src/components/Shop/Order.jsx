/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import api from '../../config/api';
import { LOADING_FALSE, LOADING_TRUE } from '../../services/constants';
import OrderDetail from './OrderDetail';
import formatDay from '../../services/formatDay';

function Order() {
	const params = useParams();
	const dispatch = useDispatch();
	const [detail, setDetail] = useState(null);
	const [orders, setOrder] = useState([
		{
			id: 123,
			customer: 'Nguyễn Văn A',
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

	const chooseDetail = (order) => {
		setDetail(order);
	};
	const callOrders = async () => {
		const result = await api.get(`seller/list_order/${params.idShop}`);
		if (result.errCode === 0) {
			setOrder(result.payload);
		}
	};
	useEffect(() => {
		dispatch({
			type: LOADING_TRUE,
		});
		callOrders();
		dispatch({
			type: LOADING_FALSE,
		});
	}, []);
	const convertStateOrder = (value) => {
		switch (value) {
			case 'none':
				return 'Chưa xác nhận';
			case 'delivering':
				return 'Đang giao hàng';
			case 'done':
				return 'Đã giao';
			case 'cancel':
				return 'Hủy';
			default:
				return value;
		}
	};
	return (
		<>
			<div className="w-full">
				<table className="w-full">
					<thead className="border border-black border-r-0 bg-[green]">
						<tr>
							<th className="p-2 border-r border-black py-2 px-3 w-[60px] text-center">STT</th>
							<th className="p-2 border-r border-black py-2 px-3 w-[140px]">Mã đơn hàng</th>
							<th className="p-2 border-r border-black py-2 px-3">Người đặt</th>
							<th className="p-2 border-r border-black py-2 px-3 w-[160px]">Thời gian đặt</th>
							<th className="p-2 border-r border-black py-2 px-3 w-[150px]">
								Thông tin đơn
							</th>
							<th className="p-2 border-r border-black py-2 px-3 w-[150px]">Trạng thái đơn</th>
							<th className="p-2 border-r border-black py-2 px-3 w-[150px]">Cập nhật</th>
						</tr>
					</thead>
					<tbody className="border-l border-black">
						{orders.map((order, index) => (
							<tr key={Math.random()}>
								<td className="border-b border-r border-black py-2 px-3 text-center">{index + 1}</td>
								<td className="border-b border-r border-black py-2 px-3 text-center">{order.id}</td>
								<td className="border-b border-r border-black py-2 px-3">{order.userData?.fullname}</td>
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
								<td className="border-b border-r border-black py-2 px-3">{convertStateOrder(order.deliver)}</td>
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
					payload={detail}
					setDetail={setDetail}
				/>
			) : <> </>}
		</>
	);
}

export default Order;
