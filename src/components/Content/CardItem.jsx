import React, { useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';
import NumberFormat from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import notImage from '../../assets/image/notImage.png';

function CardItem({ ...props }) {
	const navigate = useNavigate();
	const navigateDetail = (e, item) => {
		navigate(`/item/${item.id}`);
	};
	useEffect(() => {
		// console.log(123);
	}, []);
	return (
		<div
			className="border w-[200px] hover:cursor-pointer"
			onClick={(e) => {
				navigateDetail(e, props.item);
			}}
			aria-hidden="true"
		>
			<img
				src={
					props.item.itemImageData.length !== 0
						? props.item.itemImageData[0].image
						: notImage
				}
				alt=""
				className="w-full p-[1px] h-[200px]"
			/>
			<p className="truncate leading-[18px] h-[45px]">
				{props.item.description}
			</p>
			<div className="flex flex-row text-[16px]">
				<span className="flex flex-row justify-center">
					5
					<AiFillStar color="orange" size={24} className="pl-[4px]" />
				</span>
				<span>|</span>
				<span>Đã bán 76</span>
			</div>
			<p>
				<NumberFormat value={props.item.price} thousandSeparator />
			</p>
		</div>
	);
}

export default CardItem;
