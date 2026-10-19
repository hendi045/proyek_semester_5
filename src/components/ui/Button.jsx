import React from 'react';
import './Button.css';

export function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
  size = 'md', // 'sm' | 'md' | 'lg'
  type = 'button',
  disabled = false,
  className = '',
  icon: Icon = null,
  iconPosition = 'left',
  onClick,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`qa-btn qa-btn--${variant} qa-btn--${size} ${className}`}
      onClick={onClick}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="qa-btn__icon" size={size === 'sm' ? 14 : 18} />}
      <span className="qa-btn__label">{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="qa-btn__icon" size={size === 'sm' ? 14 : 18} />}
    </button>
  );
}
