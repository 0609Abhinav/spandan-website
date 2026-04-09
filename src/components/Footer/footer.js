import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import abhiImage from '../../assets/abhi.jpg';

const SOCIALS = [
  { href: 'https://www.linkedin.com/in/abhinav-tripathi-770224253/', icon: FaLinkedin,  color: 'hover:text-blue-400 hover:border-blue-400/40',  label: 'LinkedIn' },
  { href: 'https://www.instagram.com/_abhinavtripathi/',            icon: FaInstagram, color: 'hover:text-pink-400 hover:border-pink-400/40',   label: 'Instagram' },
  { href: 'https://www.facebook.com/abhinav2017',                  icon: FaFacebook,  color: 'hover:text-blue-500 hover:border-blue-500/40',   label: 'Facebook' },
];

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom center, rgba(168,85,247,0.05) 0%, transparent 60%)' }} />

      <div className="max-w-4xl mx-auto relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-[1px] rounded-3xl bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-indigo-500/20">
          <div className="bg-[#0f0a1e]/80 backdrop-blur-xl rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 blur-lg opacity-30" />
              <div className="relative p-[2px] rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                <img src={abhiImage} alt="Abhinav Tripathi"
                  className="w-20 h-20 rounded-full object-cover" />
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-purple-400/60 text-xs uppercase tracking-widest mb-1">Developer</p>
              <h3 className="text-white font-bold text-lg">Abhinav Tripathi</h3>
              <p className="text-white/40 text-sm mt-0.5"> Information Technology · BBDNIIT</p>
            </div>
            <div className="flex gap-3">
              {SOCIALS.map(s => (
                <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label} whileHover={{ scale: 1.15, y: -2 }}
                  className={`p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/40 transition-all duration-200 ${s.color}`}>
                  <s.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
        <p className="text-center text-white/15 text-xs mt-6">
          © {new Date().getFullYear()} Spandan Fine Arts Community · BBDNIIT
        </p>
      </div>
    </footer>
  );
}
