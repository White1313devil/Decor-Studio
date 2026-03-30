import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { staggerContainer, staggerItem } from '../../animations/motion';

const categories = [
  {
    id: 1,
    slug: 'living-room',
    title: 'Living Room',
    description: 'Luxurious living spaces curated for comfort and style, where every detail speaks elegance.',
    count: 85,
    gradient: 'linear-gradient(135deg, #c9a96e22, #c9a96e05)',
    accent: '#c9a96e',
    emoji: '🛋️',
    tag: 'Most Popular',
  },
  {
    id: 2,
    slug: 'bedroom',
    title: 'Bedroom',
    description: 'Serene bedroom sanctuaries designed for restful sleep and refined personal expression.',
    count: 62,
    gradient: 'linear-gradient(135deg, #7c5cbf22, #7c5cbf05)',
    accent: '#9d7de0',
    emoji: '🛏️',
    tag: 'Trending',
  },
  {
    id: 3,
    slug: 'kitchen',
    title: 'Kitchen',
    description: 'Modern kitchens that marry precision engineering with timeless aesthetic beauty.',
    count: 48,
    gradient: 'linear-gradient(135deg, #60a5fa22, #60a5fa05)',
    accent: '#60a5fa',
    emoji: '🍳',
    tag: null,
  },
  {
    id: 4,
    slug: 'office',
    title: 'Office Space',
    description: 'Productivity-enhancing office environments designed for focus, creativity and collaboration.',
    count: 34,
    gradient: 'linear-gradient(135deg, #34d39922, #34d39905)',
    accent: '#34d399',
    emoji: '💼',
    tag: 'New',
  },
  {
    id: 5,
    slug: 'bathroom',
    title: 'Bathroom',
    description: 'Spa-inspired bathrooms that transform daily rituals into luxurious experiences.',
    count: 41,
    gradient: 'linear-gradient(135deg, #f472b622, #f472b605)',
    accent: '#f472b6',
    emoji: '🚿',
    tag: null,
  },
  {
    id: 6,
    slug: 'outdoor',
    title: 'Outdoor',
    description: 'Seamless indoor-outdoor living spaces that connect you beautifully with nature.',
    count: 28,
    gradient: 'linear-gradient(135deg, #fb923c22, #fb923c05)',
    accent: '#fb923c',
    emoji: '🌿',
    tag: null,
  },
];

const Categories: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id="categories"
      style={{
        padding: 'clamp(80px, 10vw, 120px) 0',
        background: 'var(--color-bg-secondary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div className="section-container">
        {/* Section Header */}
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
              fontFamily: 'var(--font-sans)',
            }}
          >
            What We Design
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
            Our Design{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #c9a96e, #e8c98a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Categories
            </span>
          </h2>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '17px',
              maxWidth: '540px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            From intimate bedrooms to expansive living rooms, we reimagine every corner with intention and craft.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: '24px',
          }}
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              variants={staggerItem}
            >
              <Link
                to={`/categories#${cat.slug}`}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <motion.div
                  style={{
                    background: cat.gradient,
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '20px',
                    padding: '32px',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                  }}
                  whileHover={{
                    y: -6,
                    borderColor: `${cat.accent}40`,
                    boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${cat.accent}22`,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                >
                  {/* Tag badge */}
                  {cat.tag && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: `${cat.accent}20`,
                        border: `1px solid ${cat.accent}40`,
                        borderRadius: '100px',
                        padding: '3px 10px',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: cat.accent,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {cat.tag}
                    </div>
                  )}

                  {/* Emoji */}
                  <div
                    style={{
                      fontSize: '42px',
                      marginBottom: '20px',
                      display: 'block',
                    }}
                  >
                    {cat.emoji}
                  </div>

                  {/* Content */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '22px',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      marginBottom: '10px',
                    }}
                  >
                    {cat.title}
                  </h3>
                  <p
                    style={{
                      color: 'var(--color-text-secondary)',
                      fontSize: '14px',
                      lineHeight: 1.7,
                      marginBottom: '24px',
                    }}
                  >
                    {cat.description}
                  </p>

                  {/* Footer row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span
                      style={{
                        fontSize: '13px',
                        color: 'var(--color-text-muted)',
                        fontWeight: 500,
                      }}
                    >
                      {cat.count}+ designs
                    </span>
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: cat.accent,
                      }}
                    >
                      Explore <ArrowRight size={14} />
                    </span>
                  </div>

                  {/* Corner glow */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-30px',
                      right: '-30px',
                      width: '100px',
                      height: '100px',
                      background: `radial-gradient(circle, ${cat.accent}15, transparent 70%)`,
                      borderRadius: '50%',
                      pointerEvents: 'none',
                    }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{ textAlign: 'center', marginTop: '48px' }}
        >
          <Link to="/categories" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'transparent',
                border: '1px solid rgba(201,169,110,0.35)',
                borderRadius: '10px',
                padding: '13px 36px',
                color: 'var(--color-gold)',
                fontSize: '14px',
                fontWeight: 600,
                fontFamily: 'var(--font-sans)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                letterSpacing: '0.02em',
                transition: 'all 0.2s',
              }}
            >
              View All Categories <ArrowRight size={16} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
