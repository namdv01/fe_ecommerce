/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import checkError from '../services/checkError';
import buyer from '../services/schemas/buyer';

function Register() {
	const authReducer = useSelector((state) => state.authReducer);
	// const dispatch = useDispatch();
	const navigate = useNavigate();
	const [form, setForm] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		fullName: '',
		gender: 'male',
		address: '',
		phoneNumber: '',
		position: 'buyer',
	});
	const [error, setError] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		fullName: '',
		gender: '',
		address: '',
		phoneNumber: '',
		position: '',
	});

	const onChange = (e) => {
		form[e.target.name] = e.target.value;
		setForm({ ...form });
	};

	const resetError = () => {
		const newError = {
			email: '',
			password: '',
			confirmPassword: '',
			fullName: '',
			gender: '',
			address: '',
			phoneNumber: '',
			position: '',
		};
		setError({ ...form, ...newError });
	};

	const submit = (e) => {
		e.preventDefault();
		resetError();
		const newForm = { ...form };
		delete newForm.confirmPassword;
		const errorMes = checkError(buyer.register, newForm);
		if (typeof newForm === 'object') {
			errorMes.forEach((item) => {
				Object.keys(item).forEach((key) => {
					if (key !== 'undefined') {
						error[key] = item[key];
						setError({ ...error });
					}
				});
			});
			return false;
		}
		return true;
	};

	const clear = () => {
		const newForm = {
			email: '',
			password: '',
			confirmPassword: '',
			fullName: '',
			gender: '',
			address: '',
			phoneNumber: '',
			position: '',
		};
		setForm({ ...form, ...newForm });
	};

	useEffect(() => {
		if (authReducer.isAuth) {
			navigate('/');
		}
	}, [authReducer.isAuth]);
	return (
		<div className="flex justify-center items-center h-[100vh] bg-[#4dffff]">
			<div className="p-4 border rounded-[12px] flex flex-col w-[360px] bg-[white]">
				<div className="flex mb-4 text-[24px]">????ng k?? v??o h??? th???ng</div>
				<div className="flex flex-row">
					<label htmlFor="fullNameRegister" className="w-[120px]">
						H??? t??n:
					</label>
					<div className="flex flex-col mb-4">
						<input
							id="fullNameRegister"
							type="text"
							name="fullName"
							value={form.fullName}
							className="border px-2 py-1 outline-none w-[200px]"
							onChange={onChange}
						/>
						<span className="text-[12px] text-[red] min-h-4 w-[200px]">
							{error.fullName}
						</span>
					</div>
				</div>
				<div className="flex flex-row">
					<label htmlFor="emailRegister" className="w-[120px]">
						Email ????ng k??:
					</label>
					<div className="flex flex-col mb-4">
						<input
							id="emailRegister"
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
					<label htmlFor="passwordRegister" className="w-[120px]">
						M???t kh???u:
					</label>
					<div className="flex flex-col">
						<input
							id="passwordRegister"
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
				<div className="flex flex-row mb-4">
					<label htmlFor="confirmPasswordRegister" className="w-[120px]">
						X??c nh???n m???t kh???u:
					</label>
					<div className="flex flex-col">
						<input
							id="confirmPasswordRegister"
							type="password"
							name="password"
							value={form.confirmPassword}
							className="border px-2 py-1 outline-none w-[200px]"
							onChange={onChange}
						/>
						<span className="text-[12px] text-[red] min-h-4 w-[200px]">
							{error.confirmPassword}
						</span>
					</div>
				</div>
				<div className="flex flex-row mb-4">
					<label htmlFor="genderRegister" className="w-[120px]">
						Gi???i t??nh:
					</label>
					<div className="flex flex-col">
						<select
							name="gender"
							id="genderRegister"
							className="border px-2 py-1 outline-none w-[200px]"
							onChange={onChange}
							value={form.gender}
						>
							<option value="male">Nam</option>
							<option value="female">N???</option>
						</select>
						<span className="text-[12px] text-[red] min-h-4 w-[200px]">
							{error.gender}
						</span>
					</div>
				</div>
				<div className="flex flex-row mb-4">
					<label htmlFor="phoneNumberRegister" className="w-[120px]">
						S??? ??i???n tho???i:
					</label>
					<div className="flex flex-col">
						<input
							id="phoneNumberRegister"
							type="text"
							name="phoneNumber"
							value={form.phoneNumber}
							className="border px-2 py-1 outline-none w-[200px]"
							onChange={onChange}
						/>
						<span className="text-[12px] text-[red] min-h-4 w-[200px]">
							{error.phoneNumber}
						</span>
					</div>
				</div>
				<div className="flex flex-row mb-4">
					<label htmlFor="addressRegister" className="w-[120px]">
						?????a ch???:
					</label>
					<div className="flex flex-col">
						<input
							id="addressRegister"
							type="text"
							name="address"
							value={form.address}
							className="border px-2 py-1 outline-none w-[200px]"
							onChange={onChange}
						/>
						<span className="text-[12px] text-[red] min-h-4 w-[200px]">
							{error.address}
						</span>
					</div>
				</div>
				<div className="flex flex-row mb-4">
					<label htmlFor="positionRegister" className="w-[120px]">
						V??? tr??:
					</label>
					<div className="flex flex-col">
						{/* <input id='positionRegister' type="text" name="position"
              value={form.position} className='border px-2 py-1 outline-none w-[200px]'
              onChange={onChange} /> */}
						<select
							name="position"
							id="positionRegister"
							className="border px-2 py-1 outline-none w-[200px]"
							value={form.position}
							onChange={onChange}
						>
							<option value="buyer">Ng?????i mua</option>
							<option value="seller">Ng?????i b??n</option>
							<option value="admin">Qu???n tr??? vi??n</option>
						</select>
						<span className="text-[12px] text-[red] min-h-4 w-[200px]">
							{error.position}
						</span>
					</div>
				</div>
				<div className="flex flex-row justify-between items-center">
					<button
						type="button"
						onClick={submit}
						className="py-2 px-3 border outline-none hover:bg-[blue]
          hover:text-[white]"
					>
						????ng k??
					</button>
					<button
						type="button"
						onClick={clear}
						className="hover:text-[blue] hover:cursor-pointer"
					>
						X??a b??? t???t c???
					</button>
				</div>
			</div>
		</div>
	);
}

export default Register;
