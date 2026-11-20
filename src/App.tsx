import { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Agentz from './pages/Agentz';
import Intro from './components/Intro';

const SEEN_KEY = 'intro-seen';

/** Show the intro once per browser session, only when landing on the plain home page. */
function shouldShowIntro(pathname: string, hash: string) {
  if (pathname !== '/' || hash) return false;
  try {
    return sessionStorage.getItem(SEEN_KEY) !== '1';
  } catch {
    return true;
  }
}

/** Scroll to the top on page change, or to the #anchor when the URL has one. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const { pathname, hash } = useLocation();
  const [showIntro, setShowIntro] = useState(() => shouldShowIntro(pathname, hash));
  const closeIntro = useCallback(() => {
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* storage blocked; the intro just shows again next visit */
    }
    setShowIntro(false);
  }, []);

  return (
    <>
      {showIntro && <Intro onDone={closeIntro} />}
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/agentz" element={<Agentz />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
