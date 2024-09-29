import React from 'react';
import Navbar from './Navbar/navbar'; // Adjust path as necessary
import AboutUs from '../src/components/AboutUs/aboutus'; // Adjust path as necessary
import Events from './components/Events/Events'; // Adjust path as necessary
import EventForm from '../src/components/Register/EventForm'; // Adjust path as necessary
import RolesAndResponsibilities from '../src/components/roles/RolesAndResponsibilities'; // Ensure this is correct
import CommitteeStructure from '../src/components/CommitteeStructure/CommitteeStructure'; // Ensure this is correct

const App = () => {
    return (
        <div>
            <Navbar />
            <section id="about-us">
                <AboutUs />
            </section>
            <section id="roles-and-responsibilities">
                <RolesAndResponsibilities />
            </section>
            <section id="committee-structure">
                <CommitteeStructure />
            </section>
            <section id="events">
                <Events />
            </section>
            <section id="event-form">
                <EventForm />
            </section>
        </div>
    );
};

export default App;
