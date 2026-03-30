import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Tag } from 'lucide-react';
import type { GalleryItem } from '../../types';
import Modal from '../ui/Modal';

const galleryItems: GalleryItem[] = [
  { id: 1, title: 'Modern Minimalist Living', category: 'Living Room', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop', tags: ['minimalist', 'modern'] },
  { id: 2, title: 'Luxury Master Bedroom', category: 'Bedroom', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop', tags: ['luxury', 'bedroom'] },
  { id: 3, title: 'Contemporary Kitchen', category: 'Kitchen', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop', tags: ['modern', 'kitchen'] },
  { id: 4, title: 'Executive Office Suite', category: 'Office', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop', tags: ['office', 'executive'] },
  { id: 5, title: 'Spa Bathroom Retreat', category: 'Bathroom', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&auto=format&fit=crop', tags: ['spa', 'luxury'] },
  { id: 6, title: 'Open Plan Living', category: 'Living Room', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop', tags: ['open-plan', 'spacious'] },
  { id: 7, title: 'Cozy Bedroom Nook', category: 'Bedroom', image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop', tags: ['cozy', 'warm'] },
  { id: 8, title: 'Rustic Dining Room', category: 'Dining', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&auto=format&fit=crop', tags: ['rustic', 'dining'] },
  { id: 9, title: 'Modern Home Office', category: 'Office', image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&auto=format&fit=crop', tags: ['home-office', 'modern'] },
];

const filters = ['All', 'Living Room', 'Bedroom', 'Kitchen', 'Office', 'Bathroom', 'Dining'];

const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const filtered = activeFilter === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <section
      ref={ref}
      id="gallery"
      style={{
        padding: 'clamp(80px, 10vw, 120px) 0',
        background: 'var(--color-bg-secondary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
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
            Our Portfolio
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
            Design{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #c9a96e, #e8c98a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Gallery
            </span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '17px', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
            Browse our curated portfolio of completed projects — each one a unique story of transformation.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '48px',
          }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '8px 20px',
                borderRadius: '100px',
                border: activeFilter === filter
                  ? '1px solid rgba(201,169,110,0.5)'
                  : '1px solid rgba(255,255,255,0.08)',
                background: activeFilter === filter
                  ? 'rgba(201,169,110,0.12)'
                  : 'rgba(255,255,255,0.04)',
                color: activeFilter === filter
                  ? 'var(--color-gold)'
                  : 'var(--color-text-secondary)',
                fontSize: '13px',
                fontWeight: activeFilter === filter ? 600 : 400,
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                transition: 'all 0.2s',
                backdropFilter: 'blur(8px)',
              }}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: '20px',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                onClick={() => setSelectedItem(item)}
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  aspectRatio: i % 3 === 0 ? '4/5' : '4/3',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    display: 'block',
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1.08)'; }}
                  onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1)'; }}
                />
                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(8,9,16,0.9) 0%, rgba(8,9,16,0.4) 50%, transparent 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '20px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>
                        {item.title}
                      </p>
                      <p style={{ fontSize: '12px', color: 'var(--color-gold)' }}>{item.category}</p>
                    </div>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        background: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <ZoomIn size={16} color="#fff" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Image Modal */}
      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)}>
        {selectedItem && (
          <div>
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ padding: '24px 28px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 600, marginBottom: '8px' }}>
                {selectedItem.title}
              </h3>
              <p style={{ color: 'var(--color-gold)', fontSize: '13px', marginBottom: '16px' }}>
                {selectedItem.category}
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {selectedItem.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 12px',
                      background: 'rgba(201,169,110,0.1)',
                      border: '1px solid rgba(201,169,110,0.2)',
                      borderRadius: '100px',
                      fontSize: '12px',
                      color: 'var(--color-gold)',
                      fontWeight: 500,
                    }}
                  >
                    <Tag size={11} /> {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Gallery;
