import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import './FloatingSocialIcon.css'; // Import CSS file

const FloatingSocialIcon = () => {
  return (
    <div className="floating-icon fixed right-4 bottom-10 flex flex-col items-center space-y-3">
      {/* Join Us Message */}
      <div className="join-us-container flex flex-col items-center space-y-2">
        <span className="text-black font-semibold text-lg">Join Us</span>
        <span className="text-black text-sm">Follow Team Spandan on Instagram</span>
      </div>

      {/* Arrow and Instagram Icon */}
      <div className="flex flex-col items-center">
        <a
          href="https://www.instagram.com/finearts056bbdniit/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-pink-500 transition duration-300 transform hover:scale-110"
          aria-label="Instagram - Team Spandan"
        >
          <FaInstagram size={40} />
        </a>
        <div className="arrow-container mt-2 text-white text-xl">
          &#8594; {/* Right Arrow */}
        </div>
      </div>
    </div>
  );
};

export default FloatingSocialIcon;
