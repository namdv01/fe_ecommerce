import React, { useEffect, useState } from 'react';
import CardItem from '../components/Content/CardItem';
import SlideShow from '../components/Content/SlideShow';
import Loading from './Loading';
import Pagination from './Pagination';

function Landing() {
	const [size, setSize] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setSize([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
	}, []);
	return (
		<>
			<SlideShow />
			<div className="flex flex-row flex-wrap">
				{size.map((item) => (
					<div key={item}>
						<CardItem idItem={item} />
					</div>
				))}
			</div>
			<Pagination totalPage={10} numberPage={2} />
			<Loading loading={loading} setLoading={setLoading} />
		</>
	);
}

export default Landing;
