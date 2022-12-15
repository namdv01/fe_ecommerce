import React, { useEffect } from 'react';
import api from '../../config/api';

function Payment() {
	useEffect(() => {
		const callPayment = async () => {
			const result = await api.get('user/payment');
			console.log(result);
		};
		callPayment();
	}, []);
	return (
		<div>Payment</div>
	);
}

export default Payment;
