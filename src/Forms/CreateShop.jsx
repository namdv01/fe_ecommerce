/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../config/api';
import { LOADING_FALSE, LOADING_TRUE } from '../services/constants';

function CreateShop({ ...props }) {
	const [form, setForm] = useState({
		shopName: '',
		description: '',
		phoneContact: '',
		logo: '',
		status: 'open', // open or close
	});
	const myRef = useRef();
	const dispatch = useDispatch();
	useEffect(() => {
		const clickOutSide = (e) => {
			if (myRef.current && !myRef.current.contains(e.target)) {
				props.setCreateShop(false);
			}
		};
		document.addEventListener('click', clickOutSide, true);
		return () => {
			document.removeEventListener('click', clickOutSide, true);
		};
	}, []);

	const updateForm = async () => {
		dispatch({
			type: LOADING_TRUE,
		});
		const result = await api.post(form);
		if (result.errCode === 0) {
			console.log(result);
		}
		dispatch({
			type: LOADING_FALSE,
		});
	};

	const clearAllForm = () => {
		setForm({
			...form,
			shopName: '',
			description: '',
			phoneContact: '',
			logo: '',
			status: 'open', // open or close
		});
	};
	const changeForm = (e, key) => {
		form[key] = e.target.value;
		setForm({ ...form });
	};

	return (
		// eslint-disable-next-line max-len
		// <div className="flex z-10 items-center justify-center fixed top-0 bottom-0 left-0 right-0 bg-slate-300 opacity-50">
		<>
			<div className="bg-white p-3 opacity-100 z-20 border rounded-lg fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-sm" ref={myRef}>
				<div>
					<div className="flex flex-row flex-wrap mb-3">
						<label htmlFor="shopName" className="w-[120px]">Tên:</label>
						<input
							type="text"
							id="shopName"
							value={form.shopName}
							onChange={(e) => {
								changeForm(e, 'shopName');
							}}
							className="outline-none border border-black min-w-[300px]"
						/>
					</div>
					<div className="flex flex-row flex-wrap mb-3">
						<label htmlFor="logo" className="w-[120px]">Logo:</label>
						<input
							type="file"
							id="logo"
							value={form.logo}
							className="hidden"
							onChange={(e) => {
								changeForm(e, 'logo');
							}}
						/>
					</div>
					<div className="flex flex-row flex-wrap mb-3">
						<label htmlFor="desc" className="w-[120px]">Miêu tả:</label>
						<textarea
							value={form.description}
							id="desc"
							className="outline-none border border-black min-w-[300px] min-h-[150px] max-h-[300px]"
							onChange={(e) => {
								changeForm(e, 'description');
							}}
						/>
					</div>
					<div className="flex flex-row flex-wrap mb-3">
						<label htmlFor="phone" className="w-[120px]">SĐT: </label>
						<input
							type="text"
							value={form.phoneContact}
							id="phone"
							className="outline-none border border-black min-w-[300px]"
							onChange={(e) => {
								changeForm(e, 'phoneContact');
							}}
						/>
					</div>
					<div className="flex flex-row flex-wrap mb-3">
						<label htmlFor="status" className="w-[120px]">Trạng thái:</label>
						<select
							id="status"
							value={form.status}
							className="outline-none border border-black min-w-[300px]"
							onChange={(e) => {
								changeForm(e, 'status');
							}}
						>
							<option value="open">Mở</option>
							<option value="close">Đóng</option>
						</select>
					</div>
					<div className="flex flex-row flex-wrap justify-between">
						<input
							type="button"
							value="Tạo gian hàng"
							onClick={(e) => {
								e.preventDefault();
								updateForm();
							}}
						/>
						<input
							type="button"
							value="Xóa bỏ toàn bộ"
							onClick={(e) => {
								e.preventDefault();
								clearAllForm();
							}}
						/>
					</div>
				</div>
			</div>
			<div className="fixed top-0 bottom-0 right-0 left-0 bg-slate-300 opacity-80 z-10" />
		</>
		// </div>
	);
}

export default CreateShop;
