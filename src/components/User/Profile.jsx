/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Toast from '../../Base/Toast';
import {
	API_PUBLIC, LOADING_FALSE, LOADING_TRUE, SHOW_TOAST, UPDATE_PROFILE,
} from '../../services/constants';
import defaultAvatar from '../../assets/image/defaultAvatar.png';
import api from '../../config/api';
import ChangePassword from '../../Forms/ChangePassword';
import imageServices from '../../services/image';

function Profile() {
	const authReducer = useSelector((state) => state.authReducer);
	const loading = useSelector((state) => state.systemReducer.loading);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [modalPassword, setModalPassword] = useState(false);
	const [form, setForm] = useState({});
	const [idToast, setIdToast] = useState(null);
	const getAvatar = () => {
		if (form.imageAvatar) {
			if (imageServices.checkImage(form.imageAvatar)
				&& imageServices.sizeBase64(form.imageAvatar) <= 5) {
				return form.imageAvatar;
			}
			const id = Date.now();
			setIdToast(id);
			dispatch({
				type: SHOW_TOAST,
				payload: {
					id,
					type: 'warning',
					content: 'Ảnh không hợp lệ',
				},
			});
		}
		if (authReducer.profile.imageAvatar) {
			form.imageAvatar = '';
			return API_PUBLIC + authReducer.profile.imageAvatar || null;
		}
		return defaultAvatar;
	};
	const changeValue = (e, key) => {
		form[key] = e.target.value;
		setForm({
			...form,
		});
	};
	const updateProfile = async () => {
		dispatch({
			type: LOADING_TRUE,
		});
		const result = await api.post('user/update_profile', form);
		if (result.errCode === 0) {
			dispatch({
				type: UPDATE_PROFILE,
				payload: result.payload,
			});
		}
		const id = Date.now();
		setIdToast(id);

		dispatch({
			type: SHOW_TOAST,
			payload: {
				id,
				type: result.errCode === 0 ? 'success' : 'error',
				content: result.mes,
			},
		});
		dispatch({
			type: LOADING_FALSE,
		});
	};
	const openModal = () => {
		setModalPassword(true);
	};
	useEffect(() => {
		if (!authReducer.isAuth && loading === false) {
			navigate('/');
		} else if (authReducer.isAuth) {
			const {
				phoneNumber, address, gender, fullname,
			} = authReducer.profile;
			setForm({
				...form,
				phoneNumber,
				address,
				gender,
				fullname,
			});
		}
	}, [authReducer, loading]);
	return (
		<div className="flex w-full items-center justify-center" style={{ height: 'calc(100vh - 64px)' }}>
			{
				authReducer.isAuth
					? (
						<div className="flex flex-row shadow-lg m-2 p-1 flex-wrap border rounded-lg">
							<div className="mr-2">
								<img src={getAvatar()} className="w-16 h-16 border" alt="" />
								<label htmlFor="fileAvatar">Đổi avatar</label>
								<input
									type="file"
									name=""
									id="fileAvatar"
									className="hidden"
									onChange={(e) => {
										const reader = new FileReader();
										reader.readAsDataURL(e.target.files[0]);
										reader.onload = () => {
											setForm({
												...form,
												imageAvatar: reader.result,
											});
										};
									}}
								/>
							</div>
							<div className="flex flex-col">
								<div className="flex flex-row flex-wrap mb-1">
									<label htmlFor="fullname" className="inline-block w-[120px]">Tên: </label>
									<input type="text" value={form.fullname} className="w-[400px] outline-none border" id="fullname" onChange={(e) => { changeValue(e, 'fullname'); }} />
								</div>
								<div className="flex flex-row flex-wrap mb-1">
									<label htmlFor="password" className="inline-block w-[120px]">Mật khẩu: </label>
									<input type="password" disabled value="Không có mật khẩu đâu" id="password" onChange={null} className="w-[400px]" />
								</div>
								<div className="flex flex-row flex-wrap mb-1">
									<label htmlFor="email" className="inline-block w-[120px]">Email: </label>
									<input type="text" disabled value={authReducer.profile.email} id="email" onChange={null} className="w-[400px]" />
								</div>
								<div className="flex flex-row flex-wrap mb-1">
									<label htmlFor="phoneNumber" className="inline-block w-[120px]">Số điện thoại: </label>
									<input type="text" value={form.phoneNumber} id="phoneNumber" onChange={(e) => { changeValue(e, 'phoneNumber'); }} className="w-[400px] outline-none border" />
								</div>
								<div className="flex flex-row flex-wrap mb-1">
									<label htmlFor="address" className="inline-block w-[120px]">Địa chỉ: </label>
									<input type="text" value={form.address} id="address" onChange={(e) => { changeValue(e, 'address'); }} className="w-[400px] outline-none border" />
								</div>
								<div className="flex flex-row flex-wrap mb-1">
									<label htmlFor="gender" className="inline-block w-[120px]">Giới tính: </label>
									<select name="" id="gender" value={form.gender} onChange={(e) => { changeValue(e, 'gender'); }} className="w-[400px] outline-none border">
										<option value="female">Nữ</option>
										<option value="male">Nam</option>
										<option value="other">Khác</option>
									</select>
								</div>
								<div className="flex flex-row flex-wrap mt-4 mb-1 justify-between">
									<button type="button" className="p-2 border bg-[#60d0e6]" onClick={updateProfile}>Cập nhật thông tin</button>
									<button type="button" className="p-2 border bg-[#60d0e6]" onClick={openModal}>Đổi mật khẩu</button>
								</div>
							</div>
							<div />
							<div />
						</div>
					) : <> </>
			}
			{ idToast ? (
				<Toast
					id={idToast}
					setIdToast={setIdToast}
				/>
			) : <> </>}
			{
				modalPassword ? (
					<ChangePassword
						setModalPassword={setModalPassword}
						setIdToast={setIdToast}
					/>
				) : <> </>
			}
		</div>
	);
}

export default Profile;
