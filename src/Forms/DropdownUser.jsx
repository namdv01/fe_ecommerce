import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../Base/Loading';
import { LOADING_FALSE, LOADING_TRUE } from '../services/constants';
import authMiddleware from '../store/middleware/auth';

function DropdownUser() {
	const authReducer = useSelector((state) => state.authReducer);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loading = useSelector((state) => state.systemReducer.loading);
	const [isPosition, setPosition] = useState(null);
	const getLinkPosition = () => {
		if (isPosition === 'buyer') return 'Quản lý đơn hàng';
		if (isPosition === 'seller') return 'Quản lý cửa hàng';
		if (isPosition === 'admin') return 'Quản lý người dùng';
		return 'Quản lý';
	};
	const logout = async () => {
		dispatch({
			type: LOADING_TRUE,
		});

		await dispatch(authMiddleware.logout());

		dispatch({
			type: LOADING_FALSE,
		});
		navigate('/');
	};
	const goAnotherPage = (value) => {
		navigate(value);
	};
	useEffect(() => {
		if (authReducer) {
			setPosition(authReducer.profile.position);
		}
	}, []);
	return (
		<>
			<div className="absolute top-[95%] z-[20] bg-white text-black min-w-[150px] flex flex-col left-0 overflow-hidden rounded shadow-slate-900 shadow-lg">
				<span
					className="border-b block h-10 leading-10 cursor-pointer hover:bg-slate-200 text-center"
					aria-hidden
					onClick={() => {
						goAnotherPage('profile');
					}}
				>
					Thông tin cá nhân
				</span>
				{isPosition ? (
					<span className="border-b block h-10 leading-10 cursor-pointer hover:bg-slate-200 text-center">{getLinkPosition()}</span>
				) : <> </>}
				<span className=" block h-10 leading-10 cursor-pointer hover:bg-slate-200 text-center" onClick={logout} aria-hidden>Đăng xuất</span>
			</div>
			{loading ? <Loading loading={loading} isFullScreen={1} /> : <> </>}
		</>
	);
}

export default DropdownUser;
