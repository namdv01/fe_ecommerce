/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsFillPencilFill, BsFolder2Open } from 'react-icons/bs';
import Pagination from '../../Base/Pagination';
import ClientDetail from './ClientDetail';

function Client() {
	const [users, setUsers] = useState([
		{
			id: 1,
			name: 'Nguyễn Văn A',
			position: 'buyer',
			avatar: 'http://localhost:6789/public/avatar/adminAvatar.jpg',
			lastLogin: '12:00 12/12/2022',
			address: 'hà Nội',
			phoneNumber: '0123412431',
		},
		{
			id: 1,
			name: 'Nguyễn Văn A',
			position: 'seller',
			avatar: 'http://localhost:6789/public/avatar/adminAvatar.jpg',
			lastLogin: '12:00 12/12/2022',
			address: 'hà Nội',
			phoneNumber: '0123412431',
		},
		{
			id: 1,
			name: 'Nguyễn Văn A',
			position: 'admin',
			avatar: 'http://localhost:6789/public/avatar/adminAvatar.jpg',
			lastLogin: '12:00 12/12/2022',
			address: 'hà Nội',
			phoneNumber: '0123412431',
		},
	]);
	const [page, setPage] = useState({
		cur: 0, // index
		total: 5,
		size: 10,
	});
	const changePage = (value) => {
		page.cur = value;
		setPage({ ...page });
	};
	const location = useLocation();
	const navigate = useNavigate();
	const [openDetail, setOpenDetail] = useState({
		state: false,
		customer: {},
	});
	const setCloseDetail = () => {
		openDetail.state = false;
		openDetail.customer = {};
		setOpenDetail({ ...openDetail });
	};
	const convertPosition = (value) => {
		switch (value) {
			case 'admin':
				return 'Quản trị viên';
			case 'seller':
				return 'Người bán';
			case 'buyer':
				return 'Người mua';
			default:
				return value;
		}
	};
	useEffect(() => {
		if (!location.pathname.includes('customer')) {
			navigate('/admin/customer');
		}
	}, [location.pathname]);
	return (
		<>
			<table className="border border-r-1 border-b-1 w-full">
				<thead>
					<tr>
						<th className="border border-l-1 border-t-1 px-2 py-1 w-12 text-center">STT</th>
						<th className="border border-l-1 border-t-1 px-2 py-1">Khách hàng</th>
						<th className="border border-l-1 border-t-1 px-2 py-1 w-32">Vai trò</th>
						<th className="border border-l-1 border-t-1 px-2 py-1 w-48">Lần cuối đăng nhập</th>
						<th className="border border-l-1 border-t-1 px-2 py-1 w-20">Chi tiết</th>
						{/* <th className="border border-l-1 border-t-1 px-2 py-1 w-20">Sửa đổi</th> */}
					</tr>
				</thead>
				<tbody>
					{
						users.map((user, index) => (
							<tr key={Math.random()}>
								<td className="border border-l-1 border-t-1 px-2 py-1 text-center">{index + 1}</td>
								<td className="border border-l-1 border-t-1 px-2 py-1">{user.name}</td>
								<td className="border border-l-1 border-t-1 px-2 py-1">{convertPosition(user.position)}</td>
								<td className="border border-l-1 border-t-1 px-2 py-1 text-center">{user.lastLogin}</td>
								<td className="border border-l-1 border-t-1 px-2 py-1 text-center">
									<BsFolder2Open
										className="mx-auto hover:cursor-pointer hover:text-[blue]"
										size={18}
										onClick={() => {
											openDetail.state = true;
											openDetail.customer = user;
											setOpenDetail({ ...openDetail });
										}}
									/>
								</td>
								{/* <td className="border border-l-1 border-t-1 px-2 py-1">
									<BsFillPencilFill className="mx-auto
									hover:cursor-pointer hover:text-[blue]" size={18} />
								</td> */}
							</tr>
						))
					}
				</tbody>
			</table>
			<Pagination
				totalPage={page.total}
				numberPage={page.cur}
				changePage={changePage}
			/>
			{openDetail.state ? (
				<ClientDetail
					info={openDetail.customer}
					setCloseDetail={setCloseDetail}
				/>
			) : <> </>}
		</>
	);
}

export default Client;
