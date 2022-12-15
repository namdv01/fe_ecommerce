import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../Base/Loading';
import { LOADING_NULL, LOADING_TRUE } from '../services/constants';
import authMiddleware from '../store/middleware/auth';

function DropdownUser() {
	const authReducer = useSelector((state) => state.authReducer);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loading = useSelector((state) => state.systemReducer.loading);
	const [isPosition, setPosition] = useState(null);
	const getLinkPosition = () => {
		const manage = 'Quản lý ';
		if (isPosition === 'buyer') return `${manage}đơn hàng`;
		if (isPosition === 'seller') return `${manage}cửa hàng`;
		if (isPosition === 'admin') return `${manage}người dùng`;
		return manage;
	};
	const logout = async () => {
		dispatch({
			type: LOADING_TRUE,
		});

		await dispatch(authMiddleware.logout());

		dispatch({
			type: LOADING_NULL,
		});
		navigate('/', { replace: true });
	};
	const goAnotherPage = (value) => {
		navigate(value);
	};
	useEffect(() => {
		if (authReducer.isAuth) {
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
					<span
						className="border-b block h-10 leading-10 cursor-pointer hover:bg-slate-200 text-center"
						onClick={() => {
							goAnotherPage(authReducer.profile.position);
						}}
						aria-hidden
					>
						{getLinkPosition(authReducer.profile.position)}
					</span>
				) : <> </>}
				<span className=" block h-10 leading-10 cursor-pointer hover:bg-slate-200 text-center" onClick={logout} aria-hidden>Đăng xuất</span>
			</div>
			{loading ? <Loading loading={loading} isFullScreen={1} /> : <> </>}
		</>
	);
}

export default DropdownUser;
