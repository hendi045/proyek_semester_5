import React, { useState } from 'react';
import {
  LayoutDashboard,
  Sparkles,
  Sliders,
  Scale,
  Calculator,
  Award,
  Printer,
  LogOut,
  ExternalLink,
  Menu,
  X,
  User,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { Badge } from '../components/ui/Badge';
import './AdminLayout.css';

export function AdminLayout({
  currentPath = 'dashboard',
  onNavigate,
  onLogout,
  children
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navGroups = [
    {
      group: 'Overview',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      group: 'DATA MASTER',
      items: [
        { id: 'aroma', label: 'Data Aroma Wewangian', icon: Sparkles },
        { id: 'kriteria', label: 'Data Kriteria', icon: Sliders },
        { id: 'bobot', label: 'Bobot Kriteria', icon: Scale },
        { id: 'penilaian', label: 'Data Penilaian Aroma', icon: Calculator }
      ]
    },
    {
      group: 'ANALISIS SAW',
      items: [
        { id: 'saw', label: 'Proses Perhitungan SAW', icon: Calculator },
        { id: 'ranking', label: 'Hasil Perangkingan', icon: Award },
        { id: 'laporan', label: 'Cetak Laporan', icon: Printer }
      ]
    }
  ];

  // Map path to friendly page title
  const getPageTitle = (path) => {
    switch (path) {
      case 'dashboard': return 'Dashboard Overview';
      case 'aroma': return 'Katalog & Data Aroma Wewangian';
      case 'kriteria': return 'Master Data Kriteria SAW';
      case 'bobot': return 'Pengaturan Bobot Kriteria';
      case 'penilaian': return 'Matriks Penilaian Alternatif';
      case 'saw': return 'Tahapan Proses Perhitungan SAW';
      case 'ranking': return 'Hasil Perangkingan Alternatif';
      case 'laporan': return 'Cetak & Ekspor Laporan';
      default: return 'Admin Area';
    }
  };

  const handleNavClick = (id) => {
    if (onNavigate) {
      onNavigate(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="qa-admin-shell">
      <div className="qa-admin-layout">
        {/* Mobile Backdrop */}
        {mobileMenuOpen && (
          <div
            className="qa-admin-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar Desktop & Mobile Drawer */}
        <aside className={`qa-admin-sidebar ${mobileMenuOpen ? 'qa-admin-sidebar--open' : ''}`}>
          <div className="qa-admin-sidebar__header">
            <div className="qa-brand">
              <img src="/logo-qodha.jpg" alt="Logo Qodha Aromatic" className="qa-brand__logo-img" />
              <div className="qa-brand__text">
                <span className="qa-brand__name">QODHA AROMATIC</span>
                <span className="qa-brand__tag">Kota Bogor • SPK SAW</span>
              </div>
            </div>
            <button
              type="button"
              className="qa-admin-sidebar__close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Tutup Menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="qa-admin-nav" aria-label="Navigasi Admin">
            {navGroups.map((grp, gIdx) => (
              <div key={gIdx} className="qa-nav-group">
                <span className="qa-nav-group__title">{grp.group}</span>
                <div className="qa-nav-group__items">
                  {grp.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPath === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`qa-nav-item ${isActive ? 'qa-nav-item--active' : ''}`}
                        onClick={() => handleNavClick(item.id)}
                      >
                        <Icon size={18} className="qa-nav-item__icon" />
                        <span className="qa-nav-item__label">{item.label}</span>
                        {isActive && <ChevronRight size={14} className="qa-nav-item__arrow" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="qa-admin-sidebar__footer">
            <button
              type="button"
              className="qa-nav-switch-public"
              onClick={() => onNavigate && onNavigate('public-rekomendasi')}
            >
              <ExternalLink size={16} />
              <span>Lihat Halaman Pengunjung</span>
            </button>

            <button
              type="button"
              className="qa-nav-logout"
              onClick={() => setShowLogoutConfirm(true)}
            >
              <LogOut size={16} />
              <span>Keluar Sesi Demo</span>
            </button>
          </div>
        </aside>

        {/* Main Workspace Area */}
        <div className="qa-admin-main">
          {/* Topbar */}
          <header className="qa-admin-topbar">
            <div className="qa-admin-topbar__left">
              <button
                type="button"
                className="qa-admin-menu-toggle"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Buka menu navigasi"
              >
                <Menu size={22} />
              </button>
              <div className="qa-admin-breadcrumb">
                <span className="qa-breadcrumb-root">Admin</span>
                <span className="qa-breadcrumb-separator">/</span>
                <span className="qa-breadcrumb-active">{getPageTitle(currentPath)}</span>
              </div>
            </div>

            <div className="qa-admin-topbar__right">
              <div className="qa-admin-profile">
                <div className="qa-admin-profile__avatar">
                  <User size={16} />
                </div>
                <div className="qa-admin-profile__info">
                  <span className="qa-admin-profile__name">Demo Admin</span>
                  <Badge variant="orange" size="sm">Demo Mode</Badge>
                </div>
              </div>
            </div>
          </header>

          {/* Disclaimer Banner Demo */}
          <div className="demo-badge-banner" role="status">
            <ShieldAlert size={14} />
            <span>Mode Prototipe Front-End: Sesi login dan data tersimpan lokal di browser (Demo Only).</span>
          </div>

          {/* Content Body */}
          <main className="qa-admin-content" id="main-content">
            {children}
          </main>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        title="Keluar dari Sesi Demo?"
        confirmLabel="Ya, Keluar"
        confirmVariant="danger"
        cancelLabel="Batal"
        onConfirm={() => {
          setShowLogoutConfirm(false);
          if (onLogout) onLogout();
        }}
      >
        <p>
          Anda akan keluar dari area Administrator Qodha Aromatic dan kembali ke halaman login demo. Sesi lokal ini adalah simulasi browser.
        </p>
      </Modal>
    </div>
  );
}
