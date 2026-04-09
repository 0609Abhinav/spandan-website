import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { uploadImage } from '../lib/cloudinary';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiUser, FiUploadCloud } from 'react-icons/fi';
import ConfirmDialog from './ConfirmDialog';

const EMPTY = { name: '', year: new Date().getFullYear().toString(), college: '', branch: '', image_url: '' };

export default function CoordinatorManager() {
  const [items, setItems]     = useState([]);
  const [form, setForm]       = useState(EMPTY);
  const [file, setFile]       = useState(null);
  const [preview, setPreview] = useState(null);
  const [drag, setDrag]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId]   = useState(null);
  const [confirm, setConfirm] = useState(null);
  const fileRef               = useRef();

  const load = async () => {
    const { data } = await supabase.from('coordinators').select('*').order('year', { ascending: false });
    setItems(data || []);
  };
  useEffect(() => { load(); }, []);

  const pickFile = (f) => { if (!f) return; setFile(f); setPreview(URL.createObjectURL(f)); };

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      let image_url = form.image_url;
      if (file) image_url = await uploadImage(file);
      if (editId) {
        await supabase.from('coordinators').update({ ...form, image_url }).eq('id', editId);
        setEditId(null);
      } else {
        await supabase.from('coordinators').insert({ ...form, image_url });
      }
      setForm(EMPTY); setFile(null); setPreview(null); load();
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({ name: item.name, year: item.year, college: item.college||'', branch: item.branch||'', image_url: item.image_url||'' });
    setPreview(item.image_url || null); setFile(null);
  };

  const handleDelete = (id) => {
    setConfirm({ message: 'Delete this coordinator? This cannot be undone.', onConfirm: async () => {
      await supabase.from('coordinators').delete().eq('id', id); load();
    }});
  };

  const cancel = () => { setEditId(null); setForm(EMPTY); setFile(null); setPreview(null); };
  const set    = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // Group by year
  const years = [...new Set(items.map(i => i.year))].sort((a, b) => b - a);

  return (
    <div className="space-y-6">
      <ConfirmDialog confirm={confirm} onClose={() => setConfirm(null)} />

      {/* ── FORM ── */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
        <h3 className="text-white font-semibold text-sm mb-5">{editId ? '✏️ Edit Coordinator' : '➕ Add Coordinator'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Name *</label>
              <input className="input-field" placeholder="Full name" value={form.name}
                onChange={e => set('name', e.target.value)} required />
            </div>
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Year *</label>
              <input className="input-field" placeholder="e.g. 2025" value={form.year}
                onChange={e => set('year', e.target.value)} required />
            </div>
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">College</label>
              <input className="input-field" placeholder="College name" value={form.college}
                onChange={e => set('college', e.target.value)} />
            </div>
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Branch</label>
              <input className="input-field" placeholder="e.g. B.Tech CSE" value={form.branch}
                onChange={e => set('branch', e.target.value)} />
            </div>
          </div>

          {/* Photo upload */}
          <div>
            <label className="text-white/40 text-xs mb-1.5 block">Photo</label>
            <div
              onDragOver={e => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={e => { e.preventDefault(); setDrag(false); pickFile(e.dataTransfer.files[0]); }}
              onClick={() => fileRef.current.click()}
              className={`border-2 border-dashed rounded-xl p-5 flex items-center gap-4 cursor-pointer transition-all duration-200
                ${drag ? 'border-purple-400 bg-purple-500/10' : 'border-white/10 hover:border-purple-500/50 hover:bg-white/5'}`}>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => pickFile(e.target.files[0])} />
              {preview
                ? <div className="relative flex-shrink-0">
                    <img src={preview} alt="preview" className="w-16 h-16 rounded-full object-cover ring-2 ring-purple-500/40" />
                    <button type="button" onClick={e => { e.stopPropagation(); setFile(null); setPreview(null); set('image_url', ''); }}
                      className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5 text-white"><FiX size={10} /></button>
                  </div>
                : <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                    <FiUploadCloud size={20} className="text-white/20" />
                  </div>
              }
              <div>
                <p className="text-white/40 text-sm">{preview ? 'Click to change photo' : 'Drag & drop or click to upload'}</p>
                <p className="text-white/20 text-xs mt-0.5">PNG, JPG recommended</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
              <FiPlus size={14} />{loading ? 'Saving...' : editId ? 'Update Coordinator' : 'Add Coordinator'}
            </button>
            {editId && <button type="button" onClick={cancel} className="btn-secondary flex items-center gap-2"><FiX size={14} />Cancel</button>}
          </div>
        </form>
      </motion.div>

      {/* ── YEAR-WISE LIST ── */}
      {years.length === 0
        ? <div className="glass rounded-2xl p-12 text-center text-white/20 text-sm">
            <FiUser size={32} className="mx-auto mb-3 opacity-30" />
            No coordinators yet — add one above
          </div>
        : years.map(year => (
          <div key={year}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-white/20 text-xs font-semibold uppercase tracking-widest">Coordinators</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30">
                {year}
              </span>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <AnimatePresence>
                {items.filter(i => i.year === year).map((item, idx) => (
                  <motion.div key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: idx * 0.04 }}
                    className="glass rounded-2xl p-4 flex flex-col items-center text-center gap-2 hover:border-purple-500/40 transition-all duration-200">
                    {item.image_url
                      ? <img src={item.image_url} alt={item.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-purple-500/30" />
                      : <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center"><FiUser size={22} className="text-purple-400" /></div>
                    }
                    <div>
                      <p className="text-white font-semibold text-xs">{item.name}</p>
                      <span className="mt-1 inline-block text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">{item.year}</span>
                      {item.college && <p className="text-white/40 text-xs mt-1 truncate max-w-[120px]">{item.college}</p>}
                      {item.branch  && <p className="text-white/30 text-xs truncate max-w-[120px]">{item.branch}</p>}
                    </div>
                    <div className="flex gap-1.5 mt-auto">
                      <button onClick={() => handleEdit(item)} className="btn-warning flex items-center gap-1 text-xs"><FiEdit2 size={10} />Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="btn-danger flex items-center gap-1 text-xs"><FiTrash2 size={10} />Del</button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))
      }
    </div>
  );
}
