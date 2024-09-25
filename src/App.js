import React from 'react';
import Navbar from './Navbar/navbar';
import AboutUs from './components/AboutUs/aboutus';
import Events from './components/Events';
import Committee from './components/Committee';
import EventForm from './components/EventForm';

const App = () => {
    return (
        <div>
            <Navbar />
            <section id="about-us">
                <AboutUs />
            </section>
            <section id="events">
                <Events />
            </section>
            <section id="committee">
                <Committee />
            </section>
            <section id="event-form">
                <EventForm />
            </section>
        </div>
    );
};

export default App;
