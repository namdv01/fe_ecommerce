import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toast({ ...props }) {
	const showToast = () => {
		toast(props.content, {
			type: props.type,
			position: 'top-right',
			hideProgressBar: false,
			autoClose: props.time,
			onClose: () => {
				props.setShow(false);
			},
		});
	};
	useEffect(() => {
		showToast();
	}, []);
	return (
		<ToastContainer
			onClick={(e) => {
				e.preventDefault();
			}}
		/>
	);
}

export default Toast;
