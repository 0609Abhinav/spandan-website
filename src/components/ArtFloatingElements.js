import React from 'react';
import { motion } from 'framer-motion';

/* ═══════════════════════════════════════════
   SVG ART ICONS  — all hand-crafted
═══════════════════════════════════════════ */

const Brush = ({ size, color, opacity }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ opacity }}>
    <path d="M14 50 C14 50 20 44 28 36 L46 12 C48 9 53 8.5 56 11.5 C59 14.5 58.5 19.5 55.5 21.5 L32 36 C24 44 14 50 14 50Z"
      stroke={color} strokeWidth="2.5" fill={color} fillOpacity="0.13" strokeLinecap="round" strokeLinejoin="round"/>
    <ellipse cx="13" cy="51" rx="6" ry="4.5" fill={color} fillOpacity="0.45"/>
    <path d="M28 36 L46 12" stroke={color} strokeWidth="1.2" strokeDasharray="4 3" opacity="0.35"/>
    {/* bristle lines */}
    <path d="M16 48 L20 44" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
    <path d="M18 52 L22 48" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
  </svg>
);

const Palette = ({ size, color, opacity }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ opacity }}>
    <path d="M32 6C18 6 7 17 7 31C7 39 11 46 18 50C21 52 24 50 24 47V44C24 41 26 39 29 39H35C43 39 52 32 52 24C52 14 43 6 32 6Z"
      stroke={color} strokeWidth="2.5" fill={color} fillOpacity="0.1" strokeLinecap="round"/>
    {/* paint dots */}
    <circle cx="17" cy="29" r="3.5" fill="#f472b6" fillOpacity="0.75"/>
    <circle cx="22" cy="17" r="3.5" fill="#f97316" fillOpacity="0.75"/>
    <circle cx="33" cy="13" r="3.5" fill="#a855f7" fillOpacity="0.75"/>
    <circle cx="43" cy="20" r="3.5" fill="#06b6d4" fillOpacity="0.75"/>
    <circle cx="46" cy="31" r="3.5" fill="#84cc16" fillOpacity="0.65"/>
    {/* thumb hole */}
    <circle cx="29" cy="44" r="4" stroke={color} strokeWidth="2" fill="none" opacity="0.5"/>
  </svg>
);

const PaintTube = ({ size, color, opacity }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ opacity }}>
    <rect x="20" y="8" width="24" height="36" rx="6" stroke={color} strokeWidth="2.5" fill={color} fillOpacity="0.12"/>
    <rect x="24" y="44" width="16" height="7" rx="2" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.2"/>
    <path d="M29 51 L32 58 L35 51" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="22" y="8" width="20" height="8" rx="3" fill={color} fillOpacity="0.4"/>
    {/* label lines */}
    <path d="M25 22 Q32 19 39 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <path d="M25 28 Q32 25 39 28" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
    {/* squeeze marks */}
    <path d="M22 36 Q32 33 42 36" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.35"/>
  </svg>
);

const Pencil = ({ size, color, opacity }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ opacity }}>
    <path d="M14 50 L20 44 L48 14 C50 12 54 12 56 14 C58 16 58 20 56 22 L28 52 L14 50Z"
      stroke={color} strokeWidth="2.5" fill={color} fillOpacity="0.12" strokeLinejoin="round"/>
    <path d="M14 50 L16 56 L22 54 L20 44 Z" fill={color} fillOpacity="0.45"/>
    {/* wood grain */}
    <path d="M20 44 L48 14" stroke={color} strokeWidth="1" strokeDasharray="4 3" opacity="0.3"/>
    <path d="M24 48 L52 18" stroke={color} strokeWidth="0.8" opacity="0.2"/>
    {/* eraser */}
    <rect x="50" y="10" width="8" height="6" rx="2" fill="#f9a8d4" fillOpacity="0.5"/>
  </svg>
);

