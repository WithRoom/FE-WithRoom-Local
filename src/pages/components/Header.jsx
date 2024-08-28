import React, { useState } from 'react';
import './component.css'; // Correct import path

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="header">
      <button onClick={toggleDropdown}>Menu</button>
      {isOpen && (
        <div className="dropdown">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      )}
    </div>
  );
};

export default Header;