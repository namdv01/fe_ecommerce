import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Headers/Navbar';
// import { Outlet } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import authMiddleware from '../store/middleware/auth';

function Home() {
  // const authReducer = useSelector((state) => state.authReducer);
  // const dispatch = useDispatch();
  // const login = () => {
  //   dispatch(authMiddleware.login());
  // };

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Home;
