import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import NavMenuManage from '../components/Content/NavMenuManage';

function Seller() {
	const authReducer = useSelector((state) => state.authReducer);
	const loading = useSelector((state) => state.systemReducer.loading);
	// eslint-disable-next-line no-unused-vars
	const navigate = useNavigate();
	useEffect(() => {
		if (loading) {
			console.log('dang load');
		} else if (loading === null) {
			console.log('dang khoi tao');
		} else if (
			// eslint-disable-next-line operator-linebreak
			!authReducer.isAuth ||
			authReducer.profile.position !== 'seller'
		) {
			const id = Math.random();
			navigate('/', {
				state: {
					id,
					content: 'Không đúng vai trò',
					type: 'warning',
				},
			});
		}
	}, [loading]);
	return (
		<div className="flex flex-row mx-[1%]">
			<NavMenuManage />
			<div className="mt-16 w-full">
				<Outlet />
			</div>
		</div>
	);
}

export default Seller;
