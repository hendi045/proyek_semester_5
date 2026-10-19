import React, { useState } from 'react';
import { Lock, User, Key, AlertCircle, ArrowLeft, ShieldAlert } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import './LoginPage.css';

export function LoginPage({ onLoginSuccess, onBackToPublic }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Nama pengguna atau email wajib diisi.';
    }
    if (!password) {
      newErrors.password = 'Kata sandi wajib diisi.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    // Simulasi autentikasi lokal demo
    setTimeout(() => {
      setLoading(false);
      if (
        (username.trim().toLowerCase() === 'admin' || username.trim().toLowerCase() === 'admin@qodha.id') &&
        password === 'admin123'
      ) {
        onLoginSuccess({ username: 'admin', role: 'Demo Administrator' });
      } else {
        setAuthError('Kredensial demo tidak cocok. Gunakan username "admin" dan sandi "admin123".');
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('admin123');
    setErrors({});
    setAuthError('');
  };

  return (
    <div className="qa-login-container">
      <div className="qa-login-card">
        {/* Header Back Button */}
        <div className="qa-login-header-nav">
          <button
            type="button"
            className="qa-login-back-btn"
            onClick={onBackToPublic}
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Beranda Pengunjung</span>
          </button>
        </div>

        {/* Brand Logo & Title */}
        <div className="qa-login-brand">
          <img src="/logo-qodha.jpg" alt="Logo Qodha Aromatic" className="qa-login-logo-img" />
          <h1 className="qa-login-title">Masuk ke Portal Admin</h1>
          <p className="qa-login-subtitle">
            Sistem Pendukung Keputusan Penentuan Rekomendasi Aroma Wewangian Sunah Menggunakan Metode SAW pada Qodha Aromatic Kota Bogor
          </p>
        </div>

        {/* Demo Disclaimer Box */}
        <div className="qa-login-demo-notice">
          <div className="qa-demo-notice-header">
            <ShieldAlert size={16} />
            <span className="qa-demo-notice-title">Simulasi Demo Front-End</span>
          </div>
          <p className="qa-demo-notice-text">
            Autentikasi ini adalah simulasi browser lokal tanpa backend. Jangan masukkan kata sandi pribadi Anda.
          </p>
          <div className="qa-demo-creds">
            <span>Kredensial Demo: <strong>admin</strong> / <strong>admin123</strong></span>
            <button
              type="button"
              className="qa-demo-fill-btn"
              onClick={handleFillDemo}
            >
              Isi Otomatis
            </button>
          </div>
        </div>

        {/* Auth Error Banner */}
        {authError && (
          <div className="qa-login-alert" role="alert">
            <AlertCircle size={18} className="qa-login-alert-icon" />
            <span>{authError}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="qa-login-form">
          <Input
            id="username"
            label="Nama Pengguna / Email Demo"
            type="text"
            placeholder="Contoh: admin"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (errors.username) setErrors({ ...errors, username: '' });
            }}
            error={errors.username}
            icon={User}
            required
          />

          <Input
            id="password"
            label="Kata Sandi Demo"
            type="password"
            placeholder="Contoh: admin123"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: '' });
            }}
            error={errors.password}
            icon={Key}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            icon={Lock}
            disabled={loading}
            className="qa-login-submit"
          >
            {loading ? 'Memeriksa Kredensial...' : 'Masuk ke Dashboard Admin'}
          </Button>
        </form>

        {/* Footer info */}
        <div className="qa-login-footer">
          <Badge variant="neutral" size="sm">Phase 2 — UI Shell & Auth Demo</Badge>
        </div>
      </div>
    </div>
  );
}
