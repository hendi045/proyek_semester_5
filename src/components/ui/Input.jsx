import React from 'react';
import './Input.css';

export function Input({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  helperText,
  disabled = false,
  required = false,
  className = '',
  icon: Icon = null,
  ...props
}) {
  return (
    <div className={`qa-field ${className}`}>
      {label && (
        <label htmlFor={id} className="qa-field__label">
          {label}
          {required && <span className="qa-field__required">*</span>}
        </label>
      )}
      <div className={`qa-input-wrapper ${Icon ? 'qa-input-wrapper--with-icon' : ''} ${error ? 'qa-input-wrapper--error' : ''}`}>
        {Icon && <Icon className="qa-input-icon" size={18} />}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className="qa-input"
          {...props}
        />
      </div>
      {error && <p className="qa-field__error">{error}</p>}
      {!error && helperText && <p className="qa-field__helper">{helperText}</p>}
    </div>
  );
}

export function Select({
  id,
  label,
  value,
  onChange,
  options = [],
  error,
  helperText,
  disabled = false,
  required = false,
  className = '',
  ...props
}) {
  return (
    <div className={`qa-field ${className}`}>
      {label && (
        <label htmlFor={id} className="qa-field__label">
          {label}
          {required && <span className="qa-field__required">*</span>}
        </label>
      )}
      <div className={`qa-input-wrapper ${error ? 'qa-input-wrapper--error' : ''}`}>
        <select
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className="qa-input qa-select"
          {...props}
        >
          {options.map((opt, idx) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const lbl = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={idx} value={val}>
                {lbl}
              </option>
            );
          })}
        </select>
      </div>
      {error && <p className="qa-field__error">{error}</p>}
      {!error && helperText && <p className="qa-field__helper">{helperText}</p>}
    </div>
  );
}

export function Textarea({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  disabled = false,
  required = false,
  rows = 3,
  className = '',
  ...props
}) {
  return (
    <div className={`qa-field ${className}`}>
      {label && (
        <label htmlFor={id} className="qa-field__label">
          {label}
          {required && <span className="qa-field__required">*</span>}
        </label>
      )}
      <div className={`qa-input-wrapper ${error ? 'qa-input-wrapper--error' : ''}`}>
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          rows={rows}
          className="qa-input qa-textarea"
          {...props}
        />
      </div>
      {error && <p className="qa-field__error">{error}</p>}
      {!error && helperText && <p className="qa-field__helper">{helperText}</p>}
    </div>
  );
}
