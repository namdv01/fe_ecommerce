/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Rating from 'react-rating';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import ImagesFullScreen from '../../Base/ImagesFullScreen';
import { API_PUBLIC, LOADING_FALSE, LOADING_TRUE } from '../../services/constants';
import api from '../../config/api';
import formatDay from '../../services/formatDay';

function Comment() {
	const [comments, setComments] = useState([
		{
			time: '15:20 7/12/2022',
			star: 4,
			text: 'sadasdasdasdasd',
			images: [
				'http://localhost:6789/public/avatar/sellerAvatar.png',
				'http://localhost:6789/public/avatar/sellerAvatar.png',
				'http://localhost:6789/public/avatar/sellerAvatar.png',
				'http://localhost:6789/public/avatar/sellerAvatar.png',
			],
			nameItem: 'Bánh kẹo',
			shop: 'Bánh kẹo abc',
		},
		{
			time: '15:20 7/12/2022',
			star: 4,
			text: 'sadasdasdasdasd',
			images: [
				'http://localhost:6789/public/avatar/sellerAvatar.png',
				'http://localhost:6789/public/avatar/sellerAvatar.png',
				'http://localhost:6789/public/avatar/sellerAvatar.png',
				'http://localhost:6789/public/avatar/sellerAvatar.png',
			],
			nameItem: 'Bánh kẹo',
			shop: 'Bánh kẹo abc',
		},
		{
			time: '15:20 7/12/2022',
			star: 4,
			text: 'sadasdasdasdasd',
			images: [
				'http://localhost:6789/public/avatar/sellerAvatar.png',
				'http://localhost:6789/public/avatar/sellerAvatar.png',
				'http://localhost:6789/public/avatar/sellerAvatar.png',
				'http://localhost:6789/public/avatar/sellerAvatar.png',
			],
			nameItem: 'Bánh kẹo',
			shop: 'Bánh kẹo abc',
		},
		{
			time: '15:20 7/12/2022',
			star: 4,
			text: 'sadasdasdasdasd',
			images: [
				'http://localhost:6789/public/avatar/sellerAvatar.png',
				'http://localhost:6789/public/avatar/sellerAvatar.png',
				'http://localhost:6789/public/avatar/sellerAvatar.png',
				'http://localhost:6789/public/avatar/sellerAvatar.png',
			],
			nameItem: 'Bánh kẹo',
			shop: 'Bánh kẹo abc',
		},
		{
			time: '15:20 7/12/2022',
			star: 4,
			text: 'sadasdasdasdasd',
			images: [
				'http://localhost:6789/public/avatar/sellerAvatar.png',
				'http://localhost:6789/public/avatar/sellerAvatar.png',
				'http://localhost:6789/public/avatar/sellerAvatar.png',
				'http://localhost:6789/public/avatar/sellerAvatar.png',
			],
			nameItem: 'Bánh kẹo',
			shop: 'Bánh kẹo abc',
		},
		{
			time: '15:20 7/12/2022',
			star: 4,
			text: 'sadasdasdasdasd',
			images: [
				'http://localhost:6789/public/avatar/sellerAvatar.png',
				'http://localhost:6789/public/avatar/sellerAvatar.png',
				'http://localhost:6789/public/avatar/sellerAvatar.png',
				'http://localhost:6789/public/avatar/sellerAvatar.png',
			],
			nameItem: 'Bánh kẹo',
			shop: 'Bánh kẹo abc',
		},
		{
			time: '15:20 7/12/2022',
			star: 4,
			text: 'sadasdasdasdasd',
			images: [
				'http://localhost:6789/public/avatar/sellerAvatar.png',
				'http://localhost:6789/public/avatar/sellerAvatar.png',
				'http://localhost:6789/public/avatar/sellerAvatar.png',
				'http://localhost:6789/public/avatar/sellerAvatar.png',
			],
			nameItem: 'Bánh kẹo',
			shop: 'Bánh kẹo abc',
		},
	]);
	const [openImages, setOpenImages] = useState(false);
	const turnOpenImages = (value) => {
		setOpenImages(value);
	};
	const dispatch = useDispatch();

	useEffect(() => {
		const callComments = async () => {
			dispatch({
				type: LOADING_TRUE,
			});
			const result = await api.get('user/list_comments');
			console.log(result);
			if (result.errCode === 0) {
				setComments([...result.payload]);
			}
			dispatch({
				type: LOADING_FALSE,
			});
		};
		callComments();
	}, []);
	return (
		<div className="flex flex-col flex-wrap mt-14">
			{comments.map((comment) => (
				<>
					<div className="flex flex-col p-2 border rounded-xl m-2 w-[320px]" key={comment.createdAt}>
						<span>
							{comment.text}
						</span>
						<span>{formatDay.TDMY(comment.createdAt)}</span>
						<Rating
							initialRating={comment.star}
							readonly
							fullSymbol={<AiFillStar color="#ffdb4d" />}
							emptySymbol={<AiOutlineStar color="#ffdb4d" />}
						/>
						<span className="truncate" title={comment.itemData?.name}>{comment.itemData?.name}</span>
						<span className="truncate" title={comment.itemData?.shopData?.shopName}>{comment.itemData?.shopData?.shopName}</span>
						<div className="flex flex-row w-full">
							{comment.commentImageData?.length > 3
								? comment.commentImageData?.map((image, index) => {
									if (index === 0 || index === 1) {
										return (
											<div
												className="hover:cursor-pointer w-24 h-24"
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
												className="hover:cursor-pointer relative w-24 h-24"
												onClick={(e) => {
													turnOpenImages(true);
												}}
												aria-hidden
											>
												<img src={image} key={Date.now()} alt="" />
												<div className="text-center leading-[100%] bg-[#000000] opacity-20 absolute top-0 bottom-0 left-0 right-0" />
												<div className="absolute top-[50%] opacity-100 translate-y-[-50%] left-[50%] translate-x-[-50%] text-white text-[24px]">
													+
													{' '}
													{comment.images.length - 2}
												</div>
											</div>
										);
									}
									return <> </>;
								})
								: comment.commentImageData?.map((image) => (
									<div
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
					</div>
					{openImages ? (
						<ImagesFullScreen
							images={comment.commentImageData.map((image) => API_PUBLIC + image.image)}
							turnOpenImages={turnOpenImages}
						/>
					)
						: <> </>}
				</>
			))}
		</div>
	);
}

export default Comment;
