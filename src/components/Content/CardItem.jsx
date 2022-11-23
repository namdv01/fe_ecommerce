import React, { useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

function CardItem({ ...props }) {
	const navigate = useNavigate();
	const navigateDetail = (e, idItem) => {
		navigate(`/item/${idItem}`);
	};
	useEffect(() => {
		// console.log(123);
	}, []);
	return (
		<div
			className="border w-[200px] hover:cursor-pointer"
			onClick={(e) => {
				navigateDetail(e, props.idItem);
			}}
			aria-hidden="true"
		>
			<img
				src="https://cf.shopee.vn/file/649b01ca3d71b6462bead41ec3ce91f4_tn"
				alt=""
				className="w-full p-[1px] h-[200px]"
			/>
			<p className="truncate leading-[18px] h-[45px]">
				Áo polo nam nữ có khóa kéo chất vải thun,có cổ phong cách thời trang Hàn
				Quốc,Áo polo nam nữ có khóa kéo chất vải thun,có cổ phong cách thời
				trang Hàn Quốc
			</p>
			<div className="flex flex-row text-[16px]">
				<span className="flex flex-row justify-center">
					4.8
					<AiFillStar color="orange" size={24} className="pl-[4px]" />
				</span>
				<span>|</span>
				<span>Đã bán 76</span>
			</div>
			<p>135.000 đ</p>
		</div>
	);
}

export default CardItem;
