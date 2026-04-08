import React from 'react';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.png';

export default function AboutUs() {
  return (
    <section id="about-us" className="relative min-h-screen flex items-center justify-center px-4 py-24 overflow-hidden bg-[#0f0a1e]">
      {/* Blobs */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7 }}
        className="relative max-w-3xl w-full glass-strong p-10 text-center">

        <img src={logo} alt="Spandan Logo" className="h-20 w-auto mx-auto mb-6 opacity-90" draggable={false} />

        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-6">
          About SPANDAN Fine Arts
        </h2>

        <div className="space-y-4 text-white/70 text-base leading-relaxed">
          <p>Welcome to the SPANDAN Fine Arts Community — celebrating art in all its forms, catering to the creative interests of students at our institute.</p>
          <p>We organize a variety of intra and inter-college events including Rangoli, Poster Making, Mehendi, Wall Painting, Face Painting, and more — providing a platform for students to showcase their talents.</p>
        </div>

        <div className="flex justify-center gap-3 mt-8 flex-wrap">
          {['Rangoli','Painting','Mehendi','Sketching','Clay Art','Tattoo'].map(tag => (
            <span key={tag} className="badge-purple">{tag}</span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
