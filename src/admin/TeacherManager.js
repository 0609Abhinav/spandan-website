import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { uploadImage } from '../lib/cloudinary';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiUser } from 'react-icons/fi';

const EMPTY = { name: '', role: '', bio: '', image_url: '' };

export default function TeacherManager() {
  const [items, setItems]   = useState([]);
  const [form, setForm]     = useState(EMPTY);
  const [file, setFile]     = useState(null);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const load = async () => {
    const { data } = await supabase.from('teachers').select('*').order('created_at', { ascending: true });
    setItems(data || []);
  };
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      let image_url = form.image_url;
      if (file) image_url = await uploadImage(file);
      if (editId) { await supabase.from('teachers').update({ ...form, image_url }).eq('id', editId); setEditId(null); }
      else          await supabase.from('teachers').insert({ ...form, image_url });
      setForm(EMPTY); setFile(null); load();
    } catch (err) { alert(err.message); }
    setLoading(false);
  };

  const handleEdit   = (item) => { setEditId(item.id); setForm({ name: item.name, role: item.role, bio: item.bio||'', image_url: item.image_url||'' }); };
  const handleDelete = async (id) => { if (!window.confirm('Delete?')) return; await supabase.from('teachers').delete().eq('id', id); load(); };
  const cancel       = () => { setEditId(null); setForm(EMPTY); setFile(null); };
  const set          = (k, v) => setForm(f => ({...f, [k]: v}));

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6">
        <h3 className="text-white font-semibold text-sm mb-4">{editId ? 'Edit Teacher' : 'Add Teacher'}</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
          <input className="input-field" placeholder="Name" value={form.name} onChange={e => set('name', e.target.value)} required />
          <input className="input-field" placeholder="Role (e.g. Convenor)" value={form.role} onChange={e => set('role', e.target.value)} required />
          <input className="input-field" placeholder="Bio / Department" value={form.bio} onChange={e => set('bio', e.target.value)} />
          <div className="flex flex-col gap-2">
            <label className="text-white/40 text-xs">Photo</label>
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} className="text-white/60 text-xs" />
            {form.image_url && !file && <img src={form.image_url} alt="preview" className="h-10 w-10 object-cover rounded-full" />}
          </div>
          <div className="flex gap-2 sm:col-span-2 lg:col-span-4">
            <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
              <FiPlus size={14} />{loading ? 'Saving...' : editId ? 'Update' : 'Add'}
            </button>
            {editId && <button type="button" onClick={cancel} className="btn-secondary flex items-center gap-2"><FiX size={14} />Cancel</button>}
          </div>
        </form>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item.id} className="glass rounded-2xl p-4 flex flex-col items-center text-center gap-3">
            {item.image_url
              ? <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-purple-500/30" />
              : <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center"><FiUser size={24} className="text-purple-400" /></div>
            }
            <div>
              <p className="text-white font-semibold text-sm">{item.name}</p>
              <span className="badge-purple mt-1">{item.role}</span>
              <p className="text-white/40 text-xs mt-1">{item.bio}</p>
            </div>
            <div className="flex gap-2 mt-auto">
              <button onClick={() => handleEdit(item)} className="btn-warning flex items-center gap-1"><FiEdit2 size={11} />Edit</button>
              <button onClick={() => handleDelete(item.id)} className="btn-danger flex items-center gap-1"><FiTrash2 size={11} />Del</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
