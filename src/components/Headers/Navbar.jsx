import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import CartAndUser from '../../Forms/CartAndUser';
import FormSearch from '../../Forms/FormSearch';
import logoSSV from '../../assets/image/logoSSV.png';
import Subnavbar from './Subnavbar';

function Navbar() {
	const navigate = useNavigate();

	const goHome = () => {
		navigate('/');
	};
	const [isSubnav, setSubnav] = useState(false);

	return (
		<>
			<div className="hidden md:flex h-[64px] flex-row w-full leading-[64px] px-[5%] bg-[#40caf1]">
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
			<div className="flex md:hidden h-[64px] w-full leading-[64px] flex-row items-center px-[5%] bg-[#40caf1]">
				<div className="w-[10%]">
					<AiOutlineMenu
						color="red"
						size="32"
						onClick={() => {
							setSubnav(true);
						}}
						className="hover:cursor-pointer"
					/>
				</div>
				<div className="flex-1">
					<FormSearch />
				</div>
				{isSubnav ? <Subnavbar setSubnav={setSubnav} /> : <> </>}
			</div>
		</>
	);
}

export default Navbar;
