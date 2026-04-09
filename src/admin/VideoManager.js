import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { uploadImage } from '../lib/cloudinary';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUploadCloud, FiYoutube, FiPlay } from 'react-icons/fi';

const EMPTY = { title: '', description: '', youtube_url: '', thumbnail_url: '' };

// Extract YouTube video ID from any YouTube URL format
function getYouTubeId(url) {
  if (!url) return null;
  const m = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

// Get YouTube auto-thumbnail if no custom one
function getThumb(video) {
  if (video.thumbnail_url) return video.thumbnail_url;
  const id = getYouTubeId(video.youtube_url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

// Convert any YouTube URL to embed URL
function toEmbed(url) {
  if (!url) return '';
  if (url.includes('/embed/')) return url;
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : url;
}

export default function VideoManager() {
  const [items, setItems]       = useState([]);
  const [form, setForm]         = useState(EMPTY);
  const [editId, setEditId]     = useState(null);
  const [loading, setLoading]   = useState(false);
  const [file, setFile]         = useState(null);
  const [preview, setPreview]   = useState(null);
  const [drag, setDrag]         = useState(false);
  const [ytPreview, setYtPreview] = useState(null);
  const fileRef                 = useRef();

  const load = async () => {
    const { data } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
    setItems(data || []);
  };
  useEffect(() => { load(); }, []);

  // Auto-preview YouTube thumbnail when URL typed
  const handleUrlChange = (url) => {
    set('youtube_url', url);
    const id = getYouTubeId(url);
    setYtPreview(id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null);
  };

  const pickFile = (f) => { if (!f) return; setFile(f); setPreview(URL.createObjectURL(f)); };

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      let thumbnail_url = form.thumbnail_url;
      if (file) thumbnail_url = await uploadImage(file);
      const payload = { ...form, thumbnail_url };
      if (editId) { await supabase.from('videos').update(payload).eq('id', editId); setEditId(null); }
      else          await supabase.from('videos').insert(payload);
      setForm(EMPTY); setFile(null); setPreview(null); setYtPreview(null);
      load();
    } catch (err) { alert(err.message); }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({ title: item.title, description: item.description||'', youtube_url: item.youtube_url, thumbnail_url: item.thumbnail_url||'' });
    setPreview(item.thumbnail_url || null);
    setYtPreview(getYouTubeId(item.youtube_url) ? `https://img.youtube.com/vi/${getYouTubeId(item.youtube_url)}/hqdefault.jpg` : null);
    setFile(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this video?')) return;
    await supabase.from('videos').delete().eq('id', id); load();
  };

  const cancel = () => { setEditId(null); setForm(EMPTY); setFile(null); setPreview(null); setYtPreview(null); };
  const set    = (k, v) => setForm(f => ({...f, [k]: v}));

  const displayThumb = preview || ytPreview;

  return (
    <div className="space-y-6">
      {/* Form */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
        <h3 className="text-white font-semibold text-sm mb-5">{editId ? '✏️ Edit Video' : '➕ Add Video'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Video Title *</label>
              <input className="input-field" placeholder="e.g. Event Highlights 2024"
                value={form.title} onChange={e => set('title', e.target.value)} required />
            </div>
            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Description</label>
              <input className="input-field" placeholder="Short description"
                value={form.description} onChange={e => set('description', e.target.value)} />
            </div>
          </div>

          {/* YouTube URL */}
          <div>
            <label className="text-white/40 text-xs mb-1.5 flex items-center gap-1.5 block">
              <FiYoutube size={12} className="text-red-400" />YouTube URL *
            </label>
            <input className="input-field" placeholder="https://www.youtube.com/watch?v=..."
              value={form.youtube_url} onChange={e => handleUrlChange(e.target.value)} required />
          </div>

          {/* Thumbnail — custom upload OR auto from YouTube */}
          <div>
            <label className="text-white/40 text-xs mb-1.5 block">
              Custom Thumbnail
              <span className="text-white/20 ml-2">— leave empty to use YouTube auto-thumbnail</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              {/* Upload zone */}
              <div
                onDragOver={e => { e.preventDefault(); setDrag(true); }}
                onDragLeave={() => setDrag(false)}
                onDrop={e => { e.preventDefault(); setDrag(false); pickFile(e.dataTransfer.files[0]); }}
                onClick={() => fileRef.current.click()}
                className={`border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 min-h-[100px]
                  ${drag ? 'border-purple-400 bg-purple-500/10' : 'border-white/10 hover:border-purple-500/50 hover:bg-white/5'}`}>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => pickFile(e.target.files[0])} />
                {preview
                  ? <div className="relative">
                      <img src={preview} alt="custom thumb" className="h-20 w-36 object-cover rounded-lg" />
                      <button type="button" onClick={e => { e.stopPropagation(); setFile(null); setPreview(null); set('thumbnail_url',''); }}
                        className="absolute -top-2 -right-2 bg-red-500 rounded-full p-0.5 text-white"><FiX size={11} /></button>
                    </div>
                  : <>
                      <FiUploadCloud size={22} className="text-white/20 mb-1.5" />
                      <p className="text-white/30 text-xs text-center">Upload custom thumbnail</p>
                    </>
                }
              </div>

              {/* YouTube auto-thumb preview */}
              {ytPreview && !preview && (
                <div className="flex flex-col gap-2">
                  <p className="text-white/30 text-xs">Auto YouTube thumbnail:</p>
                  <div className="relative rounded-xl overflow-hidden">
                    <img src={ytPreview} alt="yt thumb" className="w-full h-24 object-cover rounded-xl" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-red-600/80 rounded-full p-2"><FiPlay size={14} className="text-white" /></div>
                    </div>
                  </div>
                  <p className="text-white/20 text-xs">This will be used automatically</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
              <FiPlus size={14} />{loading ? 'Saving...' : editId ? 'Update Video' : 'Add Video'}
            </button>
            {editId && <button type="button" onClick={cancel} className="btn-secondary flex items-center gap-2"><FiX size={14} />Cancel</button>}
          </div>
        </form>
      </motion.div>

      {/* Video cards grid */}
      {items.length === 0
        ? <div className="glass rounded-2xl p-12 text-center text-white/20 text-sm">
            <FiYoutube size={32} className="mx-auto mb-3 opacity-30" />
            No videos yet — add one above
          </div>
        : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {items.map((item, i) => {
                const thumb = getThumb(item);
                return (
                  <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.04 }}
                    className="glass rounded-2xl overflow-hidden group hover:border-purple-500/40 transition-all duration-200">
                    <div className="relative aspect-video bg-black/40">
                      {thumb
                        ? <img src={thumb} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        : <div className="w-full h-full flex items-center justify-center"><FiYoutube size={32} className="text-white/20" /></div>
                      }
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                        <div className="bg-red-600/90 rounded-full p-3"><FiPlay size={18} className="text-white" /></div>
                      </div>
                      {/* Hover actions */}
                      <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(item)} className="btn-warning p-1.5 rounded-lg"><FiEdit2 size={12} /></button>
                        <button onClick={() => handleDelete(item.id)} className="btn-danger p-1.5 rounded-lg"><FiTrash2 size={12} /></button>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-white font-semibold text-sm truncate">{item.title}</p>
                      {item.description && <p className="text-white/40 text-xs mt-0.5 truncate">{item.description}</p>}
                      <a href={item.youtube_url} target="_blank" rel="noopener noreferrer"
                        className="text-red-400/60 hover:text-red-400 text-xs mt-1.5 flex items-center gap-1 transition-colors">
                        <FiYoutube size={11} />View on YouTube
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
      }
    </div>
  );
}
