import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Cart from './Base/Cart';
import Landing from './Base/Landing';
import Loading from './Base/Loading';
import ItemDetail from './components/Content/ItemDetail';
import Product from './components/Shop/Product';
import Origin from './components/Shop/Origin';
import OrderShop from './components/Shop/Order';
import CommentShop from './components/Shop/CommentList';
import Comment from './components/User/Comment';
import Notify from './components/User/Notify';
import Order from './components/User/Order';
import Profile from './components/User/Profile';
import Report from './components/User/Report';
import ForgetPassword from './Forms/ForgetPassword';
import Login from './Forms/Login';
import Register from './Forms/Register';
import Admin from './pages/Admin';
import Buyer from './pages/Buyer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Seller from './pages/Seller';
import OrderAdmin from './components/Admin/Order';
import CommentAdmin from './components/Admin/Comments';
import Client from './components/Admin/Client';
import ReportAdmin from './components/Admin/Report';
import { LOADING_FALSE, LOADING_TRUE } from './services/constants';
import authMiddleware from './store/middleware/auth';

function App() {
	const authReducer = useSelector((state) => state.authReducer);
	const loading = useSelector((state) => state.systemReducer.loading);
	const dispatch = useDispatch();
	// eslint-disable-next-line no-unused-vars
	const [cookies, setCookies] = useCookies(['token']);
	// eslint-disable-next-line no-unused-vars
	const refresh = async () => {
		if (!authReducer.isAuth && cookies.token) {
			dispatch({
				type: LOADING_TRUE,
			});
			await dispatch(authMiddleware.getProfile());
			dispatch({
				type: LOADING_FALSE,
			});
		}
	};
	useEffect(() => {
		refresh();
	}, [cookies.token]);

	return (
		<>
			<Routes>
				<Route path="/">
					<Route path="" element={<Home />}>
						<Route index element={<Landing />} />
						<Route path="cart" element={<Cart />} />
						<Route path="profile" element={<Profile />} />
						<Route path="item/:id_item" element={<ItemDetail />} />
						<Route path="buyer" element={<Buyer />}>
							<Route index element={<Order />} />
							<Route path="orders" element={<Order />} />
							<Route path="orders/:stateOrder" element={<Order />} />
							<Route path="comments" element={<Comment />} />
							<Route path="notify" element={<Notify />} />
							<Route path="report" element={<Report />} />
						</Route>
						<Route path="admin" element={<Admin />}>
							{/* <div>1</div> */}
							<Route index element={<Client />} />
							<Route path="customer" element={<Client />} />
							<Route path="comment" element={<CommentAdmin />} />
							<Route path="order" element={<OrderAdmin />} />
							<Route path="report" element={<ReportAdmin />} />
						</Route>
						<Route path="seller/:idShop" element={<Seller />}>
							{/* <div>2</div> */}
							<Route path="product" element={<Product />} />
							<Route path="orders" element={<OrderShop />} />
							{/* <Route path="orders/:stateOrder" element={<OrderShop />} /> */}
							<Route path="comment" element={<CommentShop />} />
						</Route>
						<Route path="seller/origin" element={<Origin />} />
						<Route path="seller" element={<Origin />} />
					</Route>
					<Route path="login" element={<Login />} />
					<Route path="forget_password" element={<ForgetPassword />} />
					<Route path="register" element={<Register />} />
				</Route>
				<Route path="/not_found" element={<NotFound />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			{
				loading ? <Loading isFullScreen /> : <> </>
			}
		</>
	);
}

export default App;
