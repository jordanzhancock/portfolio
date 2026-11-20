import { useEffect, useRef, useState } from 'react';

const EXIT_MS = 900;

/** Full-screen aurora splash. Enter by button, Enter/Space/Esc, or scrolling. */
export default function Intro({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);

  const enter = () => setLeaving(true);

  useEffect(() => {
    btn.current?.focus({ preventScroll: true });
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (['Enter', ' ', 'Escape', 'ArrowDown', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        enter();
      }
    };
    const onWheel = (e: WheelEvent) => { if (e.deltaY > 10) enter(); };
    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => { if (touchY - e.touches[0].clientY > 40) enter(); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  useEffect(() => {
    if (!leaving) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = window.setTimeout(onDone, reduced ? 0 : EXIT_MS);
    return () => window.clearTimeout(t);
  }, [leaving, onDone]);

  return (
    <div className={`intro${leaving ? ' is-leaving' : ''}`} role="dialog" aria-modal="true" aria-label="Welcome">
      <div className="aurora" aria-hidden="true">
        <span className="ribbon r1" />
        <span className="ribbon r2" />
        <span className="ribbon r3" />
        <span className="ribbon r4" />
        <span className="glow" />
      </div>
      <div className="intro-stars" aria-hidden="true" />

      <div className="intro-content">
        <span className="intro-tag label">// miramar, fl · open to internships</span>
        <p className="intro-name">Jordan<br />Hancock</p>
        <p className="intro-sub">Full-stack engineer, heading into robotics.</p>
        <button ref={btn} type="button" className="intro-enter" onClick={enter}>
          <span>Enter the site</span>
          <span className="arrow" aria-hidden="true">→</span>
        </button>
        <span className="intro-hint" aria-hidden="true">press enter or scroll</span>
      </div>
    </div>
  );
}
