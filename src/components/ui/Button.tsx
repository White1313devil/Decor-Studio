import React from 'react';
import { motion } from 'framer-motion';
import { buttonHoverVariants } from '../../animations/motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  fullWidth = false,
  icon,
  iconPosition = 'right',
}) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    letterSpacing: '0.02em',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    border: 'none',
    outline: 'none',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
    width: fullWidth ? '100%' : 'auto',
    borderRadius: 'var(--radius-btn)',
    position: 'relative',
    overflow: 'hidden',
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '8px 20px', fontSize: '13px' },
    md: { padding: '13px 32px', fontSize: '14px' },
    lg: { padding: '16px 44px', fontSize: '16px' },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: 'linear-gradient(135deg, #c9a96e, #e8c98a, #a07840)',
      color: '#080910',
      boxShadow: '0 4px 20px rgba(201, 169, 110, 0.35)',
    },
    secondary: {
      background: 'linear-gradient(135deg, #7c5cbf, #9d7de0)',
      color: '#ffffff',
      boxShadow: '0 4px 20px rgba(124, 92, 191, 0.35)',
    },
    ghost: {
      background: 'rgba(255, 255, 255, 0.06)',
      color: 'var(--color-text-primary)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      backdropFilter: 'blur(10px)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--color-gold)',
      border: '1px solid var(--color-gold)',
    },
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...baseStyles, ...sizeStyles[size], ...variantStyles[variant] }}
      className={className}
      variants={buttonHoverVariants}
      initial="rest"
      whileHover={disabled ? undefined : 'hover'}
      whileTap={disabled ? undefined : 'tap'}
    >
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </motion.button>
  );
};

export default Button;
