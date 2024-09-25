import React from 'react';
import { FaPaintBrush, FaCamera, FaWind, FaPencilAlt, FaSeedling, FaPalette, FaRecycle, FaMask, FaUserAlt, FaPenNib } from 'react-icons/fa';
import { GiClayBrick, GiPaperCrane } from 'react-icons/gi';
import './Events.css';

const Events = () => {
    const eventsList = [
        { name: 'Graphite Symphony (Sketching)', icon: <FaPencilAlt /> },
        { name: 'Creative Cluster (Collage Making)', icon: <FaSeedling /> },
        { name: 'Crease and Create (Design Through Paper)', icon: <GiPaperCrane /> },
        { name: 'Moulded Magic (Clay Modelling)', icon: <GiClayBrick /> },
        { name: 'Brushstrokes and Beyond (Painting)', icon: <FaPalette /> },
        { name: 'Ecoelegance (Bamboo Structure)', icon: <FaSeedling /> },
        { name: 'Photo Fiesta (Photography)', icon: <FaCamera /> },
        { name: 'Waste to Wow (Best out of Waste)', icon: <FaRecycle /> },
        { name: 'Concrete Canvas (Wall Painting)', icon: <FaPaintBrush /> },
        { name: 'Melodic Breezes (Wind Chime)', icon: <FaWind /> },
        { name: 'Inkfluence (Tattoo Making)', icon: <FaPenNib /> },
        { name: 'Colourful Creations (Rangoli)', icon: <FaPalette /> },
        { name: 'Masked Magic (Mask Painting)', icon: <FaMask /> },
        { name: 'Whimsical Faces (Face Painting)', icon: <FaUserAlt /> },
    ];

    return (
        <section id="events" className="events-section">
            <h2 className="events-title">Events</h2>
            <div className="events-container">
                {eventsList.map((event, index) => (
                    <div key={index} className="event-card">
                        <div className="event-icon">
                            {event.icon}
                        </div>
                        <div className="event-info">
                            <h3 className="event-name">{event.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Events;