const Easel = ({ size, color, opacity }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ opacity }}>
    {/* canvas */}
    <rect x="12" y="6" width="40" height="32" rx="3" stroke={color} strokeWidth="2.5" fill={color} fillOpacity="0.1"/>
    {/* canvas inner sketch */}
    <path d="M18 28 Q26 18 36 22 Q44 26 46 18" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
    <circle cx="22" cy="14" r="3" fill={color} fillOpacity="0.25"/>
    {/* legs */}
    <line x1="32" y1="38" x2="32" y2="58" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="18" y1="58" x2="32" y2="38" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="46" y1="58" x2="32" y2="38" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    {/* shelf */}
    <line x1="10" y1="18" x2="54" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    {/* cross brace */}
    <line x1="22" y1="48" x2="42" y2="48" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
  </svg>
);

const Droplet = ({ size, color, opacity }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ opacity }}>
    <path d="M32 6 C32 6 12 28 12 40 C12 52 21 60 32 60 C43 60 52 52 52 40 C52 28 32 6 32 6Z"
      stroke={color} strokeWidth="2.5" fill={color} fillOpacity="0.18" strokeLinejoin="round"/>
    {/* shine */}
    <path d="M22 38 Q25 30 30 34" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.35"/>
    <circle cx="26" cy="28" r="2" fill="white" fillOpacity="0.2"/>
  </svg>
);

const Star = ({ size, color, opacity }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ opacity }}>
    <path d="M32 4 L38 22H57L42 33L48 51L32 40L16 51L22 33L7 22H26Z"
      stroke={color} strokeWidth="2" fill={color} fillOpacity="0.2" strokeLinejoin="round"/>
    {/* inner glow star */}
    <path d="M32 14 L35 24H45L37 30L40 40L32 34L24 40L27 30L19 24H29Z"
      fill={color} fillOpacity="0.15"/>
  </svg>
);

const Sparkle = ({ size, color, opacity }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ opacity }}>
    <path d="M32 4 L35 29 L60 32 L35 35 L32 60 L29 35 L4 32 L29 29 Z"
      fill={color} fillOpacity="0.55"/>
    {/* small cross sparkles */}
    <path d="M52 12 L53 18 L59 19 L53 20 L52 26 L51 20 L45 19 L51 18 Z" fill={color} fillOpacity="0.4"/>
    <path d="M10 44 L11 48 L15 49 L11 50 L10 54 L9 50 L5 49 L9 48 Z" fill={color} fillOpacity="0.35"/>
  </svg>
);

const Quill = ({ size, color, opacity }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ opacity }}>
    {/* feather */}
    <path d="M54 6 C54 6 20 20 14 50 L18 54 C18 54 28 28 54 6Z"
      stroke={color} strokeWidth="2" fill={color} fillOpacity="0.12" strokeLinecap="round"/>
    <path d="M54 6 C54 6 38 22 32 44" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    {/* barbs */}
    <path d="M46 14 C40 18 36 24 34 30" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
    <path d="M40 20 C34 24 30 30 28 36" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.35"/>
    <path d="M34 28 C28 32 24 38 22 44" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
    {/* nib */}
    <path d="M14 50 L10 58 L18 54 Z" fill={color} fillOpacity="0.5"/>
  </svg>
);

const InkBottle = ({ size, color, opacity }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ opacity }}>
    {/* bottle body */}
    <path d="M18 28 L14 52 C14 55 17 58 20 58 L44 58 C47 58 50 55 50 52 L46 28 Z"
      stroke={color} strokeWidth="2.5" fill={color} fillOpacity="0.12" strokeLinejoin="round"/>
    {/* neck */}
    <rect x="24" y="14" width="16" height="14" rx="3" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.15"/>
    {/* cap */}
    <rect x="22" y="8" width="20" height="8" rx="3" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1.5"/>
    {/* ink level */}
    <path d="M16 44 Q32 40 48 44" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <path d="M15 50 Q32 46 49 50" fill={color} fillOpacity="0.2" stroke="none"/>
    {/* shine */}
    <path d="M20 34 Q22 30 24 34" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.25"/>
  </svg>
);

