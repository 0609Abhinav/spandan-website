import React, { useState } from 'react';
import { Link } from 'react-scroll';
import '../Navbar/navbar.css' // lowercase 'n'
// Import the CSS file for styling

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className={`navbar ${isOpen ? 'open' : ''}`}>
            <div className="hamburger" onClick={toggleMenu}>
                <span className={`line ${isOpen ? "open" : ""}`}></span>
                <span className={`line ${isOpen ? "open" : ""}`}></span>
                <span className={`line ${isOpen ? "open" : ""}`}></span>
            </div>
            <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
                <li>
                    <Link to="about-us" smooth={true} duration={500}>About Us</Link>
                </li>
                <li>
                    <Link to="events" smooth={true} duration={500}>Events</Link>
                </li>
                <li>
                    <Link to="committee" smooth={true} duration={500}>Committee</Link>
                </li>
                <li>
                    <Link to="event-form" smooth={true} duration={500}>Register</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
