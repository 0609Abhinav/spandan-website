import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { FaEnvelope, FaLock, FaPalette } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-blue-950 px-4">
      {/* Blobs */}
      {[['top-20 left-20','purple'],['bottom-20 right-20','blue']].map(([pos, c], i) => (
        <motion.div key={i} className={`absolute ${pos} w-64 h-64 bg-${c}-500/20 rounded-full blur-3xl`}
          animate={{ scale: [1,1.3,1] }} transition={{ duration: 4+i, repeat: Infinity }} />
      ))}

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="relative w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FaPalette className="text-white text-2xl" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white text-center mb-1">Admin Login</h2>
          <p className="text-white/50 text-center text-sm mb-8">Spandan Fine Arts CMS</p>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl px-4 py-3 text-sm mb-6">
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
              <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pl-11 text-white placeholder-white/40 focus:outline-none focus:border-purple-400 transition-all" />
            </div>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pl-11 text-white placeholder-white/40 focus:outline-none focus:border-purple-400 transition-all" />
            </div>
            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-60 mt-2">
              {loading ? 'Signing in...' : 'Sign In →'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
