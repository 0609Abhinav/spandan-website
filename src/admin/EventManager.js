import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function EventManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const { data } = await supabase.from('events').select('*').order('created_at', { ascending: false });
    setItems(data || []);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (editId) {
      await supabase.from('events').update(form).eq('id', editId);
      setEditId(null);
    } else {
      await supabase.from('events').insert(form);
    }
    setForm({ title: '', description: '' });
    fetchData();
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    await supabase.from('events').delete().eq('id', id);
    fetchData();
  };

  return (
    <div>
      <h3>Events Manager</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input style={styles.input} placeholder="Event Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        <input style={styles.input} placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <button style={styles.btn} type="submit" disabled={loading}>{loading ? 'Saving...' : editId ? 'Update' : 'Add'}</button>
        {editId && <button type="button" style={{ ...styles.btn, background: '#aaa' }} onClick={() => { setEditId(null); setForm({ title: '', description: '' }); }}>Cancel</button>}
      </form>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead><tr style={{ background: '#f3f4f6' }}><th style={styles.th}>Title</th><th style={styles.th}>Description</th><th style={styles.th}>Actions</th></tr></thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={styles.td}>{item.title}</td>
              <td style={styles.td}>{item.description}</td>
              <td style={styles.td}>
                <button style={styles.editBtn} onClick={() => { setEditId(item.id); setForm({ title: item.title, description: item.description || '' }); }}>Edit</button>
                <button style={styles.delBtn} onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  form: { display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24, background: '#f9f9f9', padding: 16, borderRadius: 8 },
  input: { padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, minWidth: 220 },
  btn: { padding: '8px 20px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' },
  th: { padding: '10px 14px', textAlign: 'left', fontWeight: 600 },
  td: { padding: '10px 14px' },
  editBtn: { padding: '4px 12px', background: '#f59e0b', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12, marginRight: 6 },
  delBtn: { padding: '4px 12px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 },
};
