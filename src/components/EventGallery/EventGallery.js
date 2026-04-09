import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { FiX, FiChevronLeft, FiChevronRight, FiMaximize2 } from 'react-icons/fi';

const DEFAULTS = {
  gallery_header: { title: 'Event Gallery',    subtitle: 'Moments captured from our finest events' },
  videos_header:  { title: 'Event Highlights', subtitle: 'Relive the best moments' },
};

// Group rows by event_category within a specific year
// Key = "eventTitle__year" so same event name in different years stays separate
function groupByYearAndCategory(rows) {
  // Get unique years sorted descending
  const years = [...new Set(rows.map(r => r.year || 'Unknown'))].sort((a, b) => b - a);

  const byYear = {};
  years.forEach(year => {
    const yearRows = rows.filter(r => (r.year || 'Unknown') === year);
    const map = {};
    yearRows.forEach(r => {
      const k = r.event_category || r.title;
      if (!map[k]) map[k] = { id: `${k}__${year}`, title: k, description: r.description || '', images: [], year };
      map[k].images.push(r.image_url);
    });
    byYear[year] = Object.values(map);
  });
  return { years, byYear };
}

export default function EventGallery() {
  const [allRows, setAllRows]   = useState([]);
  const [videos, setVideos]     = useState([]);
  const [content, setContent]   = useState(DEFAULTS);
  const [selected, setSelected] = useState(null);
  const [idx, setIdx]           = useState(0);
  const [activeYear, setActiveYear] = useState(null); // null = show all years
  const [showAllMap, setShowAllMap] = useState({});   // per-year show-all state
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    supabase.from('gallery').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setAllRows(data || []); setLoading(false); });

    supabase.from('videos').select('*').order('created_at', { ascending: false })
      .then(({ data }) => setVideos(data || []));

    supabase.from('site_content').select('*').in('section', ['gallery_header', 'videos_header'])
      .then(({ data }) => {
        if (!data?.length) return;
        const map = { ...DEFAULTS };
        data.forEach(row => {
          map[row.section] = {
            title:    row.title    || DEFAULTS[row.section]?.title,
            subtitle: row.subtitle || DEFAULTS[row.section]?.subtitle,
          };
        });
        setContent(map);
      });
  }, []);

  const { years, byYear } = groupByYearAndCategory(allRows);

  // Which years to render — if activeYear selected show only that, else all
  const visibleYears = activeYear ? [activeYear] : years;

  const open  = (ev, i = 0) => { setSelected(ev); setIdx(i); };
  const close = () => setSelected(null);
  const next  = (e) => { e.stopPropagation(); setIdx(i => (i + 1) % selected.images.length); };
  const prev  = (e) => { e.stopPropagation(); setIdx(i => (i - 1 + selected.images.length) % selected.images.length); };

  const gh = content.gallery_header;
  const vh = content.videos_header;

  return (
    <section id="event-gallery" className="relative py-16 sm:py-24 px-3 sm:px-6 w-full overflow-x-hidden">
      <div className="absolute top-20 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">

        {/* ── MAIN HEADING ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-3">
            {gh.title}
          </h2>
          <p className="text-white/50 text-sm px-4">{gh.subtitle}</p>
        </motion.div>

        {/* ── YEAR FILTER TABS ── */}
        {years.length > 1 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-2 flex-wrap mb-8 sm:mb-12 px-2">
            <button onClick={() => setActiveYear(null)}
              className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200
                ${!activeYear ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10 border border-white/10'}`}>
              All Years
            </button>
            {years.map(y => (
              <button key={y} onClick={() => setActiveYear(y)}
                className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200
                  ${activeYear === y ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10 border border-white/10'}`}>
                {y}
              </button>
            ))}
          </motion.div>
        )}

        {/* ── YEAR SECTIONS ── */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {Array(8).fill(0).map((_, i) => <div key={i} className="aspect-square bg-white/5 rounded-2xl animate-pulse" />)}
          </div>
        ) : (
          <div className="space-y-12 sm:space-y-16">
            {visibleYears.map(year => {
              const yearEvents = byYear[year] || [];
              const showAll    = showAllMap[year] || false;
              const displayed  = showAll ? yearEvents : yearEvents.slice(0, 8);

              return (
                <motion.div key={year} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}>
                  {/* Year heading */}
                  <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/30" />
                    <h3 className="text-lg sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 px-2 whitespace-nowrap">
                      {gh.title} {year}
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/30" />
                  </div>

                  {yearEvents.length === 0 ? (
                    <p className="text-white/20 text-sm text-center py-8">No images for {year}</p>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                        {displayed.map((ev, i) => (
                          <motion.div key={ev.id} initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                            transition={{ delay: i * 0.04 }} onClick={() => open(ev)}
                            className="group relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer aspect-square bg-white/5 border border-white/5 hover:border-purple-500/40 transition-all duration-300">
                            <img src={ev.images[0]} alt={ev.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 sm:p-4">
                              <h3 className="text-white font-semibold text-xs sm:text-sm leading-tight">{ev.title}</h3>
                              <p className="text-white/60 text-xs mt-0.5 sm:mt-1 hidden sm:block">{ev.images.length} photos</p>
                            </div>
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-1.5"><FiMaximize2 size={12} className="text-white" /></div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {yearEvents.length > 8 && (
                        <div className="flex justify-center mt-5 sm:mt-6">
                          <button onClick={() => setShowAllMap(m => ({ ...m, [year]: !showAll }))}
                            className="btn-secondary text-xs sm:text-sm">
                            {showAll ? 'Show Less' : `View All ${yearEvents.length} Events of ${year}`}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ── VIDEOS SECTION ── */}
        {videos.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="mt-16 sm:mt-24">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400 mb-3">
                {vh.title}
              </h2>
              <p className="text-white/50 text-sm px-4">{vh.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {videos.map((v, i) => {
                const vidId = v.youtube_url?.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1];
                const embed = v.youtube_url?.includes('/embed/') ? v.youtube_url : (vidId ? `https://www.youtube.com/embed/${vidId}` : v.youtube_url);
                return (
                  <motion.div key={v.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="glass rounded-xl sm:rounded-2xl overflow-hidden">
                    <iframe src={embed} title={v.title} frameBorder="0" allowFullScreen
                      className="w-full aspect-video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
                    <div className="p-3 sm:p-4 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-white font-semibold text-sm">{v.title}</h3>
                        {v.description && <p className="text-white/50 text-xs mt-1">{v.description}</p>}
                      </div>
                      {v.year && <span className="badge-purple flex-shrink-0">{v.year}</span>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 bottom-0 z-[9999] flex flex-col"
            style={{ backgroundColor: 'rgba(0,0,0,0.97)' }}
            onClick={close}>

            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-3 flex-shrink-0 border-b border-white/10"
              onClick={e => e.stopPropagation()}>
              <div>
                <h3 className="text-white font-bold text-sm sm:text-base leading-tight">{selected.title}</h3>
                <p className="text-white/40 text-xs mt-0.5">{idx + 1} / {selected.images.length}{selected.year ? ` · ${selected.year}` : ''}</p>
              </div>
              <button onClick={close}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all flex-shrink-0 ml-4">
                <FiX size={18} />
              </button>
            </div>

            {/* Main image area */}
            <div className="flex-1 flex items-center justify-center min-h-0 px-2 py-4"
              onClick={e => e.stopPropagation()}>
              <button onClick={prev}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-all flex-shrink-0 mr-2 sm:mr-4">
                <FiChevronLeft size={22} />
              </button>

              <div className="flex-1 flex items-center justify-center min-w-0 min-h-0">
                <motion.img
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  src={selected.images[idx]}
                  alt={selected.title}
                  className="max-w-full max-h-[60vh] sm:max-h-[70vh] object-contain rounded-xl shadow-2xl"
                />
              </div>

              <button onClick={next}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-all flex-shrink-0 ml-2 sm:ml-4">
                <FiChevronRight size={22} />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="flex-shrink-0 pb-4 px-4 border-t border-white/10 pt-3"
              onClick={e => e.stopPropagation()}>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {selected.images.map((img, i) => (
                  <button key={i} onClick={() => setIdx(i)} className="flex-shrink-0">
                    <img src={img} alt=""
                      className={`h-12 w-12 sm:h-14 sm:w-14 object-cover rounded-lg transition-all duration-200
                        ${i === idx
                          ? 'ring-2 ring-purple-400 opacity-100 scale-105'
                          : 'opacity-40 hover:opacity-70'}`} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
