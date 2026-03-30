import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { pageVariants } from '../animations/motion';
import Services from '../components/sections/Services';
import Contact from '../components/sections/Contact';

const processSteps = [
  { num: '01', title: 'Discovery Call', desc: 'We listen deeply to understand your vision, lifestyle, and aesthetic preferences in a FREE 30-min consultation.', icon: '🎯' },
  { num: '02', title: 'Concept & Planning', desc: 'Our designers craft mood boards, space plans and material palettes — presenting 2–3 distinct design concepts.', icon: '📐' },
  { num: '03', title: '3D Visualization', desc: 'Photorealistic renders and virtual walkthroughs let you experience your redesigned space before any work begins.', icon: '🖥️' },
  { num: '04', title: 'Execution', desc: 'We coordinate vendors, manage quality control and deliver your project on time — completely stress-free for you.', icon: '🔨' },
  { num: '05', title: 'Handover & Beyond', desc: 'We do a complete walkthrough at handover and remain available for ongoing support after project completion.', icon: '🏠' },
];

const ServicesPage: React.FC = () => {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {/* Hero */}
      <section
        style={{
          paddingTop: '140px',
          paddingBottom: '80px',
          background: 'linear-gradient(180deg, rgba(124,92,191,0.06) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '50%', left: '-100px', transform: 'translateY(-50%)', width: '400px', height: '400px', background: 'rgba(124,92,191,0.07)', borderRadius: '50%', filter: 'blur(100px)' }} />
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <Link to="/" style={{ color: 'var(--color-text-muted)', fontSize: '14px', textDecoration: 'none' }}>Home</Link>
              <span style={{ color: 'var(--color-text-muted)' }}>/</span>
              <span style={{ color: 'var(--color-gold)', fontSize: '14px' }}>Services</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 6vw, 70px)', fontWeight: 700, lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-0.02em' }}>
              Our{' '}
              <span style={{ background: 'linear-gradient(135deg, #c9a96e, #e8c98a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Services
              </span>
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '18px', maxWidth: '560px', lineHeight: 1.7 }}>
              End-to-end interior design services — from initial concept through flawless execution. Every project is personal to us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section (reused component) */}
      <Services />

      {/* Our Process */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) 0', background: 'var(--color-bg-secondary)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '16px' }}>How We Work</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 4.5vw, 50px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.01em' }}>
              Our Design{' '}
              <span style={{ background: 'linear-gradient(135deg, #c9a96e, #e8c98a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Process</span>
            </h2>
          </motion.div>

          <div style={{ position: 'relative' }}>
            {/* Vertical connecting line */}
            <div style={{ position: 'absolute', left: '27px', top: '28px', bottom: '28px', width: '1px', background: 'linear-gradient(to bottom, var(--color-gold), rgba(124,92,191,0.4), transparent)', opacity: 0.35 }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingLeft: '0' }}>
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ x: 6, borderColor: 'rgba(201,169,110,0.25)' }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '24px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '18px',
                    padding: '28px',
                    backdropFilter: 'blur(10px)',
                    cursor: 'default',
                    transition: 'all 0.25s',
                  }}
                >
                  <div style={{ width: '56px', height: '56px', background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '14px', color: 'var(--color-gold)', letterSpacing: '0.02em' }}>
                    {step.num}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '22px' }}>{step.icon}</span>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{step.title}</h3>
                    </div>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: 1.75 }}>{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </motion.div>
  );
};

export default ServicesPage;
