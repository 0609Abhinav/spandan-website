import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { FiX, FiChevronLeft, FiChevronRight, FiMaximize2 } from 'react-icons/fi';

const VIDEOS = [
  { id: 1, title: 'Event Highlights 2024', desc: 'A glimpse into our amazing events!', url: 'https://www.youtube.com/embed/TSODobJ0V7M' },
  { id: 2, title: 'Behind the Scenes',     desc: 'How we made it all happen!',         url: 'https://www.youtube.com/embed/tgbNymZ7vqY' },
];

function groupByCategory(rows) {
  const map = {};
  rows.forEach(r => {
    const k = r.event_category || r.title;
    if (!map[k]) map[k] = { id: k, title: k, description: r.description || '', images: [] };
    map[k].images.push(r.image_url);
  });
  return Object.values(map);
}

export default function EventGallery() {
  const [events, setEvents]   = useState([]);
  const [selected, setSelected] = useState(null);
  const [idx, setIdx]         = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('gallery').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setEvents(groupByCategory(data || [])); setLoading(false); });
  }, []);

  const open  = (ev, i = 0) => { setSelected(ev); setIdx(i); };
  const close = () => setSelected(null);
  const next  = (e) => { e.stopPropagation(); setIdx(i => (i + 1) % selected.images.length); };
  const prev  = (e) => { e.stopPropagation(); setIdx(i => (i - 1 + selected.images.length) % selected.images.length); };

  const displayed = showAll ? events : events.slice(0, 8);

  return (
    <section id="event-gallery" className="relative py-24 px-4 bg-[#0f0a1e] overflow-hidden">
      <div className="absolute top-20 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="section-title">Event Gallery</h2>
          <p className="section-sub">Moments captured from our finest events</p>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array(8).fill(0).map((_, i) => <div key={i} className="h-48 bg-white/5 rounded-2xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayed.map((ev, i) => (
              <motion.div key={ev.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                onClick={() => open(ev)}
                className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-square bg-white/5 border border-white/5 hover:border-purple-500/40 transition-all duration-300">
                <img src={ev.images[0]} alt={ev.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-semibold text-sm leading-tight">{ev.title}</h3>
                  <p className="text-white/60 text-xs mt-1">{ev.images.length} photos</p>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/40 backdrop-blur-sm rounded-lg p-1.5"><FiMaximize2 size={12} className="text-white" /></div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-8">
          <button onClick={() => setShowAll(p => !p)} className="btn-secondary">
            {showAll ? 'Show Less' : `View All ${events.length} Events`}
          </button>
        </div>

        {/* Videos */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20">
          <h2 className="section-title">Event Videos</h2>
          <p className="section-sub">Relive the best moments</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VIDEOS.map((v, i) => (
              <motion.div key={v.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl overflow-hidden">
                <iframe src={v.url} title={v.title} frameBorder="0" allowFullScreen
                  className="w-full aspect-video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
                <div className="p-4">
                  <h3 className="text-white font-semibold text-sm">{v.title}</h3>
                  <p className="text-white/50 text-xs mt-1">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={close}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-bold text-lg">{selected.title}</h3>
                  <p className="text-white/40 text-xs">{idx + 1} / {selected.images.length}</p>
                </div>
                <button onClick={close} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"><FiX size={18} /></button>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={prev} className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all flex-shrink-0"><FiChevronLeft size={20} /></button>
                <motion.img key={idx} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                  src={selected.images[idx]} alt={selected.title}
                  className="flex-1 max-h-[65vh] object-contain rounded-xl" />
                <button onClick={next} className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all flex-shrink-0"><FiChevronRight size={20} /></button>
              </div>
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1 justify-center">
                {selected.images.map((img, i) => (
                  <img key={i} src={img} alt="" onClick={() => setIdx(i)}
                    className={`h-12 w-12 object-cover rounded-lg cursor-pointer flex-shrink-0 transition-all ${i === idx ? 'ring-2 ring-purple-400 opacity-100' : 'opacity-40 hover:opacity-70'}`} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
