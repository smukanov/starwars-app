import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const elements = [
        {name: "people", label: "People"},
        {name: "planets", label: "Planets"},
        {name: "starships", label: "Starships"},
    ];

    const menuItems = elements.map(item => <li className = "Navbar__list-item" key = {item.name}>
        <NavLink to={`/${item.name}`}>{item.label}</NavLink>
    </li>);

    return (
        <div className = "Navbar">
            <ul className = "Navbar__list">
                {menuItems}
            </ul>
        </div>
    )
}

export default Navbar;