const Compass = ({ size, color, opacity }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ opacity }}>
    <circle cx="32" cy="32" r="24" stroke={color} strokeWidth="2" fill="none" opacity="0.3"/>
    <circle cx="32" cy="32" r="3" fill={color} fillOpacity="0.6"/>
    {/* needle */}
    <path d="M32 32 L44 14" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M32 32 L20 50" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    {/* cardinal marks */}
    <path d="M32 10 L32 14" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    <path d="M32 50 L32 54" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    <path d="M10 32 L14 32" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    <path d="M50 32 L54 32" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

const Flower = ({ size, color, opacity }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ opacity }}>
    {/* petals */}
    {[0,60,120,180,240,300].map((deg, i) => (
      <ellipse key={i} cx="32" cy="18" rx="6" ry="10"
        fill={i % 2 === 0 ? color : '#f472b6'} fillOpacity="0.3"
        stroke={color} strokeWidth="1" opacity="0.7"
        transform={`rotate(${deg} 32 32)`}/>
    ))}
    <circle cx="32" cy="32" r="7" fill={color} fillOpacity="0.5"/>
    <circle cx="32" cy="32" r="4" fill="white" fillOpacity="0.2"/>
  </svg>
);

const Rangoli = ({ size, color, opacity }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ opacity }}>
    <circle cx="32" cy="32" r="26" stroke={color} strokeWidth="1.5" fill="none" opacity="0.4"/>
    <circle cx="32" cy="32" r="18" stroke={color} strokeWidth="1.5" fill="none" opacity="0.35"/>
    <circle cx="32" cy="32" r="10" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.1" opacity="0.5"/>
    {/* petal pattern */}
    {[0,45,90,135,180,225,270,315].map((deg, i) => (
      <ellipse key={i} cx="32" cy="14" rx="3" ry="7"
        fill={i % 2 === 0 ? color : '#f472b6'} fillOpacity="0.35"
        transform={`rotate(${deg} 32 32)`}/>
    ))}
    {/* dots */}
    {[0,60,120,180,240,300].map((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      return <circle key={i} cx={32 + 22 * Math.sin(rad)} cy={32 - 22 * Math.cos(rad)} r="2.5"
        fill={color} fillOpacity="0.55"/>;
    })}
    <circle cx="32" cy="32" r="4" fill={color} fillOpacity="0.6"/>
  </svg>
);

const SprayCan = ({ size, color, opacity }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ opacity }}>
    {/* can body */}
    <rect x="20" y="22" width="24" height="36" rx="5" stroke={color} strokeWidth="2.5" fill={color} fillOpacity="0.12"/>
    {/* cap */}
    <rect x="24" y="14" width="16" height="10" rx="3" fill={color} fillOpacity="0.35" stroke={color} strokeWidth="2"/>
    {/* nozzle */}
    <rect x="36" y="10" width="10" height="5" rx="2" fill={color} fillOpacity="0.5"/>
    {/* spray dots */}
    <circle cx="50" cy="6" r="2" fill={color} fillOpacity="0.5"/>
    <circle cx="55" cy="10" r="1.5" fill={color} fillOpacity="0.4"/>
    <circle cx="52" cy="14" r="1.5" fill={color} fillOpacity="0.35"/>
    <circle cx="57" cy="6" r="1" fill={color} fillOpacity="0.3"/>
    <circle cx="58" cy="14" r="1" fill={color} fillOpacity="0.25"/>
    {/* label */}
    <path d="M25 34 Q32 31 39 34" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.45"/>
    <path d="M25 40 Q32 37 39 40" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
  </svg>
);

