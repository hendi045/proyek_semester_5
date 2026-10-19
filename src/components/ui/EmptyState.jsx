import React from 'react';
import { Button } from './Button';
import './EmptyState.css';

export function EmptyState({
  icon: Icon = null,
  title,
  description,
  actionLabel,
  onAction,
  actionIcon,
  className = ''
}) {
  return (
    <div className={`qa-empty-state ${className}`}>
      {Icon && (
        <div className="qa-empty-state__icon-wrapper">
          <Icon className="qa-empty-state__icon" size={32} />
        </div>
      )}
      <h4 className="qa-empty-state__title">{title}</h4>
      {description && <p className="qa-empty-state__desc">{description}</p>}
      {actionLabel && onAction && (
        <div className="qa-empty-state__action">
          <Button variant="primary" icon={actionIcon} onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
