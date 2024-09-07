import React from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('accessToken');

  console.log(isAuthenticated)

  if (!isAuthenticated) {
    Swal.fire({
      icon: 'warning',
      title: '로그인 후 이용해주세요',
      showConfirmButton: false,
      timer: 1500
    });
    return <Navigate to="/home" />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;