import { useEffect, useState } from 'react';

const TYPE_MS = 70;
const DELETE_MS = 35;
const HOLD_MS = 1800;
const GAP_MS = 350;

/** "I build <phrase>" where the phrase types, holds, deletes and moves to the next one. */
export default function TypedHeadline({ prefix, phrases }: { prefix: string; phrases: string[] }) {
  const reduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [i, setI] = useState(0);
  const [text, setText] = useState(reduced ? phrases[0] : '');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const full = phrases[i];
    let t: number;
    if (!deleting && text === full) t = window.setTimeout(() => setDeleting(true), HOLD_MS);
    else if (deleting && text === '') {
      t = window.setTimeout(() => {
        setDeleting(false);
        setI((i + 1) % phrases.length);
      }, GAP_MS);
    } else {
      t = window.setTimeout(
        () => setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1)),
        deleting ? DELETE_MS : TYPE_MS,
      );
    }
    return () => window.clearTimeout(t);
  }, [text, deleting, i, phrases, reduced]);

  const longest = phrases.reduce((a, b) => (b.length > a.length ? b : a), '');
  const spoken = `${prefix} ${phrases.slice(0, -1).join(', ')} and ${phrases[phrases.length - 1]}`.replace(/\.(?=,| and)/g, '');

  return (
    <h1 className="typed-h1">
      <span className="sr-only">{spoken}</span>
      <span aria-hidden="true">
        {prefix}{' '}
        <span className="typed-slot">
          <span className="typed-ghost">{longest}</span>
          <span className="typed-live accent">
            {text}
            <span className="typed-caret" />
          </span>
        </span>
      </span>
    </h1>
  );
}
