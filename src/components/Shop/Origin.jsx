import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../config/api';
import CreateShop from '../../Forms/CreateShop';
import formatDay from '../../services/formatDay';
import generateColor from '../../services/generateColor';

function Origin() {
	const loading = useSelector((state) => state.systemReducer.loading);
	const navigate = useNavigate();
	const authReducer = useSelector((state) => state.authReducer);
	const location = useLocation();
	// eslint-disable-next-line no-unused-vars
	const [idToast, setIdToast] = useState(null);
	const [isCreateShop, setCreateShop] = useState(false);
	const [shops, setShops] = useState([
		// {
		// 	name: 'Shop quần áo',
		// 	id: 1,
		// 	color: null,
		// 	timeCreate: '17:52 08/12/2022',
		// },
		// {
		// 	name: 'Shop Bánh kẹo',
		// 	id: 2,
		// 	color: null,
		// 	timeCreate: '17:52 08/12/2022',
		// },
	]);
	useEffect(() => {
		const callShop = async () => {
			const result = await api.get('seller/list_shop');
			if (result.errCode === 0) {
				const newShops = result.payload.map((item) => ({
					...item,
					color: generateColor(6),
					createdAt: formatDay.TDMY(item.createdAt),
				}));
				setShops([...newShops]);
			}
		};
		callShop();
	}, []);

	useEffect(() => {
		if (loading) {
			console.log('đang loading');
		} else if (loading === null) {
			console.log('Khởi tạo loading');
		} else if (
			// eslint-disable-next-line operator-linebreak
			!authReducer.isAuth ||
			authReducer.profile.position !== 'seller'
		) {
			const id = Math.random();
			setIdToast(id);
			navigate('/', {
				state: {
					id,
					content: 'Không đúng vai trò',
					type: 'warning',
				},
			});
		}
	}, [loading]);

	useEffect(() => {
		if (!location.pathname.includes('origin')) {
			navigate('origin');
		}
	}, []);

	const changePage = (idShop) => {
		navigate(`/seller/${idShop}/orders`);
	};
	return (
		<div className="flex flex-row flex-wrap h-screen items-center justify-center relative">
			{
				shops.map((shop) => (
					<div
						key={`shop${shop.id}`}
						style={{
							background: shop.color,
						}}
						className="border rounded-lg p-4 text-xl inline-block m-4 text-white hover:cursor-pointer"
						onClick={() => {
							changePage(shop.id);
						}}
						aria-hidden
					>
						<div>
							{shop.shopName}
						</div>
						<div>
							{shop.createdAt}
						</div>
					</div>
				))
			}
			<div className="flex flex-col flex-wrap absolute top-0 right-[12px] z-10 items-center">
				{
					authReducer.profile.limitCreateShop >= 1
						? (
							<input
								type="button"
								onClick={() => {
									setCreateShop(true);
								}}
								value="Tạo thêm gian hàng"
								className="py-2 px-3 border rounded-lg text-white text-lg hover:bg-slate-500 bg-slate-400 hover:cursor-pointer"
							/>
						) : <> </>
				}
				<span>
					Được tạo thêm:
					{' '}
					{authReducer.profile.limitCreateShop}
					{' '}
					gian hàng
				</span>
			</div>
			{isCreateShop ? <CreateShop setCreateShop={setCreateShop} /> : <> </>}
		</div>
	);
}

export default Origin;
