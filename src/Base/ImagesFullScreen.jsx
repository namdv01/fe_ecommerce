import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { AiOutlineClose } from 'react-icons/ai';
import 'react-multi-carousel/lib/styles.css';

function ImagesFullScreen({ ...props }) {
	/*
    props: {
      images: [
        "image1",
        "image2",
        "image3",
        "image4",
      ]
      turnOpenImages: func
    },
  */
	const [responsive, setResponsive] = useState({});
	useEffect(() => {
		const newResponsive = {
			desktop: {
				breakpoint: {
					min: 0,
					max: 1920,
				},
				items: 1,
				slidesToSlide: 1,
			},
		};
		setResponsive({ ...responsive, ...newResponsive });
	}, []);
	return (
		<div className="flex items-center justify-center z-50 fixed top-0 left-0 right-0 bottom-0 bg-[#ada7a7]">
			<AiOutlineClose
				className="absolute right-[36px] top-[36px] hover:cursor-pointer"
				size={36}
				color="white"
				onClick={() => {
					props.turnOpenImages(false);
				}}
			/>
			{
				props.images
					? (
						<Carousel responsive={responsive} showDots className="w-[60%] max-w-[600px] min-w-[360px] bg-[#ffffffe8] text-[red]">
							{props.images.map((image) => <img src={image} className="py-8 h-full mx-auto" key={image} alt="" />)}
						</Carousel>
					)
					: <> </>
			}
		</div>
	);
}

export default ImagesFullScreen;
