import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiHash, FiBook, FiAward, FiFeather, FiCheckCircle } from 'react-icons/fi';
import { supabase } from '../../lib/supabase';

const BRANCHES = ['Computer Science','Information Technology','Electronics & Communication','Mechanical','Civil','MBA','MCA','Other'];
const COURSES  = ['B.Tech','M.Tech','BCA','MCA','MBA','B.Sc','M.Sc','Other'];
const YEARS    = ['1st Year','2nd Year','3rd Year','4th Year'];

const FIELDS = [
  { name:'name',     label:'Full Name',        icon:FiUser,    type:'text'  },
  { name:'email',    label:'Email Address',    icon:FiMail,    type:'email' },
  { name:'phone',    label:'Phone Number',     icon:FiPhone,   type:'tel'   },
  { name:'whatsapp', label:'WhatsApp Number',  icon:FiPhone,   type:'tel'   },
  { name:'roll_no',  label:'Roll Number',      icon:FiHash,    type:'text'  },
  { name:'section',  label:'Section',          icon:FiBook,    type:'text'  },
  { name:'branch',   label:'Branch',           icon:FiAward,   type:'select', options:BRANCHES },
  { name:'course',   label:'Course',           icon:FiBook,    type:'select', options:COURSES  },
  { name:'year',     label:'Year',             icon:FiAward,   type:'select', options:YEARS    },
  { name:'art_form', label:'Art Form / Event', icon:FiFeather, type:'text'  },
];

const INIT = { name:'',email:'',phone:'',whatsapp:'',roll_no:'',section:'',branch:'',course:'',year:'',art_form:'',reason:'' };

export default function EventForm() {
  const [form, setForm]     = useState(INIT);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast]   = useState(false);

  const filled   = Object.values(form).filter(Boolean).length;
  const progress = Math.round((filled / 11) * 100);

  const validate = () => {
    const e = {};
    if (!form.name.trim())              e.name    = 'Required';
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!/^\d{10}$/.test(form.phone))   e.phone   = '10-digit number required';
    if (!form.roll_no.trim())           e.roll_no = 'Required';
    if (!form.branch)                   e.branch  = 'Select branch';
    if (!form.course)                   e.course  = 'Select course';
    if (!form.year)                     e.year    = 'Select year';
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
    setForm(INIT);
    setErrors({});
    setToast(true);
    setTimeout(() => setToast(false), 4000);
  };

  const set = (name, val) => { setForm(f => ({...f, [name]: val})); setErrors(e => ({...e, [name]: ''})); };

  return (
    <section id="event-form" className="relative py-24 px-4 bg-[#0f0a1e] overflow-hidden">
      <div className="absolute top-10 left-10 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Success toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -20, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-20 left-1/2 z-50 flex items-center gap-3 bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-xl text-emerald-300 px-6 py-3 rounded-2xl shadow-lg">
            <FiCheckCircle size={18} />
            <span className="font-medium text-sm">Registration successful! We'll be in touch soon.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative max-w-4xl mx-auto">
        <h2 className="section-title">Join Spandan</h2>
        <p className="section-sub">Register for Fine Arts Events</p>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-white/40 text-xs mb-2"><span>Form Progress</span><span>{progress}%</span></div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
          </div>
        </div>

        <div className="glass-strong p-8 rounded-2xl">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {FIELDS.map((field, i) => {
                const Icon = field.icon;
                return (
                  <motion.div key={field.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                    <label className="block text-white/60 text-xs font-medium mb-1.5 ml-0.5">{field.label}</label>
                    <div className="relative">
                      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
                      {field.type === 'select' ? (
                        <select value={form[field.name]} onChange={e => set(field.name, e.target.value)}
                          className={`input-field-icon appearance-none ${errors[field.name] ? 'border-red-500/60' : ''}`}>
                          <option value="" className="bg-[#1a1030]">Select {field.label}</option>
                          {field.options.map(o => <option key={o} value={o} className="bg-[#1a1030]">{o}</option>)}
                        </select>
                      ) : (
                        <input type={field.type} placeholder={field.label} value={form[field.name]}
                          onChange={e => set(field.name, e.target.value)}
                          className={`input-field-icon ${errors[field.name] ? 'border-red-500/60' : ''}`} />
                      )}
                    </div>
                    {errors[field.name] && <p className="text-red-400 text-xs mt-1 ml-0.5">{errors[field.name]}</p>}
                  </motion.div>
                );
              })}
            </div>

            {/* Reason textarea — full width */}
            <div className="mt-5">
              <label className="block text-white/60 text-xs font-medium mb-1.5 ml-0.5">Why do you want to join?</label>
              <textarea rows={4} placeholder="Tell us about your passion for art..." value={form.reason}
                onChange={e => set('reason', e.target.value)}
                className="input-field resize-none" />
            </div>

            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              className="mt-6 w-full py-3.5 btn-primary text-base rounded-xl disabled:opacity-50">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
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
