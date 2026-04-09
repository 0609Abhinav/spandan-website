import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCrown } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { supabase } from '../../lib/supabase';

const MemberCard = ({ member, isConvenor, i = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }}
    whileHover={{ y: -6, scale: 1.03 }}
    className="group relative cursor-default">
    {/* Gradient border wrapper */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-400 blur-[1px]" />
    <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-indigo-500/30 group-hover:from-purple-500 group-hover:via-pink-500 group-hover:to-indigo-500 transition-all duration-400">
              <div className="bg-[#0f0a1e]/90 backdrop-blur-xl rounded-2xl p-5 sm:p-7 flex flex-col items-center gap-4
        group-hover:shadow-[0_0_40px_rgba(168,85,247,0.25)] transition-all duration-400">

        {/* Image with glow ring */}
        <div className="relative">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-400 scale-110" />
            <div className={`relative p-[2px] rounded-full bg-gradient-to-br ${isConvenor ? 'from-amber-400 via-orange-400 to-yellow-400' : 'from-purple-500 via-pink-500 to-indigo-500'}`}>
              <div className="bg-[#0f0a1e] rounded-full p-0.5">
                {member.image_url
                  ? <img src={member.image_url} alt={member.name}
                      className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover group-hover:scale-105 transition-transform duration-400" />
                  : <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <FiUser size={44} className="text-purple-400" />
                    </div>
                }
              </div>
            </div>
          </motion.div>

          {isConvenor && (
            <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-2 -right-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full p-1.5 shadow-lg">
              <FaCrown size={11} className="text-white" />
            </motion.span>
          )}
        </div>

        {/* Info — slides up on hover */}
        <div className="text-center">
          <motion.h4 className="text-white font-semibold text-base group-hover:text-purple-200 transition-colors duration-300">
            {member.name}
          </motion.h4>
          <span className={`mt-2 inline-block text-xs px-3 py-1 rounded-full font-semibold
            ${isConvenor
              ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30'
              : 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30'}`}>
            {member.role}
          </span>
          {member.bio && (
            <p className="text-white/40 text-xs mt-2 leading-relaxed group-hover:text-white/60 transition-colors duration-300">
              {member.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

export default function CommitteeStructure() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    supabase.from('teachers').select('*').order('created_at', { ascending: true })
      .then(({ data }) => setTeachers(data || []));
  }, []);

  const convenors = teachers.filter(t => t.role?.toLowerCase() === 'convenor');
  const members   = teachers.filter(t => t.role?.toLowerCase() !== 'convenor');

  return (
    <section id="committee-structure" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.07] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #db2777, transparent 65%)' }} />

      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-pink-400/70 text-xs font-semibold uppercase tracking-[0.3em] mb-3">Meet The Team</p>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            Committee Structure
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-500" />
          </div>
          <p className="text-white/40 text-sm max-w-md mx-auto">The passionate team behind Spandan Fine Arts</p>
        </motion.div>

        {convenors.length > 0 && (
          <div className="mb-16">
            <p className="text-white/30 text-xs font-semibold uppercase tracking-[0.25em] text-center mb-8">Convenor</p>
            <div className="flex justify-center">
              <div className="w-full max-w-[220px] sm:max-w-[260px]">
                <MemberCard member={convenors[0]} isConvenor i={0} />
              </div>
            </div>
          </div>
        )}

        {members.length > 0 && (
          <div>
            <p className="text-white/30 text-xs font-semibold uppercase tracking-[0.25em] text-center mb-8">Organizational Members</p>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {members.map((m, i) => <MemberCard key={m.id} member={m} isConvenor={false} i={i} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
