import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EventsProvider } from './lib/EventsContext';
import Navbar from './Navbar/navbar';
import AboutUs from './components/AboutUs/aboutus';
import EventForm from './components/Register/EventForm';
import RolesAndResponsibilities from './components/roles/RolesAndResponsibilities';
import CommitteeStructure from './components/CommitteeStructure/CommitteeStructure';
import Footer from './components/Footer/footer';
import EventGallery from './components/EventGallery/EventGallery';
import FloatingSocialIcon from './components/FloatingSocialIcon/FloatingSocialIcon';
import CursorGlow from './components/CursorGlow';
import AdminApp from './admin/AdminApp';

const isAdmin = window.location.pathname.startsWith('/admin');

function ParallaxBlob({ className, style }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 2000], [0, -200]);
  return <motion.div style={{ y, ...style }} className={className} />;
}

export default function App() {
  if (isAdmin) return <AdminApp />;
  return (
    <EventsProvider>
      <div className="relative min-h-screen bg-[#0a0614] overflow-x-hidden w-full max-w-[100vw]">
        <CursorGlow />

        {/* Global layered background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0614] via-[#0f0a1e] to-[#0a0614]" />
          <ParallaxBlob className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full blur-3xl opacity-20 hidden md:block"
            style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }} />
          <ParallaxBlob className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full blur-3xl opacity-15 hidden md:block"
            style={{ background: 'radial-gradient(circle, #db2777, transparent 70%)' }} />
          <ParallaxBlob className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] rounded-full blur-3xl opacity-10 hidden md:block"
            style={{ background: 'radial-gradient(circle, #4f46e5, transparent 70%)' }} />
        </div>

        <div className="relative z-10 w-full">
          <Navbar />
          <section id="about-us" className="pt-14 sm:pt-16 w-full"><AboutUs /></section>
          <section id="roles-and-responsibilities" className="w-full"><RolesAndResponsibilities /></section>
          <section id="committee-structure" className="w-full"><CommitteeStructure /></section>
          <section id="event-gallery" className="w-full"><EventGallery /></section>
          <section id="event-form" className="w-full"><EventForm /></section>
          <Footer />
          <FloatingSocialIcon />
        </div>
      </div>
    </EventsProvider>
  );
}
