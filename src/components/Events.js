import React from 'react';

const Events = () => {
    const eventsList = [
        'Painting Workshop',
        'Dance Competition',
        'Music Fest',
        'Art Exhibition',
        'Drama Play',
    ];

    return (
        <section id="events">
            <h2>Upcoming Events</h2>
            <ul>
                {eventsList.map((event, index) => (
                    <li key={index}>{event}</li>
                ))}
            </ul>
        </section>
    );
};

export default Events;
