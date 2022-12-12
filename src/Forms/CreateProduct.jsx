/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from 'react';

function CreateProduct({ ...props }) {
	const [form, setForm] = useState({
		name: '',
		price: '',
		quantity: '',
		images: [],
		description: '',
		type: 1,
	});
	const changeForm = (e, key) => {
		form[key] = e.target.value;
		setForm({ ...form });
	};
	const myRef = useRef();

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
			<div ref={myRef} className="bg-white flex flex-col items-center justify-center fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[21]">
				<div>
					<label htmlFor="name">Tên sản phẩm:</label>
					<input
						type="text"
						id="name"
						value={form.name}
						onChange={(e) => {
							changeForm(e, 'name');
						}}
						className="outline-none border px-2 py-1"
					/>
				</div>
				<div>
					<label htmlFor="">Giá: </label>
					<input
						type="number"
						min={1}
						value={form.price}
						onChange={(e) => {
							changeForm(e, 'price');
						}}
						className="outline-none border px-2 py-1"
					/>
				</div>
				<div>
					<label htmlFor="fileProduct">Thêm ảnh</label>
					<input type="file" name="" id="fileProduct" className="hidden" />
				</div>
				<div>
					<label htmlFor="desc">Mô tả sản phẩm</label>
					<textarea
						id="desc"
						className="w-full min-h-[150px] max-h-[300px] outline-none border p-2"
						value={form.description}
						onChange={(e) => {
							changeForm(e, 'description');
						}}
					/>
				</div>
				<div className="flex justify-between flex-row">
					<input type="button" value="Tạo sản phẩm" className="bg-[#3ba2dd] hover:cursor-pointer hover:bg-blue-400" />
					<input type="button" value="Xóa toàn bộ" className="bg-[#3ba2dd] hover:cursor-pointer hover:bg-blue-400" />
				</div>
				<div />
			</div>
		</>
	);
}

export default CreateProduct;
