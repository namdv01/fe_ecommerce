import React from 'react';
import ReactPaginate from 'react-paginate';

// numberPage,totalPage,changeNumberPage
function Pagination({ ...props }) {
	const changePage = (event) => {
		props.changePage(event.selected);
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
