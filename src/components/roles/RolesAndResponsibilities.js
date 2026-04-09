import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';

const roles = [
  'Responsible for all intra and inter-collegiate fine arts events.',
  'Plan and schedule events for the academic year with tentative dates.',
  'Prepare budgets for all fine arts events and obtain necessary approvals.',
  'Conduct meetings to discuss and delegate tasks effectively.',
  'Prepare the annual budget for various events.',
  'Obtain formal permission from college authorities.',
  'Decide the date, time, and agenda of each program.',
  'Inform staff and students about upcoming events.',
  'Arrange venue and logistics (audio/video, dais, podium, etc.).',
  'Invite chief guests and dignitaries.',
  'Arrange mementos for guests and certificates for participants.',
  'Display event information on the Notice Board and Website.',
  'Maintain records of all fine arts activities.',
  'Organize competitions to identify and encourage talent.',
  'Motivate students for inter-college cultural events.',
];

export default function RolesAndResponsibilities() {
  return (
    <section id="roles-and-responsibilities" className="relative py-28 px-6 overflow-hidden">
      {/* Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #a855f7, transparent 65%)' }} />

      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-purple-400/70 text-xs font-semibold uppercase tracking-[0.3em] mb-3">Our Mission</p>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            Roles & Responsibilities
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500" />
          </div>
          <p className="text-white/40 text-sm max-w-md mx-auto">What the Fine Arts Committee does for the community</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {roles.map((role, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.5 }}
              whileHover={{ y: -3, scale: 1.01 }}
              className="group flex items-start gap-3 p-4 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm
                hover:border-purple-500/30 hover:bg-purple-500/[0.06] hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] transition-all duration-300">
              <FiCheckCircle className="text-purple-400 mt-0.5 flex-shrink-0 group-hover:text-pink-400 transition-colors duration-300" size={15} />
              <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-300">{role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
