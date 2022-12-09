import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function NavMenuManage() {
	const authReducer = useSelector((state) => state.authReducer);
	// eslint-disable-next-line no-unused-vars
	const [list, setList] = useState({
		buyer: [
			{
				title: 'Đơn hàng',
				link: 'orders/watting',
				check: true,
			},
			{
				title: 'Bình luận',
				link: 'comments',
				check: false,
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
			},
		],
		seller: [
			{
				title: 'Trang nguồn',
				link: '../seller/origin',
				check: false,
			},
			{
				title: 'Đơn hàng',
				link: 'orders',
				check: false,
			},
			{
				title: 'Sản phẩm',
				link: 'product',
				check: false,
			},
			{
				title: 'Bình luận',
				link: 'comment',
				check: false,
			},
		],
		admin: [
			{
				title: 'Khách hàng',
				link: 'customer',
				check: false,
			},
			{
				title: 'Đơn hàng',
				link: 'order/watting',
				check: false,
			},
			{
				title: 'Bình luận',
				check: false,
				link: 'comment',
			},
			{
				title: 'Phản hồi',
				check: false,
				link: 'report',
			},
		],
	});
	// eslint-disable-next-line no-unused-vars
	const navigate = useNavigate();
	useEffect(() => {
	}, []);
	const changePage = (link) => {
		const newList = list[authReducer.isAuth ? authReducer.profile.position : 'buyer']
			.map((item) => ({
				...item,
				check: item.link === link,
			}));
		list[authReducer.isAuth ? authReducer.profile.position : 'buyer'] = newList;
		setList({ ...list });
		navigate(`${link}`);
	};
	return (
		<div className="w-[20%] h-[70vh] mt-16  min-w-[200px] max-w-[250px] bg-[#da8f2e] p-3 rounded-[16px]">
			{list[authReducer.isAuth ? authReducer.profile.position : 'buyer'].map((item) => (
				<div
					className={`py-3 text-lg pl-4 color-white text-bold hover:cursor-pointer hover:text-white ${item.check ? 'text-white' : ''}`}
					onClick={() => {
						changePage(item.link);
					}}
					aria-hidden
					key={item.link}
				>
					{item.title}
				</div>
			))}
		</div>
	);
}

export default NavMenuManage;
