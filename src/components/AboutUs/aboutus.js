import React from 'react';
import './aboutus.css'; 
import logo from '../../assets/logo.png'; // Ensure the path is correct

const AboutUs = () => {
  return (
    <section className="about-section">
      {/* Logo as background */}
      <div className="logo-container" />
      
      <div className="about-content">
        <h2>About SPANDAN Fine Arts Community</h2>
        <p>Welcome to the SPANDAN Fine Arts Community! We celebrate art in various forms, aiming to cater to the non-academic interests of students at our institute.</p>
        <p>SPANDAN endeavors to facilitate the creative streaks of the student body by organizing a variety of intra/inter-college events. Our committee provides a platform for students to showcase their talents through events such as Rangoli, Poster Making, Mehendi, Wall Painting, Face Painting, and more.</p>
        
        {/* Logo at the bottom */}
        <img src={logo} alt="SPANDAN Fine Arts Community Logo" className="about-logo" />
      </div>
    </section>
  );
};

export default AboutUs;
