import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCrown } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { supabase } from '../../lib/supabase';

const MemberCard = ({ member, isConvenor }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} whileHover={{ y: -4 }}
    className="glass rounded-2xl overflow-hidden flex flex-col items-center p-6 gap-4 transition-all duration-300 hover:border-purple-400/40">
    <div className="relative">
      {member.image_url
        ? <img src={member.image_url} alt={member.name} className="w-24 h-24 rounded-full object-cover ring-2 ring-purple-500/40" />
        : <div className="w-24 h-24 rounded-full bg-purple-500/20 flex items-center justify-center"><FiUser size={36} className="text-purple-400" /></div>
      }
      {isConvenor && (
        <span className="absolute -top-1 -right-1 bg-amber-500 rounded-full p-1"><FaCrown size={10} className="text-white" /></span>
      )}
    </div>
    <div className="text-center">
      <h4 className="text-white font-semibold text-base">{member.name}</h4>
      <span className={`mt-1 inline-block text-xs px-2.5 py-0.5 rounded-full font-medium ${isConvenor ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'badge-purple'}`}>
        {member.role}
      </span>
      {member.bio && <p className="text-white/50 text-xs mt-2">{member.bio}</p>}
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
    <section id="committee-structure" className="relative py-24 px-4 bg-[#0f0a1e] overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="section-title">Committee Structure</h2>
          <p className="section-sub">The team behind Spandan Fine Arts</p>
        </motion.div>

        {convenors.length > 0 && (
          <div className="mb-12">
            <h3 className="text-white/60 text-xs font-semibold uppercase tracking-widest text-center mb-6">Convenor</h3>
            <div className="flex justify-center">
              <div className="w-56"><MemberCard member={convenors[0]} isConvenor /></div>
            </div>
          </div>
        )}

        {members.length > 0 && (
          <div>
            <h3 className="text-white/60 text-xs font-semibold uppercase tracking-widest text-center mb-6">Organizational Members</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {members.map(m => <MemberCard key={m.id} member={m} isConvenor={false} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
