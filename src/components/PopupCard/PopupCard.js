// PopupCard.js
import React from 'react';
import './PopupCard.css'; // Create a CSS file for styling the popup

const PopupCard = ({ name, photo, department, onClose }) => {
    return (
        <div className="popup-card" onMouseLeave={onClose}>
            <img src={photo} alt={name} className="popup-photo" />
            <h4 className="popup-name">{name}</h4>
            <p className="popup-department">{department}</p>
            <button className="close-button" onClick={onClose}>Close</button>
        </div>
    );
};

export default PopupCard;
