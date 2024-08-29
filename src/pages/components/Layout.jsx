import React from 'react';
import Header from './Header'; // Import the Header component

const Layout = ({ children }) => {
  return (
    <div>
      <Header /> {/* Include the Header component */}
      <main>
        {children} {/* Render the main content */}
      </main>
    </div>
  );
};

export default Layout;