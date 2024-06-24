import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logotrang.png';
import '../style/Navbar.css';

function Navbar() {
  return (
    <div className='nav'>
    <div className="navbar">
      <div className="leftSide">
        {/* Sử dụng Link để chuyển hướng khi click vào logo */}
        <Link to="/">
          <img className="logo" src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className="rightSide">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/compare">Compare</Link>
        <Link to="/contact">Contact Us</Link>
        
      </div>
    </div>
    </div>
  );
}

export default Navbar;
