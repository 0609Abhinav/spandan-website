// src/components/Navbar/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-scroll';
import './navbar.css'; // Ensure correct casing for CSS import
import logo from '../assets/logo.png'; // Update the path as necessary

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="Spandan Logo" />
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                <span className={isOpen ? "line open" : "line"}></span>
                <span className={isOpen ? "line open" : "line"}></span>
                <span className={isOpen ? "line open" : "line"}></span>
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
                    <Link to="roles-and-responsibilities" smooth={true} duration={500}>Roles and Responsibilities</Link>
                </li>
                <li>
                    <Link to="committee-structure" smooth={true} duration={500}>Committee Structure</Link>
                </li>
                <li>
                    <Link to="event-form" smooth={true} duration={500}>Register</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
