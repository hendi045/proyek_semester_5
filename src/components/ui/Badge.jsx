import React from 'react';
import './Badge.css';

export function Badge({
  children,
  variant = 'neutral', // 'success' | 'warning' | 'danger' | 'orange' | 'neutral' | 'dark'
  size = 'md', // 'sm' | 'md'
  icon: Icon = null,
  dot = false,
  className = ''
}) {
  return (
    <span className={`qa-badge qa-badge--${variant} qa-badge--${size} ${className}`}>
      {dot && <span className="qa-badge__dot" />}
      {Icon && <Icon className="qa-badge__icon" size={12} />}
      <span className="qa-badge__text">{children}</span>
    </span>
  );
}
