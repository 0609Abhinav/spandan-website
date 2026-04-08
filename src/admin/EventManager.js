import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';

const EMPTY = { title: '', description: '' };

export default function EventManager() {
  const [items, setItems]   = useState([]);
  const [form, setForm]     = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const { data } = await supabase.from('events').select('*').order('created_at', { ascending: false });
    setItems(data || []);
  };
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    if (editId) { await supabase.from('events').update(form).eq('id', editId); setEditId(null); }
    else          await supabase.from('events').insert(form);
    setForm(EMPTY); load(); setLoading(false);
  };

  const handleDelete = async (id) => { if (!window.confirm('Delete?')) return; await supabase.from('events').delete().eq('id', id); load(); };
  const cancel       = () => { setEditId(null); setForm(EMPTY); };
  const set          = (k, v) => setForm(f => ({...f, [k]: v}));

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6">
        <h3 className="text-white font-semibold text-sm mb-4">{editId ? 'Edit Event' : 'Add Event'}</h3>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 items-end">
          <input className="input-field flex-1 min-w-[200px]" placeholder="Event Title" value={form.title} onChange={e => set('title', e.target.value)} required />
          <input className="input-field flex-1 min-w-[200px]" placeholder="Description" value={form.description} onChange={e => set('description', e.target.value)} />
          <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
            <FiPlus size={14} />{loading ? 'Saving...' : editId ? 'Update' : 'Add'}
          </button>
          {editId && <button type="button" onClick={cancel} className="btn-secondary flex items-center gap-2"><FiX size={14} />Cancel</button>}
        </form>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-white/10">
            <tr>
              <th className="tbl-th">Title</th>
              <th className="tbl-th">Description</th>
              <th className="tbl-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0
              ? <tr><td colSpan={3} className="tbl-td text-center text-white/30 py-8">No events yet</td></tr>
              : items.map(item => (
                <tr key={item.id} className="tbl-row">
                  <td className="tbl-td text-white font-medium">{item.title}</td>
                  <td className="tbl-td">{item.description || '—'}</td>
                  <td className="tbl-td">
                    <div className="flex gap-2">
                      <button onClick={() => { setEditId(item.id); set('title', item.title); set('description', item.description||''); }} className="btn-warning flex items-center gap-1"><FiEdit2 size={11} />Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="btn-danger flex items-center gap-1"><FiTrash2 size={11} />Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
