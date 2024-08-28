import React from 'react';
import Header from './Header'; // Correct import path

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;