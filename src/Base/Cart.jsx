/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import api from '../config/api';

function Cart() {
	const [cart, setCart] = useState([]);
	const [cookies, setCookie] = useCookies();
	useEffect(() => {
		const getCart = async () => {
			const result = await api.get('user/cart');
			console.log(result);
			if (result.errCode === 0) {
				setCart(result.payload);
			}
			return result;
		};
		getCart();
		// const JSOnObj = JSON.parse(JSON.stringify())
		// eslint-disable-next-line max-len
		// console.log(JSON.parse(decodeURIComponent('%5B%7B%22itemId%22%3A4%2C%22quantity%22%3A5%7D%2C%7B%22itemId%22%3A5%2C%22quantity%22%3A2%7D%5D')));
		console.log(cookies);
		console.log(cart);
	}, []);

	return (
		<div />
	);
}

export default Cart;
