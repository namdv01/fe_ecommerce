/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import Switch from 'react-switch';

function ChangeStatusOrder({ ...props }) {
	/**
   * idOrder,
   * customer,
   * timeOrder,
   * status : none, done, delivering,cancel,
   * setIdChange: func, // cancel
   * confirmState: func, // choose auto close
   *
   */
	const [listStatus, setStatus] = useState([
		{
			ori: 'none',
			tran: 'Chưa xác nhận',
			select: false,
			check: false,
			color: '#00ff00',
		},
		{
			ori: 'delivering',
			tran: 'Đang vận chuyển',
			select: false,
			check: false,
			color: '#ff9900',
		},
		{
			ori: 'cancel',
			tran: 'Hủy',
			select: false,
			check: false,
			color: '#ff0000',
		},
		{
			ori: 'done',
			tran: 'Hoàn thành',
			select: false,
			check: false,
			color: '#0000ff',
		},
	]);
	const ref = useRef();
	useEffect(() => {
		const clickOutSide = (e) => {
			if (ref.current && !ref.current.contains(e.target)) {
				props.setIdChange({
					...props.idChange,
					id: null,
				});
			}
		};
		document.addEventListener('click', clickOutSide, true);
		return () => {
			document.removeEventListener('click', clickOutSide, true);
		};
	}, []);
	useEffect(() => {
		console.log(props.idChange);
		switch (props.idChange.ori) {
			case 'none':
				setStatus([
					{
						ori: 'delivering',
						tran: 'Đang vận chuyển',
						select: false,
						check: false,
						color: '#ff9900',
					},
					{
						ori: 'cancel',
						tran: 'Hủy',
						select: false,
						check: false,
						color: '#ff0000',
					},
					{
						ori: 'done',
						tran: 'Hoàn thành',
						select: false,
						check: false,
						color: '#0000ff',
					},
				]);
				break;
			case 'delivering':
				setStatus([
					{
						ori: 'cancel',
						tran: 'Hủy',
						select: false,
						check: false,
						color: '#ff0000',
					},
					{
						ori: 'done',
						tran: 'Hoàn thành',
						select: false,
						check: false,
						color: '#0000ff',
					},
				]);
				break;
			default:
				setStatus([
				]);
				break;
		}
	}, []);
	return (
		<>
			<div className="fixed z-20 top-0 bottom-0 left-0 right-0 bg-slate-300 opacity-75" />
			<div className="fixed z-[21] bg-white p-2 border rounded-lg top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" ref={ref}>
				<h4 className="mb-4">
					Đổi trạng thái đơn hàng
					{' '}
					{props.idChange.id}
				</h4>
				{listStatus.length > 0 ? listStatus.map((st, index) => (
					<div key={Math.random()} className="flex flex-row items-center mb-2">
						<Switch
							uncheckedIcon={false}
							onColor={st.color}
							checked={st.check}
							onChange={(checked) => {
								listStatus[index].check = checked;
								setStatus([...listStatus]);
								props.confirmStatus(st.ori);
								props.setIdChange({
									...props.idChange,
									id: null,
								});
							}}
						/>
						<span className="ml-2">{st.tran}</span>
					</div>
				)) : <div>Đơn hàng đã hoàn thành</div>}
			</div>
		</>
	);
}

export default ChangeStatusOrder;
