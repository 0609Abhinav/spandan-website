import React from 'react';
import Navbar from './Navbar/navbar'; // Adjust path as necessary
import AboutUs from './components/AboutUs/aboutus'; // Adjust path as necessary
import Events from './components/Events/Events'; // Adjust path as necessary
import EventForm from './components/Register/EventForm'; // Adjust path as necessary
import RolesAndResponsibilities from './components/roles/RolesAndResponsibilities'; // Ensure this is correct
import CommitteeStructure from './components/CommitteeStructure/CommitteeStructure'; // Ensure this is correct
import Footer from './components/Footer/footer'; // Adjust path to your Footer component
import EventGallery from './components/EventGallery/EventGallery'; // Import EventGallery component

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
            
            <section id="event-gallery">
                <EventGallery /> {/* Adding the EventGallery component here */}
            </section>
            
            <section id="event-form">
                <EventForm />
            </section>
            
            <Footer /> {/* Add Footer component here */}
        </div>
    );
};

export default App;
