/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

function Loading({ ...props }) {
	const loading = useSelector((state) => state.systemReducer.loading);
	useEffect(() => {
		console.log('có phần load');
	}, []);
	return (
		<>
			{props.isFullScreen ? (
				<div
					className="fixed items-center justify-center bg-[#cce2e9] opacity-50
					h-screen w-screen flex top-0 left-0 right-0 bottom-0 z-[999]"
				>
					<ClipLoader loading={loading} size={36} />
				</div>
			) : (
				<ClipLoader loading={loading} size={36} />
			)}
		</>
	);
}

export default Loading;
