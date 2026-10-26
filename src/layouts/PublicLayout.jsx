import React, { useState } from 'react';
import {
  Compass,
  History,
  Lock,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Download
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { usePWA } from '../lib/pwa';
import './PublicLayout.css';

export function PublicLayout({
  currentPath = 'public-rekomendasi',
  onNavigate,
  children
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isInstallable, isInstalled, installApp } = usePWA();

  const handleNav = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="qa-public-shell">
      {/* Disclaimer Banner Demo */}
      <div className="demo-badge-banner" role="status">
        <Sparkles size={14} />
        <span>Prototipe SPK Wewangian Sunah berbasis Metode SAW • Versi Pengunjung Publik</span>
      </div>

      {/* Header */}
      <header className="qa-public-header">
        <div className="container qa-public-header__inner">
          {/* Brand */}
          <div className="qa-public-brand" onClick={() => handleNav('public-rekomendasi')}>
            <img src="/logo-qodha.jpg" alt="Logo Qodha Aromatic" className="qa-public-brand__logo-img" />
            <div className="qa-public-brand__meta">
              <span className="qa-public-brand__title">QODHA AROMATIC</span>
              <span className="qa-public-brand__sub">Kota Bogor • SPK Wewangian Sunah</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="qa-public-nav" aria-label="Navigasi Pengunjung">
            <button
              type="button"
              className={`qa-public-nav-link ${currentPath === 'public-rekomendasi' ? 'qa-public-nav-link--active' : ''}`}
              onClick={() => handleNav('public-rekomendasi')}
            >
              <Compass size={17} />
              <span>Rekomendasi Aroma</span>
            </button>

            <button
              type="button"
              className={`qa-public-nav-link ${currentPath === 'public-riwayat' ? 'qa-public-nav-link--active' : ''}`}
              onClick={() => handleNav('public-riwayat')}
            >
              <History size={17} />
              <span>Riwayat Simulasi</span>
            </button>
          </nav>

          {/* Action Button: Demo Admin Portal & PWA Install (Desktop) */}
          <div className="qa-public-actions">
            {isInstallable && !isInstalled && (
              <Button
                className="qa-public-action-btn"
                variant="primary"
                size="sm"
                icon={Download}
                onClick={installApp}
              >
                Pasang App
              </Button>
            )}

            <Button
              className="qa-public-action-btn"
              variant="outline"
              size="sm"
              icon={Lock}
              onClick={() => handleNav('login')}
            >
              Portal Admin (Demo)
            </Button>

            <button
              type="button"
              className="qa-public-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu navigasi mobile"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown & Backdrop */}
        {mobileMenuOpen && (
          <>
            <div
              className="qa-public-backdrop"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <div className="qa-public-mobile-menu">
              <div className="container qa-public-mobile-menu__inner">
                <button
                  type="button"
                  className={`qa-public-mobile-item ${currentPath === 'public-rekomendasi' ? 'qa-public-mobile-item--active' : ''}`}
                  onClick={() => handleNav('public-rekomendasi')}
                >
                  <Compass size={18} />
                  <span>Rekomendasi Aroma</span>
                </button>
                <button
                  type="button"
                  className={`qa-public-mobile-item ${currentPath === 'public-riwayat' ? 'qa-public-mobile-item--active' : ''}`}
                  onClick={() => handleNav('public-riwayat')}
                >
                  <History size={18} />
                  <span>Riwayat Simulasi</span>
                </button>

                {isInstallable && !isInstalled && (
                  <button
                    type="button"
                    className="qa-public-mobile-item qa-public-mobile-item--install"
                    onClick={() => {
                      installApp();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Download size={18} />
                    <span>Pasang Aplikasi (PWA)</span>
                  </button>
                )}

                <button
                  type="button"
                  className="qa-public-mobile-item qa-public-mobile-item--admin"
                  onClick={() => handleNav('login')}
                >
                  <Lock size={18} />
                  <span>Masuk Portal Admin (Demo)</span>
                </button>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Main Content Body */}
      <main className="qa-public-main" id="public-main-content">
        {children}
      </main>

      {/* Footer */}
      <footer className="qa-public-footer">
        <div className="container qa-public-footer__inner">
          <div className="qa-public-footer__brand">
            <div className="qa-public-brand__title">QODHA AROMATIC KOTA BOGOR</div>
            <p className="qa-public-footer__desc">
              Sistem Pendukung Keputusan Penentuan Rekomendasi Aroma Wewangian Sunah Menggunakan Metode Simple Additive Weighting (SAW) pada Qodha Aromatic Kota Bogor.
            </p>
          </div>

          <div className="qa-public-footer__disclaimer">
            <div className="qa-disclaimer-badge">
              <ShieldCheck size={16} />
              <span>Catatan Produk & SOT</span>
            </div>
            <p>
              Aplikasi ini adalah prototipe front-end untuk simulasi pendukung keputusan dan edukasi wewangian sunah. Aplikasi tidak menetapkan fatwa keagamaan atau hukum syar'i mutlak.
            </p>
          </div>
        </div>
        <div className="qa-public-footer__bottom">
          <div className="container">
            <p>© 2026 Qodha Aromatic Kota Bogor • Proyek Pemrograman Web (Pak Suhendro)</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
