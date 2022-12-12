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
			previousClassName="px-2 py-1 border text-[blue] m-1 ml-0"
			nextClassName="px-2 py-1 border text-[blue] m-1"
			pageClassName="px-2 py-1 border m-1 text-[blue]"
			activeClassName="!text-white bg-[blue]"
			pageCount={props.totalPage}
			onPageChange={changePage}
			pageRangeDisplayed={3}
			marginPagesDisplayed={2}
			renderOnZeroPageCount={null}
		/>
	);
}

export default Pagination;
