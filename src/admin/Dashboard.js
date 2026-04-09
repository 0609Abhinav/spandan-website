import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { EventsProvider } from '../lib/EventsContext';
import GalleryManager from './GalleryManager';
import TeacherManager from './TeacherManager';
import EventManager from './EventManager';
import RegistrationsManager from './RegistrationsManager';
import DashboardHome from './DashboardHome';
import ContentManager from './ContentManager';
import VideoManager from './VideoManager';
import { FiGrid, FiImage, FiUsers, FiCalendar, FiClipboard, FiLogOut, FiEdit3, FiYoutube } from 'react-icons/fi';
import logo from '../assets/logo.png';

const TABS = [
  { id: 'dashboard',     label: 'Dashboard',    icon: FiGrid },
  { id: 'Gallery',       label: 'Gallery',       icon: FiImage },
  { id: 'Teachers',      label: 'Teachers',      icon: FiUsers },
  { id: 'Events',        label: 'Events',        icon: FiCalendar },
  { id: 'Registrations', label: 'Registrations', icon: FiClipboard },
  { id: 'Content',       label: 'Site Content',  icon: FiEdit3 },
  { id: 'Videos',        label: 'Videos',         icon: FiYoutube },
];

const PAGE_TITLES = {
  dashboard:     { title: 'Dashboard',     sub: 'Overview of your content' },
  Gallery:       { title: 'Gallery',       sub: 'Manage event images' },
  Teachers:      { title: 'Teachers',      sub: 'Manage committee members' },
  Events:        { title: 'Events',        sub: 'Manage fine arts events' },
  Registrations: { title: 'Registrations', sub: 'View and export student registrations' },
  Content:       { title: 'Site Content',  sub: 'Edit section headings shown on the public website' },
  Videos:        { title: 'Videos',         sub: 'Manage YouTube event videos with thumbnails' },
};

export default function Dashboard() {
  const [active, setActive] = useState('dashboard');
  const handleLogout = async () => { await supabase.auth.signOut(); window.location.reload(); };
  const page = PAGE_TITLES[active];

  return (
    <EventsProvider>
      <div className="flex min-h-screen bg-[#0f0a1e]">
        {/* Sidebar */}
        <aside className="w-60 bg-[#130d24] border-r border-white/5 flex flex-col sticky top-0 h-screen z-10">
          {/* Logo */}
          <div className="p-5 border-b border-white/5 flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur-sm opacity-60" />
              <img src={logo} alt="Spandan" className="relative h-9 w-9 rounded-xl object-contain" draggable={false} />
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-tight">Spandan</div>
              <div className="text-purple-400/60 text-xs">Fine Arts CMS</div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = active === tab.id;
              return (
                <motion.button key={tab.id} onClick={() => setActive(tab.id)} whileHover={{ x: 2 }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                    ${isActive ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/20 text-white border border-purple-500/30' : 'text-white/40 hover:text-white/80 hover:bg-white/5'}`}>
                  <Icon size={15} className={isActive ? 'text-purple-400' : ''} />
                  {tab.label}
                  {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />}
                </motion.button>
              );
            })}
          </nav>

          <div className="p-3 border-t border-white/5">
            <button onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-400/50 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150">
              <FiLogOut size={15} />Logout
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-[#0f0a1e]/80 backdrop-blur-xl border-b border-white/5 px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-white">{page.title}</h1>
              <p className="text-white/30 text-xs">{page.sub}</p>
            </div>
          </header>

          <main className="flex-1 p-8 overflow-y-auto">
            <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              {active === 'dashboard'     && <DashboardHome />}
              {active === 'Gallery'       && <GalleryManager />}
              {active === 'Teachers'      && <TeacherManager />}
              {active === 'Events'        && <EventManager />}
              {active === 'Registrations' && <RegistrationsManager />}
              {active === 'Content'       && <ContentManager />}
              {active === 'Videos'        && <VideoManager />}
            </motion.div>
          </main>
        </div>
      </div>
    </EventsProvider>
  );
}
