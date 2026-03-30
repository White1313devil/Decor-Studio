import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ZoomIn, Tag, Search, X } from 'lucide-react';
import { pageVariants } from '../animations/motion';
import type { GalleryItem } from '../types';
import Modal from '../components/ui/Modal';

const allItems: GalleryItem[] = [
  { id: 1,  title: 'Modern Minimalist Living',  category: 'Living Room', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop', tags: ['minimalist', 'modern'] },
  { id: 2,  title: 'Luxury Master Bedroom',      category: 'Bedroom',     image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop', tags: ['luxury', 'bedroom'] },
  { id: 3,  title: 'Contemporary Kitchen',       category: 'Kitchen',     image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop', tags: ['modern', 'kitchen'] },
  { id: 4,  title: 'Executive Office Suite',     category: 'Office',      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop', tags: ['office', 'executive'] },
  { id: 5,  title: 'Spa Bathroom Retreat',       category: 'Bathroom',    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&auto=format&fit=crop', tags: ['spa', 'luxury'] },
  { id: 6,  title: 'Open Plan Living',           category: 'Living Room', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop', tags: ['open-plan', 'spacious'] },
  { id: 7,  title: 'Cozy Bedroom Nook',          category: 'Bedroom',     image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop', tags: ['cozy', 'warm'] },
  { id: 8,  title: 'Rustic Dining Room',         category: 'Dining',      image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&auto=format&fit=crop', tags: ['rustic', 'dining'] },
  { id: 9,  title: 'Modern Home Office',         category: 'Office',      image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&auto=format&fit=crop', tags: ['home-office', 'modern'] },
  { id: 10, title: 'Scandinavian Bedroom',       category: 'Bedroom',     image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&auto=format&fit=crop', tags: ['scandi', 'minimal'] },
  { id: 11, title: 'Bold Kitchen Island',        category: 'Kitchen',     image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&auto=format&fit=crop', tags: ['bold', 'statement'] },
  { id: 12, title: 'Outdoor Terrace Lounge',     category: 'Outdoor',     image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop', tags: ['outdoor', 'lounge'] },
];

const filters = ['All', 'Living Room', 'Bedroom', 'Kitchen', 'Office', 'Bathroom', 'Dining', 'Outdoor'];

const GalleryPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const filtered = allItems.filter((item) => {
    const matchCategory = activeFilter === 'All' || item.category === activeFilter;
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCategory && matchSearch;
  });

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {/* Page Hero */}
      <section
        style={{
          paddingTop: '140px',
          paddingBottom: '72px',
          background: 'linear-gradient(180deg, rgba(96,165,250,0.05) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '30%', right: '-60px', width: '350px', height: '350px', background: 'rgba(124,92,191,0.06)', borderRadius: '50%', filter: 'blur(100px)' }} />
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <Link to="/" style={{ color: 'var(--color-text-muted)', fontSize: '14px', textDecoration: 'none' }}>Home</Link>
              <span style={{ color: 'var(--color-text-muted)' }}>/</span>
              <span style={{ color: 'var(--color-gold)', fontSize: '14px' }}>Gallery</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 6vw, 70px)', fontWeight: 700, lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-0.02em' }}>
              Our{' '}
              <span style={{ background: 'linear-gradient(135deg, #c9a96e, #e8c98a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Gallery
              </span>
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '18px', maxWidth: '520px', lineHeight: 1.7, marginBottom: '36px' }}>
              A visual journey through our finest completed projects — each image tells a unique design story.
            </p>

            {/* Search bar */}
            <div style={{ position: 'relative', maxWidth: '420px' }}>
              <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title or tag…"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '13px 48px',
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  outline: 'none',
                  backdropFilter: 'blur(10px)',
                }}
              />
              {search && (
                <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center' }}>
                  <X size={16} />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Body */}
      <section style={{ padding: 'clamp(48px, 6vw, 80px) 0', background: 'var(--color-bg-primary)' }}>
        <div className="section-container">
          {/* Filter Strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}
          >
            {filters.map((f) => (
              <motion.button
                key={f}
                onClick={() => setActiveFilter(f)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '7px 18px',
                  borderRadius: '100px',
                  border: activeFilter === f ? '1px solid rgba(201,169,110,0.5)' : '1px solid rgba(255,255,255,0.08)',
                  background: activeFilter === f ? 'rgba(201,169,110,0.12)' : 'rgba(255,255,255,0.04)',
                  color: activeFilter === f ? 'var(--color-gold)' : 'var(--color-text-secondary)',
                  fontSize: '13px',
                  fontWeight: activeFilter === f ? 600 : 400,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  transition: 'all 0.2s',
                }}
              >
                {f}
              </motion.button>
            ))}
          </motion.div>

          {/* Count */}
          <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginBottom: '24px' }}>
            Showing <strong style={{ color: 'var(--color-text-secondary)' }}>{filtered.length}</strong> designs
          </p>

          {/* Masonry-style grid */}
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              gap: '18px',
            }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 0' }}
                >
                  <p style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</p>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>No results found. Try a different search or filter.</p>
                </motion.div>
              ) : (
                filtered.map((item, i) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.88 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    onClick={() => setSelected(item)}
                    style={{
                      position: 'relative',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      aspectRatio: i % 5 === 0 ? '3/4' : '4/3',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                      onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1.08)'; }}
                      onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1)'; }}
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,9,16,0.92) 0%, rgba(8,9,16,0.3) 60%, transparent 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '18px' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                        <div>
                          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontWeight: 600, color: '#fff', marginBottom: '3px' }}>{item.title}</p>
                          <p style={{ fontSize: '12px', color: 'var(--color-gold)' }}>{item.category}</p>
                        </div>
                        <div style={{ width: '34px', height: '34px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <ZoomIn size={15} color="#fff" />
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Image Modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div>
            <img src={selected.image} alt={selected.title} style={{ width: '100%', maxHeight: '520px', objectFit: 'cover', display: 'block' }} />
            <div style={{ padding: '24px 28px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 600, marginBottom: '6px' }}>{selected.title}</h3>
              <p style={{ color: 'var(--color-gold)', fontSize: '13px', marginBottom: '18px' }}>{selected.category}</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {selected.tags.map((tag) => (
                  <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 12px', background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)', borderRadius: '100px', fontSize: '12px', color: 'var(--color-gold)', fontWeight: 500 }}>
                    <Tag size={11} /> {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default GalleryPage;
