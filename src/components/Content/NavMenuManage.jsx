import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NavMenuManage() {
	const [list, setList] = useState([{
		title: 'Đơn hàng',
		link: 'orders/watting',
		check: false,
	},
	{
		title: 'Bình luận',
		link: 'comments',
		check: true,
	},
	// {
	// 	title: 'Giỏ hàng',
	// 	link: 'cart',
	// },
	{
		title: 'Thông báo',
		check: false,
		link: 'notify',
	},
	{
		title: 'Báo cáo vi phạm',
		check: false,
		link: 'report',
	}]);
	const navigate = useNavigate();
	useEffect(() => {
	}, []);
	const changePage = (link) => {
		const newList = list.map((item) => ({
			...item,
			check: item.link === link,
		}));
		setList([...newList]);
		navigate(`${link}`);
	};
	return (
		<div className="w-[20%] h-[70vh] mt-16  min-w-[200px] max-w-[250px] bg-[#da8f2e] p-3 rounded-[16px]">
			{list.map((item) => (
				<div
					className={`py-3 text-lg pl-4 color-white text-bold hover:cursor-pointer hover:text-white ${item.check ? 'text-white' : ''}`}
					onClick={() => {
						changePage(item.link);
					}}
					aria-hidden
				>
					{item.title}
				</div>
			))}
		</div>
	);
}

export default NavMenuManage;
