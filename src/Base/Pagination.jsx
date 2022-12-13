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
			previousLabel="<-"
			nextLabel="->"
			containerClassName="flex flex-row"
			previousClassName="text-[blue] m-1 ml-0 h-8 w-8 leading-8"
			nextClassName="text-[blue] m-1  h-8 w-8 leading-8"
			pageClassName="text-center m-1 text-[blue] h-8 w-8 leading-8"
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
