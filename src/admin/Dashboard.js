import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import GalleryManager from './GalleryManager';
import TeacherManager from './TeacherManager';
import EventManager from './EventManager';
import RegistrationsManager from './RegistrationsManager';

const tabs = [
  { id: 'dashboard',      label: '📊 Dashboard' },
  { id: 'Gallery',        label: '🖼 Gallery' },
  { id: 'Teachers',       label: '👩‍🏫 Teachers' },
  { id: 'Events',         label: '🎨 Events' },
  { id: 'Registrations',  label: '📋 Registrations' },
];

export default function Dashboard() {
  const [active, setActive] = useState('dashboard');
  const [stats, setStats]   = useState({ gallery: 0, teachers: 0, events: 0, registrations: 0 });

  useEffect(() => {
    Promise.all([
      supabase.from('gallery').select('*', { count: 'exact', head: true }),
      supabase.from('teachers').select('*', { count: 'exact', head: true }),
      supabase.from('events').select('*', { count: 'exact', head: true }),
      supabase.from('registrations').select('*', { count: 'exact', head: true }),
    ]).then(([g, t, e, r]) => setStats({ gallery: g.count, teachers: t.count, events: e.count, registrations: r.count }));
  }, [active]);

  const handleLogout = async () => { await supabase.auth.signOut(); window.location.reload(); };

  return (
    <div style={s.layout}>
      <aside style={s.sidebar}>
        <div style={{ padding: '0 8px 24px' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 4 }}>⚙️ Spandan</div>
          <div style={{ fontSize: 12, color: '#818cf8' }}>Admin Panel</div>
        </div>
        {tabs.map(tab => (
          <button key={tab.id} style={{ ...s.tabBtn, background: active === tab.id ? 'rgba(99,102,241,0.3)' : 'transparent', borderLeft: active === tab.id ? '3px solid #6366f1' : '3px solid transparent' }}
            onClick={() => setActive(tab.id)}>{tab.label}</button>
        ))}
        <button style={{ ...s.tabBtn, marginTop: 'auto', color: '#f87171' }} onClick={handleLogout}>🚪 Logout</button>
      </aside>

      <main style={s.main}>
        {active === 'dashboard' && (
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Dashboard Overview</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
              {[
                { label: 'Gallery Images', value: stats.gallery,       color: '#6366f1', icon: '🖼' },
                { label: 'Teachers',       value: stats.teachers,      color: '#10b981', icon: '👩‍🏫' },
                { label: 'Events',         value: stats.events,        color: '#f59e0b', icon: '🎨' },
                { label: 'Registrations',  value: stats.registrations, color: '#ef4444', icon: '📋' },
              ].map(card => (
                <div key={card.label} style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderTop: `4px solid ${card.color}` }}>
                  <div style={{ fontSize: 32 }}>{card.icon}</div>
                  <div style={{ fontSize: 36, fontWeight: 700, color: card.color, margin: '8px 0 4px' }}>{card.value}</div>
                  <div style={{ color: '#64748b', fontSize: 14 }}>{card.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {active === 'Gallery'       && <><h2 style={s.title}>Gallery</h2><GalleryManager /></>}
        {active === 'Teachers'      && <><h2 style={s.title}>Teachers</h2><TeacherManager /></>}
        {active === 'Events'        && <><h2 style={s.title}>Events</h2><EventManager /></>}
        {active === 'Registrations' && <><h2 style={s.title}>Registrations</h2><RegistrationsManager /></>}
      </main>
    </div>
  );
}

const s = {
  layout:  { display: 'flex', minHeight: '100vh', fontFamily: "'Inter', sans-serif", background: '#f8fafc' },
  sidebar: { width: 220, background: '#1e1b4b', padding: '28px 12px', display: 'flex', flexDirection: 'column', gap: 4, position: 'sticky', top: 0, height: '100vh' },
  tabBtn:  { padding: '10px 16px', color: '#c7d2fe', border: 'none', borderRadius: 8, cursor: 'pointer', textAlign: 'left', fontSize: 13, transition: 'all 0.2s' },
  main:    { flex: 1, padding: 32, overflowY: 'auto' },
  title:   { fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#1e293b' },
};
