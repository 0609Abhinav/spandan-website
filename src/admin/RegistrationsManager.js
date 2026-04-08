import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import * as XLSX from 'xlsx';
import { FiSearch, FiTrash2, FiDownload, FiChevronLeft, FiChevronRight, FiChevronUp, FiChevronDown } from 'react-icons/fi';

const PAGE  = 10;
const COLS  = ['name','email','phone','roll_no','branch','course','year','art_form','created_at'];

export default function RegistrationsManager() {
  const [rows, setRows]         = useState([]);
  const [total, setTotal]       = useState(0);
  const [page, setPage]         = useState(0);
  const [search, setSearch]     = useState('');
  const [filterYear, setFY]     = useState('');
  const [filterCourse, setFC]   = useState('');
  const [sortCol, setSortCol]   = useState('created_at');
  const [sortAsc, setSortAsc]   = useState(false);
  const [loading, setLoading]   = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    let q = supabase.from('registrations').select('*', { count: 'exact' });
    if (search)      q = q.or(`name.ilike.%${search}%,email.ilike.%${search}%,roll_no.ilike.%${search}%`);
    if (filterYear)  q = q.eq('year', filterYear);
    if (filterCourse)q = q.eq('course', filterCourse);
    q = q.order(sortCol, { ascending: sortAsc }).range(page * PAGE, page * PAGE + PAGE - 1);
    const { data, count } = await q;
    setRows(data || []); setTotal(count || 0); setLoading(false);
  }, [search, filterYear, filterCourse, sortCol, sortAsc, page]);

  useEffect(() => { load(); }, [load]);

  const sort = (col) => { if (sortCol === col) setSortAsc(a => !a); else { setSortCol(col); setSortAsc(true); } setPage(0); };
  const del  = async (id) => { if (!window.confirm('Delete?')) return; await supabase.from('registrations').delete().eq('id', id); load(); };

  const getFiltered = async () => {
    let q = supabase.from('registrations').select('*');
    if (search)      q = q.or(`name.ilike.%${search}%,email.ilike.%${search}%,roll_no.ilike.%${search}%`);
    if (filterYear)  q = q.eq('year', filterYear);
    if (filterCourse)q = q.eq('course', filterCourse);
    const { data } = await q;
    return data || [];
  };

  const exportExcel = async () => {
    const data = await getFiltered();
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data), 'Registrations');
    XLSX.writeFile(wb, 'registrations.xlsx');
  };

  const exportCSV = async () => {
    const data = await getFiltered();
    const csv  = XLSX.utils.sheet_to_csv(XLSX.utils.json_to_sheet(data));
    const a    = document.createElement('a');
    a.href     = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = 'registrations.csv'; a.click();
  };

  const totalPages = Math.ceil(total / PAGE);
  const SortIcon   = ({ col }) => sortCol === col ? (sortAsc ? <FiChevronUp size={12} /> : <FiChevronDown size={12} />) : null;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
          <input className="input-field pl-9" placeholder="Search name, email, roll no…" value={search}
            onChange={e => { setSearch(e.target.value); setPage(0); }} />
        </div>
        <select className="input-field w-36" value={filterYear} onChange={e => { setFY(e.target.value); setPage(0); }}>
          <option value="">All Years</option>
          {['1st Year','2nd Year','3rd Year','4th Year'].map(y => <option key={y} className="bg-[#1a1030]">{y}</option>)}
        </select>
        <select className="input-field w-36" value={filterCourse} onChange={e => { setFC(e.target.value); setPage(0); }}>
          <option value="">All Courses</option>
          {['B.Tech','M.Tech','BCA','MCA','MBA','B.Sc','M.Sc','Other'].map(c => <option key={c} className="bg-[#1a1030]">{c}</option>)}
        </select>
        <button onClick={exportExcel} className="btn-primary flex items-center gap-2"><FiDownload size={13} />Excel</button>
        <button onClick={exportCSV}   className="btn-success flex items-center gap-2"><FiDownload size={13} />CSV</button>
        <span className="text-white/30 text-xs ml-auto">{total} total</span>
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10 sticky top-0 bg-[#1a1030]">
              <tr>
                {COLS.map(col => (
                  <th key={col} className="tbl-th" onClick={() => sort(col)}>
                    <span className="flex items-center gap-1">{col.replace('_',' ')}<SortIcon col={col} /></span>
                  </th>
                ))}
                <th className="tbl-th">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? <tr><td colSpan={COLS.length+1} className="tbl-td text-center text-white/30 py-10">Loading…</td></tr>
                : rows.length === 0
                  ? <tr><td colSpan={COLS.length+1} className="tbl-td text-center text-white/30 py-10">No registrations found</td></tr>
                  : rows.map((row, ri) => (
                    <tr key={row.id} className={`tbl-row ${ri % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                      {COLS.map(col => (
                        <td key={col} className="tbl-td">
                          {col === 'created_at' ? new Date(row[col]).toLocaleDateString() : row[col] || '—'}
                        </td>
                      ))}
                      <td className="tbl-td">
                        <button onClick={() => del(row.id)} className="btn-danger flex items-center gap-1"><FiTrash2 size={11} />Del</button>
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <span className="text-white/30 text-xs">Page {page+1} of {totalPages||1}</span>
        <div className="flex gap-1">
          <button disabled={page===0} onClick={() => setPage(0)} className="btn-secondary px-3 py-1.5 text-xs disabled:opacity-30">«</button>
          <button disabled={page===0} onClick={() => setPage(p=>p-1)} className="btn-secondary px-3 py-1.5 text-xs disabled:opacity-30"><FiChevronLeft size={13}/></button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const p = Math.max(0, Math.min(page-2, totalPages-5)) + i;
            return (
              <button key={p} onClick={() => setPage(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${p===page ? 'bg-purple-500/30 text-purple-300 border border-purple-500/40' : 'btn-secondary'}`}>
                {p+1}
              </button>
            );
          })}
          <button disabled={page>=totalPages-1} onClick={() => setPage(p=>p+1)} className="btn-secondary px-3 py-1.5 text-xs disabled:opacity-30"><FiChevronRight size={13}/></button>
          <button disabled={page>=totalPages-1} onClick={() => setPage(totalPages-1)} className="btn-secondary px-3 py-1.5 text-xs disabled:opacity-30">»</button>
        </div>
      </div>
    </div>
  );
}
