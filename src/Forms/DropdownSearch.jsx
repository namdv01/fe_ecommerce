import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { CHANGE_SEARCH_PRODUCT } from '../services/constants';

function DropdownSearch({ ...props }) {
	const [history, setHistory] = useState(
		[],
	);
	const myRef = useRef();
	const dispatch = useDispatch();
	// const { nameProduct } = useSelector((state) => state.systemReducer.nameProduct);
	useEffect(() => {
		const newHistory = JSON.parse(localStorage.getItem('historySearch') || '[]');
		setHistory(newHistory);
	}, []);

	useEffect(() => {
		const clickInSide = (e) => {
			if (myRef.current && myRef.current.contains(e.target)) {
				dispatch({
					type: CHANGE_SEARCH_PRODUCT,
					payload: {
						nameProduct: e.target.innerHTML,
					},
				});
				props.changeDropDown(false);
			}
		};
		document.addEventListener('click', clickInSide, true);
		return () => {
			document.removeEventListener('click', clickInSide, true);
		};
	}, [props]);

	return (
		<div className="bg-white absolute top-full z-[100] left-0 right-0 shadow-md" ref={myRef}>
			{history.map((item) => (
				<p
					className="px-2 hover:bg-slate-300"
					key={item}
					aria-hidden
				>
					{item}
				</p>
			))}
		</div>
	);
}

export default DropdownSearch;
