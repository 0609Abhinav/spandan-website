import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

/**
 * Renders via a portal so it always appears in the viewport,
 * regardless of parent overflow/scroll containers.
 *
 * Usage:
 *   const [confirm, setConfirm] = useState(null);
 *   setConfirm({ message: '...', onConfirm: () => doDelete(id) });
 *   <ConfirmDialog confirm={confirm} onClose={() => setConfirm(null)} />
 */
export default function ConfirmDialog({ confirm, onClose }) {
  if (!confirm) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
          onClick={onClose}
        />
        {/* Dialog box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          className="relative glass rounded-2xl p-6 w-full max-w-sm shadow-2xl"
          style={{ position: 'relative', zIndex: 1 }}
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors">
            <FiX size={16} />
          </button>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
              <FiAlertTriangle size={18} className="text-red-400" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm mb-1">Confirm Delete</p>
              <p className="text-white/50 text-xs leading-relaxed">
                {confirm.message || 'Are you sure you want to delete this? This action cannot be undone.'}
              </p>
            </div>
          </div>
          <div className="flex gap-3 mt-5 justify-end">
            <button onClick={onClose} className="btn-secondary text-xs px-4 py-2">Cancel</button>
            <button onClick={() => { confirm.onConfirm(); onClose(); }} className="btn-danger text-xs px-4 py-2">
              Delete
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
