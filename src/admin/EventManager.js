import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { uploadImage } from '../lib/cloudinary';
import { useEvents } from '../lib/EventsContext';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiUploadCloud, FiImage } from 'react-icons/fi';

const EMPTY = { title: '', description: '', thumbnail_url: '', year: new Date().getFullYear().toString() };

export default function EventManager() {
  const { reload: reloadCtx } = useEvents();
  const [items, setItems]     = useState([]);
  const [form, setForm]       = useState(EMPTY);
  const [editId, setEditId]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile]       = useState(null);
  const [preview, setPreview] = useState(null);
  const [drag, setDrag]       = useState(false);
  const fileRef               = useRef();

  const load = async () => {
    const { data } = await supabase.from('events').select('*').order('created_at', { ascending: false });
    setItems(data || []);
  };
  useEffect(() => { load(); }, []);

  const pickFile = (f) => {
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      let thumbnail_url = form.thumbnail_url;
      if (file) thumbnail_url = await uploadImage(file);
      const payload = { ...form, thumbnail_url };
      if (editId) { await supabase.from('events').update(payload).eq('id', editId); setEditId(null); }
      else          await supabase.from('events').insert(payload);
      setForm(EMPTY); setFile(null); setPreview(null);
      load(); reloadCtx();
    } catch (err) { alert(err.message); }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({ title: item.title, description: item.description||'', thumbnail_url: item.thumbnail_url||'', year: item.year||'' });
    setPreview(item.thumbnail_url || null);
    setFile(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    await supabase.from('events').delete().eq('id', id);
    load(); reloadCtx();
  };

  const cancel = () => { setEditId(null); setForm(EMPTY); setFile(null); setPreview(null); };
  const set    = (k, v) => setForm(f => ({...f, [k]: v}));

  return (
    <div className="space-y-6">
      {/* Form card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
        <h3 className="text-white font-semibold text-sm mb-5">{editId ? '✏️ Edit Event' : '➕ Add New Event'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Event Title *</label>
              <input className="input-field" placeholder="e.g. Graphite Symphony" value={form.title}
                onChange={e => set('title', e.target.value)} required />
            </div>
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Description</label>
              <input className="input-field" placeholder="Short description" value={form.description}
                onChange={e => set('description', e.target.value)} />
            </div>
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Year *</label>
              <input className="input-field" placeholder="e.g. 2025" value={form.year}
                onChange={e => set('year', e.target.value)} required />
            </div>
          </div>

          {/* Drag & drop thumbnail */}
          <div>
            <label className="text-white/40 text-xs mb-1.5 block">Thumbnail Image</label>
            <div
              onDragOver={e => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={e => { e.preventDefault(); setDrag(false); pickFile(e.dataTransfer.files[0]); }}
              onClick={() => fileRef.current.click()}
              className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-200
                ${drag ? 'border-purple-400 bg-purple-500/10' : 'border-white/10 hover:border-purple-500/50 hover:bg-white/5'}`}>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => pickFile(e.target.files[0])} />
              {preview ? (
                <div className="relative">
                  <img src={preview} alt="preview" className="h-28 w-48 object-cover rounded-xl" />
                  <button type="button" onClick={e => { e.stopPropagation(); setFile(null); setPreview(null); set('thumbnail_url',''); }}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full p-0.5 text-white hover:bg-red-600 transition-all">
                    <FiX size={12} />
                  </button>
                </div>
              ) : (
                <>
                  <FiUploadCloud size={28} className="text-white/20 mb-2" />
                  <p className="text-white/40 text-xs text-center">Drag & drop or <span className="text-purple-400">browse</span></p>
                  <p className="text-white/20 text-xs mt-1">PNG, JPG up to 10MB</p>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
              <FiPlus size={14} />{loading ? 'Saving...' : editId ? 'Update Event' : 'Add Event'}
            </button>
            {editId && <button type="button" onClick={cancel} className="btn-secondary flex items-center gap-2"><FiX size={14} />Cancel</button>}
          </div>
        </form>
      </motion.div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-white/10 bg-white/[0.03]">
            <tr>
              <th className="tbl-th w-16">Cover</th>
              <th className="tbl-th">Title</th>
              <th className="tbl-th hidden sm:table-cell">Description</th>
              <th className="tbl-th hidden md:table-cell">Year</th>
              <th className="tbl-th text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {items.length === 0
                ? <tr><td colSpan={4} className="tbl-td text-center text-white/30 py-10">No events yet — add one above</td></tr>
                : items.map((item, i) => (
                  <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.03 }} className="tbl-row group">
                    <td className="tbl-td">
                      {item.thumbnail_url
                        ? <img src={item.thumbnail_url} alt={item.title} className="w-10 h-10 rounded-lg object-cover" />
                        : <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center"><FiImage size={14} className="text-white/20" /></div>
                      }
                    </td>
                    <td className="tbl-td text-white font-medium">{item.title}</td>
                    <td className="tbl-td hidden sm:table-cell text-white/50">{item.description || '—'}</td>
                    <td className="tbl-td hidden md:table-cell">
                      <span className="badge-purple">{item.year || '—'}</span>
                    </td>
                    <td className="tbl-td">
                      <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(item)} className="btn-warning flex items-center gap-1"><FiEdit2 size={11} />Edit</button>
                        <button onClick={() => handleDelete(item.id)} className="btn-danger flex items-center gap-1"><FiTrash2 size={11} />Delete</button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              }
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
