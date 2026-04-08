import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import GalleryManager from './GalleryManager';
import TeacherManager from './TeacherManager';
import EventManager from './EventManager';
import RegistrationsManager from './RegistrationsManager';
import { FiGrid, FiImage, FiUsers, FiCalendar, FiClipboard, FiLogOut } from 'react-icons/fi';
import { FaPalette } from 'react-icons/fa';

const TABS = [
  { id: 'dashboard',     label: 'Dashboard',     icon: FiGrid },
  { id: 'Gallery',       label: 'Gallery',        icon: FiImage },
  { id: 'Teachers',      label: 'Teachers',       icon: FiUsers },
  { id: 'Events',        label: 'Events',         icon: FiCalendar },
  { id: 'Registrations', label: 'Registrations',  icon: FiClipboard },
];

const STAT_CARDS = [
  { key: 'gallery',       label: 'Gallery Images', icon: FiImage,     color: 'from-purple-600 to-purple-800' },
  { key: 'teachers',      label: 'Teachers',        icon: FiUsers,     color: 'from-pink-600 to-pink-800' },
  { key: 'events',        label: 'Events',          icon: FiCalendar,  color: 'from-indigo-600 to-indigo-800' },
  { key: 'registrations', label: 'Registrations',   icon: FiClipboard, color: 'from-emerald-600 to-emerald-800' },
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
    ]).then(([g, t, e, r]) => setStats({ gallery: g.count||0, teachers: t.count||0, events: e.count||0, registrations: r.count||0 }));
  }, [active]);

  const handleLogout = async () => { await supabase.auth.signOut(); window.location.reload(); };

  return (
    <div className="flex min-h-screen bg-[#0f0a1e] font-sans">
      {/* Sidebar */}
      <aside className="w-56 bg-[#1a1030] border-r border-white/5 flex flex-col sticky top-0 h-screen">
        <div className="p-5 border-b border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <FaPalette size={14} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-sm">Spandan</div>
            <div className="text-white/30 text-xs">Admin Panel</div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActive(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${active === tab.id ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
                <Icon size={15} />{tab.label}
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/5">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200">
            <FiLogOut size={15} />Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-y-auto">
        {active === 'dashboard' && (
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
            <p className="text-white/40 text-sm mb-8">Overview of your content</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {STAT_CARDS.map(card => {
                const Icon = card.icon;
                return (
                  <div key={card.key} className="glass rounded-2xl p-5">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
                      <Icon size={18} className="text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white">{stats[card.key]}</div>
                    <div className="text-white/40 text-xs mt-1">{card.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {active === 'Gallery'       && <><h1 className="text-2xl font-bold text-white mb-6">Gallery</h1><GalleryManager /></>}
        {active === 'Teachers'      && <><h1 className="text-2xl font-bold text-white mb-6">Teachers</h1><TeacherManager /></>}
        {active === 'Events'        && <><h1 className="text-2xl font-bold text-white mb-6">Events</h1><EventManager /></>}
        {active === 'Registrations' && <><h1 className="text-2xl font-bold text-white mb-6">Registrations</h1><RegistrationsManager /></>}
      </main>
    </div>
  );
}
