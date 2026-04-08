import React from 'react';
import Navbar from './Navbar/navbar';
import AboutUs from './components/AboutUs/aboutus';
import EventForm from './components/Register/EventForm';
import RolesAndResponsibilities from './components/roles/RolesAndResponsibilities';
import CommitteeStructure from './components/CommitteeStructure/CommitteeStructure';
import Footer from './components/Footer/footer';
import EventGallery from './components/EventGallery/EventGallery';
import FloatingSocialIcon from './components/FloatingSocialIcon/FloatingSocialIcon';
import AdminApp from './admin/AdminApp';

const isAdmin = window.location.pathname.startsWith('/admin');

export default function App() {
  if (isAdmin) return <AdminApp />;
  return (
    <div>
      <Navbar />
      <section id="about-us"><AboutUs /></section>
      <section id="roles-and-responsibilities"><RolesAndResponsibilities /></section>
      <section id="committee-structure"><CommitteeStructure /></section>
      <section id="event-gallery"><EventGallery /></section>
      <section id="event-form"><EventForm /></section>
      <Footer />
      <FloatingSocialIcon />
    </div>
  );
}
