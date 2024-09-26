import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import './navbar.css'; // Ensure the CSS file is named correctly
import logo from '../assets/logo.png'; // Update the logo path as needed

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);  // For toggling the mobile menu
    const [scrolled, setScrolled] = useState(false);  // To change navbar style on scroll

    // Toggle the mobile menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Close the menu
    const closeMenu = () => {
        setIsOpen(false);
    };

    // Handle scroll event to add background color when scrolling
    const handleScroll = () => {
        if (window.scrollY > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Logo Section */}
                <div className="logo">
                    <img src={logo} alt="Spandan Logo" />
                </div>

                {/* Hamburger Menu for Mobile View */}
                <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </div>

                {/* Navigation Links */}
                <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
                    <li>
                        <Link to="about-us" smooth={true} duration={500} onClick={closeMenu}>About Us</Link>
                    </li>
                    <li>
                        <Link to="events" smooth={true} duration={500} onClick={closeMenu}>Events</Link>
                    </li>
                    <li>
                        <Link to="roles-and-responsibilities" smooth={true} duration={500} onClick={closeMenu}>Roles</Link>
                    </li>
                    <li>
                        <Link to="gallery" smooth={true} duration={500} onClick={closeMenu}>Gallery</Link>
                    </li>
                    <li>
                        <Link to="register" smooth={true} duration={500} onClick={closeMenu}>Register</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
