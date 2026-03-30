import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { HeroThreeScene } from '../../animations/threeScene';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<HeroThreeScene | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    sceneRef.current = new HeroThreeScene(canvasRef.current);

    const observer = new ResizeObserver(() => {
      if (containerRef.current && sceneRef.current) {
        sceneRef.current.resize(
          containerRef.current.clientWidth,
          containerRef.current.clientHeight
        );
      }
    });
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      sceneRef.current?.destroy();
    };
  }, []);

  const stats = [
    { value: '500+', label: 'Projects Done' },
    { value: '12+', label: 'Years Experience' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '50+', label: 'Design Awards' },
  ];

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #080910 0%, #0d0f1a 50%, #080910 100%)',
      }}
    >
      {/* Three.js canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      />

      {/* Gradient overlays */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,169,110,0.07) 0%, transparent 70%)',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(to top, var(--color-bg-primary), transparent)',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        className="section-container"
        style={{
          position: 'relative',
          zIndex: 3,
          paddingTop: '120px',
          paddingBottom: '80px',
          width: '100%',
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ display: 'inline-flex', marginBottom: '28px' }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(201,169,110,0.1)',
              border: '1px solid rgba(201,169,110,0.25)',
              borderRadius: '100px',
              padding: '6px 16px 6px 10px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <span style={{
              background: 'linear-gradient(135deg, #c9a96e, #e8c98a)',
              borderRadius: '50px',
              padding: '2px 8px',
              fontSize: '10px',
              fontWeight: 700,
              color: '#080910',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              Premium
            </span>
            <Sparkles size={13} color="#c9a96e" />
            <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
              Award-Winning Interior Design Studio
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(40px, 7vw, 88px)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: '24px',
            maxWidth: '780px',
          }}
        >
          Transform Your{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #c9a96e 0%, #e8c98a 50%, #c9a96e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Space
          </span>{' '}
          Into Art
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          style={{
            fontSize: 'clamp(16px, 2.5vw, 20px)',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.75,
            maxWidth: '560px',
            marginBottom: '44px',
            fontWeight: 400,
          }}
        >
          We design living spaces that inspire, breathe and tell your story — with a perfect balance of luxury, function and timeless elegance.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '64px' }}
        >
          <Link to="/gallery" style={{ textDecoration: 'none' }}>
            <Button size="lg" icon={<ArrowRight size={18} />}>
              Explore Designs
            </Button>
          </Link>
          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <Button size="lg" variant="ghost">
              Free Consultation
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          style={{
            display: 'flex',
            gap: 'clamp(24px, 4vw, 56px)',
            flexWrap: 'wrap',
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(26px, 3.5vw, 38px)',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #c9a96e, #e8c98a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </span>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '13px', letterSpacing: '0.04em', fontWeight: 500 }}>
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 3,
        }}
      >
        <span style={{ color: 'var(--color-text-muted)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--color-gold), transparent)',
          }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
