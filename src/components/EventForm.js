import React, { useState } from 'react';
import axios from 'axios';

const EventForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedEvents, setSelectedEvents] = useState([]);
    const eventsList = [
        'Painting Workshop',
        'Dance Competition',
        'Music Fest',
        'Art Exhibition',
        'Drama Play',
    ];

    const handleEventChange = (event) => {
        const value = event.target.value;
        setSelectedEvents((prev) => {
            if (prev.includes(value)) {
                return prev.filter((e) => e !== value);
            }
            return prev.length < 3 ? [...prev, value] : prev;
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const studentData = { name, email, selectedEvents };
        
        // Replace this URL with your Google Sheets API URL
        const googleSheetsAPI = 'YOUR_GOOGLE_SHEETS_API_URL';

        try {
            await axios.post(googleSheetsAPI, studentData);
            alert('Form submitted successfully!');
        } catch (error) {
            console.error('Error submitting form', error);
        }
    };

    return (
        <section id="event-form">
            <h2>Register for Events</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <h3>Select up to 3 Events:</h3>
                {eventsList.map((event, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            value={event}
                            onChange={handleEventChange}
                            checked={selectedEvents.includes(event)}
                        />
                        <label>{event}</label>
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </section>
    );
};

export default EventForm;
