import { useState, useEffect, useCallback } from 'react';

let deferredPrompt = null;
let updateCallback = null;

/**
 * Mendaftarkan Service Worker PWA
 */
export function registerServiceWorker(onUpdateAvailable) {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  updateCallback = onUpdateAvailable;

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('[PWA] Service Worker terdaftar dengan scope:', registration.scope);

        // Periksa apakah ada worker yang sedang menunggu aktivasi
        if (registration.waiting && updateCallback) {
          updateCallback();
        }

        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.addEventListener('statechange', () => {
              if (
                installingWorker.state === 'installed' &&
                navigator.serviceWorker.controller &&
                updateCallback
              ) {
                updateCallback();
              }
            });
          }
        });
      })
      .catch((error) => {
        console.warn('[PWA] Registrasi Service Worker gagal:', error);
      });

    // Handle reload saat worker baru mengklaim kontrol
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });
  });
}

/**
 * Hook React untuk fungsionalitas PWA (Instalasi, Status Offline, dan Update)
 */
export function usePWA() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    );
  });
  const [isOffline, setIsOffline] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !navigator.onLine;
  });
  const [hasUpdate, setHasUpdate] = useState(false);

  useEffect(() => {
    // 1. Tangkap event beforeinstallprompt (Chrome, Edge, Android)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      deferredPrompt = e;
      setIsInstallable(true);
    };

    // 2. Tangkap event saat aplikasi berhasil diinstall
    const handleAppInstalled = () => {
      deferredPrompt = null;
      setIsInstallable(false);
      setIsInstalled(true);
      console.log('[PWA] Aplikasi Qodha Aromatic berhasil diinstal!');
    };

    // 3. Deteksi status koneksi internet online / offline
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Daftarkan listener update
    registerServiceWorker(() => setHasUpdate(true));

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Memicu dialog instalasi native PWA
  const installApp = useCallback(async () => {
    if (!deferredPrompt) {
      return false;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    setIsInstallable(false);
    if (outcome === 'accepted') {
      setIsInstalled(true);
      return true;
    }
    return false;
  }, []);

  // Menerapkan update baru
  const applyUpdate = useCallback(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg && reg.waiting) {
          reg.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      });
    }
  }, []);

  return {
    isInstallable,
    isInstalled,
    isOffline,
    hasUpdate,
    installApp,
    applyUpdate
  };
}
