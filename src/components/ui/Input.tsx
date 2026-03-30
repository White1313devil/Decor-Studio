import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  multiline = false,
  rows = 4,
  icon,
}) => {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value.length > 0;

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    marginBottom: '4px',
  };

  const labelStyle: React.CSSProperties = {
    position: 'absolute',
    left: icon ? '44px' : '16px',
    top: isFloating ? '8px' : '50%',
    transform: isFloating ? 'none' : 'translateY(-50%)',
    fontSize: isFloating ? '11px' : '14px',
    color: error
      ? '#ef4444'
      : focused
      ? 'var(--color-gold)'
      : 'var(--color-text-muted)',
    transition: 'all 0.2s ease',
    pointerEvents: 'none',
    fontFamily: 'var(--font-sans)',
    fontWeight: 500,
    letterSpacing: '0.02em',
    zIndex: 1,
  };

  const multilineLabelStyle: React.CSSProperties = {
    ...labelStyle,
    top: isFloating ? '8px' : '20px',
    transform: 'none',
  };

  const fieldStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${
      error ? '#ef4444' : focused ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)'
    }`,
    borderRadius: '12px',
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.2s ease',
    paddingLeft: icon ? '44px' : '16px',
    paddingRight: '16px',
    paddingTop: isFloating ? '24px' : '16px',
    paddingBottom: isFloating ? '8px' : '16px',
    boxShadow: focused
      ? `0 0 0 3px rgba(201, 169, 110, 0.12)`
      : 'none',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    resize: 'none',
    lineHeight: 1.6,
  };

  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: focused ? 'var(--color-gold)' : 'var(--color-text-muted)',
    transition: 'color 0.2s',
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none',
    zIndex: 1,
  };

  if (multiline) {
    return (
      <div style={{ marginBottom: '20px' }}>
        <div style={containerStyle}>
          {icon && <span style={{ ...iconStyle, top: '24px', transform: 'none' }}>{icon}</span>}
          <span style={multilineLabelStyle}>{label}{required && ' *'}</span>
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            rows={rows}
            style={fieldStyle as React.CSSProperties}
          />
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', paddingLeft: '16px' }}
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={containerStyle}>
        {icon && <span style={iconStyle}>{icon}</span>}
        <span style={labelStyle}>{label}{required && ' *'}</span>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={fieldStyle}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', paddingLeft: '16px' }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default Input;
