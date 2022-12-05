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

function Profile() {
	const authReducer = useSelector((state) => state.authReducer);
	const loading = useSelector((state) => state.systemReducer.loading);
	const [idToast, setIdToast] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [modalPassword, setModalPassword] = useState(false);
	const [form, setForm] = useState({});
	const getAvatar = () => {
		if (authReducer.profile.imageAvatar) {
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
			const { phoneNumber, address, gender } = authReducer.profile;
			setForm({
				...form,
				phoneNumber,
				address,
				gender,
			});
		}
	}, [authReducer, loading]);
	return (
		<div>
			{
				authReducer.isAuth
					? (
						<div className="flex flex-row">
							<div>
								<img src={getAvatar()} className="w-16 h-16 border" alt="" />
								<button type="button" onClick={console.log(123)}>Đổi avatar</button>
							</div>
							<div className="flex flex-col">
								<div>
									<label htmlFor="fullname">Tên: </label>
									<input type="text" disabled value={authReducer.profile.fullname} id="fullname" onChange={null} />
								</div>
								<div>
									<label htmlFor="password">Mật khẩu: </label>
									<input type="password" disabled value="Không có mật khẩu đâu" id="password" onChange={null} />
								</div>
								<div>
									<label htmlFor="email">Email: </label>
									<input type="text" disabled value={authReducer.profile.email} id="email" onChange={null} />
								</div>
								<div>
									<label htmlFor="phoneNumber">Số điện thoại: </label>
									<input type="text" value={form.phoneNumber} id="phoneNumber" onChange={(e) => { changeValue(e, 'phoneNumber'); }} />
								</div>
								<div>
									<label htmlFor="address">Địa chỉ: </label>
									<input type="text" value={form.address} id="address" onChange={(e) => { changeValue(e, 'address'); }} />
								</div>
								<div>
									<label htmlFor="gender">Giới tính: </label>
									<select name="" id="gender" value={form.gender} onChange={(e) => { changeValue(e, 'gender'); }}>
										<option value="female">Nữ</option>
										<option value="male">Nam</option>
										<option value="other">Khác</option>
									</select>
								</div>
								<div className="flex flex-row">
									<button type="button" onClick={updateProfile}>Cập nhật thông tin</button>
									<button type="button" onClick={openModal}>Đổi mật khẩu</button>
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
