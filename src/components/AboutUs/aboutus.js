import React from 'react';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.png';

const TAGS = ['Rangoli', 'Painting', 'Mehendi', 'Sketching', 'Clay Art', 'Tattoo', 'Face Paint', 'Collage'];

export default function AboutUs() {
  return (
    <section id="about-us" className="relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden">
      {/* Radial spotlight */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 65%)' }} />
      </div>

      <div className="relative max-w-4xl w-full text-center">
        {/* Logo with animated glow ring */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex justify-center mb-10">
          <div className="relative">
            <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 blur-2xl" />
            <div className="relative p-1 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500">
              <div className="bg-[#0a0614] rounded-full p-3">
                <img src={logo} alt="Spandan" className="h-20 w-20 object-contain" draggable={false} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
          <p className="text-purple-400/80 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4">Fine Arts Community</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
              SPANDAN
            </span>
          </h1>
          {/* Glowing divider */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-500" />
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-500" />
          </div>
        </motion.div>

        {/* Body */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          className="backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-3xl p-5 sm:p-8 md:p-10 mb-8 shadow-[0_0_60px_rgba(168,85,247,0.08)]">
          <div className="space-y-4 text-white/65 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            <p>Welcome to the SPANDAN Fine Arts Community — celebrating art in all its forms, catering to the creative interests of students at our institute.</p>
            <p>We organize intra and inter-college events providing a platform for students to showcase their talents through Rangoli, Poster Making, Mehendi, Wall Painting, Face Painting, and more.</p>
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="flex justify-center gap-2 flex-wrap">
          {TAGS.map((tag, i) => (
            <motion.span key={tag} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.05 }}
              whileHover={{ scale: 1.08, y: -2 }}
              className="px-4 py-1.5 rounded-full text-xs font-semibold border border-purple-500/30 bg-purple-500/10 text-purple-300 cursor-default transition-all duration-200 hover:border-purple-400/60 hover:bg-purple-500/20 hover:shadow-[0_0_12px_rgba(168,85,247,0.3)]">
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
