import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../config/api';

function Payment() {
	const location = useLocation();
	useEffect(() => {
		const callPayment = async () => {
			const result = await api.get(`user${location.pathname}${location.search}`);
			console.log(result);
		};
		callPayment();
	}, []);
	return (
		<div>Payment</div>
	);
}

export default Payment;
