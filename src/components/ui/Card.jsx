import React from 'react';
import './Card.css';

export function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div className={`qa-card ${hover ? 'qa-card--hover' : ''} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={`qa-card__header ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', as = 'h3', ...props }) {
  const Component = as;
  return (
    <Component className={`qa-card__title ${className}`} {...props}>
      {children}
    </Component>
  );
}

export function CardDescription({ children, className = '', ...props }) {
  return (
    <p className={`qa-card__desc ${className}`} {...props}>
      {children}
    </p>
  );
}

export function CardBody({ children, className = '', ...props }) {
  return (
    <div className={`qa-card__body ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div className={`qa-card__footer ${className}`} {...props}>
      {children}
    </div>
  );
}
