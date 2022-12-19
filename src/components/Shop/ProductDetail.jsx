/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toast from '../../Base/Toast';
import api from '../../config/api';
import { LOADING_FALSE, LOADING_TRUE, SHOW_TOAST } from '../../services/constants';

function ProductDetail({ ...props }) {
	const [form, setForm] = useState({
		name: '',
	});
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.systemReducer);
	const myRef = useRef();
	useEffect(() => {
		const clickOutSide = (e) => {
			if (myRef.current && !myRef.current.contains(e.target) && !loading) {
				props.setProduct(null);
			}
		};
		document.addEventListener('click', clickOutSide, true);
		return () => {
			document.removeEventListener('click', clickOutSide, true);
		};
	}, [loading]);
	useEffect(() => {
		dispatch({
			type: LOADING_TRUE,
		});
		setForm(props.product);
		const callDetailShop = async () => {
			const result = await api.get(`user/detail_item/${props.product.id}`);
			if (result.errCode === 0) {
				setForm({ ...result.payload });
			}
		};
		callDetailShop();
		dispatch({
			type: LOADING_FALSE,
		});
	}, []);
	const changeForm = (e, key) => {
		form[key] = e.target.value;
		setForm({ ...form });
	};
	const [idToast, setIdToast] = useState(null);
	const submitForm = async () => {
		dispatch({
			type: LOADING_TRUE,
		});
		const result = await api.post(`seller/update_item/${props.product.id}`, {
			name: form.name,
			price: form.price,
			quantity: form.quantity,
			description: form.description,
		});
		console.log(result);
		const id = Math.random();
		setIdToast(id);
		dispatch({
			type: SHOW_TOAST,
			payload: {
				id,
				content: result.mes,
				type: result.errCode === 0 ? 'success' : 'error',
			},
		});
		dispatch({
			type: LOADING_FALSE,
		});
		props.setProduct(null);
	};
	const clearForm = () => {
		form.name = '';
		form.price = 0;
		form.quantity = 0;
		form.description = '';
		setForm({
			...form,
		});
	};
	return (
		<>
			<div className="opacity-50 fixed top-0 bottom-0 right-0 left-0 z-20 bg-slate-400" />
			<div ref={myRef} className="flex flex-col fixed z-[21] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-3 rounded shadow-md">
				<div className="flex flex-row flex-wrap mb-2">
					<label className="inline-block w-[80px]" htmlFor="name">Tên: </label>
					<input
						type="text"
						className="outline-none border px-2 py-1 w-[250px]"
						value={form.name}
						id="name"
						onChange={(e) => {
							changeForm(e, 'name');
						}}
					/>
				</div>
				<div className="flex flex-row flex-wrap mb-2">
					<label className="inline-block w-[80px]" htmlFor="price">Giá: </label>
					<input
						type="number"
						className="outline-none border px-2 py-1 w-[250px]"
						value={form.price}
						id="name"
						onChange={(e) => {
							changeForm(e, 'price');
						}}
					/>
				</div>
				<div className="flex flex-row flex-wrap mb-2">
					<label className="inline-block w-[80px]" htmlFor="quantity">Số lượng: </label>
					<input
						type="number"
						className="outline-none border px-2 py-1 w-[250px]"
						value={form.quantity}
						id="quantity"
						onChange={(e) => {
							changeForm(e, 'quantity');
						}}
					/>
				</div>
				<div className="flex flex-row flex-wrap mb-2">
					<label className="inline-block w-[80px]" htmlFor="desc">Mô tả: </label>
					<textarea
						id="desc"
						value={form.description}
						onChange={(e) => {
							changeForm(e, 'description');
						}}
						className="outline-none border px-2 py-1 min-h-[120px] max-h-[150px] w-[250px]"
					/>
				</div>
				<div className="flex justify-between items-center mt-3">
					<input
						type="button"
						className="outline-none border py-1 px-2 bg-[#3ae2d4] hover:bg-[#2fd6ac] hover:cursor-pointer"
						value="Chỉnh sửa"
						onClick={(e) => {
							e.preventDefault();
							submitForm();
						}}
					/>
					<input
						type="button"
						className="outline-none border py-1 px-2 bg-[#3ae2d4] hover:bg-[#2fd6ac] hover:cursor-pointer"
						value="Xóa hết"
						onClick={() => {
							clearForm();
						}}
					/>
				</div>
				{/* <div className=" text-black">{props.product.name}</div> */}
			</div>
			{
				idToast ? <Toast id={idToast} setIdToast={setIdToast} /> : <> </>
			}
		</>
	);
}
export default ProductDetail;
