/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import checkError from '../services/checkError';
import buyer from '../services/schemas/buyer';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) => {
    form[e.target.name] = e.target.value;
    setForm({ ...form });
  };

  const submit = async () => {
    const errorMes = checkError(buyer.login, form);
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

    return true;
  };

  const forgetPassword = () => {
    navigate('/forget_password');
  };

  return (
    <div className="flex justify-center items-center h-[100vh] bg-[#4dffff]">
      <div className="p-4 border rounded-[12px] flex flex-col w-[360px] bg-[white]">
        <div className="flex mb-4 text-[24px]">
          Đăng nhập hệ thống
        </div>
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
  );
}

export default Login;
