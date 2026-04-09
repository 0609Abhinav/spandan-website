import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function FloatingSocialIcon() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }}
      className="fixed right-5 bottom-6 z-40 flex flex-col items-center gap-2">
      <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="flex flex-col items-center gap-2">
        <div className="text-white/30 text-[10px] font-medium text-center leading-tight">
          <div>Follow</div><div>us</div>
        </div>
        <motion.a href="https://www.instagram.com/finearts056bbdniit/" target="_blank" rel="noopener noreferrer"
          whileHover={{ scale: 1.15 }}
          className="relative p-3 rounded-2xl text-white shadow-lg transition-all duration-200"
          style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>
          <div className="absolute inset-0 rounded-2xl blur-md opacity-50"
            style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }} />
          <FaInstagram size={22} className="relative z-10" />
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
