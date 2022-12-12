import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toast from '../../Base/Toast';
import api from '../../config/api';
import { LOADING_FALSE, LOADING_TRUE, SHOW_TOAST } from '../../services/constants';

function ProductPromotion({ ...props }) {
	const myRef = useRef();
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.systemReducer.loading);
	const [idToast, setIdToast] = useState(null);
	const [promotions, setPromotion] = useState([
		{
			id: 1,
			dayBegin: '12/12/2023',
			dayFinish: '31/12/2023',
			reducePercent: 20,
		},
	]);
	useEffect(() => {
		const clickOutSide = (e) => {
			if (myRef.current && !myRef.current.contains(e.target)) {
				console.log(123);
				props.setDetailPromotion(null);
			}
		};
		document.addEventListener('click', clickOutSide, true);
		return () => {
			document.removeEventListener('click', clickOutSide, true);
		};
	}, []);

	useEffect(() => {
		// eslint-disable-next-line no-unused-vars
		const callPromotion = async (idPro) => {
			const result = await api.get(`seller/product_promotion/${idPro}`);
			if (result.errCode === 0) {
				setPromotion([...result.payload]);
				return result.payload;
			}
			const id = Math.random();
			setIdToast(id);
			dispatch({
				type: SHOW_TOAST,
				payload: {
					type: 'error',
					content: result.mes,
					id,
				},
			});
			return false;
		};
		dispatch({
			type: LOADING_TRUE,
		});
		// callPromotion();
		setTimeout(() => {
			dispatch({
				type: LOADING_FALSE,
			});
		}, 1000);
	}, []);

	return (
		<>
			<div className="fixed z-20 bg-slate-400 opacity-50 top-0 bottom-0 right-0 left-0" />
			{loading === false
				? (
					<>
						<div className="flex items-center justify-center z-[21] fixed w-full h-screen top-0 bottom-0 right-0 left-0">
							<div className="bg-white p-3 rounded shadow-sm" ref={myRef}>
								<h4 className="mx-2 my-1">Thông tin khuyến mãi</h4>
								<table className="border border-b-1 border-r-1">
									<thead className="bg-[#398ae7] text-white">
										<tr>
											<th className="border border-b-0 border-r-0 px-3 py-2">STT</th>
											<th className="border border-b-0 border-r-0 px-3 py-2">Mã khuyến mãi</th>
											<th className="border border-b-0 border-r-0 px-3 py-2">Thời gian</th>
											<th className="border border-b-0 border-r-0 px-3 py-2">Giảm</th>
										</tr>
									</thead>
									<tbody>
										{
											promotions.map((pro, index) => (
												<tr key={Math.random()}>
													<td className="border border-b-0 border-r-0 px-3 py-2">{index + 1}</td>
													<td className="border border-b-0 border-r-0 px-3 py-2">{pro.id}</td>
													<td className="border border-b-0 border-r-0 px-3 py-2">
														{pro.dayBegin}
														{' '}
														-
														{' '}
														{pro.dayFinish}
													</td>
													<td className="border border-b-0 border-r-0 px-3 py-2">
														{pro.reducePercent}
														{' '}
														%
													</td>
												</tr>
											))
										}
									</tbody>
								</table>
							</div>
						</div>
						{
							idToast ? <Toast id={idToast} /> : <> </>
						}
					</>
				)
				: <> </>}
		</>
	);
}

export default ProductPromotion;
