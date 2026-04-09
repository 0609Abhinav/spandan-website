import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { FiImage, FiUsers, FiCalendar, FiClipboard, FiTrendingUp } from 'react-icons/fi';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

const STAT_CARDS = [
  { key: 'gallery',       label: 'Gallery Images', icon: FiImage,     from: 'from-purple-600', to: 'to-purple-900',  glow: 'shadow-purple-900/40' },
  { key: 'teachers',      label: 'Teachers',        icon: FiUsers,     from: 'from-pink-600',   to: 'to-pink-900',    glow: 'shadow-pink-900/40' },
  { key: 'events',        label: 'Events',          icon: FiCalendar,  from: 'from-indigo-600', to: 'to-indigo-900',  glow: 'shadow-indigo-900/40' },
  { key: 'registrations', label: 'Registrations',   icon: FiClipboard, from: 'from-emerald-600',to: 'to-emerald-900', glow: 'shadow-emerald-900/40' },
];

const PIE_COLORS = ['#a855f7','#ec4899','#6366f1','#10b981','#f59e0b','#ef4444','#06b6d4','#84cc16'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1030] border border-white/10 rounded-xl px-3 py-2 text-xs text-white shadow-xl">
      <p className="text-white/50 mb-1">{label}</p>
      {payload.map((p, i) => <p key={i} style={{ color: p.color }}>{p.name}: <strong>{p.value}</strong></p>)}
    </div>
  );
};

export default function DashboardHome() {
  const [stats, setStats]       = useState({ gallery: 0, teachers: 0, events: 0, registrations: 0 });
  const [barData, setBarData]   = useState([]);
  const [pieData, setPieData]   = useState([]);
  const [recent, setRecent]     = useState([]);

  useEffect(() => {
    // Stats
    Promise.all([
      supabase.from('gallery').select('*', { count: 'exact', head: true }),
      supabase.from('teachers').select('*', { count: 'exact', head: true }),
      supabase.from('events').select('*', { count: 'exact', head: true }),
      supabase.from('registrations').select('*', { count: 'exact', head: true }),
    ]).then(([g, t, e, r]) => setStats({ gallery: g.count||0, teachers: t.count||0, events: e.count||0, registrations: r.count||0 }));

    // Bar: registrations by year
    supabase.from('registrations').select('year').then(({ data }) => {
      const map = {};
      (data||[]).forEach(r => { if (r.year) map[r.year] = (map[r.year]||0) + 1; });
      setBarData(Object.entries(map).map(([year, count]) => ({ year, count })).sort((a,b) => a.year.localeCompare(b.year)));
    });

    // Pie: course distribution
    supabase.from('registrations').select('course').then(({ data }) => {
      const map = {};
      (data||[]).forEach(r => { if (r.course) map[r.course] = (map[r.course]||0) + 1; });
      setPieData(Object.entries(map).map(([name, value]) => ({ name, value })));
    });

    // Recent: last 5 registrations + last 5 gallery uploads
    Promise.all([
      supabase.from('registrations').select('id,name,created_at').order('created_at', { ascending: false }).limit(5),
      supabase.from('gallery').select('id,title,image_url,created_at').order('created_at', { ascending: false }).limit(5),
    ]).then(([reg, gal]) => {
      const combined = [
        ...(reg.data||[]).map(r => ({ ...r, type: 'registration', label: r.name, icon: '📋' })),
        ...(gal.data||[]).map(g => ({ ...g, type: 'gallery',      label: g.title, icon: '🖼' })),
      ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 8);
      setRecent(combined);
    });
  }, []);

  const timeAgo = (ts) => {
    const s = Math.floor((Date.now() - new Date(ts)) / 1000);
    if (s < 60) return `${s}s ago`;
    if (s < 3600) return `${Math.floor(s/60)}m ago`;
    if (s < 86400) return `${Math.floor(s/3600)}h ago`;
    return `${Math.floor(s/86400)}d ago`;
  };

  return (
    <div className="space-y-8">
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {STAT_CARDS.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div key={card.key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }} whileHover={{ y: -3, scale: 1.02 }}
              className={`glass rounded-2xl p-4 sm:p-5 shadow-lg ${card.glow} cursor-default`}>
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${card.from} ${card.to} flex items-center justify-center mb-3 sm:mb-4 shadow-lg`}>
                <Icon size={16} className="text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">{stats[card.key]}</div>
              <div className="text-white/40 text-xs mt-1 font-medium leading-tight">{card.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {/* Bar chart */}
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <FiTrendingUp size={16} className="text-purple-400" />
            <h3 className="text-white font-semibold text-sm">Registrations by Year</h3>
          </div>
          {barData.length === 0
            ? <div className="h-36 flex items-center justify-center text-white/20 text-sm">No data yet</div>
            : <ResponsiveContainer width="100%" height={160}>
                <BarChart data={barData} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="year" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} width={25} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(168,85,247,0.08)' }} />
                  <Bar dataKey="count" name="Students" radius={[6,6,0,0]} fill="url(#barGrad)" />
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
          }
        </motion.div>

        {/* Pie chart */}
        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}
          className="glass rounded-2xl p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
            <h3 className="text-white font-semibold text-sm">Course Distribution</h3>
          </div>
          {pieData.length === 0
            ? <div className="h-36 flex items-center justify-center text-white/20 text-sm">No data yet</div>
            : <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="45%" innerRadius={40} outerRadius={65}
                    paddingAngle={3} dataKey="value">
                    {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" iconSize={7}
                    formatter={(v) => <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10 }}>{v}</span>} />
                </PieChart>
              </ResponsiveContainer>
          }
        </motion.div>
      </div>

      {/* Recent activity */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
        className="glass rounded-2xl p-6">
        <h3 className="text-white font-semibold text-sm mb-5">Recent Activity</h3>
        {recent.length === 0
          ? <p className="text-white/20 text-sm text-center py-6">No activity yet</p>
          : <div className="space-y-3">
              {recent.map((item, i) => (
                <motion.div key={item.id + item.type} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                  {item.type === 'gallery' && item.image_url
                    ? <img src={item.image_url} alt="" className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
                    : <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 text-base">{item.icon}</div>
                  }
                  <div className="flex-1 min-w-0">
                    <p className="text-white/80 text-sm font-medium truncate">{item.label}</p>
                    <p className="text-white/30 text-xs capitalize">{item.type}</p>
                  </div>
                  <span className="text-white/20 text-xs flex-shrink-0">{timeAgo(item.created_at)}</span>
                </motion.div>
              ))}
            </div>
        }
      </motion.div>
    </div>
  );
}
