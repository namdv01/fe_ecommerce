import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CHANGE_SEARCH_PRODUCT } from '../services/constants';
import systemMiddleware from '../store/middleware/system';
import DropdownSearch from './DropdownSearch';

function FormSearch() {
	const [isDropdown, setDropdown] = useState(false);
	const dispatch = useDispatch();
	const myRef = useRef();
	const navigate = useNavigate();
	const { nameProduct, minCostProduct, maxCostProduct } = useSelector(
		(state) => state.systemReducer,
	);
	// const [valueSearch, setValueSearch] = useState('');
	const changeDropDown = (value) => {
		setDropdown(value);
	};
	const addNewSearchToLocal = () => {
		if (nameProduct) {
			const historySearch = JSON.parse(localStorage.getItem('historySearch') || '[]');
			const lowerHistorySearch = historySearch.map((item) => item.toLowerCase());
			const checkExist = lowerHistorySearch.findIndex(
				(item) => item.includes(nameProduct.toLocaleLowerCase().trim()),
			);
			if (checkExist < 0) {
				historySearch.push(nameProduct.trim());
				localStorage.setItem('historySearch', JSON.stringify(historySearch));
			}
		}
	};
	const changeInputSearch = (e) => {
		// setValueSearch(e.target.value);
		dispatch({
			type: CHANGE_SEARCH_PRODUCT,
			payload: {
				nameProduct: e.target.value,
			},
		});
	};
	const search = async () => {
		const value = {
			name: nameProduct,
		};
		if (minCostProduct) value.min = minCostProduct;
		if (maxCostProduct) value.max = maxCostProduct;
		await dispatch(systemMiddleware.searchProduct(value));
		navigate('/');
	};

	useEffect(() => {
		const clickOutSide = (e) => {
			if (myRef.current && !myRef.current.contains(e.target)) {
				changeDropDown(false);
			}
		};
		document.addEventListener('click', clickOutSide, true);
		return () => {
			document.removeEventListener('click', clickOutSide, true);
		};
	}, []);
	return (
		<div
			ref={myRef}
			className="border flex-1 max-w-[700px] justify-between border-[black] pr-2 flex flex-row items-center my-3 relative bg-white"
		>
			<input
				type="text"
				onFocus={() => {
					changeDropDown(true);
				}}
				onBlur={() => {
					addNewSearchToLocal();
				// changeDropDown(false);
				}}
				value={nameProduct}
				onChange={changeInputSearch}
				className="border border-none outline-none mx-2 px-1 h-[38px]"
				placeholder="Nhập thông tin tìm kiếm ..."
			/>
			<i
				className="hover:cursor-pointer"
				onClick={() => {
					addNewSearchToLocal();
					search();
				}}
				aria-hidden
			>
				<AiOutlineSearch color="red" size="20" />
			</i>
			{isDropdown ? (
				<DropdownSearch
					changeDropDown={changeDropDown}
				/>
			) : <> </>}
		</div>
	);
}

export default FormSearch;
