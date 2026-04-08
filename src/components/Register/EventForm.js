import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaWhatsapp, FaIdCard, FaBook, FaGraduationCap, FaPalette, FaCheckCircle } from 'react-icons/fa';
import { supabase } from '../../lib/supabase';

const BRANCHES = ['Computer Science', 'Information Technology', 'Electronics & Communication', 'Mechanical', 'Civil', 'MBA', 'MCA', 'Other'];
const COURSES  = ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'MBA', 'B.Sc', 'M.Sc', 'Other'];
const YEARS    = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

const FIELDS = [
  { name: 'name',     label: 'Full Name',       icon: FaUser,         type: 'text',   col: 1 },
  { name: 'email',    label: 'Email Address',   icon: FaEnvelope,     type: 'email',  col: 1 },
  { name: 'phone',    label: 'Phone Number',    icon: FaPhone,        type: 'tel',    col: 1 },
  { name: 'whatsapp', label: 'WhatsApp Number', icon: FaWhatsapp,     type: 'tel',    col: 1 },
  { name: 'roll_no',  label: 'Roll Number',     icon: FaIdCard,       type: 'text',   col: 1 },
  { name: 'section',  label: 'Section',         icon: FaBook,         type: 'text',   col: 1 },
  { name: 'branch',   label: 'Branch',          icon: FaGraduationCap,type: 'select', col: 1, options: BRANCHES },
  { name: 'course',   label: 'Course',          icon: FaBook,         type: 'select', col: 1, options: COURSES },
  { name: 'year',     label: 'Year',            icon: FaGraduationCap,type: 'select', col: 1, options: YEARS },
  { name: 'art_form', label: 'Art Form / Event',icon: FaPalette,      type: 'text',   col: 2 },
  { name: 'reason',   label: 'Why do you want to join?', icon: FaPalette, type: 'textarea', col: 2 },
];

const INIT = { name:'', email:'', phone:'', whatsapp:'', roll_no:'', section:'', branch:'', course:'', year:'', art_form:'', reason:'' };

export default function EventForm() {
  const [form, setForm]       = useState(INIT);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const filled = Object.values(form).filter(Boolean).length;
  const progress = Math.round((filled / FIELDS.length) * 100);

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = 'Required';
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!/^\d{10}$/.test(form.phone)) e.phone = '10-digit number required';
    if (!form.roll_no.trim()) e.roll_no = 'Required';
    if (!form.branch) e.branch = 'Select branch';
    if (!form.course) e.course = 'Select course';
    if (!form.year)   e.year   = 'Select year';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    const { error } = await supabase.from('registrations').insert(form);
    setLoading(false);
    if (error) { alert('Submission failed: ' + error.message); return; }
    setSuccess(true);
  };

  const inputClass = (name) =>
    `w-full bg-white/10 border ${errors[name] ? 'border-red-400' : 'border-white/20'} rounded-xl px-4 py-3 pl-11 text-white placeholder-white/40 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all`;

  if (success) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 px-4">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
        className="text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ delay: 0.2, duration: 0.6 }}
          className="text-green-400 text-9xl mb-6 flex justify-center">
          <FaCheckCircle />
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="text-4xl font-bold text-white mb-3">Registration Successful!</motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          className="text-white/70 text-lg mb-8">We'll be in touch soon. Welcome to Spandan!</motion.p>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
          onClick={() => { setForm(INIT); setSuccess(false); }}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full font-semibold hover:scale-105 transition-transform">
          Register Another
        </motion.button>
      </motion.div>
    </div>
  );

  return (
    <section id="event-form" className="relative min-h-screen py-20 px-4 overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Animated blobs */}
      {[['top-10 left-10', 'purple'], ['bottom-20 right-10', 'blue'], ['top-1/2 left-1/2', 'indigo']].map(([pos, color], i) => (
        <motion.div key={i} className={`absolute ${pos} w-72 h-72 bg-${color}-500/20 rounded-full blur-3xl`}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }} />
      ))}

      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
        className="relative max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-center text-white mb-2">Join Spandan</h2>
        <p className="text-center text-white/60 mb-8">Register for Fine Arts Events</p>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-white/60 text-sm mb-2">
            <span>Form Progress</span><span>{progress}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
              animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
          </div>
        </div>

        {/* Glassmorphism card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {FIELDS.filter(f => f.type !== 'textarea').map((field, i) => {
                const Icon = field.icon;
                return (
                  <motion.div key={field.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }} className="relative">
                    <label className="block text-white/70 text-sm mb-1 ml-1">{field.label}</label>
                    <div className="relative">
                      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
                      {field.type === 'select' ? (
                        <select value={form[field.name]} onChange={e => { setForm({...form, [field.name]: e.target.value}); setErrors({...errors, [field.name]: ''}); }}
                          className={inputClass(field.name) + ' appearance-none'}>
                          <option value="" className="bg-indigo-900">Select {field.label}</option>
                          {field.options.map(o => <option key={o} value={o} className="bg-indigo-900">{o}</option>)}
                        </select>
                      ) : (
                        <input type={field.type} placeholder={field.label} value={form[field.name]}
                          onChange={e => { setForm({...form, [field.name]: e.target.value}); setErrors({...errors, [field.name]: ''}); }}
                          className={inputClass(field.name)} />
                      )}
                    </div>
                    {errors[field.name] && <p className="text-red-400 text-xs mt-1 ml-1">{errors[field.name]}</p>}
                  </motion.div>
                );
              })}
            </div>

            {/* Textarea full width */}
            {FIELDS.filter(f => f.type === 'textarea').map((field) => {
              const Icon = field.icon;
              return (
                <motion.div key={field.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }} className="relative mt-6">
                  <label className="block text-white/70 text-sm mb-1 ml-1">{field.label}</label>
                  <div className="relative">
                    <Icon className="absolute left-3 top-4 text-white/40 text-sm" />
                    <textarea rows={4} placeholder={field.label} value={form[field.name]}
                      onChange={e => setForm({...form, [field.name]: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pl-11 text-white placeholder-white/40 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all resize-none" />
                  </div>
                </motion.div>
              );
            })}

            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="mt-8 w-full py-4 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-60">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                  Submitting...
                </span>
              ) : 'Submit Registration 🎨'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
