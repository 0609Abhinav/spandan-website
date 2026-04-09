import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { EventsProvider } from '../lib/EventsContext';
import GalleryManager from './GalleryManager';
import TeacherManager from './TeacherManager';
import EventManager from './EventManager';
import RegistrationsManager from './RegistrationsManager';
import DashboardHome from './DashboardHome';
import ContentManager from './ContentManager';
import VideoManager from './VideoManager';
import { FiGrid, FiImage, FiUsers, FiCalendar, FiClipboard, FiLogOut, FiEdit3, FiYoutube, FiMenu, FiX } from 'react-icons/fi';
import logo from '../assets/logo.png';

const TABS = [
  { id: 'dashboard',     label: 'Dashboard',    icon: FiGrid },
  { id: 'Gallery',       label: 'Gallery',       icon: FiImage },
  { id: 'Teachers',      label: 'Teachers',      icon: FiUsers },
  { id: 'Events',        label: 'Events',        icon: FiCalendar },
  { id: 'Registrations', label: 'Registrations', icon: FiClipboard },
  { id: 'Content',       label: 'Site Content',  icon: FiEdit3 },
  { id: 'Videos',        label: 'Videos',        icon: FiYoutube },
];

const PAGE_TITLES = {
  dashboard:     { title: 'Dashboard',     sub: 'Overview of your content' },
  Gallery:       { title: 'Gallery',       sub: 'Manage event images' },
  Teachers:      { title: 'Teachers',      sub: 'Manage committee members' },
  Events:        { title: 'Events',        sub: 'Manage fine arts events' },
  Registrations: { title: 'Registrations', sub: 'View and export registrations' },
  Content:       { title: 'Site Content',  sub: 'Edit section headings' },
  Videos:        { title: 'Videos',        sub: 'Manage YouTube videos' },
};

export default function Dashboard() {
  const [active, setActive]   = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleLogout = async () => { await supabase.auth.signOut(); window.location.reload(); };
  const page = PAGE_TITLES[active];

  const NavItem = ({ tab, onClick }) => {
    const Icon = tab.icon;
    const isActive = active === tab.id;
    return (
      <button onClick={() => { setActive(tab.id); onClick?.(); }}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
          ${isActive ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/20 text-white border border-purple-500/30' : 'text-white/40 hover:text-white/80 hover:bg-white/5'}`}>
        <Icon size={15} className={isActive ? 'text-purple-400' : ''} />
        <span>{tab.label}</span>
        {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />}
      </button>
    );
  };

  return (
    <EventsProvider>
      <div className="flex min-h-screen bg-[#0f0a1e] w-full overflow-x-hidden">

        {/* ── DESKTOP SIDEBAR ── */}
        <aside className="hidden md:flex w-60 flex-shrink-0 bg-[#130d24] border-r border-white/5 flex-col sticky top-0 h-screen z-10">
          <div className="p-5 border-b border-white/5 flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur-sm opacity-60" />
              <img src={logo} alt="Spandan" className="relative h-9 w-9 rounded-xl object-contain" draggable={false} />
            </div>
            <div>
              <div className="text-white font-bold text-sm">Spandan</div>
              <div className="text-purple-400/60 text-xs">Fine Arts CMS</div>
            </div>
          </div>
          <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
            {TABS.map(tab => <NavItem key={tab.id} tab={tab} />)}
          </nav>
          <div className="p-3 border-t border-white/5">
            <button onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/50 hover:text-red-400 hover:bg-red-500/10 transition-all">
              <FiLogOut size={15} />Logout
            </button>
          </div>
        </aside>

        {/* ── MOBILE DRAWER ── */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
              <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed top-0 left-0 h-full w-64 bg-[#130d24] border-r border-white/5 flex flex-col z-50 md:hidden">
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={logo} alt="Spandan" className="h-8 w-8 rounded-xl object-contain" draggable={false} />
                    <div className="text-white font-bold text-sm">Spandan CMS</div>
                  </div>
                  <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all">
                    <FiX size={18} />
                  </button>
                </div>
                <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
                  {TABS.map(tab => <NavItem key={tab.id} tab={tab} onClick={() => setMobileOpen(false)} />)}
                </nav>
                <div className="p-3 border-t border-white/5">
                  <button onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/50 hover:text-red-400 hover:bg-red-500/10 transition-all">
                    <FiLogOut size={15} />Logout
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* ── MAIN CONTENT ── */}
        <div className="flex-1 flex flex-col min-w-0 w-full overflow-x-hidden">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-[#0f0a1e]/90 backdrop-blur-xl border-b border-white/5 px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3">
            {/* Mobile menu button */}
            <button onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all flex-shrink-0">
              <FiMenu size={20} />
            </button>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-bold text-white truncate">{page.title}</h1>
              <p className="text-white/30 text-xs hidden sm:block">{page.sub}</p>
            </div>
          </header>

          <main className="flex-1 p-3 sm:p-5 md:p-8 overflow-y-auto overflow-x-hidden max-w-full">
            <div className="max-w-full overflow-x-hidden">
              <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                {active === 'dashboard'     && <DashboardHome />}
                {active === 'Gallery'       && <GalleryManager />}
                {active === 'Teachers'      && <TeacherManager />}
                {active === 'Events'        && <EventManager />}
                {active === 'Registrations' && <RegistrationsManager />}
                {active === 'Content'       && <ContentManager />}
                {active === 'Videos'        && <VideoManager />}
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </EventsProvider>
  );
}
