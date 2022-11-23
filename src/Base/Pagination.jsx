import React from 'react';
import ReactPaginate from 'react-paginate';

// numberPage,totalPage,changeNumberPage
function Pagination({ ...props }) {
	const changePage = () => {
		console.log(props.numberPage);
	};

	return (
		<ReactPaginate
			initialPage={props.numberPage}
			breakLabel="..."
			previousLabel="<"
			nextLabel=">"
			containerClassName="flex flex-row"
			pageCount={props.totalPage}
			onPageChange={changePage}
		/>
	);
}

export default Pagination;
