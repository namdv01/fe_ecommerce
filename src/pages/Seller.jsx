import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Seller() {
	const authReducer = useSelector((state) => state.authReducer);
	const loading = useSelector((state) => state.systemReducer.loading);
	const navigate = useNavigate();
	useEffect(() => {
		if (loading) {
			console.log('dang load');
		} else if (loading === null) {
			console.log('dang khoi tao');
		} else if (
			// eslint-disable-next-line operator-linebreak
			!authReducer.isAuth ||
			authReducer.profile.position !== 'seller'
		) {
			console.log('khoong hop leej');
			navigate('/');
		}
	}, [loading]);
	return <div>Seller</div>;
}

export default Seller;
