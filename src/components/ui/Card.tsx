import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  glass?: boolean;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hover = true,
  glass = true,
  style,
}) => {
  return (
    <motion.div
      className={className}
      onClick={onClick}
      style={{
        background: glass ? 'rgba(255,255,255,0.04)' : 'rgba(13,15,26,0.8)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        backdropFilter: glass ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: glass ? 'blur(20px)' : 'none',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        ...style,
      }}
      whileHover={
        hover
          ? {
              y: -6,
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,169,110,0.2)',
              borderColor: 'rgba(201,169,110,0.25)',
            }
          : undefined
      }
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;
