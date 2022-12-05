import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Cart from './Base/Cart';
import Landing from './Base/Landing';
import ItemDetail from './components/Content/ItemDetail';
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
		<Routes>
			<Route path="/">
				<Route path="/" element={<Home />}>
					<Route index element={<Landing />} />
					<Route path="cart" element={<Cart />} />
					<Route path="item/:id_item" element={<ItemDetail />} />
				</Route>
				<Route path="login" element={<Login />} />
				<Route path="forget_password" element={<ForgetPassword />} />
				<Route path="register" element={<Register />} />
			</Route>
			<Route path="/admin" element={<Admin />} />
			<Route path="/buyer" element={<Buyer />} />
			<Route path="/seller" element={<Seller />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
