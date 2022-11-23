import React, { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import Toast from '../Base/Toast';

function CartAndUser() {
	const authReducer = useSelector((state) => state.authReducer);
	const [isToast, setIsToast] = useState(false);
	const openCart = () => {
		if (!authReducer.isLogin) {
			setIsToast(true);
			console.log(123);
		}
	};
	return (
		<div className="flex flex-row items-center my-3">
			<i className="mx-2" onClick={openCart} aria-hidden>
				<AiOutlineShoppingCart
					size={24}
					className="hover:text-[red] hover:cursor-pointer"
				/>
			</i>
			<div className="items-center">
				<input
					type="button"
					value="Đăng nhập"
					className="px-2  mr-4 h-[40px] leading-[40px] border outline-none hover:cursor-pointer hover:bg-slate-400"
				/>
				<input
					type="button"
					value="Đăng ký"
					className="px-2 h-[40px] leading-[40px] border outline-none hover:cursor-pointer hover:bg-slate-400"
				/>
				{/* <button
          type="button"
          className="px-2 h-[100%] border outline-none hover:bg-slate-400"
        >
          Đăng nhập
        </button>
        <button
          type="button"
          className="px-2 h-[100%] border outline-none hover:bg-slate-400"
        >
          Đăng ký
        </button> */}
			</div>
			{isToast ? <Toast setIsToast={setIsToast} /> : <> </>}
		</div>
	);
}

export default CartAndUser;
