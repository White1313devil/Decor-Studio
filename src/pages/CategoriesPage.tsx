import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Filter } from 'lucide-react';
import { pageVariants, staggerContainer, staggerItem } from '../animations/motion';

const allCategories = [
  { id: 1, slug: 'living-room', title: 'Living Room', emoji: '🛋️', count: 85, accent: '#c9a96e', tag: 'Most Popular', description: 'Curated living spaces that balance luxury, warmth, and functional elegance for modern families.', images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&auto=format&fit=crop'] },
  { id: 2, slug: 'bedroom', title: 'Bedroom', emoji: '🛏️', count: 62, accent: '#9d7de0', tag: 'Trending', description: 'Serene bedroom sanctuaries crafted for rest, romance and refined personal expression.', images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&auto=format&fit=crop'] },
  { id: 3, slug: 'kitchen', title: 'Kitchen', emoji: '🍳', count: 48, accent: '#60a5fa', tag: null, description: 'Precision-engineered modern kitchens that are as beautiful as they are functional.', images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&auto=format&fit=crop'] },
  { id: 4, slug: 'office', title: 'Office Space', emoji: '💼', count: 34, accent: '#34d399', tag: 'New', description: 'Inspiring work environments that boost creativity, focus and team collaboration.', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&auto=format&fit=crop'] },
  { id: 5, slug: 'bathroom', title: 'Bathroom', emoji: '🚿', count: 41, accent: '#f472b6', tag: null, description: 'Spa-inspired bathrooms that turn daily routines into luxurious, revitalizing rituals.', images: ['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop'] },
  { id: 6, slug: 'outdoor', title: 'Outdoor', emoji: '🌿', count: 28, accent: '#fb923c', tag: null, description: 'Seamless indoor-outdoor living spaces that bring nature beautifully into your home.', images: ['https://images.unsplash.com/photo-1551913902-c92207136625?w=600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop'] },
  { id: 7, slug: 'dining', title: 'Dining Room', emoji: '🍽️', count: 37, accent: '#e879f9', tag: null, description: 'Elegant dining spaces designed to make every meal a memorable, convivial experience.', images: ['https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&auto=format&fit=crop'] },
  { id: 8, slug: 'kids', title: "Kids' Room", emoji: '🎨', count: 22, accent: '#facc15', tag: null, description: 'Vibrant, safe and imaginative spaces that grow with your child and spark curiosity.', images: ['https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&auto=format&fit=crop'] },
];

const CategoriesPage: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true });

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {/* Page Hero */}
      <section
        style={{
          paddingTop: '140px',
          paddingBottom: '80px',
          background: 'linear-gradient(180deg, rgba(201,169,110,0.06) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* BG orb */}
        <div style={{ position: 'absolute', top: '50%', right: '-100px', transform: 'translateY(-50%)', width: '400px', height: '400px', background: 'rgba(201,169,110,0.06)', borderRadius: '50%', filter: 'blur(100px)' }} />
        <div className="section-container" ref={headerRef}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <Link to="/" style={{ color: 'var(--color-text-muted)', fontSize: '14px', textDecoration: 'none' }}>Home</Link>
              <span style={{ color: 'var(--color-text-muted)' }}>/</span>
              <span style={{ color: 'var(--color-gold)', fontSize: '14px' }}>Categories</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 6vw, 70px)', fontWeight: 700, lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-0.02em' }}>
              Design{' '}
              <span style={{ background: 'linear-gradient(135deg, #c9a96e, #e8c98a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Categories
              </span>
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '18px', maxWidth: '560px', lineHeight: 1.7 }}>
              Explore our full range of interior design specializations — each crafted with precision, passion and a deep respect for your lifestyle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories List */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--color-bg-primary)' }}>
        <div className="section-container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            {allCategories.map((cat) => (
              <motion.div key={cat.id} variants={staggerItem}>
                <motion.div
                  whileHover={{ borderColor: `${cat.accent}30` }}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                  }}
                  onClick={() => setExpanded(expanded === cat.id ? null : cat.id)}
                >
                  {/* Main row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 32px', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div style={{ width: '56px', height: '56px', background: `${cat.accent}15`, border: `1px solid ${cat.accent}25`, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>
                        {cat.emoji}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{cat.title}</h2>
                          {cat.tag && (
                            <span style={{ background: `${cat.accent}20`, border: `1px solid ${cat.accent}40`, borderRadius: '100px', padding: '2px 10px', fontSize: '11px', fontWeight: 600, color: cat.accent }}>
                              {cat.tag}
                            </span>
                          )}
                        </div>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>{cat.count}+ designs available</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <Link
                        to={`/gallery`}
                        onClick={(e) => e.stopPropagation()}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 20px', background: `${cat.accent}15`, border: `1px solid ${cat.accent}30`, borderRadius: '8px', color: cat.accent, fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}
                      >
                        View Gallery <ArrowRight size={14} />
                      </Link>
                      <motion.div
                        animate={{ rotate: expanded === cat.id ? 90 : 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        <ArrowRight size={18} />
                      </motion.div>
                    </div>
                  </div>

                  {/* Expandable detail */}
                  <AnimatePresence>
                    {expanded === cat.id && (
                      <motion.div
                        key="detail"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '0 32px 32px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '28px', marginTop: '-1px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', lineHeight: 1.8 }}>{cat.description}</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                              {cat.images.map((img, i) => (
                                <div key={i} style={{ borderRadius: '10px', overflow: 'hidden', aspectRatio: '1', border: '1px solid rgba(255,255,255,0.07)' }}>
                                  <img src={img} alt={`${cat.title} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s', }} onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')} onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default CategoriesPage;
