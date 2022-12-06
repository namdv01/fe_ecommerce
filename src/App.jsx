import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Cart from './Base/Cart';
import Landing from './Base/Landing';
import Loading from './Base/Loading';
import ItemDetail from './components/Content/ItemDetail';
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
import { LOADING_FALSE, LOADING_TRUE } from './services/constants';
import authMiddleware from './store/middleware/auth';

function App() {
	const authReducer = useSelector((state) => state.authReducer);
	const loading = useSelector((state) => state.systemReducer.loading);
	const dispatch = useDispatch();
	// eslint-disable-next-line no-unused-vars
	const refresh = async () => {
		if (!authReducer.isAuth) {
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
	}, []);

	return (
		<>
			<Routes>
				<Route path="/">
					<Route path="/" element={<Home />}>
						<Route index element={<Landing />} />
						<Route path="cart" element={<Cart />} />
						<Route path="profile" element={<Profile />} />
						<Route path="item/:id_item" element={<ItemDetail />} />
						<Route path="buyer" element={<Buyer />}>
							<Route path="orders" element={<Order />} />
							<Route path="orders/:stateOrder" element={<Order />} />
							<Route path="comments" element={<Comment />} />
							<Route path="notify" element={<Notify />} />
							<Route path="report" element={<Report />} />
						</Route>
					</Route>
					<Route path="login" element={<Login />} />
					<Route path="forget_password" element={<ForgetPassword />} />
					<Route path="register" element={<Register />} />
				</Route>
				<Route path="/admin" element={<Admin />} />

				<Route path="/seller" element={<Seller />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			{
				loading ? <Loading isFullScreen /> : <> </>
			}
		</>
	);
}

export default App;
