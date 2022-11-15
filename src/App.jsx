import { Route, Routes } from 'react-router-dom';
import Cart from './Base/Cart';
import Landing from './Base/Landing';
import ForgetPassword from './Forms/ForgetPassword';
import Login from './Forms/Login';
import Register from './Forms/Register';
import Admin from './pages/Admin';
import Buyer from './pages/Buyer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Seller from './pages/Seller';

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<Home />}>
          <Route index element={<Landing />} />
          <Route path="cart" element={<Cart />} />
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
