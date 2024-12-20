import React, { useState } from 'react';
import { FaPaintBrush, FaCamera, FaWind, FaPencilAlt, FaSeedling, FaPalette, FaRecycle, FaMask, FaUserAlt, FaPenNib } from 'react-icons/fa';
import { GiClayBrick, GiPaperCrane } from 'react-icons/gi';
import './Events.css';

const Events = () => {
    const eventsList = [
        { title: 'Graphite Symphony', description: 'Sketching', icon: <FaPencilAlt /> },
        { title: 'Creative Cluster', description: 'Collage Making', icon: <FaSeedling /> },
        { title: 'Crease and Create', description: 'Design Through Paper', icon: <GiPaperCrane /> },
        { title: 'Moulded Magic', description: 'Clay Modelling', icon: <GiClayBrick /> },
        { title: 'Brushstrokes and Beyond', description: 'Painting', icon: <FaPalette /> },
        { title: 'Ecoelegance', description: 'Bamboo Structure', icon: <FaSeedling /> },
        { title: 'Photo Fiesta', description: 'Photography', icon: <FaCamera /> },
        { title: 'Waste to Wow', description: 'Best out of Waste', icon: <FaRecycle /> },
        { title: 'Concrete Canvas', description: 'Wall Painting', icon: <FaPaintBrush /> },
        { title: 'Melodic Breezes', description: 'Wind Chime', icon: <FaWind /> },
        { title: 'Inkfluence', description: 'Tattoo Making', icon: <FaPenNib /> },
        { title: 'Colourful Creations', description: 'Rangoli', icon: <FaPalette /> },
        { title: 'Masked Magic', description: 'Mask Painting', icon: <FaMask /> },
        { title: 'Whimsical Faces', description: 'Face Painting', icon: <FaUserAlt /> },
    ];

    const [visibleEvents, setVisibleEvents] = useState(4); // Initially show 4 events

    const handleSeeMore = () => {
        setVisibleEvents((prev) => prev + 6); // Increase visible events by 4
    };

    return (
        <section id="events" className="events-section">
            <h2 className="events-title">Events</h2>
            <div className="events-container">
                {eventsList.slice(0, visibleEvents).map((event, index) => (
                    <div key={index} className="event-card">
                        <div className="event-icon">
                            {event.icon}
                        </div>
                        <div className="event-info">
                            <h3 className="event-title text-white ">
                                {event.title}
                            </h3>
                            <p className="event-description">
                                {event.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {visibleEvents < eventsList.length && (
                <button className="see-more-btn" onClick={handleSeeMore}>
                    See More
                </button>
            )}
        </section>
    );
};

export default Events;
