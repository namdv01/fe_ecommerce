/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from 'react';
// import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import api from '../config/api';
// import { LOADING_FALSE, LOADING_TRUE } from '../services/constants';

function CreateProduct({ ...props }) {
	const params = useParams();
	// const dispatch = useDispatch();
	const [form, setForm] = useState({
		name: '',
		price: 0,
		quantity: 0,
		images: [],
		description: '',
		type: 1,
	});
	const changeForm = (e, key) => {
		form[key] = e.target.value;
		setForm({ ...form });
	};
	const myRef = useRef();

	const clearForm = () => {
		form.name = '';
		form.price = 0;
		form.quantity = 0;
		form.description = '';
		form.images = [];
		setForm({ ...form });
	};

	const submitForm = async () => {
		console.log(params);
		console.log(form);
		// dispatch({
		// 	type: LOADING_TRUE,
		// });
		// const result = await api.post('user/add_item', form);
		// if (result.errCode === 0) {
		// 	dispatch({
		// 		type: LOADING_TRUE,
		// 	});
		// 	dispatch()
		// }
		// console.log(result);
		// dispatch({
		// 	type: LOADING_FALSE
		// })
		// const result = await api.post(`shop/create_`)
	};

	useEffect(() => {
		const clickOutSide = (e) => {
			if (myRef.current && !myRef.current.contains(e.target)) {
				props.setCloseCreateProduct(false);
			}
		};
		document.addEventListener('click', clickOutSide, true);
		return () => {
			document.removeEventListener('click', clickOutSide, true);
		};
	}, []);

	return (
		<>
			<div className="w-full h-screen bg-slate-400 flex items-center justify-center fixed top-0 bottom-0 left-0 right-0 z-20 opacity-80" />
			<div ref={myRef} className="bg-white rounded-lg overflow-hidden flex flex-col items-center justify-center fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[21]">
				<div className="p-2 bg-[#40d7eb] w-full">
					<h4>Tạo thêm sản phẩm</h4>
				</div>
				<div className="flex flex-row flex-wrap m-2">
					<label htmlFor="name" className="w-[120px] block">Tên sản phẩm:</label>
					<input
						type="text"
						id="name"
						value={form.name}
						onChange={(e) => {
							changeForm(e, 'name');
						}}
						className="outline-none border px-2 py-1 flex-1 min-w-[400px]"
					/>
				</div>
				<div className="flex flex-row flex-wrap m-2">
					<label htmlFor="" className="w-[120px] block">Giá: </label>
					<input
						type="number"
						value={form.price}
						onChange={(e) => {
							changeForm(e, 'price');
						}}
						className="outline-none border px-2 py-1 flex-1 min-w-[400px]"
					/>
				</div>
				<div className="flex flex-row flex-wrap m-2">
					<label htmlFor="" className="w-[120px] block">Số lượng: </label>
					<input
						type="number"
						value={form.quantity}
						onChange={(e) => {
							changeForm(e, 'quantity');
						}}
						className="outline-none border px-2 py-1 flex-1 min-w-[400px]"
					/>
				</div>
				<div>
					<label htmlFor="fileProduct" className="w-[120px] block">Thêm ảnh</label>
					<input type="file" name="" id="fileProduct" className="hidden" />
				</div>
				<div className="flex flex-row flex-wrap m-2">
					<label htmlFor="desc" className="w-[120px]">Mô tả sản phẩm</label>
					<textarea
						id="desc"
						className="flex-1 min-w-[400px] min-h-[150px] max-h-[300px] outline-none border p-2"
						value={form.description}
						onChange={(e) => {
							changeForm(e, 'description');
						}}
					/>
				</div>
				<div className="flex justify-between flex-row p-2 w-full">
					<input type="button" value="Tạo sản phẩm" className="bg-[#3ba2dd] hover:cursor-pointer hover:bg-blue-400 px-2 py-1" onClick={submitForm} />
					<input type="button" value="Xóa toàn bộ" className="bg-[#3ba2dd] hover:cursor-pointer hover:bg-blue-400 px-2 py-1" onClick={clearForm} />
				</div>
				<div />
			</div>
		</>
	);
}

export default CreateProduct;
