import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { FiSave, FiCheckCircle, FiType, FiAlignLeft } from 'react-icons/fi';

const SECTIONS = [
  {
    key:   'gallery_header',
    label: '🖼 Gallery Section',
    desc:  'Controls the heading above the photo gallery grid',
  },
  {
    key:   'videos_header',
    label: '🎬 Videos Section',
    desc:  'Controls the heading above the event videos',
  },
];

function SectionForm({ section }) {
  const [form, setForm]     = useState({ title: '', subtitle: '' });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved]   = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    supabase.from('site_content').select('*').eq('section', section.key).single()
      .then(({ data }) => {
        if (data) setForm({ title: data.title, subtitle: data.subtitle || '' });
        setFetching(false);
      });
  }, [section.key]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    await supabase.from('site_content')
      .upsert({ section: section.key, ...form, updated_at: new Date().toISOString() }, { onConflict: 'section' });
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  if (fetching) return (
    <div className="glass rounded-2xl p-6 animate-pulse">
      <div className="h-4 bg-white/10 rounded w-1/3 mb-4" />
      <div className="h-10 bg-white/5 rounded mb-3" />
      <div className="h-10 bg-white/5 rounded" />
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6">
      <div className="mb-5">
        <h3 className="text-white font-semibold text-sm">{section.label}</h3>
        <p className="text-white/30 text-xs mt-0.5">{section.desc}</p>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-white/40 text-xs mb-1.5 flex items-center gap-1.5 block">
                <FiType size={11} />Section Title *
              </label>
              <input className="input-field" placeholder="e.g. Event Gallery"
                value={form.title} onChange={e => set('title', e.target.value)} required />
            </div>
          </div>

        <div>
          <label className="text-white/40 text-xs mb-1.5 flex items-center gap-1.5 block">
            <FiAlignLeft size={11} />Subtitle
          </label>
          <input className="input-field" placeholder="e.g. Moments captured from our finest events"
            value={form.subtitle} onChange={e => set('subtitle', e.target.value)} />
        </div>

        {/* Live preview */}
        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
          <p className="text-white/20 text-xs mb-2 uppercase tracking-widest">Preview</p>
          <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            {form.title || <span className="text-white/20">Title will appear here</span>}
          </p>
          {form.subtitle && <p className="text-white/40 text-xs mt-1">{form.subtitle}</p>}
        </div>

        <button type="submit" disabled={loading}
          className={`btn-primary flex items-center gap-2 transition-all ${saved ? 'from-emerald-600 to-emerald-700' : ''}`}>
          {saved
            ? <><FiCheckCircle size={14} />Saved!</>
            : loading
              ? <><motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full" />Saving…</>
              : <><FiSave size={14} />Save Changes</>
          }
        </button>
      </form>
    </motion.div>
  );
}

export default function ContentManager() {
  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-5 border-l-4 border-purple-500">
        <p className="text-white/60 text-sm">
          Changes here update the <span className="text-purple-400 font-medium">public website</span> headings instantly on next page load.
          No code changes needed.
        </p>
      </div>
      {SECTIONS.map(s => <SectionForm key={s.key} section={s} />)}
    </div>
  );
}
