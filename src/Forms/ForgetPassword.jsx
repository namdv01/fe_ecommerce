/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Toast from '../Base/Toast';
import api from '../config/api';
import checkError from '../services/checkError';
import { LOADING_FALSE, LOADING_TRUE, SHOW_TOAST } from '../services/constants';
import buyer from '../services/schemas/buyer';

function ForgetPassword() {
	const [form, setForm] = useState({
		email: '',
	});
	const [error, setError] = useState({
		email: '',
	});

	const onChange = (e) => {
		setForm({ ...form, email: e.target.value });
	};
	const dispatch = useDispatch();
	const [idToast, setIdToast] = useState(null);
	const submit = async () => {
		const errorMes = checkError(buyer.forgetPassword, {
			email: form.email,
		});
		console.log(errorMes);
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
		const result = await api.post('user/forget_password', { email: form.email });
		const id = Math.random();
		console.log(result);
		setIdToast(id);
		dispatch({
			type: SHOW_TOAST,
			payload: {
				type: result.errCode === 0 ? 'success' : 'error',
				content: result.mes,
				id,
			},
		});
		dispatch({
			type: LOADING_FALSE,
		});
		return true;
	};

	return (
		<div className="flex justify-center items-center h-[100vh] bg-[#4dffff]">
			<div className="flex flex-col p-4 border rounded-[12px] bg-white">
				<div className="flex mb-4 text-[24px]">Quên mật khẩu</div>
				<div className="flex flex-row">
					<label htmlFor="emailForgetPassword" className="w-[120px]">
						Email khôi phục:
					</label>
					<div className="flex flex-col mb-4">
						<input
							id="emailForgetPassword"
							type="text"
							value={form.email}
							className="border px-2 py-1 outline-none w-[200px]"
							onChange={onChange}
						/>
						<span className="text-[12px] text-[red] min-h-4 w-[200px]">
							{error.email}
						</span>
					</div>
				</div>
				<div className="flex items-end flex-col">
					<button
						type="button"
						onClick={submit}
						className="py-2 px-3 border outline-none hover:bg-[blue]
        hover:text-[white]"
					>
						Gửi mã khôi phục
					</button>
				</div>
			</div>
			{idToast ? <Toast setIdToast={setIdToast} id={idToast} /> : <> </>}
		</div>
	);
}

export default ForgetPassword;
