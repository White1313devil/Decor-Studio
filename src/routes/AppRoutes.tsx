import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Loader from '../components/ui/Loader';

// Lazy-loaded pages
const Home          = lazy(() => import('../pages/Home'));
const CategoriesPage = lazy(() => import('../pages/CategoriesPage'));
const ServicesPage  = lazy(() => import('../pages/ServicesPage'));
const GalleryPage   = lazy(() => import('../pages/GalleryPage'));
const ContactPage   = lazy(() => import('../pages/ContactPage'));

// 404 page (inline — small)
const NotFound: React.FC = () => (
  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      gap: '20px',
      padding: '40px',
    }}
  >
    <div style={{ fontSize: '80px' }}>🏡</div>
    <h1
      style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(40px, 8vw, 80px)',
        fontWeight: 700,
        background: 'linear-gradient(135deg, #c9a96e, #e8c98a)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      404
    </h1>
    <p style={{ color: 'var(--color-text-secondary)', fontSize: '18px', maxWidth: '400px', lineHeight: 1.7 }}>
      Looks like this room doesn't exist yet. Let's take you back home.
    </p>
    <a
      href="/"
      style={{
        marginTop: '8px',
        padding: '13px 32px',
        background: 'linear-gradient(135deg, #c9a96e, #a07840)',
        borderRadius: '10px',
        color: '#080910',
        fontWeight: 700,
        textDecoration: 'none',
        fontSize: '15px',
        fontFamily: 'var(--font-sans)',
      }}
    >
      Back to Home
    </a>
  </div>
);

const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<Loader fullPage text="Loading page…" />}>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/"           element={<Home />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/services"   element={<ServicesPage />} />
          <Route path="/gallery"    element={<GalleryPage />} />
          <Route path="/contact"    element={<ContactPage />} />
          <Route path="*"           element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

export default AppRoutes;
