import React from 'react';
import Logo from './Logo';
import Navbar from './Navbar';

const Header = () => {
    return (
        <div className = "Header">
            <Logo/>
            <Navbar/>
        </div>
    )
}

export default Header;