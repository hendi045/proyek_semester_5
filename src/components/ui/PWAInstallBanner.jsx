import React, { useState } from 'react';
import { Download, WifiOff, RefreshCw, X } from 'lucide-react';
import { usePWA } from '../../lib/pwa';
import { Button } from './Button';
import './PWAInstallBanner.css';

export function PWAInstallBanner() {
  const { isInstallable, isInstalled, isOffline, hasUpdate, installApp, applyUpdate } = usePWA();
  const [isDismissed, setIsDismissed] = useState(false);

  return (
    <>
      {/* 1. Indikator Mode Offline */}
      {isOffline && (
        <div className="qa-pwa-offline-bar" role="status" aria-live="polite">
          <div className="container qa-pwa-bar-inner">
            <WifiOff size={16} className="qa-pwa-icon" />
            <span>
              <strong>Mode Offline Aktif</strong> — Aplikasi tetap dapat digunakan untuk simulasi rekomendasi dan riwayat wewangian dari penyimpanan lokal.
            </span>
          </div>
        </div>
      )}

      {/* 2. Banner Update Versi Baru */}
      {hasUpdate && (
        <div className="qa-pwa-update-bar" role="alert">
          <div className="container qa-pwa-bar-inner">
            <RefreshCw size={16} className="qa-pwa-icon qa-spin" />
            <span>Versi pembaruan Qodha Aromatic siap digunakan!</span>
            <Button
              variant="primary"
              size="sm"
              onClick={applyUpdate}
            >
              Muat Ulang Sekarang
            </Button>
          </div>
        </div>
      )}

      {/* 3. Floating Prompt Pemasangan PWA (Install Prompt) */}
      {isInstallable && !isInstalled && !isDismissed && (
        <aside className="qa-pwa-install-toast" aria-label="Pasang Aplikasi">
          <div className="qa-pwa-toast-content">
            <div className="qa-pwa-toast-icon">
              <img src="/icons/icon-96x96.png" alt="Qodha Icon" className="qa-pwa-logo" />
            </div>
            <div className="qa-pwa-toast-text">
              <strong className="qa-pwa-toast-title">Pasang Qodha Aromatic</strong>
              <p className="qa-pwa-toast-desc">
                Akses cepat langsung dari layar utama perangkat Anda & tetap dapat digunakan saat offline.
              </p>
            </div>
          </div>
          <div className="qa-pwa-toast-actions">
            <Button
              variant="primary"
              size="sm"
              icon={Download}
              onClick={installApp}
            >
              Pasang Aplikasi
            </Button>
            <button
              type="button"
              className="qa-pwa-dismiss-btn"
              onClick={() => setIsDismissed(true)}
              aria-label="Tutup notifikasi pasang aplikasi"
            >
              <X size={16} />
            </button>
          </div>
        </aside>
      )}
    </>
  );
}

export default PWAInstallBanner;
