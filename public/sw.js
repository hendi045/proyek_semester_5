/* ==========================================================================
   SERVICE WORKER — QODHA AROMATIC KOTA BOGOR (PWA)
   ========================================================================== */

const CACHE_NAME = 'qodha-aromatic-v1.0.0';

// Aset utama shell aplikasi yang di-precache saat instalasi
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/manifest.json',
  '/logo-qodha.jpg',
  '/apple-touch-icon.png',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  '/icons/maskable-icon-512x512.png',
  '/icons/apple-touch-icon.png'
];

// 1. INSTALL: Cache app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[PWA SW] Precache warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// 2. ACTIVATE: Bersihkan cache versi lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[PWA SW] Menghapus cache usang:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. FETCH: Strategi Caching
// - Untuk Navigasi HTML: Network First dengan Fallback ke Cache (Offline First)
// - Untuk Aset Statis (CSS, JS, Gambar, Font): Cache First dengan Network Fallback
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Abaikan request non-GET dan scheme chrome-extension / non-http
  if (req.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // A. Permintaan Navigasi Halaman (HTML SPA)
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((networkResponse) => {
          // Salin respon ke cache
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return networkResponse;
        })
        .catch(async () => {
          // Jika offline, ambil dari cache
          const cached = await caches.match(req);
          if (cached) return cached;
          const fallback = await caches.match('/index.html');
          if (fallback) return fallback;
          return new Response('Mode Offline — Qodha Aromatic siap digunakan saat koneksi pulih.', {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
          });
        })
    );
    return;
  }

  // B. Permintaan Aset Statis (JS, CSS, Gambar, Font)
  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch di background untuk memperbarui cache (Stale-while-revalidate ringan)
        fetch(req).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(req, networkResponse));
          }
        }).catch(() => {
          // Abaikan kegagalan jaringan saat offline
        });
        return cachedResponse;
      }

      // Jika belum di-cache, fetch dari jaringan dan simpan ke cache
      return fetch(req).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(req, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // Fallback untuk gambar jika offline
        if (req.destination === 'image') {
          return caches.match('/logo-qodha.jpg');
        }
      });
    })
  );
});

// 4. MESSAGE: Menerima perintah update dari aplikasi
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
