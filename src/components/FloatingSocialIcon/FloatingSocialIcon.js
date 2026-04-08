import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function FloatingSocialIcon() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}
      className="fixed right-4 bottom-6 z-40 flex flex-col items-center gap-2">
      <div className="text-white/40 text-xs font-medium text-center leading-tight">
        <div>Follow us</div>
        <div>on Instagram</div>
      </div>
      <a href="https://www.instagram.com/finearts056bbdniit/" target="_blank" rel="noopener noreferrer"
        className="p-3 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg hover:scale-110 hover:shadow-pink-500/30 transition-all duration-200">
        <FaInstagram size={22} />
      </a>
    </motion.div>
  );
}
