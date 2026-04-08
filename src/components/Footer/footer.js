import React from 'react';
import { FaLinkedin, FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';
import abhiImage from '../../assets/abhi.jpg';

const SOCIALS = [
  { href: 'https://wa.me/9621854341',                              icon: FaWhatsapp,  color: 'hover:text-green-400',  label: 'WhatsApp' },
  { href: 'https://www.linkedin.com/in/abhinav-tripathi-770224253/', icon: FaLinkedin,  color: 'hover:text-blue-400',   label: 'LinkedIn' },
  { href: 'https://www.instagram.com/_abhinavtripathi/',            icon: FaInstagram, color: 'hover:text-pink-400',   label: 'Instagram' },
  { href: 'https://www.facebook.com/abhinav2017',                  icon: FaFacebook,  color: 'hover:text-blue-500',   label: 'Facebook' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0614] border-t border-white/5 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6">
          <img src={abhiImage} alt="Abhinav Tripathi" className="w-20 h-20 rounded-full object-cover ring-2 ring-purple-500/40 flex-shrink-0" />
          <div className="flex-1 text-center sm:text-left">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Developer</p>
            <h3 className="text-white font-bold text-lg">Abhinav Tripathi</h3>
            <p className="text-white/50 text-sm mt-0.5">4th Year · Information Technology · BBDNIIT</p>
            <p className="text-white/40 text-xs mt-1">+91 9621854341</p>
          </div>
          <div className="flex gap-3">
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className={`p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/50 ${s.color} hover:border-white/20 hover:bg-white/10 transition-all duration-200`}>
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </div>
        <p className="text-center text-white/20 text-xs mt-6">© {new Date().getFullYear()} Spandan Fine Arts Community · BBDNIIT</p>
      </div>
    </footer>
  );
}
