/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Toast from '../Base/Toast';
import Avatar from '../components/Headers/Avatar';
import { SHOW_TOAST } from '../services/constants';

function CartAndUser() {
	const authReducer = useSelector((state) => state.authReducer);
	const [idToast, setIdToast] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
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
		return true;
	};
	const navigatePage = (value) => {
		navigate(`/${value}`);
	};
	const getLengthCart = () => {
		if (!authReducer.isAuth) return 0;
		if (authReducer.profile.cartData.length > 9) return '9+';
		return authReducer.profile.cartData.length;
	};
	return (
		<div className="flex flex-row items-center my-3">
			<i className="mx-2 relative mr-8" onClick={openCart} aria-hidden>
				<AiOutlineShoppingCart
					size={24}
					className="hover:text-[red] hover:cursor-pointer"
				/>
				<span className="absolute text-green top-[-60%] w-6 h-6 leading-6 text-center rounded-[50%] text-sm not-italic right-[-60%] bg-red-400">
					{getLengthCart()}
				</span>
			</i>
			<div className="items-center">
				{
					!authReducer.isAuth
						? (
							<>
								<input
									type="button"
									value="Đăng nhập"
									onClick={() => {
										navigatePage('login');
									}}
									className="px-2  mr-4 h-[40px] leading-[40px] border outline-none hover:cursor-pointer hover:bg-slate-400"
								/>

								<input
									onClick={() => {
										navigatePage('register');
									}}
									type="button"
									value="Đăng ký"
									className="px-2 h-[40px] leading-[40px] border outline-none hover:cursor-pointer hover:bg-slate-400"
								/>
							</>
						) : (
							<Avatar />
						)
				}
			</div>
			{idToast ? <Toast id={idToast} /> : <> </>}
		</div>
	);
}

export default CartAndUser;
