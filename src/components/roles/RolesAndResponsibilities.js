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
    <section id="roles-and-responsibilities" className="relative py-24 px-4 bg-[#0f0a1e] overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="section-title">Roles & Responsibilities</h2>
          <p className="section-sub">What the Fine Arts Committee does</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {roles.map((role, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.03 }}
              className="flex items-start gap-3 glass p-4 rounded-xl">
              <FiCheckCircle className="text-purple-400 mt-0.5 flex-shrink-0" size={16} />
              <p className="text-white/70 text-sm leading-relaxed">{role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
