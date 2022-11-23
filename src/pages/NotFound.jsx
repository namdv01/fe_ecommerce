import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
	const navigate = useNavigate();
	const backToHome = () => {
		navigate('/');
	};

	return (
		<div className="flex items-center justify-center h-[100vh] flex-col">
			<h3>Not Found 404</h3>
			<input
				type="button"
				value="Về trang chủ"
				className="px-2 py-1 border outline-none hover:cursor-pointer hover:bg-slate-400"
				onClick={backToHome}
			/>
		</div>
	);
}

export default NotFound;
