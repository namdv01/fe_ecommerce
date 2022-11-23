import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import React, { useEffect, useState } from 'react';

function SlideShow() {
	const [responsive, setResponsive] = useState({});
	useEffect(() => {
		const newResponsive = {
			desktop: {
				breakpoint: {
					min: 1280,
					max: 1920,
				},
				items: 4,
				slidesToSlide: 4,
			},
			tablet: {
				breakpoint: {
					max: 1280,
					min: 768,
				},
				items: 3,
				slidesToSlide: 3,
			},
			mobile: {
				breakpoint: {
					max: 768,
					min: 560,
				},
				items: 2,
				slidesToSlide: 2,
			},
			sm_mobile: {
				breakpoint: {
					max: 560,
					min: 0,
				},
				items: 1,
				slidesToSlide: 1,
			},
		};
		setResponsive({ ...responsive, ...newResponsive });
	}, []);
	return (
		<div className="border m-2 bg-[red]">
			<Carousel responsive={responsive} infinite className="w-[100%] h-[200px]">
				<img
					className=""
					src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
					alt=""
				/>
				<img
					src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
					alt=""
				/>
				<img
					src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
					alt=""
				/>
				<img
					src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
					alt=""
				/>
			</Carousel>
		</div>
	);
}

export default SlideShow;
