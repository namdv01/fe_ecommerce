import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logoSSV from '../../assets/image/logoSSV.png';
import Toast from '../../Base/Toast';
import { LOADING_NULL, LOADING_TRUE, SHOW_TOAST } from '../../services/constants';
import authMiddleware from '../../store/middleware/auth';

function Subnavbar({ ...props }) {
	const myRef = useRef();
	const navigate = useNavigate();
	const [idToast, setIdToast] = useState(null);
	const authReducer = useSelector((state) => state.authReducer);
	const dispatch = useDispatch();
	const navigatePage = (value) => {
		navigate(`/${value}`);
		props.setSubnav(false);
	};
	const [isPosition, setPosition] = useState(null);
	const getLinkPosition = () => {
		const manage = 'Quản lý ';
		if (isPosition === 'buyer') return `${manage}đơn hàng`;
		if (isPosition === 'seller') return `${manage}cửa hàng`;
		if (isPosition === 'admin') return `${manage}người dùng`;
		return manage;
	};
	const openCart = () => {
		if (!authReducer.isAuth) {
			const id = Date.now();
			setIdToast(id);
			dispatch({
				type: SHOW_TOAST,
				payload: {
					type: 'error',
					content: 'Cần đăng nhập',
					id,
				},
			});
			return false;
		}
		navigate('cart');
		props.setSubnav(false);
		return true;
	};
	useEffect(() => {
		const clickOutSide = (e) => {
			if (myRef.current && !myRef.current.contains(e.target)) {
				props.setSubnav(false);
			}
		};
		document.addEventListener('click', clickOutSide, true);
		return () => {
			document.removeEventListener('click', clickOutSide, true);
		};
	}, []);
	useEffect(() => {
		if (authReducer.isAuth) {
			setPosition(authReducer.profile.position);
		}
	}, []);
	const getLengthCart = () => {
		if (!authReducer.isAuth) return 0;
		if (authReducer.profile.cartData.length > 9) return '9+';
		return authReducer.profile.cartData.length;
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
		props.setSubnav(false);
	};
	return (
		<>
			<div className="fixed top-0 bottom-0 left-0 right-0 z-[9999] hover:cursor-pointer bg-[#393636dc] opacity-70" />
			<div className="bg-[#40caf1] fixed left-0 top-0 bottom-0 px-4 w-[50%] min-w-[280px] z-[10000]" ref={myRef}>
				<div
					onClick={() => {
						navigatePage('');
					}}
					aria-hidden
				>
					<img src={logoSSV} alt="" className="w-[30%]" />
				</div>
				{authReducer.isAuth ? (
					<>
						<div className="border-b px-3 hover:cursor-pointer hover:text-white" />
						<div
							className="border-b px-3 hover:cursor-pointer hover:text-white"
							aria-hidden
							onClick={() => {
								navigatePage('profile');
							}}
						>
							Thông tin cá nhân
						</div>
						<div className="border-b px-3 hover:cursor-pointer hover:text-white">
							{isPosition ? (
								<span
									onClick={() => {
										navigatePage(authReducer.profile.position);
									}}
									aria-hidden
								>
									{getLinkPosition()}
								</span>
							) : <> </>}
						</div>
					</>
				) : (
					<>
						<div
							className="border-b px-3 hover:cursor-pointer hover:text-white"
							onClick={() => {
								navigatePage('login');
							}}
							aria-hidden
						>
							Đăng nhập
						</div>
						<div
							className="border-b px-3 hover:cursor-pointer hover:text-white"
							onClick={() => {
								navigatePage('register');
							}}
							aria-hidden
						>
							Đăng ký
						</div>
					</>
				)}
				<div
					className="border-b px-3 flex flex-row items-center hover:cursor-pointer hover:text-white"
					onClick={() => {
						openCart();
					}}
					aria-hidden
				>
					<span className="relative">
						Giỏ hàng
						<span className="absolute !text-black text-green top-[15%] w-6 h-6 leading-6 text-center rounded-[50%] text-sm not-italic right-[-35%] bg-red-400">
							{getLengthCart()}
						</span>
					</span>
				</div>
				{authReducer.isAuth ? (
					<div
						className="border-b px-3 hover:cursor-pointer hover:text-white"
						onClick={logout}
						aria-hidden
					>
						Đăng xuất
					</div>
				) : <> </>}
			</div>
			{idToast ? <Toast id={idToast} /> : <> </>}
		</>
	);
}

export default Subnavbar;
