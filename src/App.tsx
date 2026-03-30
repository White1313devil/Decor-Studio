import React, { useEffect, useRef, useState, Component, type ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';
import WhatsAppWidget from './components/layout/WhatsAppWidget';
import './styles/globals.css';

// ── Error Boundary ────────────────────────────────────────────────────────────
interface EBState { hasError: boolean; error?: Error }
class ErrorBoundary extends Component<{ children: ReactNode }, EBState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error): EBState {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#080910', padding: '40px', textAlign: 'center', gap: '16px' }}>
          <p style={{ fontSize: '48px' }}>⚠️</p>
          <h2 style={{ fontFamily: 'serif', fontSize: '28px', color: '#c9a96e' }}>Something went wrong</h2>
          <pre style={{ color: 'rgba(240,237,232,0.5)', fontSize: '12px', maxWidth: '600px', overflow: 'auto', textAlign: 'left', padding: '16px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px' }}>
            {this.state.error?.message}
          </pre>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 28px', background: 'linear-gradient(135deg,#c9a96e,#a07840)', border: 'none', borderRadius: '8px', color: '#080910', fontWeight: 700, cursor: 'pointer', fontSize: '14px' }}>
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Custom Cursor ──────────────────────────────────────────────────────────────
// NOTE: we detect touch ONCE at module level — safe, no conditional hook call.
const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

const CustomCursor: React.FC = () => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isTouch) return;

    let ringX = 0, ringY = 0;
    let animId = 0;
    let curX = 0, curY = 0;

    const onMove = (e: MouseEvent) => {
      curX = e.clientX;
      curY = e.clientY;
      setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.left = `${curX}px`;
        dotRef.current.style.top  = `${curY}px`;
      }
    };

    const tick = () => {
      ringX += (curX - ringX) * 0.12;
      ringY += (curY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top  = `${ringY}px`;
      }
      animId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', () => setVisible(false));
    document.addEventListener('mouseenter', () => setVisible(true));
    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animId);
    };
  }, []); // ← empty deps: run once

  if (isTouch) return null;

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  style={{ opacity: visible ? 1 : 0, transform: 'translate(-50%,-50%)' }} />
      <div ref={ringRef} className="cursor-ring" style={{ opacity: visible ? 1 : 0, transform: 'translate(-50%,-50%)' }} />
    </>
  );
};

// ── Read-progress bar ─────────────────────────────────────────────────────────
const ProgressBar: React.FC = () => {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const v  = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setPct(isNaN(v) ? 0 : Math.min(100, v));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.div
      style={{
        position: 'fixed', top: 0, left: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #c9a96e, #e8c98a)',
        zIndex: 9999,
        transformOrigin: 'left center',
      }}
      animate={{ width: `${pct}%` }}
      transition={{ duration: 0.1, ease: 'linear' }}
    />
  );
};

// ── Scroll-to-top ─────────────────────────────────────────────────────────────
const ScrollTopBtn: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.button
      initial={false}
      animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.8, pointerEvents: show ? 'auto' : 'none' }}
      transition={{ duration: 0.25 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.93 }}
      aria-label="Scroll to top"
      style={{
        position: 'fixed', bottom: '100px', right: '34px',
        width: '44px', height: '44px',
        background: 'linear-gradient(135deg, #c9a96e, #a07840)',
        border: 'none', borderRadius: '12px', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 800, boxShadow: '0 4px 20px rgba(201,169,110,0.4)',
        fontSize: '18px', color: '#080910',
      }}
    >
      ↑
    </motion.button>
  );
};

// ── App root ──────────────────────────────────────────────────────────────────
const App: React.FC = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-bg-primary)' }}>
        <CustomCursor />
        <ProgressBar />
        <Header />
        <main style={{ flex: 1 }}>
          <AppRoutes />
        </main>
        <Footer />
        <ScrollTopBtn />
        <WhatsAppWidget />
      </div>
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
