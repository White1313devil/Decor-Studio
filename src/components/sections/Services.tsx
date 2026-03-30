import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { staggerContainer, staggerItem } from '../../animations/motion';

const services = [
  {
    id: 1,
    icon: '🏠',
    title: 'Residential Design',
    description: 'Transform your home with bespoke interior design that reflects your unique personality and lifestyle.',
    features: ['Space Planning', 'Furniture Selection', 'Color Consultation', 'Lighting Design'],
    accent: '#c9a96e',
  },
  {
    id: 2,
    icon: '🏢',
    title: 'Commercial Interiors',
    description: 'Create inspiring workplaces and commercial spaces that elevate brand identity and productivity.',
    features: ['Workspace Design', 'Brand Integration', 'Ergonomic Planning', 'Modular Solutions'],
    accent: '#9d7de0',
  },
  {
    id: 3,
    icon: '🎨',
    title: '3D Visualization',
    description: 'Visualize your dream space before construction begins with photorealistic 3D renders and walkthroughs.',
    features: ['Photorealistic Renders', 'Virtual Walkthroughs', 'Material Previews', 'Multiple Concepts'],
    accent: '#60a5fa',
  },
  {
    id: 4,
    icon: '🔨',
    title: 'Renovation & Execution',
    description: 'End-to-end renovation management from demolition to final finishing with quality craftsmanship.',
    features: ['Project Management', 'Vendor Coordination', 'Quality Control', 'Timely Delivery'],
    accent: '#34d399',
  },
  {
    id: 5,
    icon: '💡',
    title: 'Smart Home Integration',
    description: 'Seamlessly integrate smart home technology into beautiful, functional interior environments.',
    features: ['Automation Planning', 'Lighting Control', 'Climate Systems', 'Security Design'],
    accent: '#f472b6',
  },
  {
    id: 6,
    icon: '🌿',
    title: 'Sustainable Design',
    description: 'Eco-conscious interiors using sustainable materials and energy-efficient design principles.',
    features: ['Eco Materials', 'Energy Efficiency', 'Biophilic Design', 'Green Certification'],
    accent: '#84cc16',
  },
];

const Services: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      id="services"
      style={{
        padding: 'clamp(80px, 10vw, 120px) 0',
        background: 'var(--color-bg-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative grid lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(201,169,110,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
          maskImage: 'radial-gradient(ellipse at center, transparent 20%, black 80%)',
        }}
      />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
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
            }}
          >
            What We Offer
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(32px, 5vw, 54px)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '20px',
              letterSpacing: '-0.01em',
            }}
          >
            Our{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #c9a96e, #e8c98a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Premium Services
            </span>
          </h2>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '17px',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Full-spectrum interior design services, from concept to completion, tailored precisely to your vision.
          </p>
        </motion.div>

        {/* Service Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
            gap: '24px',
          }}
        >
          {services.map((svc) => (
            <motion.div
              key={svc.id}
              variants={staggerItem}
            >
              <motion.div
                whileHover={{
                  y: -6,
                  boxShadow: `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px ${svc.accent}20`,
                  borderColor: `${svc.accent}30`,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '20px',
                  padding: '32px',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Corner accent */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '60px',
                    height: '3px',
                    background: `linear-gradient(90deg, ${svc.accent}, transparent)`,
                    borderTopLeftRadius: '20px',
                  }}
                />

                {/* Icon */}
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    background: `${svc.accent}15`,
                    border: `1px solid ${svc.accent}25`,
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    marginBottom: '24px',
                  }}
                >
                  {svc.icon}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '21px',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    marginBottom: '12px',
                  }}
                >
                  {svc.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '14px',
                    lineHeight: 1.7,
                    marginBottom: '24px',
                  }}
                >
                  {svc.description}
                </p>

                {/* Features list */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {svc.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '13px',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      <CheckCircle
                        size={14}
                        style={{ color: svc.accent, flexShrink: 0 }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* BG glow */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-40px',
                    right: '-40px',
                    width: '120px',
                    height: '120px',
                    background: `radial-gradient(circle, ${svc.accent}12, transparent 70%)`,
                    borderRadius: '50%',
                    pointerEvents: 'none',
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
