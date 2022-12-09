import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CLOSE_TOAST } from '../services/constants';

function Toast({ ...props }) {
	const toastItem = useSelector((state) => state.systemReducer.toastes.find(
		(item) => item.id === props.id,
	));
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const showToast = () => {
		toast(toastItem.content, {
			type: toastItem.type,
			position: 'top-right',
			hideProgressBar: false,
			autoClose: toastItem.time,
			onClose: () => {
				dispatch({
					type: CLOSE_TOAST,
					payload: {
						id: props.id,
					},
				});
				navigate(location.pathname, { replace: true });
			},
		});
	};
	useEffect(() => {
		if (toastItem) showToast();
	}, [toastItem]);
	return (
		<ToastContainer />
	);
}

export default Toast;
