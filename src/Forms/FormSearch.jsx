import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

function FormSearch() {
	return (
		<div className="border border-[black] overflow-hidden pr-2 flex flex-row items-center my-3">
			<input
				type="text"
				className="border border-none outline-none mx-2 px-1"
				placeholder="Nhập thông tin tìm kiếm ..."
			/>
			<i className="hover:cursor-pointer">
				<AiOutlineSearch color="red" size="20" />
			</i>
		</div>
	);
}

export default FormSearch;
