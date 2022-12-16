/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Rating from 'react-rating';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import ImagesFullScreen from '../../Base/ImagesFullScreen';
import { API_PUBLIC, LOADING_FALSE, LOADING_TRUE } from '../../services/constants';
import api from '../../config/api';
import notImage from '../../assets/image/notImage.png';

function Comments({ ...props }) {
	/*
		props = {
			idShop: 1,
		}
	*/
	const [comments, setComments] = useState([
		{
			customer: 'Nguyễn Văn A',
			avatar: 'http://localhost:6789/public/avatar/sellerAvatar.png',
			text: 'Sản phẩm tốt',
			star: 4,
			images: [
				'http://localhost:6789/public/item/iphone8-1.jpg',
				'http://localhost:6789/public/item/iphone8-1.jpg',
				'http://localhost:6789/public/item/iphone8-1.jpg',
				'http://localhost:6789/public/item/iphone8-1.jpg',
				'http://localhost:6789/public/item/iphone8-1.jpg',
				'http://localhost:6789/public/item/iphone8-1.jpg',
			],
			nameItem: 'Bánh kẹo',
			shop: 'An Cường',
			time: '12:00 20/11/2023',
		},
		{
			customer: 'Nguyễn Văn A',
			avatar: 'http://localhost:6789/public/avatar/sellerAvatar.png',
			text: 'Sản phẩm tốt',
			star: 5,
			images: [
				'http://localhost:6789/public/item/iphone8-1.jpg',
				'http://localhost:6789/public/item/iphone8-1.jpg',
				'http://localhost:6789/public/item/iphone8-1.jpg',
				'http://localhost:6789/public/item/iphone8-1.jpg',
				'http://localhost:6789/public/item/iphone8-1.jpg',
				'http://localhost:6789/public/item/iphone8-1.jpg',
			],
			shop: 'An Cường',
			nameItem: 'Bánh kẹo',
			time: '12:00 20/11/2023',
		},
		{
			customer: 'Nguyễn Văn A',
			avatar: 'http://localhost:6789/public/avatar/sellerAvatar.png',
			text: 'Sản phẩm tốt',
			star: 4,
			images: [
				'http://localhost:6789/public/item/iphone8-1.jpg',
				'http://localhost:6789/public/item/iphone8-1.jpg',
				'http://localhost:6789/public/item/iphone8-1.jpg',
				'http://localhost:6789/public/item/iphone8-1.jpg',
				'http://localhost:6789/public/item/iphone8-1.jpg',
				'http://localhost:6789/public/item/iphone8-1.jpg',
			],
			nameItem: 'Bánh kẹo',
			shop: 'An Cường',
			time: '12:00 20/11/2023',
		},
		{
			customer: 'Nguyễn Văn A',
			avatar: 'http://localhost:6789/public/avatar/sellerAvatar.png',
			text: 'Sản phẩm tốt',
			star: 4,
			images: [
				'http://localhost:6789/public/item/iphone8-1.jpg',
				'http://localhost:6789/public/item/iphone8-1.jpg',
				'http://localhost:6789/public/item/iphone8-1.jpg',
				'http://localhost:6789/public/item/iphone8-1.jpg',
				'http://localhost:6789/public/item/iphone8-1.jpg',
				'http://localhost:6789/public/item/iphone8-1.jpg',
			],
			nameItem: 'Bánh kẹo',
			shop: 'An Cường',
			time: '12:00 20/11/2023',
		},
	]);
	const [openImages, setOpenImages] = useState(false);
	const turnOpenImages = (value) => {
		setOpenImages(value);
	};
	const dispatch = useDispatch();
	useEffect(() => {
		const callComment = async () => {
			dispatch({
				type: LOADING_TRUE,
			});
			const result = await api.get('admin/list_comment');
			console.log(result);
			if (result.errCode === 0) {
				setComments([...result.payload.comments]);
			}
			dispatch({
				type: LOADING_FALSE,
			});
		};
		callComment();
	}, []);
	return (
		<div className="flex flex-col w-full">
			{comments.map((comment) => (
				<div className="flex-col flex py-1 px-2 shadow-sm mb-3 bg-[#f7f3f3ec] rounded-lg" key={Math.random()}>
					<div className="flex flex-row justify-between">
						<div className="flex flex-row items-center">
							<img src={comment.userData?.imageAvatar ? API_PUBLIC + comment.userData.imageAvatar : notImage} className="rounded-[50%] border mr-2 w-7 h-7" alt="" />
							<span className="text-[#555353] select-none">{comment.userData?.fullname}</span>
						</div>
						<div className="flex flex-row flex-wrap">
							<span>Sản phẩm: </span>
							<span className="text-[grey]">{comment.itemData?.name}</span>
						</div>
					</div>

					<div className="flex flex-row justify-between">
						<span>
							<Rating
								initialRating={comment.star}
								readonly
								fullSymbol={<AiFillStar color="#ffdb4d" />}
								emptySymbol={<AiOutlineStar color="#ffdb4d" />}
							/>
						</span>
						<span className="text-sm text-[grey]">{comment.createdAt}</span>
					</div>
					<div className="flex flex-row-reverse items-center">
						<span className="text-[grey]">{comment.itemData?.shopData?.shopName}</span>
						{' '}
						<span>Gian hàng: </span>
					</div>
					<div>
						<textarea disabled="readonly" className="bg-white border rounded-sm outline-none w-full min-h-[100px] max-h-[200px] select-none" value={comment.text} />
					</div>
					<div className="flex flex-row w-full">
						{comment.commentImageData?.length > 3
							? comment.commentImageData.map((image, index) => {
								if (index === 0 || index === 1) {
									return (
										<div
											className="hover:cursor-pointer w-24 h-24"
											key={Math.random()}
											onClick={(e) => {
												turnOpenImages(true);
											}}
											aria-hidden
										>
											<img src={API_PUBLIC + image.image} key={Date.now()} alt="" />
										</div>
									);
								}
								if (index === 2) {
									return (
										<div
											key={Math.random()}
											className="hover:cursor-pointer relative w-24 h-24"
											onClick={(e) => {
												turnOpenImages(true);
											}}
											aria-hidden
										>
											<img src={API_PUBLIC + image.image} key={Date.now()} alt="" />
											<div className="text-center leading-[100%] bg-[#000000] opacity-20 absolute top-0 bottom-0 left-0 right-0" />
											<div className="absolute top-[50%] opacity-100 translate-y-[-50%] left-[50%] translate-x-[-50%] text-white text-[24px]">
												+
												{' '}
												{comment.commentImageData.length - 2}
											</div>
										</div>
									);
								}
								return <> </>;
							})
							: comment.commentImageData?.map((image) => (
								<div
									key={Math.random()}
									className="hover:cursor-pointer w-24 h-24"
									onClick={(e) => {
										turnOpenImages(true);
									}}
									aria-hidden
								>
									<img src={API_PUBLIC + image.image} key={Date.now()} alt="" />
								</div>
							)) }
					</div>
					{openImages ? (
						<ImagesFullScreen
							images={comment.commentImageData.map((image) => API_PUBLIC + image.image)}
							turnOpenImages={turnOpenImages}
						/>
					)
						: <> </>}
				</div>
			))}
		</div>
	);
}

export default Comments;
