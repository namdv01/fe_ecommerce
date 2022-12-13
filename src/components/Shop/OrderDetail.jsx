import React, { useRef, useEffect } from 'react';
import NumberFormat from 'react-number-format';

function OrderDetail({ ...props }) {
	const myRef = useRef();

	useEffect(() => {
		const clickOutSide = (e) => {
			if (myRef.current && !myRef.current.contains(e.target)) {
				props.setDetail(null);
			}
		};
		document.addEventListener('click', clickOutSide, true);
		return () => {
			document.removeEventListener('click', clickOutSide, true);
		};
	}, []);
	const convertStatus = (status) => {
		switch (status) {
			case 'done':
				return 'Hoàn thành';
			case 'none':
				return 'Chờ xác nhận';
			case 'delivering':
				return 'Đang giao';
			case 'cancel':
				return 'Hủy';
			default:
				return status;
		}
	};
	return (
		<>
			<div className="bg-white p-2 fixed z-[21] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" ref={myRef}>
				<span>
					Mã đơn hàng:
					{' '}
					{props.payload.id}
				</span>
				{
					props.payload.orderItemData.map((item) => (
						<div key={item.itemData.name}>
							{item.itemData.name}
							:
							{item.quantity }
							{' '}
							x
							<NumberFormat value={item.price} disabled thousandSeparator />
						</div>
					))
				}
				<span>
					Trạng thái:
					{' '}
					{convertStatus(props.payload.deliver)}
				</span>
				<span className="border-t border-black">
					Tổng tiền:
					{' '}
					<NumberFormat
						value={props.payload.orderItemData.reduce(
							(total, item) => item.price * item.quantity + total,
							0,
						)}
						disabled
						thousandSeparator
					/>
				</span>
			</div>
			<div className="fixed top-0 bottom-0 right-0 left-0 bg-slate-200 opacity-80 z-20" />
		</>
	);
}

export default OrderDetail;
