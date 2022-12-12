import React, { useState } from 'react';
import CreateProduct from '../../Forms/CreateProduct';
import ProductDetail from './ProductDetail';
import ProductPromotion from './ProductPromotion';

function Product() {
	const [detailProduct, setDetailProduct] = useState(null);
	const [detailPromotion, setDetailPromotion] = useState(null);
	const [openCreate, setOpenCreate] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [products, setProducts] = useState([
		{
			id: 123,
			quantity: 20,
			price: 20000,
			name: 'bánh kẹo',
			description: 'mô tả',
		},
		{
			id: 123,
			quantity: 20,
			price: 20000,
			description: 'mô tả',
			name: 'bánh kẹo',
		},
		{
			id: 123,
			quantity: 20,
			description: 'mô tả',
			price: 20000,
			name: 'bánh kẹo',
		},
		{
			id: 123,
			quantity: 20,
			price: 20000,
			description: 'mô tả',
			name: 'bánh kẹo',
		},
		{
			id: 123,
			quantity: 20,
			price: 20000,
			description: 'mô tả',
			name: 'bánh kẹo',
		},
		{
			id: 123,
			quantity: 20,
			price: 20000,
			description: 'mô tả',
			name: 'bánh kẹo',
		},
	]);

	const chooseDetail = (product) => {
		console.log(product);
		setDetailProduct(product);
	};
	return (
		<>
			<div className="w-full">
				<table className="w-full">
					<thead className="border border-black border-r-0 bg-[green]">
						<tr>
							<th className="p-2 border-r border-black py-2 px-3 w-[60px] text-center">STT</th>
							<th className="p-2 border-r border-black py-2 px-3 w-[140px]">Mã sản phẩm</th>
							<th className="p-2 border-r border-black py-2 px-3">Tên sản phẩm</th>
							<th className="p-2 border-r border-black py-2 px-3 w-[120px]">Số lượng</th>
							<th className="p-2 border-r border-black py-2 px-3 w-[210px]">
								Thông tin khuyến mãi
							</th>
							<th className="p-2 border-r border-black py-2 px-3 w-[150px]">Chỉnh sửa</th>
						</tr>
					</thead>
					<tbody className="border-l border-black">
						{products.map((product, index) => (
							<tr key={Math.random()}>
								<td className="border-b border-r border-black py-2 px-3 text-center">{index + 1}</td>
								<td className="border-b border-r border-black py-2 px-3 text-center">{product.id}</td>
								<td className="border-b border-r border-black py-2 px-3">{product.name}</td>
								<td className="border-b border-r border-black py-2 px-3 text-center">{product.quantity}</td>
								<td className="border-b border-r border-black py-2 px-3">
									<input
										type="button"
										value="Chi tiết"
										className="py-1 px-2 outline-none border bg-blue-300 hover:bg-blue-400 hover:cursor-pointer"
										onClick={() => {
											setDetailPromotion(product.id);
										}}
									/>
								</td>
								<td className="border-b border-r border-black py-2 px-3">
									<input
										type="button"
										value="Chi tiết"
										onClick={() => {
											chooseDetail(product);
										}}
										className="py-1 px-2 outline-none border bg-blue-300 hover:bg-blue-400 hover:cursor-pointer"
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className="flex flex-row-reverse">
					<input
						type="button"
						value="Tạo thêm sản phẩm"
						onClick={() => {
							setOpenCreate(true);
						}}
						className="p-2 border bg-blue-300 outline-none hover:bg-blue-500 mt-3 hover:cursor-pointer"
					/>
				</div>
			</div>
			{
				detailProduct ? (
					<ProductDetail
						setProduct={setDetailProduct}
						product={detailProduct}
					/>
				) : <> </>
			}
			{
				detailPromotion
					? (
						<ProductPromotion
							detailPromotion={detailPromotion}
							setDetailPromotion={setDetailPromotion}
						/>
					) : <> </>
			}
			{
				openCreate ? <CreateProduct setCloseCreateProduct={setOpenCreate} /> : <> </>
			}
		</>
	);
}

export default Product;
