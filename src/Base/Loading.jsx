/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

function Loading({ ...props }) {
	useEffect(() => {
		// setTimeout(() => {
		// 	// props.setLoading(false);
		// }, props.loading);
	}, [props.loading]);
	return (
		<>
			{props.isFullScreen ? (
				<div
					className="fixed items-center z-10 justify-center bg-[#00bfff] opacity-50
					h-screen w-screen flex top-0 left-0 right-0 bottom-0"
				>
					<ClipLoader loading={props.loading} size={36} />
				</div>
			) : (
				<ClipLoader loading={props.loading} size={36} />
			)}
		</>
	);
}

export default Loading;
