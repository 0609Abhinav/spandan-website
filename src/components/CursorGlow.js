import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const ref = useRef(null);
  const pos = useRef({ x: -400, y: -400 });
  const cur = useRef({ x: -400, y: -400 });
  const raf = useRef(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove);

    const animate = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.1;
      cur.current.y += (pos.current.y - cur.current.y) * 0.1;
      if (ref.current) {
        ref.current.style.transform = `translate(${cur.current.x - 144}px, ${cur.current.y - 144}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div ref={ref} className="fixed top-0 left-0 w-72 h-72 rounded-full pointer-events-none z-[9999] hidden md:block"
      style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, rgba(236,72,153,0.08) 50%, transparent 70%)', filter: 'blur(32px)' }} />
  );
}
