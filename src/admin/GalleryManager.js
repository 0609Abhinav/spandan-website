import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { uploadImage } from '../lib/cloudinary';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';

const EMPTY = { title: '', description: '', event_category: '', image_url: '' };

export default function GalleryManager() {
  const [items, setItems]   = useState([]);
  const [form, setForm]     = useState(EMPTY);
  const [file, setFile]     = useState(null);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const load = async () => {
    const { data } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
    setItems(data || []);
  };
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      let image_url = form.image_url;
      if (file) image_url = await uploadImage(file);
      if (editId) { await supabase.from('gallery').update({ ...form, image_url }).eq('id', editId); setEditId(null); }
      else          await supabase.from('gallery').insert({ ...form, image_url });
      setForm(EMPTY); setFile(null); load();
    } catch (err) { alert(err.message); }
    setLoading(false);
  };

  const handleEdit   = (item) => { setEditId(item.id); setForm({ title: item.title, description: item.description||'', event_category: item.event_category||'', image_url: item.image_url }); };
  const handleDelete = async (id) => { if (!window.confirm('Delete?')) return; await supabase.from('gallery').delete().eq('id', id); load(); };
  const cancel       = () => { setEditId(null); setForm(EMPTY); setFile(null); };
  const set          = (k, v) => setForm(f => ({...f, [k]: v}));

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-white font-semibold text-sm mb-4">{editId ? 'Edit Item' : 'Add New Image'}</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
          <input className="input-field" placeholder="Title" value={form.title} onChange={e => set('title', e.target.value)} required />
          <input className="input-field" placeholder="Description" value={form.description} onChange={e => set('description', e.target.value)} />
          <input className="input-field" placeholder="Event Category" value={form.event_category} onChange={e => set('event_category', e.target.value)} />
          <div className="flex flex-col gap-2">
            <label className="text-white/40 text-xs">Image</label>
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} className="text-white/60 text-xs" />
            {form.image_url && !file && <img src={form.image_url} alt="preview" className="h-10 w-10 object-cover rounded-lg" />}
          </div>
          <div className="flex gap-2 sm:col-span-2 lg:col-span-4">
            <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
              <FiPlus size={14} />{loading ? 'Saving...' : editId ? 'Update' : 'Add'}
            </button>
            {editId && <button type="button" onClick={cancel} className="btn-secondary flex items-center gap-2"><FiX size={14} />Cancel</button>}
          </div>
        </form>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {items.map(item => (
          <div key={item.id} className="glass rounded-xl overflow-hidden group">
            <div className="relative aspect-square">
              <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => handleEdit(item)} className="btn-warning p-2 rounded-lg"><FiEdit2 size={13} /></button>
                <button onClick={() => handleDelete(item.id)} className="btn-danger p-2 rounded-lg"><FiTrash2 size={13} /></button>
              </div>
            </div>
            <div className="p-2">
              <p className="text-white/80 text-xs font-medium truncate">{item.title}</p>
              <p className="text-white/40 text-xs truncate">{item.event_category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
