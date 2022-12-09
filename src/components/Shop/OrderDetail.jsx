import React, { useRef, useEffect } from 'react';

function OrderDetail({
	id, items, status, setDetail,
}) {
	const myRef = useRef();

	useEffect(() => {
		const clickOutSide = (e) => {
			if (myRef.current && !myRef.current.contains(e.target)) {
				setDetail(null);
			}
		};
		document.addEventListener('click', clickOutSide, true);
		return () => {
			document.removeEventListener('click', clickOutSide, true);
		};
	}, []);
	return (
		<>
			<div className="bg-white p-2 fixed z-[21] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" ref={myRef}>
				<span>
					Mã đơn hàng:
					{' '}
					{id}
				</span>
				{
					items.map((item) => (
						<div key={item.name}>
							{item.name}
							:
							{item.quantity }
							{' '}
							x
							{item.price}
						</div>
					))
				}
				<span>
					Trạng thái:
					{' '}
					{status}
				</span>
				<span className="border-t border-black">
					Tổng tiền:
					{' '}
					{items.reduce((total, item) => total + item.quantity * item.price, 0)}
				</span>
			</div>
			<div className="fixed top-0 bottom-0 right-0 left-0 bg-slate-200 opacity-80 z-20" />
		</>
	);
}

export default OrderDetail;
