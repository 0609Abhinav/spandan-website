import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { uploadImage } from '../lib/cloudinary';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiUser, FiUploadCloud } from 'react-icons/fi';
import ConfirmDialog from './ConfirmDialog';

const EMPTY = { name: '', role: '', bio: '', image_url: '' };

export default function TeacherManager() {
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
    const { data } = await supabase.from('teachers').select('*').order('created_at', { ascending: true });
    setItems(data || []);
  };
  useEffect(() => { load(); }, []);

  const pickFile = (f) => { if (!f) return; setFile(f); setPreview(URL.createObjectURL(f)); };

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      let image_url = form.image_url;
      if (file) image_url = await uploadImage(file);
      if (editId) { await supabase.from('teachers').update({ ...form, image_url }).eq('id', editId); setEditId(null); }
      else          await supabase.from('teachers').insert({ ...form, image_url });
      setForm(EMPTY); setFile(null); setPreview(null); load();
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({ name: item.name, role: item.role, bio: item.bio||'', image_url: item.image_url||'' });
    setPreview(item.image_url || null); setFile(null);
  };
  const handleDelete = async (id) => {
    setConfirm({ message: 'Delete this teacher? This cannot be undone.', onConfirm: async () => {
      await supabase.from('teachers').delete().eq('id', id); load();
    }});
  };
  const cancel = () => { setEditId(null); setForm(EMPTY); setFile(null); setPreview(null); };
  const set    = (k, v) => setForm(f => ({...f, [k]: v}));

  return (
    <div className="space-y-6">
      <ConfirmDialog confirm={confirm} onClose={() => setConfirm(null)} />
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
        <h3 className="text-white font-semibold text-sm mb-5">{editId ? '✏️ Edit Teacher' : '➕ Add Teacher'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Name *</label>
              <input className="input-field" placeholder="Full name" value={form.name} onChange={e => set('name', e.target.value)} required />
            </div>
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Role *</label>
              <input className="input-field" placeholder="e.g. Convenor" value={form.role} onChange={e => set('role', e.target.value)} required />
            </div>
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Bio / Department</label>
              <input className="input-field" placeholder="Department of..." value={form.bio} onChange={e => set('bio', e.target.value)} />
            </div>
          </div>

          {/* Drag & drop photo */}
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
                    <button type="button" onClick={e => { e.stopPropagation(); setFile(null); setPreview(null); set('image_url',''); }}
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
              <FiPlus size={14} />{loading ? 'Saving...' : editId ? 'Update Teacher' : 'Add Teacher'}
            </button>
            {editId && <button type="button" onClick={cancel} className="btn-secondary flex items-center gap-2"><FiX size={14} />Cancel</button>}
          </div>
        </form>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <AnimatePresence>
          {items.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.04 }}
              whileHover={{ y: -3 }}
              className="glass rounded-2xl p-4 flex flex-col items-center text-center gap-3 hover:border-purple-500/40 transition-all duration-200">
              {item.image_url
                ? <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-purple-500/30" />
                : <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center"><FiUser size={24} className="text-purple-400" /></div>
              }
              <div>
                <p className="text-white font-semibold text-sm">{item.name}</p>
                <span className="badge-purple mt-1 inline-block">{item.role}</span>
                <p className="text-white/40 text-xs mt-1.5 leading-relaxed">{item.bio}</p>
              </div>
              <div className="flex gap-2 mt-auto">
                <button onClick={() => handleEdit(item)} className="btn-warning flex items-center gap-1"><FiEdit2 size={11} />Edit</button>
                <button onClick={() => handleDelete(item.id)} className="btn-danger flex items-center gap-1"><FiTrash2 size={11} />Del</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
