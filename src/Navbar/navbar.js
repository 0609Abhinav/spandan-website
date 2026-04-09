import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../assets/logo.png';

const LINKS = [
  { to: 'about-us',                   label: 'About' },
  { to: 'roles-and-responsibilities',  label: 'Roles' },
  { to: 'committee-structure',         label: 'Committee' },
  { to: 'event-gallery',               label: 'Gallery' },
  { to: 'event-form',                  label: 'Register' },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]   = useState('');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled ? 'backdrop-blur-2xl bg-[#0a0614]/70 border-b border-purple-500/10 shadow-[0_4px_30px_rgba(168,85,247,0.08)]' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
          {/* Logo with glow ring — bigger */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 select-none cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 blur-md opacity-40" />
              <img src={logo} alt="Spandan" className="relative h-14 w-auto drop-shadow-lg" draggable={false} />
            </div>
          </motion.div>

          {/* Desktop links — no separate Join Now button */}
          <ul className="hidden md:flex items-center gap-1">
            {LINKS.map(link => (
              <li key={link.to} className="relative">
                <Link to={link.to} smooth duration={600} spy onSetActive={() => setActive(link.to)}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-all duration-300 block
                    ${active === link.to ? 'text-white' : 'text-white/50 hover:text-white'}`}>
                  {active === link.to && (
                    <motion.span layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/30 to-pink-600/20 border border-purple-500/30"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                  )}
                  <span className={`relative z-10 ${link.to === 'event-form' ? 'px-2 py-0.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white' : ''}`}>
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <button onClick={() => setOpen(o => !o)} className="md:hidden p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all">
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden" onClick={() => setOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-72 bg-[#0f0a1e]/95 backdrop-blur-2xl border-l border-purple-500/20 z-50 md:hidden flex flex-col p-6 gap-1">
              <div className="flex items-center justify-between mb-8">
                <img src={logo} alt="Spandan" className="h-9 w-auto" draggable={false} />
                <button onClick={() => setOpen(false)} className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all">
                  <FiX size={20} />
                </button>
              </div>
              {LINKS.map((link, i) => (
                <motion.div key={link.to} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                  <Link to={link.to} smooth duration={600} onClick={() => setOpen(false)}
                    className={`block px-4 py-3 rounded-xl transition-all font-medium cursor-pointer text-sm
                      ${link.to === 'event-form' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center mt-2' : 'text-white/60 hover:text-white hover:bg-white/8'}`}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
