/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { uuid4 } from 'uuidv4';
import Loading from '../Base/Loading';
import Toast from '../Base/Toast';
import checkError from '../services/checkError';
import { LOADING_FALSE, LOADING_TRUE, SHOW_TOAST } from '../services/constants';
import buyer from '../services/schemas/buyer';
import authMiddleware from '../store/middleware/auth';

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const authReducer = useSelector((state) => state.authReducer);
	const loading = useSelector((state) => state.systemReducer.loading);
	const [idToast, setIdToast] = useState(null);
	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const [error, setError] = useState({
		email: '',
		password: '',
	});

	useEffect(() => {
		if (authReducer.isAuth) {
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
		dispatch({
			type: LOADING_TRUE,
		});
		const result = await dispatch(
			authMiddleware.login({
				...form,
			}),
		);
		if (!authReducer.isAuth && typeof result === 'object') {
			const id = Date.now();
			setIdToast(id);
			dispatch({
				type: SHOW_TOAST,
				payload: {
					type: 'error',
					content: result.mes,
					id,
				},
			});
		}
		dispatch({
			type: LOADING_FALSE,
		});
		return true;
	};

	useEffect(() => {
		const enterKeyDown = (e) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				submit();
			}
		};
		document.addEventListener('keydown', enterKeyDown);
		return () => {
			document.removeEventListener('keydown', enterKeyDown);
		};
	}, [form]);

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
			{idToast ? <Toast id={idToast} /> : <> </>}
		</>
	);
}

export default Login;
