/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import api from '../config/api';
import { LOADING_FALSE, LOADING_TRUE, SHOW_TOAST } from '../services/constants';
import checkError from '../services/checkError';
import buyer from '../services/schemas/buyer';

function ChangePassword({ ...props }) {
	const [form, setForm] = useState({
		password: '',
		newPassword: '',
		confirmNewPassword: '',
	});
	const myRef = useRef();
	const dispatch = useDispatch();
	const [error, setError] = useState({});
	const changeValue = (e, value) => {
		form[value] = e.target.value;
		setForm({
			...form,
		});
	};

	const changePassword = async () => {
		setError({
			...error,
			password: '',
			newPassword: '',
			confirmNewPassword: '',
		});
		const errorMes = checkError(buyer.changePassword, form);
		if (typeof errorMes === 'object') {
			errorMes.forEach((item) => {
				Object.keys(item).forEach((key) => {
					error[key] = item[key];
					setError({ ...error });
				});
			});
			return false;
		}
		dispatch({
			type: LOADING_TRUE,
		});
		const result = await api.post('user/change_password', form);
		dispatch({
			type: LOADING_FALSE,
		});
		const id = Date.now();
		dispatch({
			type: SHOW_TOAST,
			payload: {
				type: result.errCode === 0 ? 'success' : 'error',
				content: result.mes,
				id,
			},
		});
		props.setIdToast(id);
		props.setModalPassword(false);
		return true;
	};

	useEffect(() => {
		const clickOutSide = (e) => {
			if (myRef.current && !myRef.current.contains(e.target)) {
				props.setModalPassword(false);
			}
		};
		document.addEventListener('click', clickOutSide, true);
		return () => {
			document.removeEventListener('click', clickOutSide, true);
		};
	}, []);
	return (
		<>
			<div className="w-full h-screen bg-slate-100 flex items-center justify-center fixed top-0 bottom-0 left-0 right-0 z-10 opacity-70" />
			<div className="w-full h-screen z-[11] flex items-center justify-center fixed top-0 bottom-0 left-0 right-0">
				<div className="p-2 border bg-white rounded-lg shadow" ref={myRef}>
					<h2 className="py-3">Đổi mật khẩu</h2>
					<div className="flex flex-row flex-wrap mb-4">
						<label htmlFor="currentPassword" className="min-w-[180px]">Mật khẩu hiện tại: </label>
						<div className="flex flex-col w-[400px]">
							<input
								type="password"
								name=""
								id="currentPassword"
								value={form.password}
								className="border outline-none"
								onChange={(e) => {
									changeValue(e, 'password');
								}}
							/>
							<span className="text-sm text-[red]">{error.password}</span>
						</div>
					</div>
					<div className="flex flex-row flex-wrap mb-4">
						<label htmlFor="newPassword" className="min-w-[180px]">Mật khẩu mới: </label>
						<div className="flex flex-col w-[400px]">
							<input
								type="password"
								name=""
								id="newPassword"
								value={form.newPassword}
								className="border outline-none"
								onChange={(e) => {
									changeValue(e, 'newPassword');
								}}
							/>
							<span className="text-sm text-[red]">{error.newPassword}</span>
						</div>
					</div>
					<div className="flex flex-row flex-wrap mb-4">
						<label htmlFor="confirmNewPassword" className="min-w-[180px]">Xác nhận mật khẩu mới: </label>
						<div className="flex flex-col w-[400px]">
							<input
								type="password"
								name=""
								id="confirmNewPassword"
								value={form.confirmNewPassword}
								className="border outline-none"
								onChange={(e) => {
									changeValue(e, 'confirmNewPassword');
								}}
							/>
							<span className="text-sm text-[red]">{error.confirmNewPassword}</span>
						</div>
					</div>
					<div>
						<button className="m-2 border bg-cyan-400 p-2 hover:text-white" type="button" onClick={changePassword}>Đổi mật khẩu</button>
					</div>
				</div>
			</div>
		</>

	);
}

export default ChangePassword;
