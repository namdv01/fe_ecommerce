/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState, useEffect } from 'react';

function ClientDetail({ ...props }) {
	/**
   * props= {
   *  info: {
   * name
   * avatar
   * position
   * limitCreateShop
   * address
   * phoneNumber
   * gender
   * email
   * status
  * },
   * setCloseDetail(state)
   * }
   */
	const myRef = useRef();
	const [form, setForm] = useState({});
	useEffect(() => {
		setForm(props.info);
	}, [props]);
	useEffect(() => {
		const clickOutSide = (e) => {
			if (myRef.current && !myRef.current.contains(e.target)) {
				props.setCloseDetail(false);
			}
		};
		document.addEventListener('click', clickOutSide, true);
		return () => {
			document.removeEventListener('click', clickOutSide, true);
		};
	}, []);
	return (
		<>
			<div className="bg-white p-2 fixed z-[21] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" ref={myRef}>
				<div className="flex flex-row">
					<div>
						<img src={form.avatar} className="w-16 h-16" alt="" />
						<input type="file" name="" className="hidden" id="inputAvatar" />
						<label htmlFor="inputAvatar">Thay đổi ảnh</label>
					</div>
					<div>
						<div>
							<label htmlFor="name">Tên:</label>
							<input type="text" name="" id="name" className="outline-none border px-2 py-1" value={form.name} />
						</div>
						<div>
							<label htmlFor="position">Vị trí:</label>
							<select name="" value={form.position} id="" className="px-2 py-1 outline-none border">
								<option value="admin">Quản trị viên</option>
								<option value="seller">Người bán</option>
								<option value="client">Người mua</option>
							</select>
						</div>
						<div>
							<label htmlFor="limitCreateShop">Giới hạn tạo gian hàng:</label>
							<input type="number" id="limitCreateShop" value={form.limitCreateShop} className="outline-none border px-2 py-1" />
						</div>
					</div>
				</div>
				<div>
					<label htmlFor="address">Địa chỉ:</label>
					<input type="text" id="address" value={form.address} className="outline-none border px-2 py-1" />
				</div>
				<div>
					<label htmlFor="phoneNumber">Số điện thoại:</label>
					<input type="text" id="phoneNumber" value={form.phoneNumber} className="outline-none border px-2 py-1" />
				</div>
				<div>
					<label htmlFor="gender" className="outline-none border px-2 py-1">Giới tính:</label>
					<select name="" id="" value={form.gender}>
						<option value="male">Nam</option>
						<option value="female">Nữ</option>
					</select>
				</div>
				<div>
					<label htmlFor="email">Email:</label>
					<input type="text" id="email" disabled value={props.info.email} className="outline-none border px-2 py-1" />
				</div>
				<div>
					<label htmlFor="status">Trạng thái:</label>
					<input type="text" id="status" disabled value={props.info.status} className="outline-none border px-2 py-1" />
				</div>
				<div className="flex flex-row justify-between">
					<input type="button" value="Thay đổi" className="hover:bg-[#45d6e0]" />
					<input type="button" value="Hoàn trả thông tin" className="hover:bg-[#45d6e0]" />
				</div>
			</div>
			<div className="fixed top-0 bottom-0 right-0 left-0 bg-slate-200 opacity-80 z-20" />
		</>
	);
}

export default ClientDetail;
