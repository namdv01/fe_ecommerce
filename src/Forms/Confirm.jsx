import React, { useRef, useEffect } from 'react';

function Confirm({ ...props }) {
	/*
  title,
  confirmHandle,
  cancelHandle
  */
	const myRef = useRef();
	useEffect(() => {
		const clickOutSide = (e) => {
			if (myRef.current && !myRef.current.contains(e.target)) {
				props.cancelHandle(false);
			}
		};
		document.addEventListener('click', clickOutSide, true);
		return () => {
			document.removeEventListener('click', clickOutSide, true);
		};
	}, []);
	return (
		<>
			<div className="fixed top-0 bottom-0 right-0 left-0 bg-slate-300 opacity-80 z-20" />
			<div className="bg-white fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow z-[21]" ref={myRef}>
				<h4>{props.title}</h4>
				<div className="flex flex-row justify-between mx-4">
					<input
						type="button"
						value="Đồng ý"
						className="bg-[#2fb0ec]"
						onClick={async () => {
							props.confirmHandle();
							props.cancelHandle(false);
						}}
					/>
					<input
						type="button"
						value="Hủy"
						className="bg-[#f02e2e]"
						onClick={() => {
							props.cancelHandle(false);
						}}
					/>
				</div>
			</div>
		</>
	);
}

export default Confirm;
