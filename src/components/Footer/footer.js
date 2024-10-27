import React from 'react';
import { FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa'; // Import icons
import './footer.css';
import abhiImage from '../../assets/abhi.jpg'; // Adjust the path according to your structure

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <h3>Developer Information</h3>
        
        {/* Flexbox for photo and details */}
        <div className="footer-details">
          {/* Photo with animation */}
          <div className="photo-container">
            <img src={abhiImage} alt="Abhinav Tripathi" className="profile-photo" />
          </div>
          <div className="text-content">
            <p><strong>Name:</strong> Abhinav Tripathi</p>
            <p><strong>Year:</strong> 4th Year</p>
            <p><strong>Department:</strong> Information Technology</p>
            <p><strong>College:</strong> BBDNIIT</p>
            <p><strong>Contact:</strong> +91 9621854341</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="social-links">
          <a
            href="https://wa.me/9621854341"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon whatsapp"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://www.linkedin.com/in/your-linkedin-id"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon linkedin"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/your-instagram-id"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon instagram"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
