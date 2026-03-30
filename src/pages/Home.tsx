import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/sections/Hero';
import Categories from '../components/sections/Categories';
import Services from '../components/sections/Services';
import Gallery from '../components/sections/Gallery';
import Contact from '../components/sections/Contact';
import { pageVariants, staggerContainer, staggerItem } from '../animations/motion';

// ── Testimonials ──────────────────────────────────────────────────────────────

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Homeowner, Hosur',
    content:
      'Decor Studio completely transformed our home. The attention to detail and the final outcome exceeded every expectation we had. Simply breathtaking!',
    rating: 5,
    initials: 'PS',
    accent: '#c9a96e',
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    role: 'CEO, TechStart India',
    content:
      'Our office renovation was handled with impeccable professionalism. Employee satisfaction went up 40% since the redesign. Outstanding work.',
    rating: 5,
    initials: 'RK',
    accent: '#9d7de0',
  },
  {
    id: 3,
    name: 'Ananya Menon',
    role: 'Architect, Bangalore',
    content:
      "As an architect I have very high standards. SAI's team met every single one. The 3D visualization before execution was incredibly accurate.",
    rating: 5,
    initials: 'AM',
    accent: '#34d399',
  },
];

const TestimonialsSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      style={{
        padding: 'clamp(80px, 10vw, 120px) 0',
        background:
          'linear-gradient(135deg, rgba(201,169,110,0.04) 0%, transparent 50%, rgba(124,92,191,0.04) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative quote */}
      <div
        style={{
          position: 'absolute',
          top: '40px',
          left: '5%',
          fontSize: '200px',
          color: 'rgba(201,169,110,0.04)',
          fontFamily: 'serif',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        "
      </div>

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <span
            style={{
              display: 'inline-block',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
              marginBottom: '16px',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Client Stories
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(30px, 4.5vw, 50px)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
            }}
          >
            What Our Clients{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #c9a96e, #e8c98a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Say
            </span>
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '24px',
          }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={staggerItem}
              whileHover={{ y: -6, borderColor: `${t.accent}30` }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              style={{
                padding: '32px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Big quote */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '20px',
                  fontSize: '56px',
                  color: `${t.accent}20`,
                  fontFamily: 'serif',
                  lineHeight: 1,
                }}
              >
                "
              </div>

              {/* Stars */}
              <div style={{ display: 'flex', gap: '3px', marginBottom: '18px' }}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} style={{ color: '#c9a96e', fontSize: '16px' }}>
                    ★
                  </span>
                ))}
              </div>

              {/* Content */}
              <p
                style={{
                  color: 'var(--color-text-secondary)',
                  fontSize: '15px',
                  lineHeight: 1.8,
                  marginBottom: '28px',
                  fontStyle: 'italic',
                }}
              >
                "{t.content}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    background: `linear-gradient(135deg, ${t.accent}, ${t.accent}99)`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '14px',
                    color: '#080910',
                    flexShrink: 0,
                    letterSpacing: '0.02em',
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: '15px',
                      color: 'var(--color-text-primary)',
                      marginBottom: '2px',
                    }}
                  >
                    {t.name}
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{t.role}</p>
                </div>
              </div>

              {/* Corner accent */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '50px',
                  height: '3px',
                  background: `linear-gradient(90deg, ${t.accent}, transparent)`,
                  borderTopLeftRadius: '20px',
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ── CTA Banner ─────────────────────────────────────────────────────────────────

const CTABanner: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      style={{
        padding: 'clamp(64px, 8vw, 100px) 0',
        background: 'var(--color-bg-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,169,110,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            textAlign: 'center',
            padding: 'clamp(40px, 6vw, 72px)',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(201,169,110,0.15)',
            borderRadius: '28px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Corner glows */}
          <div
            style={{
              position: 'absolute',
              top: '-60px',
              left: '-60px',
              width: '200px',
              height: '200px',
              background: 'rgba(201,169,110,0.08)',
              borderRadius: '50%',
              filter: 'blur(60px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-60px',
              right: '-60px',
              width: '200px',
              height: '200px',
              background: 'rgba(124,92,191,0.08)',
              borderRadius: '50%',
              filter: 'blur(60px)',
            }}
          />

          <span
            style={{
              display: 'inline-block',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
              marginBottom: '20px',
            }}
          >
            Ready to Begin?
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 4.5vw, 52px)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '20px',
              letterSpacing: '-0.01em',
            }}
          >
            Your Dream Space Awaits
          </h2>

          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '17px',
              maxWidth: '480px',
              margin: '0 auto 36px',
              lineHeight: 1.7,
            }}
          >
            Book a FREE 30-minute consultation and take the first step toward a space you'll love waking up to every day.
          </p>

          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(201,169,110,0.4)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '16px 48px',
                background: 'linear-gradient(135deg, #c9a96e, #e8c98a, #a07840)',
                border: 'none',
                borderRadius: '12px',
                color: '#080910',
                fontFamily: 'var(--font-sans)',
                fontSize: '16px',
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '0.02em',
              }}
            >
              Book Free Consultation
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// ── Home Page ──────────────────────────────────────────────────────────────────

const Home: React.FC = () => (
  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
    <Hero />
    <Categories />
    <Services />
    <TestimonialsSection />
    <Gallery />
    <CTABanner />
    <Contact />
  </motion.div>
);

export default Home;
