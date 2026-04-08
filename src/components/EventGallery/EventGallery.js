import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './EventGallery.css';
import { supabase } from '../../lib/supabase';
import { FaTimes, FaArrowLeft, FaArrowRight, FaExpand } from 'react-icons/fa';

const videoData = [
  { id: 1, title: 'Event Highlights 2024', description: 'A glimpse into our amazing events!', videoUrl: 'https://www.youtube.com/embed/TSODobJ0V7M' },
  { id: 2, title: 'Behind the Scenes',     description: 'How we made it all happen!',         videoUrl: 'https://www.youtube.com/embed/tgbNymZ7vqY' },
];

function groupByCategory(rows) {
  const map = {};
  rows.forEach(row => {
    const key = row.event_category || row.title;
    if (!map[key]) map[key] = { id: key, title: row.event_category || row.title, description: row.description || '', images: [] };
    map[key].images.push(row.image_url);
  });
  return Object.values(map);
}

export default function EventGallery() {
  const [eventsData, setEventsData]   = useState([]);
  const [selected, setSelected]       = useState(null);
  const [imgIdx, setImgIdx]           = useState(0);
  const [showAll, setShowAll]         = useState(false);
  const [showAllVid, setShowAllVid]   = useState(false);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    supabase.from('gallery').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setEventsData(groupByCategory(data || [])); setLoading(false); });
  }, []);

  const open  = (ev, i = 0) => { setSelected(ev); setImgIdx(i); };
  const close = () => setSelected(null);
  const next  = () => setImgIdx(i => (i + 1) % selected.images.length);
  const prev  = () => setImgIdx(i => (i - 1 + selected.images.length) % selected.images.length);

  const displayed = showAll ? eventsData : eventsData.slice(0, 8);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-950 to-gray-900 min-h-screen">
      <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
        Event Gallery
      </motion.h2>
      <p className="text-center text-gray-400 mb-12">Moments captured from our finest events</p>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="h-48 bg-gray-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <AnimatePresence>
            {displayed.map((event, i) => (
              <motion.div key={event.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.04 }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-square bg-gray-800"
                onClick={() => open(event)}>
                <img src={event.images[0]} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-sm">{event.title}</h3>
                  <p className="text-gray-300 text-xs mt-1">{event.images.length} photos</p>
                  <FaExpand className="absolute top-3 right-3 text-white/70 text-sm" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <div className="flex justify-center mt-10">
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => setShowAll(p => !p)}
          className="px-8 py-3 rounded-full text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/30 font-semibold transition-all">
          {showAll ? 'Show Less' : `View All ${eventsData.length} Events`}
        </motion.button>
      </div>

      {/* Videos */}
      <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-4xl font-bold text-center mt-24 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
        Event Videos
      </motion.h2>
      <p className="text-center text-gray-400 mb-10">Relive the best moments</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {(showAllVid ? videoData : videoData.slice(0, 2)).map((v, i) => (
          <motion.div key={v.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="rounded-2xl overflow-hidden bg-gray-800 shadow-xl">
            <iframe src={v.videoUrl} title={v.title} frameBorder="0" allowFullScreen
              className="w-full aspect-video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
            <div className="p-4">
              <h3 className="text-white font-semibold">{v.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{v.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
            onClick={close}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
              <button onClick={close} className="absolute -top-12 right-0 text-white/70 hover:text-white transition">
                <FaTimes size={24} />
              </button>
              <div className="text-center mb-4">
                <h3 className="text-white text-2xl font-bold">{selected.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{imgIdx + 1} / {selected.images.length}</p>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={prev} className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition flex-shrink-0">
                  <FaArrowLeft />
                </button>
                <motion.img key={imgIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  src={selected.images[imgIdx]} alt={selected.title}
                  className="flex-1 max-h-[70vh] object-contain rounded-xl" />
                <button onClick={next} className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition flex-shrink-0">
                  <FaArrowRight />
                </button>
              </div>
              {/* Thumbnail strip */}
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2 justify-center">
                {selected.images.map((img, i) => (
                  <img key={i} src={img} alt="" onClick={() => setImgIdx(i)}
                    className={`h-14 w-14 object-cover rounded-lg cursor-pointer flex-shrink-0 transition-all ${i === imgIdx ? 'ring-2 ring-purple-400 opacity-100' : 'opacity-50 hover:opacity-80'}`} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
