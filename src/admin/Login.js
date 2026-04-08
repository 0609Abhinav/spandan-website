import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import { FaPalette } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0a1e] px-4">
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative w-full max-w-sm">
        <div className="glass-strong p-8 rounded-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FaPalette className="text-white text-xl" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white text-center mb-1">Admin Login</h2>
          <p className="text-white/40 text-center text-xs mb-7">Spandan Fine Arts CMS</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm mb-5">
              <FiAlertCircle size={14} className="flex-shrink-0" />{error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
              <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required className="input-field-icon" />
            </div>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="input-field-icon" />
            </div>
            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              className="w-full py-3 btn-primary rounded-xl disabled:opacity-50 mt-1">
              {loading ? 'Signing in...' : 'Sign In →'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
