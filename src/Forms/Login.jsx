/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../Base/Loading';
import Toast from '../Base/Toast';
import checkError from '../services/checkError';
import buyer from '../services/schemas/buyer';
import authMiddleware from '../store/middleware/auth';

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const authReducer = useSelector((state) => state.authReducer);
	const [showToast, setShowToast] = useState({
		isShow: false,
		content: '',
		time: 3000,
		type: 'default',
	});
	const setShow = (value) => {
		setShowToast({ ...showToast, isShow: value });
	};
	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const [error, setError] = useState({
		email: '',
		password: '',
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (authReducer.isAuth) {
			setLoading(false);
			navigate('/');
		}
	}, [authReducer.isAuth]);

	const onChange = (e) => {
		form[e.target.name] = e.target.value;
		setForm({ ...form });
	};

	const submit = async () => {
		const errorMes = checkError(buyer.login, form);
		if (typeof errorMes === 'object') {
			errorMes.forEach((item) => {
				Object.keys(item).forEach((key) => {
					error[key] = item[key];
					setError({ ...error });
				});
			});
			return false;
		}
		setLoading(true);
		const result = await dispatch(
			authMiddleware.login({
				...form,
			}),
		);
		if (!authReducer.isAuth && typeof result === 'object') {
			setLoading(false);
			showToast.isShow = true;
			showToast.content = result.mes;
			showToast.type = 'error';
			setShowToast({ ...showToast });
		}
		return true;
	};

	const forgetPassword = () => {
		navigate('/forget_password');
	};

	return (
		<>
			<div className="flex justify-center items-center h-[100vh] bg-[#4dffff]">
				<div className="p-4 border rounded-[12px] flex flex-col w-[360px] bg-[white]">
					<div className="flex mb-4 text-[24px]">Đăng nhập hệ thống</div>
					<div className="flex flex-row">
						<label htmlFor="emailLogin" className="w-[120px]">
							Tên đăng nhập:
						</label>
						<div className="flex flex-col mb-4">
							<input
								id="emailLogin"
								type="text"
								name="email"
								value={form.email}
								className="border px-2 py-1 outline-none w-[200px]"
								onChange={onChange}
							/>
							<span className="text-[12px] text-[red] min-h-4 w-[200px]">
								{error.email}
							</span>
						</div>
					</div>
					<div className="flex flex-row mb-4">
						<label htmlFor="passwordLogin" className="w-[120px]">
							Mật khẩu:
						</label>
						<div className="flex flex-col">
							<input
								id="passwordLogin"
								type="password"
								name="password"
								value={form.password}
								className="border px-2 py-1 outline-none w-[200px]"
								onChange={onChange}
							/>
							<span className="text-[12px] text-[red] min-h-4 w-[200px]">
								{error.password}
							</span>
						</div>
					</div>
					<div className="flex flex-row justify-between items-center">
						<button
							type="button"
							onClick={submit}
							className="py-2 px-3 border outline-none hover:bg-[blue] hover:text-[white]"
						>
							Đăng nhập
						</button>
						<button
							type="button"
							onClick={forgetPassword}
							className="hover:text-[blue] hover:cursor-pointer"
						>
							Quên mật khẩu
						</button>
					</div>
				</div>
			</div>
			{loading ? <Loading loading={loading} isFullScreen={1} /> : <> </>}
			{showToast.isShow ? (
				<Toast
					content={showToast.content}
					time={showToast.time}
					type={showToast.type}
					setShow={setShow}
				/>
			) : (
				<> </>
			)}
		</>
	);
}

export default Login;
