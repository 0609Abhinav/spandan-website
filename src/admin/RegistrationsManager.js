import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import * as XLSX from 'xlsx';

const PAGE_SIZE = 10;
const COLS = ['name','email','phone','roll_no','branch','course','year','art_form','created_at'];

export default function RegistrationsManager() {
  const [rows, setRows]         = useState([]);
  const [total, setTotal]       = useState(0);
  const [page, setPage]         = useState(0);
  const [search, setSearch]     = useState('');
  const [filterYear, setFilterYear]     = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [sortCol, setSortCol]   = useState('created_at');
  const [sortAsc, setSortAsc]   = useState(false);
  const [loading, setLoading]   = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    let q = supabase.from('registrations').select('*', { count: 'exact' });
    if (search)       q = q.or(`name.ilike.%${search}%,email.ilike.%${search}%,roll_no.ilike.%${search}%`);
    if (filterYear)   q = q.eq('year', filterYear);
    if (filterCourse) q = q.eq('course', filterCourse);
    q = q.order(sortCol, { ascending: sortAsc }).range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);
    const { data, count } = await q;
    setRows(data || []);
    setTotal(count || 0);
    setLoading(false);
  }, [search, filterYear, filterCourse, sortCol, sortAsc, page]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSort = (col) => { if (sortCol === col) setSortAsc(!sortAsc); else { setSortCol(col); setSortAsc(true); } setPage(0); };
  const handleDelete = async (id) => { if (!window.confirm('Delete?')) return; await supabase.from('registrations').delete().eq('id', id); fetchData(); };

  const exportExcel = async () => {
    let q = supabase.from('registrations').select('*');
    if (search)       q = q.or(`name.ilike.%${search}%,email.ilike.%${search}%,roll_no.ilike.%${search}%`);
    if (filterYear)   q = q.eq('year', filterYear);
    if (filterCourse) q = q.eq('course', filterCourse);
    const { data } = await q;
    const ws = XLSX.utils.json_to_sheet(data || []);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Registrations');
    XLSX.writeFile(wb, 'registrations.xlsx');
  };

  const exportCSV = async () => {
    let q = supabase.from('registrations').select('*');
    if (search)       q = q.or(`name.ilike.%${search}%,email.ilike.%${search}%,roll_no.ilike.%${search}%`);
    if (filterYear)   q = q.eq('year', filterYear);
    if (filterCourse) q = q.eq('course', filterCourse);
    const { data } = await q;
    const ws = XLSX.utils.json_to_sheet(data || []);
    const csv = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'registrations.csv'; a.click();
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20, alignItems: 'center' }}>
        <input style={s.input} placeholder="Search name / email / roll no" value={search}
          onChange={e => { setSearch(e.target.value); setPage(0); }} />
        <select style={s.input} value={filterYear} onChange={e => { setFilterYear(e.target.value); setPage(0); }}>
          <option value="">All Years</option>
          {['1st Year','2nd Year','3rd Year','4th Year'].map(y => <option key={y}>{y}</option>)}
        </select>
        <select style={s.input} value={filterCourse} onChange={e => { setFilterCourse(e.target.value); setPage(0); }}>
          <option value="">All Courses</option>
          {['B.Tech','M.Tech','BCA','MCA','MBA','B.Sc','M.Sc','Other'].map(c => <option key={c}>{c}</option>)}
        </select>
        <button style={s.btn} onClick={exportExcel}>⬇ Excel</button>
        <button style={{ ...s.btn, background: '#10b981' }} onClick={exportCSV}>⬇ CSV</button>
        <span style={{ marginLeft: 'auto', color: '#64748b', fontSize: 13 }}>{total} total registrations</span>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              {COLS.map(col => (
                <th key={col} style={s.th} onClick={() => handleSort(col)}>
                  {col.replace('_', ' ')} {sortCol === col ? (sortAsc ? '↑' : '↓') : ''}
                </th>
              ))}
              <th style={s.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={COLS.length + 1} style={{ textAlign: 'center', padding: 24, color: '#94a3b8' }}>Loading...</td></tr>
            ) : rows.length === 0 ? (
              <tr><td colSpan={COLS.length + 1} style={{ textAlign: 'center', padding: 24, color: '#94a3b8' }}>No registrations found</td></tr>
            ) : rows.map(row => (
              <tr key={row.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                {COLS.map(col => (
                  <td key={col} style={s.td}>
                    {col === 'created_at' ? new Date(row[col]).toLocaleDateString() : row[col] || '—'}
                  </td>
                ))}
                <td style={s.td}>
                  <button style={s.delBtn} onClick={() => handleDelete(row.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 20, alignItems: 'center' }}>
        <button style={s.pgBtn} disabled={page === 0} onClick={() => setPage(0)}>«</button>
        <button style={s.pgBtn} disabled={page === 0} onClick={() => setPage(p => p - 1)}>‹</button>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const p = Math.max(0, Math.min(page - 2, totalPages - 5)) + i;
          return <button key={p} style={{ ...s.pgBtn, background: p === page ? '#6366f1' : '#f1f5f9', color: p === page ? '#fff' : '#374151' }}
            onClick={() => setPage(p)}>{p + 1}</button>;
        })}
        <button style={s.pgBtn} disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>›</button>
        <button style={s.pgBtn} disabled={page >= totalPages - 1} onClick={() => setPage(totalPages - 1)}>»</button>
        <span style={{ fontSize: 13, color: '#64748b' }}>Page {page + 1} of {totalPages || 1}</span>
      </div>
    </div>
  );
}

const s = {
  input:  { padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13, minWidth: 160 },
  btn:    { padding: '8px 16px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 13 },
  th:     { padding: '10px 12px', textAlign: 'left', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', fontSize: 12, color: '#475569' },
  td:     { padding: '10px 12px', whiteSpace: 'nowrap', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis' },
  delBtn: { padding: '3px 10px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 11 },
  pgBtn:  { padding: '6px 12px', background: '#f1f5f9', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 },
};
