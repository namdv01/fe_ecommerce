import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import NavMenuManage from '../components/Content/NavMenuManage';

function Buyer() {
	const authReducer = useSelector((state) => state.authReducer);
	const loading = useSelector((state) => state.systemReducer.loading);
	const navigate = useNavigate();
	useEffect(() => {
		if (loading) {
			console.log('đang loading');
		} else if (loading === null) {
			console.log('Khởi tạo loading');
		} else if (
			// eslint-disable-next-line operator-linebreak
			!authReducer.isAuth ||
			authReducer.profile.position !== 'buyer'
		) {
			console.log('Không hợp lệ');
			const id = Math.random();
			navigate('/', {
				state: {
					id,
					content: 'Không đúng vai trò người mua',
					type: 'warning',
				},
			});
		}
	}, [loading]);
	return (
		<div className="flex flex-row mx-[1%]">
			<NavMenuManage />
			<Outlet />
		</div>
	);
}

export default Buyer;
