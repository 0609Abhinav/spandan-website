import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { uploadImage } from '../lib/cloudinary';

export default function TeacherManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', role: '', bio: '', image_url: '' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const { data } = await supabase.from('teachers').select('*').order('created_at', { ascending: true });
    setItems(data || []);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let image_url = form.image_url;
      if (file) image_url = await uploadImage(file);

      if (editId) {
        await supabase.from('teachers').update({ ...form, image_url }).eq('id', editId);
        setEditId(null);
      } else {
        await supabase.from('teachers').insert({ ...form, image_url });
      }
      setForm({ name: '', role: '', bio: '', image_url: '' });
      setFile(null);
      fetchData();
    } catch (err) { alert(err.message); }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({ name: item.name, role: item.role, bio: item.bio || '', image_url: item.image_url || '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this teacher?')) return;
    await supabase.from('teachers').delete().eq('id', id);
    fetchData();
  };

  return (
    <div>
      <h3>Teacher / Committee Manager</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input style={styles.input} placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input style={styles.input} placeholder="Role (e.g. Convenor)" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required />
        <input style={styles.input} placeholder="Bio / Department" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
        {form.image_url && !file && <img src={form.image_url} alt="preview" style={{ height: 60, borderRadius: 4 }} />}
        <button style={styles.btn} type="submit" disabled={loading}>{loading ? 'Saving...' : editId ? 'Update' : 'Add'}</button>
        {editId && <button type="button" style={{ ...styles.btn, background: '#aaa' }} onClick={() => { setEditId(null); setForm({ name: '', role: '', bio: '', image_url: '' }); }}>Cancel</button>}
      </form>

      <div style={styles.grid}>
        {items.map(item => (
          <div key={item.id} style={styles.card}>
            {item.image_url && <img src={item.image_url} alt={item.name} style={styles.img} />}
            <p style={{ fontWeight: 600 }}>{item.name}</p>
            <p style={{ fontSize: 12, color: '#6366f1' }}>{item.role}</p>
            <p style={{ fontSize: 12, color: '#666' }}>{item.bio}</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button style={styles.editBtn} onClick={() => handleEdit(item)}>Edit</button>
              <button style={styles.delBtn} onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  form: { display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24, background: '#f9f9f9', padding: 16, borderRadius: 8 },
  input: { padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, minWidth: 180 },
  btn: { padding: '8px 20px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 },
  card: { background: '#fff', borderRadius: 8, padding: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.08)' },
  img: { width: '100%', height: 130, objectFit: 'cover', borderRadius: 6, marginBottom: 8 },
  editBtn: { padding: '4px 12px', background: '#f59e0b', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 },
  delBtn: { padding: '4px 12px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 },
};
