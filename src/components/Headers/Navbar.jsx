import React from 'react';
import { useNavigate } from 'react-router-dom';
import CartAndUser from '../../Forms/CartAndUser';
import FormSearch from '../../Forms/FormSearch';
import logoSSV from '../../assets/image/logoSSV.png';

function Navbar() {
	const navigate = useNavigate();

	const goHome = () => {
		navigate('/');
	};

	return (
		<div className="h-[64px] flex flex-row w-[90%] leading-[64px] mx-auto">
			<div>
				<div
					className="m-0 flex flex-row items-center hover:cursor-pointer"
					onClick={goHome}
					aria-hidden
				>
					<img src={logoSSV} alt="" className="h-[48px] w-[48px] mr-1" />
					<span className="text-[20px] font-[600] mr-1 select-none">
						Ecommerce
					</span>
				</div>
			</div>
			<FormSearch />
			<CartAndUser />
		</div>
	);
}

export default Navbar;