const Sketchbook = ({ size, color, opacity }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ opacity }}>
    {/* book body */}
    <rect x="12" y="8" width="40" height="50" rx="4" stroke={color} strokeWidth="2.5" fill={color} fillOpacity="0.1"/>
    {/* spine */}
    <rect x="12" y="8" width="8" height="50" rx="3" fill={color} fillOpacity="0.25"/>
    {/* binding rings */}
    {[16, 26, 36, 46].map(y => (
      <circle key={y} cx="16" cy={y} r="3" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6"/>
    ))}
    {/* sketch lines */}
    <path d="M26 20 L48 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    <path d="M26 28 L44 28" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.35"/>
    <path d="M26 36 L48 36" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
    {/* small sketch */}
    <path d="M28 44 Q34 40 40 44 Q44 48 36 50 Q28 52 28 44Z" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.15" opacity="0.5"/>
  </svg>
);

const ClayPot = ({ size, color, opacity }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ opacity }}>
    {/* pot body */}
    <path d="M20 28 C16 32 14 40 16 48 C18 54 24 58 32 58 C40 58 46 54 48 48 C50 40 48 32 44 28 Z"
      stroke={color} strokeWidth="2.5" fill={color} fillOpacity="0.15" strokeLinejoin="round"/>
    {/* neck */}
    <path d="M22 28 C22 22 26 18 32 18 C38 18 42 22 42 28"
      stroke={color} strokeWidth="2.5" fill={color} fillOpacity="0.1" strokeLinecap="round"/>
    {/* rim */}
    <ellipse cx="32" cy="18" rx="12" ry="4" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.2"/>
    {/* opening */}
    <ellipse cx="32" cy="14" rx="8" ry="3" fill={color} fillOpacity="0.3"/>
    {/* texture lines */}
    <path d="M18 38 Q32 34 46 38" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
    <path d="M16 46 Q32 42 48 46" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.35"/>
    {/* shine */}
    <path d="M22 32 Q24 28 26 32" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.25"/>
  </svg>
);

const Ribbon = ({ size, color, opacity }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ opacity }}>
    {/* bow loops */}
    <path d="M32 32 C28 24 14 18 12 26 C10 34 24 36 32 32Z"
      stroke={color} strokeWidth="2" fill={color} fillOpacity="0.2" strokeLinejoin="round"/>
    <path d="M32 32 C36 24 50 18 52 26 C54 34 40 36 32 32Z"
      stroke={color} strokeWidth="2" fill={color} fillOpacity="0.2" strokeLinejoin="round"/>
    {/* tails */}
    <path d="M32 32 L22 52 C20 56 16 56 16 52" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
    <path d="M32 32 L42 52 C44 56 48 56 48 52" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
    {/* center knot */}
    <circle cx="32" cy="32" r="4" fill={color} fillOpacity="0.55"/>
  </svg>
);

