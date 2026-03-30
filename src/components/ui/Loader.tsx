import React from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  fullPage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ fullPage = false, size = 'md', text }) => {
  const sizes = { sm: 32, md: 56, lg: 80 };
  const s = sizes[size];

  const Spinner = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <div style={{ position: 'relative', width: s, height: s }}>
        {/* Outer ring */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: `2px solid rgba(201, 169, 110, 0.15)`,
            borderTopColor: 'var(--color-gold)',
          }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
        />
        {/* Inner ring */}
        <motion.div
          style={{
            position: 'absolute',
            inset: '8px',
            borderRadius: '50%',
            border: `1.5px solid rgba(124, 92, 191, 0.2)`,
            borderBottomColor: 'var(--color-accent)',
          }}
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
        />
        {/* Center dot */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--color-gold)',
          }}
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </div>
      {text && (
        <p
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: '14px',
            fontFamily: 'var(--font-sans)',
            letterSpacing: '0.05em',
          }}
        >
          {text}
        </p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--color-bg-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}
      >
        {Spinner}
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 0',
      }}
    >
      {Spinner}
    </div>
  );
};

// Skeleton variants
export const SkeletonCard: React.FC = () => (
  <div
    style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '16px',
      padding: '24px',
      overflow: 'hidden',
    }}
  >
    <div className="skeleton" style={{ height: '200px', borderRadius: '10px', marginBottom: '16px' }} />
    <div className="skeleton" style={{ height: '20px', borderRadius: '6px', marginBottom: '10px', width: '70%' }} />
    <div className="skeleton" style={{ height: '14px', borderRadius: '6px', marginBottom: '8px' }} />
    <div className="skeleton" style={{ height: '14px', borderRadius: '6px', width: '85%' }} />
  </div>
);

export const SkeletonText: React.FC<{ lines?: number }> = ({ lines = 3 }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="skeleton"
        style={{ height: '14px', borderRadius: '6px', width: i === lines - 1 ? '65%' : '100%' }}
      />
    ))}
  </div>
);

export default Loader;
