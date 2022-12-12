/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOADING_FALSE, LOADING_TRUE } from '../../services/constants';

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
		setForm(props.product);
	}, [props]);
	const changeForm = (e, key) => {
		form[key] = e.target.value;
		setForm({ ...form });
	};
	const submitForm = () => {
		dispatch({
			type: LOADING_TRUE,
		});
		setTimeout(() => {
			dispatch({
				type: LOADING_FALSE,
			});
		}, 2000);
	};
	const clearForm = () => {
		console.log(123);
		form.name = '';
		setForm({
			...form,
		});
	};
	return (
		<>
			<div className="opacity-50 fixed top-0 bottom-0 right-0 left-0 z-20 bg-slate-400" />
			<div ref={myRef} className="flex flex-col fixed z-[21] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-3 rounded shadow-md">
				<div className="">
					<label htmlFor="name">Tên: </label>
					<input
						type="text"
						className="outline-none border px-2 py-1"
						value={form.name}
						id="name"
						onChange={(e) => {
							changeForm(e, 'name');
						}}
					/>
				</div>
				<div className="flex justify-between items-center mt-3">
					<input
						type="button"
						className="outline-none border py-1 px-2 bg-[#3ae2d4] hover:bg-[#2fd6ac] hover:cursor-pointer"
						value="Chỉnh sửa"
						onClick={(e) => {
							submitForm(e);
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
		</>
	);
}
export default ProductDetail;
