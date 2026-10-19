import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import './Toast.css';

export function Toast({ toast, onClose }) {
  if (!toast) return null;

  const { message, type = 'info' } = toast;

  const icons = {
    success: <CheckCircle2 size={18} className="qa-toast__icon qa-toast__icon--success" />,
    warning: <AlertCircle size={18} className="qa-toast__icon qa-toast__icon--warning" />,
    danger: <AlertCircle size={18} className="qa-toast__icon qa-toast__icon--danger" />,
    info: <Info size={18} className="qa-toast__icon qa-toast__icon--info" />
  };

  return (
    <div className={`qa-toast qa-toast--${type}`} role="alert" aria-live="assertive">
      <div className="qa-toast__content">
        {icons[type] || icons.info}
        <span className="qa-toast__message">{message}</span>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="qa-toast__close"
          aria-label="Tutup notifikasi"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
