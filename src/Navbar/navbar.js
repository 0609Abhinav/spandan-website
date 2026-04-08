import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../assets/logo.png';

const LINKS = [
  { to: 'about-us',                  label: 'About' },
  { to: 'roles-and-responsibilities', label: 'Roles' },
  { to: 'committee-structure',        label: 'Committee' },
  { to: 'event-gallery',              label: 'Gallery' },
  { to: 'event-form',                 label: 'Register' },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]   = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-xl bg-[#0f0a1e]/80 border-b border-purple-500/20 shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 select-none">
            <img src={logo} alt="Spandan" className="h-10 w-auto" draggable={false} />
          </div>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {LINKS.map(link => (
              <li key={link.to}>
                <Link to={link.to} smooth duration={500} spy onSetActive={() => setActive(link.to)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200
                    ${active === link.to ? 'bg-purple-500/20 text-purple-300' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(o => !o)} className="md:hidden p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all">
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile slide-in panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-72 bg-[#1a1030] border-l border-purple-500/20 z-50 md:hidden flex flex-col p-6 gap-2">
              <div className="flex items-center justify-between mb-6">
                <img src={logo} alt="Spandan" className="h-9 w-auto" draggable={false} />
                <button onClick={() => setOpen(false)} className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all">
                  <FiX size={20} />
                </button>
              </div>
              {LINKS.map((link, i) => (
                <motion.div key={link.to} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link to={link.to} smooth duration={500} onClick={() => setOpen(false)}
                    className="block px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all font-medium cursor-pointer">
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
