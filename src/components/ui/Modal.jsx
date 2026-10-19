import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
import './Modal.css';

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  confirmLabel,
  onConfirm,
  confirmVariant = 'primary',
  cancelLabel = 'Batal',
  maxWidth = '500px'
}) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="qa-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="qa-modal-card"
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="qa-modal-header">
          <h3 className="qa-modal-title">{title}</h3>
          <button
            type="button"
            className="qa-modal-close"
            onClick={onClose}
            aria-label="Tutup dialog"
          >
            <X size={18} />
          </button>
        </div>
        <div className="qa-modal-body">{children}</div>
        <div className="qa-modal-footer">
          <Button variant="secondary" onClick={onClose}>
            {cancelLabel}
          </Button>
          {confirmLabel && onConfirm && (
            <Button variant={confirmVariant} onClick={onConfirm}>
              {confirmLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
