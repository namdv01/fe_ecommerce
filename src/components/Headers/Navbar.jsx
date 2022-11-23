import React from 'react';
import CartAndUser from '../../Forms/CartAndUser';
import FormSearch from '../../Forms/FormSearch';

function Navbar() {
	return (
		<div className="h-[64px] flex flex-row w-[90%] leading-[64px] mx-auto">
			<div>
				<h4 className="h-[24px] m-0">Ecommerce</h4>
			</div>
			<FormSearch />
			<CartAndUser />
		</div>
	);
}

export default Navbar;
