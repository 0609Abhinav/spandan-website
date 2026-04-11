import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { uploadImage } from '../lib/cloudinary';
import { useEvents } from '../lib/EventsContext';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiUploadCloud, FiImage } from 'react-icons/fi';
import ConfirmDialog from './ConfirmDialog';

const EMPTY = { title: '', description: '', event_category: '', year: new Date().getFullYear().toString() };

export default function GalleryManager() {
  const { events }            = useEvents();
  const [items, setItems]     = useState([]);
  const [form, setForm]       = useState(EMPTY);
  const [files, setFiles]     = useState([]);       // multiple files
  const [previews, setPreviews] = useState([]);     // preview URLs
  const [drag, setDrag]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [editId, setEditId]   = useState(null);
  const [editFile, setEditFile] = useState(null);
  const [editPreview, setEditPreview] = useState(null);
  const [filterCat, setFilterCat] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [confirm, setConfirm] = useState(null);
  const fileRef               = useRef();

  const load = async () => {
    const { data } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
    setItems(data || []);
  };
  useEffect(() => { load(); }, []);

  // When event dropdown changes → auto-fill title + description + year from events list
  const handleEventSelect = (eventTitle) => {
    const ev = events.find(e => e.title === eventTitle);
    setForm(f => ({
      ...f,
      event_category: eventTitle,
      title:       ev?.title       || f.title,
      description: ev?.description || f.description,
      year:        ev?.year        || f.year,
    }));
  };

  // Pick multiple files
  const pickFiles = (fileList) => {
    const arr = Array.from(fileList).filter(f => f.type.startsWith('image/'));
    if (!arr.length) return;
    setFiles(arr);
    setPreviews(arr.map(f => URL.createObjectURL(f)));
  };

  const removePreview = (i) => {
    setFiles(fs => fs.filter((_, idx) => idx !== i));
    setPreviews(ps => ps.filter((_, idx) => idx !== i));
  };

  // Bulk upload submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editId && files.length === 0) { setConfirm({ message: 'Please select at least one image.', onConfirm: () => {} }); return; }
    setLoading(true);

    try {
      if (editId) {
        // Single edit
        let image_url = editPreview;
        if (editFile) image_url = await uploadImage(editFile);
        await supabase.from('gallery').update({ ...form, image_url }).eq('id', editId);
        setEditId(null); setEditFile(null); setEditPreview(null);
      } else {
        // Bulk insert — upload all files in parallel batches of 3
        setProgress({ done: 0, total: files.length });
        const rows = [];
        for (let i = 0; i < files.length; i += 3) {
          const batch = files.slice(i, i + 3);
          const urls  = await Promise.all(batch.map(f => uploadImage(f)));
          urls.forEach(url => rows.push({ ...form, image_url: url }));
          setProgress({ done: Math.min(i + 3, files.length), total: files.length });
        }
        await supabase.from('gallery').insert(rows);
        setFiles([]); setPreviews([]);
      }
      setForm(EMPTY); load();
    } catch (err) { console.error(err); }
    setLoading(false);
    setProgress({ done: 0, total: 0 });
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({ title: item.title, description: item.description||'', event_category: item.event_category||'', year: item.year||'' });
    setEditPreview(item.image_url); setEditFile(null);
    setFiles([]); setPreviews([]);
  };

  const handleDelete = async (id) => {
    setConfirm({ message: 'Delete this image? This cannot be undone.', onConfirm: async () => {
      await supabase.from('gallery').delete().eq('id', id); load();
    }});
  };

  const cancel = () => {
    setEditId(null); setForm(EMPTY);
    setFiles([]); setPreviews([]);
    setEditFile(null); setEditPreview(null);
  };

  const set = (k, v) => setForm(f => ({...f, [k]: v}));

  const filtered = filterCat
    ? items.filter(i => i.event_category === filterCat && (!filterYear || i.year === filterYear))
    : filterYear
      ? items.filter(i => i.year === filterYear)
      : items;

  // Unique years from items
  const itemYears = [...new Set(items.map(i => i.year).filter(Boolean))].sort((a,b) => b - a);

  return (
    <div className="space-y-6">
      <ConfirmDialog confirm={confirm} onClose={() => setConfirm(null)} />
      {/* ── FORM ── */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
        <h3 className="text-white font-semibold text-sm mb-5">
          {editId ? '✏️ Edit Image' : '➕ Add Gallery Images'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1: event dropdown + auto-filled fields */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Event *</label>
              <select className="input-field appearance-none" value={form.event_category}
                onChange={e => handleEventSelect(e.target.value)} required={!editId}>
                <option value="" className="bg-[#1a1030]">Select event…</option>
                {events.map(ev => (
                  <option key={ev.id} value={ev.title} className="bg-[#1a1030]">{ev.title} {ev.year ? `(${ev.year})` : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Title *</label>
              <input className="input-field" placeholder="Auto-filled from event" value={form.title}
                onChange={e => set('title', e.target.value)} required />
            </div>
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Description</label>
              <input className="input-field" placeholder="Auto-filled from event" value={form.description}
                onChange={e => set('description', e.target.value)} />
            </div>
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Year *</label>
              <input className="input-field" placeholder="e.g. 2025" value={form.year}
                onChange={e => set('year', e.target.value)} required />
            </div>
          </div>

          {/* Row 2: image upload area */}
          {editId ? (
            /* Single image for edit */
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Replace Image</label>
              <div
                onDragOver={e => { e.preventDefault(); setDrag(true); }}
                onDragLeave={() => setDrag(false)}
                onDrop={e => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) { setEditFile(f); setEditPreview(URL.createObjectURL(f)); } }}
                onClick={() => fileRef.current.click()}
                className={`border-2 border-dashed rounded-xl p-5 flex items-center gap-4 cursor-pointer transition-all duration-200
                  ${drag ? 'border-purple-400 bg-purple-500/10' : 'border-white/10 hover:border-purple-500/50 hover:bg-white/5'}`}>
                <input ref={fileRef} type="file" accept="image/*" className="hidden"
                  onChange={e => { const f = e.target.files[0]; if (f) { setEditFile(f); setEditPreview(URL.createObjectURL(f)); } }} />
                {editPreview
                  ? <img src={editPreview} alt="preview" className="h-20 w-28 object-cover rounded-xl flex-shrink-0" />
                  : <FiUploadCloud size={24} className="text-white/20 flex-shrink-0" />
                }
                <div>
                  <p className="text-white/40 text-sm">{editPreview ? 'Click to change' : 'Drag & drop or click'}</p>
                  <p className="text-white/20 text-xs mt-0.5">PNG, JPG, WEBP</p>
                </div>
              </div>
            </div>
          ) : (
            /* Multi-image for bulk add */
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">
                Images * <span className="text-purple-400 ml-1">— select multiple</span>
              </label>
              <div
                onDragOver={e => { e.preventDefault(); setDrag(true); }}
                onDragLeave={() => setDrag(false)}
                onDrop={e => { e.preventDefault(); setDrag(false); pickFiles(e.dataTransfer.files); }}
                onClick={() => fileRef.current.click()}
                className={`border-2 border-dashed rounded-xl p-6 cursor-pointer transition-all duration-200 text-center
                  ${drag ? 'border-purple-400 bg-purple-500/10' : 'border-white/10 hover:border-purple-500/50 hover:bg-white/5'}`}>
                <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
                  onChange={e => pickFiles(e.target.files)} />
                <FiUploadCloud size={32} className="text-white/20 mx-auto mb-2" />
                <p className="text-white/40 text-sm">Drag & drop multiple images or <span className="text-purple-400">browse</span></p>
                <p className="text-white/20 text-xs mt-1">PNG, JPG, WEBP · All selected files upload at once</p>
              </div>

              {/* Preview grid of selected files */}
              {previews.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white/50 text-xs">{previews.length} image{previews.length > 1 ? 's' : ''} selected</p>
                    <button type="button" onClick={() => { setFiles([]); setPreviews([]); }}
                      className="text-red-400/60 hover:text-red-400 text-xs transition-colors">Clear all</button>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                    {previews.map((src, i) => (
                      <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.02 }} className="relative group aspect-square">
                        <img src={src} alt={`preview-${i}`} className="w-full h-full object-cover rounded-lg" />
                        <button type="button" onClick={() => removePreview(i)}
                          className="absolute -top-1.5 -right-1.5 bg-red-500 rounded-full p-0.5 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <FiX size={10} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Progress bar during upload */}
          {loading && progress.total > 0 && (
            <div>
              <div className="flex justify-between text-white/40 text-xs mb-1.5">
                <span>Uploading…</span>
                <span>{progress.done} / {progress.total}</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  animate={{ width: `${(progress.done / progress.total) * 100}%` }} transition={{ duration: 0.3 }} />
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
              <FiPlus size={14} />
              {loading ? `Uploading ${progress.done}/${progress.total}…` : editId ? 'Update Image' : `Upload ${files.length || ''} Image${files.length !== 1 ? 's' : ''}`}
            </button>
            {editId && (
              <button type="button" onClick={cancel} className="btn-secondary flex items-center gap-2">
                <FiX size={14} />Cancel
              </button>
            )}
          </div>
        </form>
      </motion.div>

      {/* ── FILTER BAR ── */}
      <div className="space-y-3">
        {/* Year filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-white/20 text-xs uppercase tracking-widest">Year:</span>
          <button onClick={() => setFilterYear('')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${!filterYear ? 'bg-purple-500/30 text-purple-300 border border-purple-500/40' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
            All
          </button>
          {itemYears.map(y => (
            <button key={y} onClick={() => setFilterYear(y)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterYear === y ? 'bg-pink-500/30 text-pink-300 border border-pink-500/40' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
              {y}
            </button>
          ))}
        </div>
        {/* Event category filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-white/20 text-xs uppercase tracking-widest">Event:</span>
          <button onClick={() => setFilterCat('')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${!filterCat ? 'bg-purple-500/30 text-purple-300 border border-purple-500/40' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
            All ({filtered.length})
          </button>
          {events.map(ev => {
            const count = items.filter(i => i.event_category === ev.title && (!filterYear || i.year === filterYear)).length;
            if (!count) return null;
            return (
              <button key={ev.id} onClick={() => setFilterCat(ev.title)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterCat === ev.title ? 'bg-purple-500/30 text-purple-300 border border-purple-500/40' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                {ev.title} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* ── GRID ── */}
      {filtered.length === 0
        ? <div className="glass rounded-2xl p-12 text-center text-white/20 text-sm">
            <FiImage size={32} className="mx-auto mb-3 opacity-30" />
            No images yet — upload some above
          </div>
        : <div className="glass rounded-2xl p-3">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-white/30 text-xs">{filtered.length} image{filtered.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="overflow-y-auto max-h-[60vh] pr-1">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                <AnimatePresence>
                  {filtered.map((item, i) => (
                    <motion.div key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: Math.min(i * 0.02, 0.3) }}
                      className="glass rounded-xl overflow-hidden group hover:border-purple-500/40 transition-all duration-200 hover:shadow-lg hover:shadow-purple-900/20">
                      <div className="relative aspect-square">
                        <img src={item.image_url} alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button onClick={() => handleEdit(item)} className="btn-warning p-2 rounded-lg"><FiEdit2 size={13} /></button>
                          <button onClick={() => handleDelete(item.id)} className="btn-danger p-2 rounded-lg"><FiTrash2 size={13} /></button>
                        </div>
                      </div>
                      <div className="p-2.5">
                        <p className="text-white/80 text-xs font-medium truncate">{item.title}</p>
                        <p className="text-white/30 text-xs truncate">{item.event_category || '—'}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
      }
    </div>
  );
}