/* ═══════════════════════════════════════════
   ELEMENT LAYOUT — 28 elements, spread across
   the full page with varied sizes & positions
═══════════════════════════════════════════ */
const ELEMENTS = [
  // ── left edge ──
  { id:1,  C: Brush,      sz:72,  col:'#a855f7', x:'2%',   y:'5%',   r:-35, dur:8,  del:0    },
  { id:2,  C: PaintTube,  sz:60,  col:'#f97316', x:'1%',   y:'28%',  r:20,  dur:9,  del:2    },
  { id:3,  C: Droplet,    sz:48,  col:'#38bdf8', x:'3%',   y:'52%',  r:-10, dur:7,  del:1.5  },
  { id:4,  C: ClayPot,    sz:68,  col:'#f97316', x:'0%',   y:'72%',  r:5,   dur:11, del:3.5  },
  { id:5,  C: Sparkle,    sz:36,  col:'#c084fc', x:'8%',   y:'88%',  r:0,   dur:5,  del:1    },

  // ── right edge ──
  { id:6,  C: Palette,    sz:78,  col:'#ec4899', x:'88%',  y:'4%',   r:15,  dur:10, del:0.5  },
  { id:7,  C: Pencil,     sz:64,  col:'#818cf8', x:'91%',  y:'26%',  r:-50, dur:11, del:1.2  },
  { id:8,  C: Easel,      sz:80,  col:'#a78bfa', x:'85%',  y:'50%',  r:5,   dur:12, del:3    },
  { id:9,  C: SprayCan,   sz:62,  col:'#34d399', x:'90%',  y:'72%',  r:-15, dur:9,  del:2.2  },
  { id:10, C: Ribbon,     sz:52,  col:'#f472b6', x:'87%',  y:'88%',  r:10,  dur:7,  del:0.8  },

  // ── top strip ──
  { id:11, C: Quill,      sz:66,  col:'#c084fc', x:'18%',  y:'2%',   r:30,  dur:9,  del:1.8  },
  { id:12, C: Star,       sz:44,  col:'#f472b6', x:'35%',  y:'1%',   r:0,   dur:6,  del:0.3  },
  { id:13, C: Brush,      sz:54,  col:'#f472b6', x:'52%',  y:'3%',   r:65,  dur:8,  del:2.5  },
  { id:14, C: Sparkle,    sz:32,  col:'#fbbf24', x:'68%',  y:'2%',   r:0,   dur:5,  del:1.4  },

  // ── bottom strip ──
  { id:15, C: Rangoli,    sz:72,  col:'#a855f7', x:'15%',  y:'88%',  r:0,   dur:10, del:4    },
  { id:16, C: InkBottle,  sz:58,  col:'#818cf8', x:'32%',  y:'90%',  r:-8,  dur:8,  del:2.8  },
  { id:17, C: Flower,     sz:56,  col:'#ec4899', x:'50%',  y:'91%',  r:0,   dur:7,  del:1.6  },
  { id:18, C: Compass,    sz:60,  col:'#06b6d4', x:'66%',  y:'89%',  r:20,  dur:9,  del:3.2  },

  // ── scattered mid ──
  { id:19, C: Sketchbook, sz:70,  col:'#a78bfa', x:'20%',  y:'38%',  r:-8,  dur:11, del:0.6  },
  { id:20, C: Droplet,    sz:40,  col:'#f472b6', x:'42%',  y:'45%',  r:0,   dur:6,  del:3.8  },
  { id:21, C: Star,       sz:38,  col:'#fbbf24', x:'60%',  y:'35%',  r:25,  dur:7,  del:2.1  },
  { id:22, C: Flower,     sz:50,  col:'#a855f7', x:'75%',  y:'40%',  r:0,   dur:8,  del:1    },
  { id:23, C: Rangoli,    sz:64,  col:'#ec4899', x:'38%',  y:'68%',  r:0,   dur:10, del:4.5  },
  { id:24, C: Quill,      sz:52,  col:'#f97316', x:'58%',  y:'62%',  r:-25, dur:9,  del:0.9  },
  { id:25, C: InkBottle,  sz:50,  col:'#34d399', x:'12%',  y:'18%',  r:10,  dur:8,  del:3    },
  { id:26, C: Compass,    sz:56,  col:'#a855f7', x:'72%',  y:'18%',  r:-20, dur:10, del:1.7  },
  { id:27, C: SprayCan,   sz:54,  col:'#f472b6', x:'28%',  y:'75%',  r:15,  dur:9,  del:2.4  },
  { id:28, C: ClayPot,    sz:58,  col:'#c084fc', x:'80%',  y:'22%',  r:-5,  dur:11, del:0.4  },
];

export default function ArtFloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }} aria-hidden="true">
      {ELEMENTS.map(({ id, C, sz, col, x, y, r, dur, del }) => (
        <motion.div
          key={id}
          style={{ position: 'absolute', left: x, top: y, filter: `drop-shadow(0 0 8px ${col}55)` }}
          animate={{
            y:      [0, -20, 4, -12, 0],
            x:      [0,   7, 0,  -7, 0],
            rotate: [r, r + 9, r, r - 9, r],
            scale:  [1, 1.06, 1, 0.96, 1],
          }}
          transition={{ duration: dur, delay: del, repeat: Infinity, ease: 'easeInOut' }}
        >
          <C size={sz} color={col} opacity={0.22} />
        </motion.div>
      ))}
    </div>
  );
}
