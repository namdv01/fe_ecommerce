import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import NavMenuManage from '../components/Content/NavMenuManage';

function Admin() {
	const authReducer = useSelector((state) => state.authReducer);
	const loading = useSelector((state) => state.systemReducer.loading);
	const navigate = useNavigate();
	useEffect(() => {
		if (loading) {
			console.log('dang load');
		} else if (loading === null) {
			console.log('dang khoi tao');
		} else if (
			// eslint-disable-next-line operator-linebreak
			!authReducer.isAuth ||
			authReducer.profile.position !== 'admin'
		) {
			console.log('khoong hop leej');
			navigate('/');
		}
	}, [loading]);
	return (
		<div className="flex flex-row mx-[5%]">
			<NavMenuManage />
			<div className="mt-16 w-full">
				<Outlet />
			</div>
		</div>
	);
}

export default Admin;
